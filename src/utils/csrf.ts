// src/utils/csrf.ts - CSRF utility functions
import { generateCsrfToken } from '@/middleware/security';
import { NextResponse } from 'next/server';

export const setCsrfToken = (response: NextResponse) => {
  const token = generateCsrfToken();
  response.cookies.set('csrf-token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
  });
  return token;
};
