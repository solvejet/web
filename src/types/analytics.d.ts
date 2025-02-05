// src/types/analytics.d.ts

// Google Analytics Event Types
type GtagEvent = {
  event_category?: string;
  event_label?: string;
  value?: number;
  page_path?: string;
  page_title?: string;
  send_to?: string;
  [key: string]: string | number | boolean | undefined;
};

// Google Tag Manager Data Layer Types
type DataLayerEvent = {
  event: string;
  [key: string]: string | number | boolean | object | undefined;
};

// LinkedIn Tracking Types
type LinkedInTrackingEvent = {
  conversion_id?: string;
  conversion_value?: number;
  conversion_currency?: string;
  [key: string]: string | number | undefined;
};

interface Window {
  gtag: (
    command: 'event' | 'config' | 'consent' | 'set',
    targetId: string,
    config?: GtagEvent
  ) => void;
  dataLayer: DataLayerEvent[];
  _linkedin_data_partner_ids: string[];
  lintrk: {
    q: LinkedInTrackingEvent[];
    (command: string, args: LinkedInTrackingEvent): void;
  };
}

interface UtmParams {
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  utm_term: string | null;
  utm_content: string | null;
  timestamp: string;
  landing_page: string;
}
