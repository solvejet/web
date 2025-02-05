// src/utils/analytics.ts
import { v4 as uuidv4 } from 'uuid';
import { fetchWithCsrf } from '@/utils/api';
import { NextRequest } from 'next/server';
import { UAParser } from 'ua-parser-js';

// Get client information from request
export const getClientInfo = (request: NextRequest) => {
  const ua = request.headers.get('user-agent') || '';
  const parser = new UAParser(ua);
  const parsedUA = parser.getResult();

  // Get IP address
  const ip =
    request.headers.get('x-real-ip') ||
    request.headers.get('x-forwarded-for')?.split(',')[0] ||
    'unknown';

  return {
    ip: process.env.NODE_ENV === 'production' ? ip : 'localhost',
    deviceType: parsedUA.device.type || 'desktop',
    browser: parsedUA.browser.name || 'unknown',
    os: parsedUA.os.name || 'unknown',
    country:
      request.headers.get('cf-ipcountry') ||
      request.headers.get('x-vercel-ip-country') ||
      'unknown',
    region:
      request.headers.get('cf-region') || request.headers.get('x-vercel-ip-region') || 'unknown',
    city: request.headers.get('cf-ipcity') || request.headers.get('x-vercel-ip-city') || 'unknown',
  };
};

// Get or create session ID
export const getSessionId = () => {
  if (typeof window === 'undefined') return '';

  let sessionId = localStorage.getItem('analytics_session_id');
  if (!sessionId) {
    sessionId = uuidv4();
    localStorage.setItem('analytics_session_id', sessionId);
  }
  return sessionId;
};

// Track UTM parameters
export const trackUTM = async (utmParams: Record<string, string | null>, landingPage: string) => {
  try {
    const sessionId = getSessionId();
    const payload = {
      ...utmParams,
      landing_page: landingPage,
      sessionId,
      referrer: document.referrer,
    };

    const response = await fetchWithCsrf('/api/analytics', {
      method: 'POST',
      body: JSON.stringify({
        type: 'utm',
        payload,
      }),
    });

    return await response.json();
  } catch (error) {
    console.error('Error tracking UTM:', error);
    return null;
  }
};

// Track page view
export const trackPageView = async (pathname: string, utmId?: string) => {
  try {
    const sessionId = getSessionId();
    const payload = {
      pathname,
      sessionId,
      utmId,
    };

    await fetchWithCsrf('/api/analytics', {
      method: 'POST',
      body: JSON.stringify({
        type: 'pageview',
        payload,
      }),
    });
  } catch (error) {
    console.error('Error tracking page view:', error);
  }
};

// Track campaign performance
export const trackCampaignPerformance = async (data: {
  campaignId: string;
  adId?: string;
  adGroupId?: string;
  platform: 'linkedin' | 'other';
  metrics: {
    impressions: number;
    clicks: number;
    conversions: number;
    spend: number;
  };
  targetAudience?: string;
  region?: string;
}) => {
  try {
    await fetchWithCsrf('/api/analytics', {
      method: 'POST',
      body: JSON.stringify({
        type: 'campaign',
        payload: data,
      }),
    });
  } catch (error) {
    console.error('Error tracking campaign performance:', error);
  }
};
