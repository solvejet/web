// src/app/page.tsx
import WhatWeDoSection from '@/components/Home/WhatWeDoSection';
import type { Metadata } from 'next';
import dynamic from 'next/dynamic';

// Dynamic import for the hero section with loading fallback
const HeroSection = dynamic(() => import('@/components/Home/HeroSection'), {
  ssr: true,
  loading: () => (
    <div className="animate-pulse">
      <div className="h-[600px] bg-accent/5" />
    </div>
  ),
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
      <HeroSection />
      <WhatWeDoSection />
      {/* Add other sections here as needed */}
    </>
  );
}
