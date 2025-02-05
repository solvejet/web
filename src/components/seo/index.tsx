// src/components/seo/index.tsx
'use client';

import React, { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Script from 'next/script';
import Head from 'next/head';
import { useMetadata } from '@/hooks/use-metadata';
import { usePerformance } from '@/hooks/use-performance';
import { trackPageView } from '@/utils/analytics';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string[];
  image?: string;
  noIndex?: boolean;
  suffix?: string;
  structuredData?: Record<string, unknown>;
  children?: React.ReactNode;
}

const getMetadataImageUrl = (image: unknown): string | undefined => {
  if (!image) return undefined;
  if (typeof image === 'string') return image;
  if (image instanceof URL) return image.toString();
  if (typeof image === 'object' && image !== null) {
    const imgObj = image as { url?: string | URL };
    if (imgObj.url) {
      return imgObj.url instanceof URL ? imgObj.url.toString() : imgObj.url;
    }
  }
  return undefined;
};

export const SEO: React.FC<SEOProps> = ({
  title,
  description,
  keywords,
  image,
  noIndex = false,
  suffix,
  structuredData,
  children,
}) => {
  const pathname = usePathname();
  const { generateMetadata } = useMetadata();
  const { measureUserInteraction } = usePerformance();

  // Generate metadata and apply it
  const seoMetadata = generateMetadata({
    title,
    description,
    keywords,
    image,
    noIndex,
    suffix,
  });

  useEffect(() => {
    // Track page view
    void trackPageView(pathname);

    // Measure user interactions
    const cleanup = measureUserInteraction('page-view');

    return () => {
      cleanup();
    };
  }, [pathname, measureUserInteraction]);

  // Safely get images from metadata
  const ogImages = seoMetadata.openGraph?.images;
  const twitterImages = seoMetadata.twitter?.images;

  // Get the first image if it exists
  const ogImage = Array.isArray(ogImages) ? ogImages[0] : ogImages;
  const twitterImage = Array.isArray(twitterImages) ? twitterImages[0] : twitterImages;

  // Get image URLs
  const ogImageUrl = getMetadataImageUrl(ogImage);
  const twitterImageUrl = getMetadataImageUrl(twitterImage);

  return (
    <>
      <Head>
        <title>{typeof seoMetadata.title === 'string' ? seoMetadata.title : 'SolveJet'}</title>

        {description && <meta name="description" content={description} />}

        {keywords && keywords.length > 0 && <meta name="keywords" content={keywords.join(', ')} />}

        {/* OpenGraph tags */}
        {typeof seoMetadata.openGraph?.title === 'string' && (
          <meta property="og:title" content={seoMetadata.openGraph.title} />
        )}

        {typeof seoMetadata.openGraph?.description === 'string' && (
          <meta property="og:description" content={seoMetadata.openGraph.description} />
        )}

        {/* Handle OG image */}
        {ogImageUrl && <meta property="og:image" content={ogImageUrl} />}

        {/* Twitter tags */}
        <meta name="twitter:card" content="summary_large_image" />

        {typeof seoMetadata.twitter?.title === 'string' && (
          <meta name="twitter:title" content={seoMetadata.twitter.title} />
        )}

        {typeof seoMetadata.twitter?.description === 'string' && (
          <meta name="twitter:description" content={seoMetadata.twitter.description} />
        )}

        {/* Handle Twitter image */}
        {twitterImageUrl && <meta name="twitter:image" content={twitterImageUrl} />}

        {/* Robots meta */}
        <meta name="robots" content={noIndex ? 'noindex,nofollow' : 'index,follow'} />

        {/* Resource Hints */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
      </Head>

      {/* Structured Data */}
      {structuredData && (
        <Script
          id="structured-data"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
      )}

      {children}
    </>
  );
};

// HOC for pages that need SEO
export const withSEO = <P extends object>(
  WrappedComponent: React.ComponentType<P>,
  seoProps: Omit<SEOProps, 'children'>
): React.FC<P> => {
  return function WithSEO(props: P) {
    return (
      <SEO {...seoProps}>
        <WrappedComponent {...props} />
      </SEO>
    );
  };
};
