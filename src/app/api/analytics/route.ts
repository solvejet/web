// src/app/api/analytics/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import { UTM, PageView, CampaignPerformance, Performance } from '@/models/analytics';
import { getClientInfo } from '@/utils/analytics';
import { rateLimit } from '@/lib/rate-limit';
import { validateCsrfToken } from '@/middleware/security';
import { analyticsSchema } from '@/schemas/analytics';
import { z } from 'zod';

function isZodError(error: unknown): error is z.ZodError {
  return error instanceof z.ZodError;
}

interface ErrorResponse {
  error: string;
  details?: Record<string, unknown>;
}

function createErrorResponse(
  message: string,
  status: number = 400,
  details?: Record<string, unknown>
) {
  const errorBody: ErrorResponse = { error: message };
  if (details) {
    errorBody.details = details;
  }
  return NextResponse.json(errorBody, { status });
}

export async function POST(req: NextRequest) {
  try {
    // Early read of request body
    let body: unknown;
    try {
      body = await req.json();
    } catch {
      return createErrorResponse('Invalid JSON payload', 400);
    }

    // Origin validation
    const origin = req.headers.get('origin');
    const allowedOrigin = process.env['NEXT_PUBLIC_APP_URL'] || 'http://localhost:3000';

    if (origin && origin !== allowedOrigin) {
      return createErrorResponse('Invalid origin', 403);
    }

    // Rate limiting
    const limiter = await rateLimit(req, 'analytics');
    if (!limiter.success) {
      return createErrorResponse('Too many requests', 429);
    }

    // CSRF validation
    const csrfError = await validateCsrfToken(req);
    if (csrfError) return csrfError;

    // Schema validation
    const validationResult = analyticsSchema.safeParse(body);
    if (!validationResult.success) {
      return createErrorResponse('Invalid request format', 400, validationResult.error.format());
    }

    const data = validationResult.data;
    const clientInfo = getClientInfo(req);

    // Database connection
    await connectToDatabase();

    // Process by event type
    switch (data.type) {
      case 'performance': {
        const performance = new Performance({
          metric: data.payload.metric,
          value: data.payload.value,
          rating: data.payload.rating,
          pathname: data.payload.pathname,
          timestamp: new Date(data.payload.timestamp),
          event: data.payload.event,
          ...clientInfo,
        });
        await performance.save();
        return NextResponse.json({ success: true });
      }

      case 'utm': {
        const utm = new UTM({
          ...data.payload,
          ...clientInfo,
          timestamp: new Date(),
        });
        await utm.save();
        return NextResponse.json({ id: utm._id.toString() });
      }

      case 'pageview': {
        const pageView = new PageView({
          ...data.payload,
          ...clientInfo,
          timestamp: new Date(),
        });
        await pageView.save();
        return NextResponse.json({ success: true });
      }

      case 'campaign': {
        const campaign = new CampaignPerformance({
          ...data.payload,
          date: new Date(),
        });
        await campaign.save();
        return NextResponse.json({ success: true });
      }
    }
  } catch (error) {
    console.error('Analytics API Error:', error);

    if (isZodError(error)) {
      return createErrorResponse('Validation error', 400, error.format());
    }

    return createErrorResponse('Internal Server Error', 500);
  }
}

export async function OPTIONS(request: NextRequest) {
  const origin = request.headers.get('origin');
  const allowedOrigin = process.env['NEXT_PUBLIC_APP_URL'] || 'http://localhost:3000';

  return new NextResponse(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': origin === allowedOrigin ? origin : allowedOrigin,
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-CSRF-Token',
      'Access-Control-Allow-Credentials': 'true',
      'Access-Control-Max-Age': '86400',
    },
  });
}
