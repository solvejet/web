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
    points: 100, // Number of points
    duration: 60, // Per minute
  }),
  default: new RateLimiterMemory({
    points: 50, // Number of points
    duration: 60, // Per minute
  }),
} as const;

type LimiterKey = keyof typeof limiters;

// Get client IP helper
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

/**
 * Rate limit middleware
 * @param request - Next.js request object
 * @param endpoint - Endpoint identifier for different rate limits (optional)
 * @returns RateLimitResponse object
 */
export async function rateLimit(
  request: NextRequest,
  endpoint: LimiterKey = 'default'
): Promise<RateLimitResponse> {
  const ip = getClientIp(request);
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
  const headers = new Headers({
    'X-RateLimit-Limit': result.limit.toString(),
    'X-RateLimit-Remaining': result.remaining.toString(),
    'X-RateLimit-Reset': result.reset.toString(),
  });

  if (!result.success) {
    return NextResponse.json(
      { error: 'Too Many Requests' },
      {
        status: 429,
        headers: {
          ...Object.fromEntries(headers),
          'Retry-After': Math.ceil((result.reset - Date.now()) / 1000).toString(),
        },
      }
    );
  }

  return headers;
}

/**
 * Example usage in an API route:
 *
 * export async function POST(req: NextRequest) {
 *   const rateResult = await rateLimit(req, 'analytics');
 *
 *   if (!rateResult.success) {
 *     return createRateLimitResponse(rateResult);
 *   }
 *
 *   const headers = createRateLimitResponse(rateResult);
 *
 *   // Your API logic here
 *   const data = await processRequest(req);
 *
 *   return NextResponse.json(data, {
 *     headers: Object.fromEntries(headers),
 *   });
 * }
 */
