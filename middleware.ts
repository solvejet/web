// src/middleware.ts
import { NextResponse, NextRequest } from 'next/server';
import { apiSecurityMiddleware } from '@/middleware/security';

// Main middleware function
export async function middleware(request: NextRequest) {
  // Handle API routes with security middleware
  if (request.url.includes('/api/')) {
    return apiSecurityMiddleware(request);
  }

  // For non-API routes
  const response = NextResponse.next();
  const headers = new Headers(response.headers);

  // Security headers for all routes
  headers.set('X-Frame-Options', 'DENY');
  headers.set('X-Content-Type-Options', 'nosniff');
  headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=(), interest-cohort=()');
  headers.set('X-XSS-Protection', '1; mode=block');
  headers.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');

  // Content Security Policy for non-API routes
  headers.set(
    'Content-Security-Policy',
    [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' blob: data:",
      "font-src 'self' data:",
      "connect-src 'self' https://api.solvejet.net",
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

// Configure middleware matching
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|public/).*)',
    // Include API routes
    '/api/:path*',
  ],
};
