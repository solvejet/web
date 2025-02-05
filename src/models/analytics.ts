// src/models/analytics.ts
import mongoose, { Schema, Document } from 'mongoose';

// UTM Parameters Interface
export interface IUTM extends Document {
  utm_source: string;
  utm_medium: string;
  utm_campaign: string;
  utm_term?: string;
  utm_content?: string;
  landing_page: string;
  referrer?: string;
  sessionId: string;
  timestamp: Date;
}

// Page View Interface
export interface IPageView extends Document {
  pathname: string;
  sessionId: string;
  userId?: string;
  utmId?: mongoose.Types.ObjectId;
  timestamp: Date;
  duration?: number;
  exitPage?: boolean;
  ip: string;
  deviceType: string;
  browser: string;
  os: string;
  country?: string;
  region?: string;
  city?: string;
}

// Campaign Performance Interface
export interface ICampaignPerformance extends Document {
  campaignId: string;
  adId?: string;
  adGroupId?: string;
  platform: 'linkedin' | 'other';
  impressions: number;
  clicks: number;
  conversions: number;
  spend: number;
  date: Date;
  targetAudience?: string;
  region?: string;
}

// UTM Schema
const UTMSchema = new Schema<IUTM>({
  utm_source: { type: String, required: true, index: true },
  utm_medium: { type: String, required: true, index: true },
  utm_campaign: { type: String, required: true, index: true },
  utm_term: String,
  utm_content: String,
  landing_page: { type: String, required: true },
  referrer: String,
  sessionId: { type: String, required: true, index: true },
  timestamp: { type: Date, default: Date.now, index: true },
});

// Page View Schema
const PageViewSchema = new Schema<IPageView>({
  pathname: { type: String, required: true, index: true },
  sessionId: { type: String, required: true, index: true },
  userId: { type: String, sparse: true },
  utmId: { type: Schema.Types.ObjectId, ref: 'UTM', sparse: true },
  timestamp: { type: Date, default: Date.now, index: true },
  duration: Number,
  exitPage: Boolean,
  ip: { type: String, required: true },
  deviceType: { type: String, required: true },
  browser: { type: String, required: true },
  os: { type: String, required: true },
  country: String,
  region: String,
  city: String,
});

// Campaign Performance Schema
const CampaignPerformanceSchema = new Schema<ICampaignPerformance>({
  campaignId: { type: String, required: true, index: true },
  adId: { type: String, sparse: true },
  adGroupId: { type: String, sparse: true },
  platform: { type: String, required: true, enum: ['linkedin', 'other'] },
  impressions: { type: Number, default: 0 },
  clicks: { type: Number, default: 0 },
  conversions: { type: Number, default: 0 },
  spend: { type: Number, required: true },
  date: { type: Date, required: true, index: true },
  targetAudience: String,
  region: String,
});

// Create indexes for common queries
UTMSchema.index({ timestamp: 1, utm_source: 1, utm_campaign: 1 });
PageViewSchema.index({ timestamp: 1, pathname: 1 });
CampaignPerformanceSchema.index({ date: 1, platform: 1 });

// Create models if they don't exist
export const UTM = mongoose.models['UTM'] || mongoose.model<IUTM>('UTM', UTMSchema);
export const PageView =
  mongoose.models['PageView'] || mongoose.model<IPageView>('PageView', PageViewSchema);
export const CampaignPerformance =
  mongoose.models['CampaignPerformance'] ||
  mongoose.model<ICampaignPerformance>('CampaignPerformance', CampaignPerformanceSchema);
