// src/middleware/security.ts
import { NextResponse, NextRequest } from 'next/server';
import { RateLimiterMemory } from 'rate-limiter-flexible';
import Tokens from 'csrf';
import { randomBytes } from 'crypto';

// Rate limiter setup
const rateLimiter = new RateLimiterMemory({
  points: 10, // Number of requests
  duration: 1, // Per second
});

const tokens = new Tokens();

// Generate CSRF token
export function generateCsrfToken(): string {
  const secret = randomBytes(32).toString('hex');
  return tokens.create(secret);
}

// Trusted origins for CORS
const TRUSTED_ORIGINS = [
  'https://solvejet.net',
  'https://*.solvejet.net',
  process.env['NEXT_PUBLIC_APP_URL'],
].filter(Boolean) as string[];

// Security Headers Configuration
const securityHeaders: Record<string, string> = {
  'Content-Security-Policy':
    "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' blob: data:; font-src 'self' data:; connect-src 'self' https://api.solvejet.com;",
  'X-Frame-Options': 'DENY',
  'X-Content-Type-Options': 'nosniff',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=(), interest-cohort=()',
  'X-XSS-Protection': '1; mode=block',
  'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
  'Access-Control-Allow-Credentials': 'true',
};

// Get client IP address
const getClientIp = (request: NextRequest): string => {
  const forwardedFor = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim();
  if (forwardedFor) {
    return forwardedFor;
  }

  const realIp = request.headers.get('x-real-ip');
  if (realIp) {
    return realIp;
  }

  return '127.0.0.1';
};

// Validate CSRF token
export async function validateCsrfToken(req: NextRequest): Promise<NextResponse | null> {
  const token = req.headers.get('x-csrf-token');
  const cookie = req.cookies.get('csrf-token');

  if (!token || !cookie?.value) {
    return NextResponse.json({ error: 'Missing CSRF token' }, { status: 403 });
  }

  try {
    const isValid = tokens.verify(cookie.value, token);
    if (!isValid) {
      return NextResponse.json({ error: 'Invalid CSRF token' }, { status: 403 });
    }
    return null;
  } catch {
    return NextResponse.json({ error: 'Invalid CSRF token' }, { status: 403 });
  }
}

// API Security Middleware
export async function apiSecurityMiddleware(request: NextRequest) {
  // Only apply to API routes
  if (!request.url.includes('/api/')) {
    return NextResponse.next();
  }

  try {
    // 1. Rate Limiting
    const ip = getClientIp(request);
    try {
      await rateLimiter.consume(ip);
    } catch {
      return NextResponse.json(
        { error: 'Too many requests' },
        {
          status: 429,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
    }

    // 2. CORS Check
    const origin = request.headers.get('origin');
    const isAllowedOrigin =
      origin &&
      TRUSTED_ORIGINS.some(
        (trusted) =>
          origin === trusted ||
          (trusted.startsWith('https://*.') && origin.endsWith(trusted.slice(8)))
      );

    const defaultCorsHeaders: Record<string, string> = {
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-CSRF-Token',
      'Access-Control-Max-Age': '86400',
    };

    if (request.method === 'OPTIONS') {
      const corsHeaders = new Headers(defaultCorsHeaders);

      // Add security headers
      Object.entries(securityHeaders).forEach(([key, value]) => {
        corsHeaders.set(key, value);
      });

      // Set CORS origin if allowed
      if (isAllowedOrigin && origin) {
        corsHeaders.set('Access-Control-Allow-Origin', origin);
      } else if (TRUSTED_ORIGINS[0]) {
        corsHeaders.set('Access-Control-Allow-Origin', TRUSTED_ORIGINS[0]);
      }

      return new NextResponse(null, {
        status: 204,
        headers: corsHeaders,
      });
    }

    // 3. Create response with security headers
    const response = NextResponse.next();
    const responseHeaders = new Headers(response.headers);

    // 4. Add security headers
    Object.entries(securityHeaders).forEach(([key, value]) => {
      responseHeaders.set(key, value);
    });

    // 5. CORS headers for non-OPTIONS requests
    if (isAllowedOrigin && origin) {
      responseHeaders.set('Access-Control-Allow-Origin', origin);
    }

    // 6. CSRF Protection
    if (['POST', 'PUT', 'DELETE', 'PATCH'].includes(request.method)) {
      const csrfToken = request.headers.get('x-csrf-token');
      const storedToken = request.cookies.get('csrf-token')?.value;

      if (!csrfToken || !storedToken || csrfToken !== storedToken) {
        return NextResponse.json(
          { error: 'Invalid CSRF token' },
          {
            status: 403,
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );
      }
    }

    // Create new response with updated headers
    return NextResponse.next({
      request: {
        headers: responseHeaders,
      },
    });
  } catch {
    // Log error internally but don't expose details
    return NextResponse.json(
      { error: 'Internal Server Error' },
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }
}
