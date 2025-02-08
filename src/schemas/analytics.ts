// src/schemas/analytics.ts
import { z } from 'zod';

export const performanceSchema = z.object({
  type: z.literal('performance'),
  payload: z.object({
    metric: z.string(),
    value: z.number(),
    rating: z.enum(['good', 'needs-improvement', 'poor']),
    pathname: z.string(),
    timestamp: z.string().datetime(),
    event: z.string().optional(),
  }),
});

export const utmSchema = z.object({
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

export const pageViewSchema = z.object({
  type: z.literal('pageview'),
  payload: z.object({
    pathname: z.string(),
    sessionId: z.string(),
    utmId: z.string().optional(),
  }),
});

export const campaignSchema = z.object({
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

export const analyticsSchema = z.discriminatedUnion('type', [
  utmSchema,
  pageViewSchema,
  campaignSchema,
  performanceSchema,
]);
