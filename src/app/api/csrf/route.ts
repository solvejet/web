// src/app/api/csrf/route.ts
import { NextResponse } from 'next/server';
import { setCsrfToken } from '@/utils/csrf';

export async function GET() {
  try {
    const response = NextResponse.json(
      { message: 'CSRF token set' },
      {
        status: 200,
        headers: {
          'Access-Control-Allow-Origin':
            process.env['NEXT_PUBLIC_APP_URL'] || 'http://localhost:3000',
          'Access-Control-Allow-Credentials': 'true',
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          Pragma: 'no-cache',
          Expires: '0',
        },
      }
    );

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
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          Pragma: 'no-cache',
          Expires: '0',
        },
      }
    );
  }
}

export async function OPTIONS() {
  return NextResponse.json(
    {},
    {
      status: 200,
      headers: {
        'Access-Control-Allow-Origin':
          process.env['NEXT_PUBLIC_APP_URL'] || 'http://localhost:3000',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-CSRF-Token',
        'Access-Control-Allow-Credentials': 'true',
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        Pragma: 'no-cache',
        Expires: '0',
      },
    }
  );
}
