// src/app/page.tsx
import { Suspense } from 'react';
import dynamic from 'next/dynamic';
import type { Metadata } from 'next';
import {
  HeroSectionLoading,
  WhatWeDoSectionLoading,
  FeaturedProjectsLoading,
  IndustriesSectionLoading,
  AchievementsSectionLoading,
  TechnologiesSectionLoading,
} from '@/components/loading/section-loading';

// Dynamic imports with proper loading states
const HeroSection = dynamic(() => import('@/components/Home/HeroSection/index'), {
  loading: () => <HeroSectionLoading />,
});

const WhatWeDoSection = dynamic(() => import('@/components/Home/WhatWeDoSection/index'), {
  loading: () => <WhatWeDoSectionLoading />,
});

const FeaturedProjects = dynamic(() => import('@/components/Home/FeaturedProjects/index'), {
  loading: () => <FeaturedProjectsLoading />,
});

const IndustriesSection = dynamic(() => import('@/components/Home/IndustriesSection/index'), {
  loading: () => <IndustriesSectionLoading />,
});

const AchievementsSection = dynamic(() => import('@/components/Home/AchievementsSection/index'), {
  loading: () => <AchievementsSectionLoading />,
});

const TechnologiesSection = dynamic(() => import('@/components/Home/TechnologiesSection/index'), {
  loading: () => <TechnologiesSectionLoading />,
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env['NEXT_PUBLIC_APP_URL'] || 'http://localhost:3000'),
  title: 'SolveJet - Product-driven Software Development Company',
  description:
    'Transform your business with our innovative software solutions. We specialize in custom software development, digital transformation, and product development.',
  keywords: [
    'software development',
    'digital transformation',
    'custom software',
    'product development',
    'web development',
    'mobile development',
  ],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
    title: 'SolveJet - Product-driven Software Development Company',
    description:
      'Transform your business with our innovative software solutions. We specialize in custom software development, digital transformation, and product development.',
    siteName: 'SolveJet',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'SolveJet - Product-driven Software Development Company',
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SolveJet - Product-driven Software Development Company',
    description:
      'Transform your business with our innovative software solutions. We specialize in custom software development, digital transformation, and product development.',
    images: [
      {
        url: '/twitter-image.png',
        alt: 'SolveJet - Product-driven Software Development',
      },
    ],
    creator: '@solvejet',
    site: '@solvejet',
  },
  robots: {
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

export default function HomePage() {
  return (
    <main className="flex flex-col">
      <Suspense fallback={<HeroSectionLoading />}>
        <HeroSection />
      </Suspense>

      <Suspense fallback={<WhatWeDoSectionLoading />}>
        <WhatWeDoSection />
      </Suspense>

      <Suspense fallback={<FeaturedProjectsLoading />}>
        <FeaturedProjects />
      </Suspense>

      <Suspense fallback={<IndustriesSectionLoading />}>
        <IndustriesSection />
      </Suspense>

      <Suspense fallback={<AchievementsSectionLoading />}>
        <AchievementsSection />
      </Suspense>

      <Suspense fallback={<TechnologiesSectionLoading />}>
        <TechnologiesSection />
      </Suspense>
    </main>
  );
}
