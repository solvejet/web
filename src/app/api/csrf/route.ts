// src/app/api/csrf/route.ts - CSRF token endpoint
import { NextResponse } from 'next/server';
import { setCsrfToken } from '@/utils/csrf';

export async function GET() {
  const response = new NextResponse(JSON.stringify({ message: 'CSRF token set' }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const token = setCsrfToken(response);
  response.headers.set('x-csrf-token', token);

  return response;
}
