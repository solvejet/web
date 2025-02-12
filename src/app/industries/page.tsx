// src/app/industries/page.tsx
import { Suspense } from 'react';
import type { Metadata } from 'next';
import { SEO } from '@/components/seo';
import dynamic from 'next/dynamic';
import {
  HeroSectionLoading,
  FeaturedIndustriesLoading,
  BenefitsSectionLoading,
  SolutionsSectionLoading,
  TechnologyStackLoading,
  ProcessSectionLoading,
  FAQSectionLoading,
} from '@/components/loading/industries-loading';

// Dynamic imports
const HeroSection = dynamic(() => import('@/components/Industries/HeroSection'), {
  loading: () => <HeroSectionLoading />,
});

const FeaturedIndustries = dynamic(() => import('@/components/Industries/FeaturedIndustries'), {
  loading: () => <FeaturedIndustriesLoading />,
});

const BenefitsSection = dynamic(() => import('@/components/Industries/BenefitsSection'), {
  loading: () => <BenefitsSectionLoading />,
});

const SolutionsSection = dynamic(() => import('@/components/Industries/SolutionsSection'), {
  loading: () => <SolutionsSectionLoading />,
});

const TechnologyStack = dynamic(() => import('@/components/Industries/TechnologyStack'), {
  loading: () => <TechnologyStackLoading />,
});

const ProcessSection = dynamic(() => import('@/components/Industries/ProcessSection'), {
  loading: () => <ProcessSectionLoading />,
});

const FAQSection = dynamic(() => import('@/components/Industries/FAQSection'), {
  loading: () => <FAQSectionLoading />,
});

export const metadata: Metadata = {
  title: 'Industry Solutions - Digital Transformation Across Sectors',
  description:
    'Explore our industry-specific software solutions and digital transformation services across various sectors. Custom solutions for your industry challenges.',
  openGraph: {
    title: 'Industry Solutions | SolveJet',
    description:
      'Industry-specific digital solutions for modern businesses. Transform your sector with innovative technology.',
    url: '/industries',
    type: 'website',
    images: [
      {
        url: '/og/industries.png',
        width: 1200,
        height: 630,
        alt: 'Industry Solutions',
      },
    ],
  },
};

export default function IndustriesPage() {
  return (
    <>
      <SEO
        title="Industry Solutions - Digital Transformation Across Sectors"
        description="Explore our industry-specific software solutions and digital transformation services across various sectors. Custom solutions for your industry challenges."
        keywords={[
          'industry solutions',
          'sector-specific software',
          'digital transformation',
          'enterprise solutions',
          'industry expertise',
          'business technology',
        ]}
      />

      <main className="flex flex-col">
        <Suspense fallback={<HeroSectionLoading />}>
          <HeroSection />
        </Suspense>

        <Suspense fallback={<FeaturedIndustriesLoading />}>
          <FeaturedIndustries />
        </Suspense>

        <Suspense fallback={<BenefitsSectionLoading />}>
          <BenefitsSection />
        </Suspense>

        <Suspense fallback={<SolutionsSectionLoading />}>
          <SolutionsSection />
        </Suspense>

        <Suspense fallback={<TechnologyStackLoading />}>
          <TechnologyStack />
        </Suspense>

        <Suspense fallback={<ProcessSectionLoading />}>
          <ProcessSection />
        </Suspense>

        <Suspense fallback={<FAQSectionLoading />}>
          <FAQSection />
        </Suspense>
      </main>
    </>
  );
}
