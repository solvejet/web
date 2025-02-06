// src/utils/csrf.ts
import { NextResponse } from 'next/server';
import Tokens from 'csrf';

const tokens = new Tokens();

export const generateCsrfToken = () => {
  const secret = tokens.secretSync();
  const token = tokens.create(secret);
  return { secret, token };
};

export const setCsrfToken = (response: NextResponse) => {
  const { secret, token } = generateCsrfToken();

  // Set both secret and token
  response.cookies.set('csrf-secret', secret, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
  });

  response.cookies.set('csrf-token', token, {
    httpOnly: false, // Allow JS access
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
  });

  return token;
};

export const validateCsrfTokenPair = (secret: string, token: string): boolean => {
  try {
    return tokens.verify(secret, token);
  } catch {
    return false;
  }
};
