// src/app/api/csrf/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { setCsrfToken } from '@/utils/csrf';

export async function GET(request: NextRequest) {
  try {
    // Get origin and verify it
    const origin = request.headers.get('origin');
    const allowedOrigin = process.env['NEXT_PUBLIC_APP_URL'] || 'http://localhost:3000';

    const response = NextResponse.json(
      { message: 'CSRF token set' },
      {
        status: 200,
        headers: {
          'Access-Control-Allow-Origin':
            origin && origin === allowedOrigin ? origin : allowedOrigin,
          'Access-Control-Allow-Credentials': 'true',
          'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
          Pragma: 'no-cache',
          Expires: '0',
          'Surrogate-Control': 'no-store',
        },
      }
    );

    // Set CSRF token in cookies and return it in header
    const token = setCsrfToken(response);
    response.headers.set('X-CSRF-Token', token);

    return response;
  } catch (error) {
    console.error('Error setting CSRF token:', error);
    return NextResponse.json(
      { error: 'Failed to set CSRF token' },
      {
        status: 500,
        headers: {
          'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
          Pragma: 'no-cache',
          Expires: '0',
          'Surrogate-Control': 'no-store',
        },
      }
    );
  }
}

export async function OPTIONS(request: NextRequest) {
  const origin = request.headers.get('origin');
  const allowedOrigin = process.env['NEXT_PUBLIC_APP_URL'] || 'http://localhost:3000';

  return NextResponse.json(
    {},
    {
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': origin && origin === allowedOrigin ? origin : allowedOrigin,
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-CSRF-Token',
        'Access-Control-Allow-Credentials': 'true',
        'Access-Control-Max-Age': '86400', // 24 hours
        'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
        Pragma: 'no-cache',
        Expires: '0',
        'Surrogate-Control': 'no-store',
      },
    }
  );
}
