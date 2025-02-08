// src/app/page.tsx
import { Suspense } from 'react';
import dynamic from 'next/dynamic';
import type { Metadata } from 'next';

// Loading components
const HeroSectionLoading = () => (
  <div className="animate-pulse">
    <div className="h-[600px] bg-accent/5" />
  </div>
);

const WhatWeDoSectionLoading = () => (
  <div className="animate-pulse">
    <div className="h-[400px] bg-accent/5" />
  </div>
);

const FeaturedProjectsLoading = () => (
  <div className="animate-pulse">
    <div className="h-[400px] bg-accent/5" />
  </div>
);

// Dynamic imports
const HeroSection = dynamic(() => import('@/components/Home/HeroSection'), {
  ssr: true,
  loading: () => <HeroSectionLoading />,
});

const WhatWeDoSection = dynamic(() => import('@/components/Home/WhatWeDoSection'), {
  ssr: true,
  loading: () => <WhatWeDoSectionLoading />,
});

const FeaturedProjects = dynamic(() => import('@/components/Home/FeaturedProjects'), {
  ssr: true,
  loading: () => <FeaturedProjectsLoading />,
});

export const metadata: Metadata = {
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
    title: 'SolveJet - Product-driven Software Development Company',
    description:
      'Transform your business with our innovative software solutions. We specialize in custom software development, digital transformation, and product development.',
    type: 'website',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'SolveJet - Product-driven Software Development Company',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SolveJet - Product-driven Software Development Company',
    description:
      'Transform your business with our innovative software solutions. We specialize in custom software development, digital transformation, and product development.',
    images: ['/twitter-image.png'],
  },
};

export default function HomePage() {
  return (
    <>
      <Suspense fallback={<HeroSectionLoading />}>
        <HeroSection />
      </Suspense>

      <Suspense fallback={<WhatWeDoSectionLoading />}>
        <WhatWeDoSection />
      </Suspense>

      <Suspense fallback={<FeaturedProjectsLoading />}>
        <FeaturedProjects />
      </Suspense>
      {/* Add other sections here as needed */}
    </>
  );
}
