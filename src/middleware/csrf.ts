// src/middleware/csrf.ts
import { NextResponse, NextRequest } from 'next/server';
import { validateCsrfTokenPair } from '@/utils/csrf';

export async function csrfMiddleware(request: NextRequest) {
  // Skip CSRF check for CSRF token endpoint
  if (request.nextUrl.pathname === '/api/csrf') {
    return NextResponse.next();
  }

  // Only check POST, PUT, DELETE, PATCH requests
  if (!['POST', 'PUT', 'DELETE', 'PATCH'].includes(request.method)) {
    return NextResponse.next();
  }

  const token = request.headers.get('x-csrf-token');
  const secret = request.cookies.get('csrf-secret')?.value;

  if (!token || !secret || !validateCsrfTokenPair(secret, token)) {
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

  return NextResponse.next();
}
