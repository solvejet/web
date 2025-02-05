// src/app/api/analytics/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import { UTM, PageView, CampaignPerformance } from '@/models/analytics';
import { getClientInfo } from '@/utils/analytics';
import { rateLimit } from '@/lib/rate-limit';
import { validateCsrfToken } from '@/middleware/security';
import { z } from 'zod';

// Validation schemas
const baseSchema = z.object({
  type: z.enum(['utm', 'pageview', 'campaign']),
  payload: z.object({}).passthrough(),
});

const utmSchema = z.object({
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
  payload: z.object({
    pathname: z.string(),
    sessionId: z.string(),
    utmId: z.string().optional(),
  }),
});

const campaignSchema = z.object({
  payload: z.object({
    campaignId: z.string(),
    adId: z.string().optional(),
    adGroupId: z.string().optional(),
    platform: z.enum(['linkedin', 'other']),
    metrics: z.object({
      impressions: z.number(),
      clicks: z.number(),
      conversions: z.number(),
      spend: z.number(),
    }),
    targetAudience: z.string().optional(),
    region: z.string().optional(),
  }),
});

export async function POST(req: NextRequest) {
  try {
    // 1. Rate limiting
    const limiter = await rateLimit(req);
    if (!limiter.success) {
      return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
    }

    // 2. CSRF validation
    const csrfError = await validateCsrfToken(req);
    if (csrfError) {
      return csrfError;
    }

    // 3. Origin validation
    const origin = req.headers.get('origin');
    const allowedOrigins = [process.env['NEXT_PUBLIC_APP_URL'] || 'http://localhost:3000'];

    if (origin && !allowedOrigins.includes(origin)) {
      return NextResponse.json({ error: 'Invalid origin' }, { status: 403 });
    }

    // 4. Basic data validation
    const data = await req.json();
    const baseValidation = baseSchema.safeParse(data);

    if (!baseValidation.success) {
      return NextResponse.json(
        { error: 'Invalid request format', details: baseValidation.error },
        { status: 400 }
      );
    }

    const { type, payload } = baseValidation.data;
    const clientInfo = await getClientInfo(req);

    // 5. Database connection
    await connectToDatabase();

    // 6. Type-specific validation and processing
    switch (type) {
      case 'utm': {
        const validation = utmSchema.safeParse(data);
        if (!validation.success) {
          return NextResponse.json(
            { error: 'Invalid UTM data', details: validation.error },
            { status: 400 }
          );
        }

        const utm = new UTM({
          ...payload,
          ...clientInfo,
          timestamp: new Date(),
        });
        await utm.save();
        return NextResponse.json({ id: utm._id });
      }

      case 'pageview': {
        const validation = pageViewSchema.safeParse(data);
        if (!validation.success) {
          return NextResponse.json(
            { error: 'Invalid pageview data', details: validation.error },
            { status: 400 }
          );
        }

        const pageView = new PageView({
          ...payload,
          ...clientInfo,
          timestamp: new Date(),
        });
        await pageView.save();
        return NextResponse.json({ success: true });
      }

      case 'campaign': {
        const validation = campaignSchema.safeParse(data);
        if (!validation.success) {
          return NextResponse.json(
            { error: 'Invalid campaign data', details: validation.error },
            { status: 400 }
          );
        }

        const campaign = new CampaignPerformance({
          ...payload,
          date: new Date(),
        });
        await campaign.save();
        return NextResponse.json({ success: true });
      }

      default:
        return NextResponse.json({ error: 'Invalid event type' }, { status: 400 });
    }
  } catch (error) {
    console.error('Analytics API Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

// Only allow POST requests
export async function GET() {
  return NextResponse.json({ error: 'Method not allowed' }, { status: 405 });
}

export async function PUT() {
  return NextResponse.json({ error: 'Method not allowed' }, { status: 405 });
}

export async function DELETE() {
  return NextResponse.json({ error: 'Method not allowed' }, { status: 405 });
}
