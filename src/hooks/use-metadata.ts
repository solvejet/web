// src/hooks/use-metadata.ts
import { useCallback } from 'react';
import type { Metadata } from 'next';

interface MetadataOptions {
  title?: string | undefined;
  description?: string | undefined;
  keywords?: string[] | undefined;
  image?: string | undefined;
  noIndex?: boolean | undefined;
  suffix?: string | undefined;
}

export const useMetadata = () => {
  const generateMetadata = useCallback((options: MetadataOptions): Metadata => {
    const {
      title,
      description,
      keywords = [],
      image,
      noIndex = false,
      suffix = '| SolveJet',
    } = options;

    const finalTitle = title ? `${title} ${suffix}` : 'SolveJet - ISO certified Custom Software Development Company';
    const siteUrl = process.env['NEXT_PUBLIC_APP_URL'] || 'http://localhost:3000';
    const imageUrl = image ? `${siteUrl}${image}` : `${siteUrl}/og-image.png`;

    const metadata: Metadata = {
      title: finalTitle,
      description: description,
      keywords: [...(keywords || []), 'Next.js', 'React', 'JavaScript', 'TypeScript'],
      openGraph: {
        type: 'website',
        locale: 'en_US',
        url: siteUrl,
        title: finalTitle,
        description: description,
        images: [
          {
            url: imageUrl,
            width: 1200,
            height: 630,
            alt: finalTitle,
          } as const,
        ],
        siteName: 'SolveJet',
      } satisfies Metadata['openGraph'],
      twitter: {
        title: finalTitle,
        description: description,
        images: [imageUrl],
        creator: '@karansxa',
        card: 'summary_large_image',
      },
      robots: noIndex
        ? {
            index: false,
            follow: false,
          }
        : {
            index: true,
            follow: true,
            googleBot: {
              index: true,
              follow: true,
              'max-video-preview': -1,
              'max-image-preview': 'large',
              'max-snippet': -1,
            },
          },
    };

    if (siteUrl) {
      metadata.metadataBase = new URL(siteUrl);
    }

    return metadata;
  }, []);

  return { generateMetadata };
};
