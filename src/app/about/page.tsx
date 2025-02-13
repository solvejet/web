// src/app/about/page.tsx
import { Suspense } from 'react';
import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import { SEO } from '@/components/seo';

// Dynamic imports
const HeroSection = dynamic(() => import('@/components/About/HeroSection'));
const CoreValuesSection = dynamic(() => import('@/components/About/CoreValuesSection'));
const CultureSection = dynamic(() => import('@/components/About/CultureSection'));
const GlobalPresenceSection = dynamic(() => import('@/components/About/GlobalPresenceSection'));
const TechnologyExpertiseSection = dynamic(
  () => import('@/components/About/TechnologyExpertiseSection')
);
const CSRSection = dynamic(() => import('@/components/About/CSRSection'));
const JoinTeamSection = dynamic(() => import('@/components/About/JoinTeamSection'));

export const metadata: Metadata = {
  title: 'About SolveJet - Our Mission, Values & Culture',
  description:
    "Learn about SolveJet's mission, core values, and company culture. Discover how we're transforming businesses through innovative software solutions.",
  openGraph: {
    title: 'About SolveJet - Leading Software Development Company',
    description:
      'Discover our journey, values, and commitment to excellence in software development.',
    url: '/about',
    type: 'website',
    images: [
      {
        url: '/og/about.png',
        width: 1200,
        height: 630,
        alt: 'About SolveJet',
      },
    ],
  },
};

export default function AboutPage() {
  return (
    <>
      <SEO
        title="About SolveJet - Our Mission, Values & Culture"
        description="Learn about SolveJet's mission, core values, and company culture. Discover how we're transforming businesses through innovative software solutions."
        keywords={[
          'software company',
          'company culture',
          'tech expertise',
          'global presence',
          'sustainability',
          'career opportunities',
        ]}
      />

      <main className="flex flex-col">
        <Suspense fallback={null}>
          <HeroSection />
        </Suspense>

        <Suspense fallback={null}>
          <CoreValuesSection />
        </Suspense>

        <Suspense fallback={null}>
          <CultureSection />
        </Suspense>

        <Suspense fallback={null}>
          <GlobalPresenceSection />
        </Suspense>

        <Suspense fallback={null}>
          <TechnologyExpertiseSection />
        </Suspense>

        <Suspense fallback={null}>
          <CSRSection />
        </Suspense>

        <Suspense fallback={null}>
          <JoinTeamSection />
        </Suspense>
      </main>
    </>
  );
}
