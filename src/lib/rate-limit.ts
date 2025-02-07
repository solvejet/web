// src/lib/rate-limit.ts
import { RateLimiterMemory, RateLimiterRes } from 'rate-limiter-flexible';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

interface RateLimitResponse {
  success: boolean;
  limit: number;
  remaining: number;
  reset: number;
}

// Create separate limiters for different endpoints
const limiters = {
  analytics: new RateLimiterMemory({
    points: 500, // Increased from 100
    duration: 60, // Per minute
    blockDuration: 1, // Only block for 1 second
  }),
  performance: new RateLimiterMemory({
    points: 1000, // Higher limit for performance metrics
    duration: 60,
    blockDuration: 1,
  }),
  default: new RateLimiterMemory({
    points: 50,
    duration: 60,
  }),
} as const;

type LimiterKey = keyof typeof limiters;

// Get client IP helper
const getClientIp = (request: NextRequest): string => {
  const forwardedFor = request.headers.get('x-forwarded-for');
  const realIp = request.headers.get('x-real-ip');

  return forwardedFor?.split(',')[0]?.trim() ?? realIp ?? '127.0.0.1';
};

/**
 * Rate limit middleware with path-based limits
 */
export async function rateLimit(
  request: NextRequest,
  endpoint: LimiterKey = 'default'
): Promise<RateLimitResponse> {
  const ip = getClientIp(request);
  const path = request.nextUrl.pathname;

  // Use performance limiter for performance metrics
  if (path.includes('/api/analytics') && request.method === 'POST') {
    try {
      const body = await request.json();
      if (body.type === 'performance') {
        endpoint = 'performance';
      } else {
        endpoint = 'analytics';
      }
    } catch {
      endpoint = 'analytics';
    }
  }

  const limiter = limiters[endpoint];

  try {
    const rateLimitResult = await limiter.consume(ip);

    return {
      success: true,
      limit: limiter.points,
      remaining: rateLimitResult.remainingPoints,
      reset: new Date(Date.now() + rateLimitResult.msBeforeNext).getTime(),
    };
  } catch (error) {
    const rateLimitResult = error as RateLimiterRes;

    return {
      success: false,
      limit: limiter.points,
      remaining: rateLimitResult.remainingPoints,
      reset: new Date(Date.now() + rateLimitResult.msBeforeNext).getTime(),
    };
  }
}

/**
 * Helper function to create rate-limited response
 */
export function createRateLimitResponse(result: RateLimitResponse) {
  const headers = {
    'X-RateLimit-Limit': result.limit.toString(),
    'X-RateLimit-Remaining': result.remaining.toString(),
    'X-RateLimit-Reset': result.reset.toString(),
  };

  if (!result.success) {
    return NextResponse.json(
      {
        error: 'Too Many Requests',
        retryAfter: Math.ceil((result.reset - Date.now()) / 1000),
      },
      {
        status: 429,
        headers: {
          ...headers,
          'Retry-After': Math.ceil((result.reset - Date.now()) / 1000).toString(),
        },
      }
    );
  }

  return headers;
}
