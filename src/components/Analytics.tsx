// src/components/Analytics.tsx
'use client';

import Script from 'next/script';
import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

interface AnalyticsProps {
  GA_MEASUREMENT_ID?: string | undefined;
  GTM_ID?: string | undefined;
  LINKEDIN_ID?: string | undefined;
}

const Analytics = ({ GA_MEASUREMENT_ID, GTM_ID, LINKEDIN_ID }: AnalyticsProps) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Handle UTM parameters and store them in localStorage
  useEffect(() => {
    if (!searchParams) {
      return;
    }

    const storeUtmParams = () => {
      const utmParams = {
        utm_source: searchParams.get('utm_source'),
        utm_medium: searchParams.get('utm_medium'),
        utm_campaign: searchParams.get('utm_campaign'),
        utm_term: searchParams.get('utm_term'),
        utm_content: searchParams.get('utm_content'),
      };

      // Only store if at least one UTM parameter exists
      if (Object.values(utmParams).some((param) => param !== null)) {
        try {
          localStorage.setItem(
            'utm_params',
            JSON.stringify({
              ...utmParams,
              timestamp: new Date().toISOString(),
              landing_page: pathname,
            })
          );
        } catch (error) {
          console.warn('Error storing UTM params:', error);
        }
      }
    };

    storeUtmParams();
  }, [pathname, searchParams]);

  // Track page views
  useEffect(() => {
    if (!pathname) {
      return;
    }

    // GA4 page view
    if (GA_MEASUREMENT_ID && typeof window.gtag === 'function') {
      window.gtag?.('event', 'page_view', {
        page_path: pathname,
      });
    }

    // LinkedIn page view
    if (LINKEDIN_ID) {
      window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || [];
      window._linkedin_data_partner_ids.push(LINKEDIN_ID);
    }
  }, [pathname, LINKEDIN_ID, GA_MEASUREMENT_ID]);

  // If no IDs are provided, don't render any scripts
  if (!GA_MEASUREMENT_ID && !GTM_ID && !LINKEDIN_ID) {
    return null;
  }

  return (
    <>
      {/* Google Analytics 4 */}
      {GA_MEASUREMENT_ID && (
        <>
          <Script
            strategy="afterInteractive"
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
          />
          <Script
            id="ga4-init"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_MEASUREMENT_ID}', {
                  page_path: window.location.pathname,
                  transport_url: 'https://www.google-analytics.com/g/collect',
                  transport_type: 'beacon'
                });
              `,
            }}
          />
        </>
      )}

      {/* Google Tag Manager */}
      {GTM_ID && (
        <Script
          id="gtm-init"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','${GTM_ID}');
            `,
          }}
        />
      )}

      {/* LinkedIn Insight */}
      {LINKEDIN_ID && (
        <Script
          id="linkedin-insight"
          strategy="afterInteractive"
          onError={(e) => {
            console.warn('LinkedIn Insight Tag blocked or failed to load:', e);
          }}
          dangerouslySetInnerHTML={{
            __html: `
        _linkedin_partner_id = "${LINKEDIN_ID}";
        window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || [];
        window._linkedin_data_partner_ids.push(_linkedin_partner_id);
        (function(l) {
          if (!l){window.lintrk = function(a,b){window.lintrk.q.push([a, b])};
          window.lintrk.q=[]}
          var s = document.getElementsByTagName("script")[0];
          var b = document.createElement("script");
          b.type = "text/javascript";b.async = true;
          b.src = "https://snap.licdn.com/li.lms-analytics/insight.min.js";
          s.parentNode.insertBefore(b, s);
        })(window.lintrk);
      `,
          }}
        />
      )}
    </>
  );
};

export default Analytics;
