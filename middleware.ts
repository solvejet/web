// src/middleware.ts
import { NextResponse, NextRequest } from 'next/server';
import { csrfMiddleware } from '@/middleware/csrf';
import { apiSecurityMiddleware } from '@/middleware/security';

export async function middleware(request: NextRequest) {
  // Apply CSRF middleware first
  if (request.url.includes('/api/')) {
    const csrfResult = await csrfMiddleware(request);
    if (csrfResult.status === 403) {
      return csrfResult;
    }
    // Then apply API security middleware
    return apiSecurityMiddleware(request);
  }

  // For non-API routes
  const response = NextResponse.next();
  const headers = new Headers(response.headers);

  // Security headers
  headers.set('X-Frame-Options', 'DENY');
  headers.set('X-Content-Type-Options', 'nosniff');
  headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
  headers.set('Cache-Control', 'public, max-age=31536000, immutable');
  headers.set('X-XSS-Protection', '1; mode=block');
  headers.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');

  // CSP for non-API routes
  headers.set(
    'Content-Security-Policy',
    [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' blob: data:",
      "font-src 'self' data:",
      "connect-src 'self' https://solvejet.net",
      "form-action 'self'",
      "frame-ancestors 'none'",
      "base-uri 'self'",
      'upgrade-insecure-requests',
      'block-all-mixed-content',
    ].join('; ')
  );

  return NextResponse.next({
    request: {
      headers,
    },
  });
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|public/).*)', '/api/:path*'],
};
