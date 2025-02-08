// src/app/api/analytics/route.ts
import { NextRequest, NextResponse } from 'next/server';
import mongoose from 'mongoose';
import { connectToDatabase } from '@/lib/mongodb';
import { UTM, PageView, CampaignPerformance, Performance } from '@/models/analytics';
import { getClientInfo } from '@/utils/analytics';
import { rateLimit } from '@/lib/rate-limit';
import { validateCsrfToken } from '@/middleware/security';
import { z } from 'zod';

// Validation schemas for better type safety and validation
const utmSchema = z.object({
  type: z.literal('utm'),
  payload: z.object({
    utm_source: z.string().nullable(),
    utm_medium: z.string().nullable(),
    utm_campaign: z.string().nullable(),
    utm_term: z.string().nullable(),
    utm_content: z.string().nullable(),
    landing_page: z.string(),
    sessionId: z.string(),
    referrer: z.string().optional(),
  }),
});

const pageViewSchema = z.object({
  type: z.literal('pageview'),
  payload: z.object({
    pathname: z.string(),
    sessionId: z.string(),
    utmId: z.string().optional(),
  }),
});

const campaignSchema = z.object({
  type: z.literal('campaign'),
  payload: z.object({
    campaignId: z.string(),
    adId: z.string().optional(),
    adGroupId: z.string().optional(),
    platform: z.enum(['linkedin', 'other']),
    metrics: z.object({
      impressions: z.number().int().nonnegative(),
      clicks: z.number().int().nonnegative(),
      conversions: z.number().int().nonnegative(),
      spend: z.number().nonnegative(),
    }),
    targetAudience: z.string().optional(),
    region: z.string().optional(),
  }),
});

// Combined schema for initial validation

const performanceSchema = z.object({
  type: z.literal('performance'),
  payload: z.object({
    metric: z.string().optional(),
    value: z.number(),
    rating: z.enum(['good', 'needs-improvement', 'poor']),
    pathname: z.string(),
    timestamp: z.string(),
  }),
});

const analyticsSchema = z.discriminatedUnion('type', [
  utmSchema,
  pageViewSchema,
  campaignSchema,
  performanceSchema,
]);

// Type guard for checking if error is a ZodError
function isZodError(error: unknown): error is z.ZodError {
  return error instanceof z.ZodError;
}

interface ErrorResponse {
  error: string;
  details?: Record<string, unknown>;
}

// Error response helper
function createErrorResponse(
  message: string,
  status: number = 400,
  details?: Record<string, unknown>
) {
  const errorBody: ErrorResponse = { error: message };
  if (details) {
    errorBody['details'] = details;
  }

  return NextResponse.json(errorBody, { status });
}

export async function POST(req: NextRequest) {
  try {
    // 1. Early read of request body
    let body: unknown;
    try {
      body = await req.json();
      console.log('Received analytics request:', body);
    } catch {
      return createErrorResponse('Invalid JSON payload', 400);
    }

    // 2. Origin validation
    const origin = req.headers.get('origin');
    const allowedOrigin = process.env['NEXT_PUBLIC_APP_URL'] || 'http://localhost:3000';

    if (origin && origin !== allowedOrigin) {
      return createErrorResponse('Invalid origin', 403);
    }

    // 3. Rate limiting
    const limiter = await rateLimit(req, 'analytics');
    if (!limiter.success) {
      return NextResponse.json(
        {
          error: 'Too many requests',
          retryAfter: Math.ceil((limiter.reset - Date.now()) / 1000),
        },
        {
          status: 429,
          headers: {
            'Retry-After': Math.ceil((limiter.reset - Date.now()) / 1000).toString(),
          },
        }
      );
    }

    // 4. CSRF validation
    const csrfError = await validateCsrfToken(req);
    if (csrfError) {
      return csrfError;
    }

    // 5. Schema validation
    const validationResult = analyticsSchema.safeParse(body);
    if (!validationResult.success) {
      console.log('Validation failed:', validationResult.error.format());
      return createErrorResponse(
        'Invalid request format',
        400,
        validationResult.error.format() as Record<string, unknown>
      );
    }

    const data = validationResult.data;
    const clientInfo = getClientInfo(req);

    // 6. Database connection
    await connectToDatabase();

    // 7. Process by event type
    let response: { id?: string; success?: boolean };

    switch (data.type) {
      case 'performance': {
        const performance = new Performance({
          metric: data.payload.metric,
          value: data.payload.value,
          rating: data.payload.rating,
          pathname: data.payload.pathname,
          timestamp: new Date(data.payload.timestamp),
          ...clientInfo, // This spreads the IP, device info, etc.
        });
        await performance.save();
        response = { success: true };
        break;
      }

      case 'utm': {
        const utm = new UTM({
          ...data.payload,
          ...clientInfo,
          timestamp: new Date(),
        });
        await utm.save();
        response = { id: utm._id.toString() };
        break;
      }

      case 'pageview': {
        const pageView = new PageView({
          ...data.payload,
          ...clientInfo,
          timestamp: new Date(),
        });
        await pageView.save();
        response = { success: true };
        break;
      }

      case 'campaign': {
        const campaign = new CampaignPerformance({
          ...data.payload,
          date: new Date(),
        });
        await campaign.save();
        response = { success: true };
        break;
      }
    }

    // 8. Return success response with CORS headers
    return NextResponse.json(response, {
      headers: {
        'Access-Control-Allow-Origin': origin && origin === allowedOrigin ? origin : allowedOrigin,
        'Access-Control-Allow-Credentials': 'true',
      },
    });
  } catch (error) {
    console.error('Analytics API Error:', error);

    // Handle different types of errors
    if (isZodError(error)) {
      return createErrorResponse(
        'Validation error',
        400,
        error.format() as Record<string, unknown>
      );
    }

    if (error instanceof mongoose.Error.ValidationError) {
      return createErrorResponse('Database validation error', 400);
    }

    if (error instanceof mongoose.Error.CastError) {
      return createErrorResponse('Invalid data format', 400);
    }

    // Generic error response
    return createErrorResponse('Internal Server Error', 500);
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
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-CSRF-Token',
        'Access-Control-Allow-Credentials': 'true',
        'Access-Control-Max-Age': '86400', // 24 hours
      },
    }
  );
}

// Prevent other HTTP methods
export async function GET() {
  return createErrorResponse('Method not allowed', 405);
}

export async function PUT() {
  return createErrorResponse('Method not allowed', 405);
}

export async function DELETE() {
  return createErrorResponse('Method not allowed', 405);
}

export async function PATCH() {
  return createErrorResponse('Method not allowed', 405);
}
