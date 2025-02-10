// src/app/what-we-do/page.tsx
import type { Metadata } from 'next';
import { Suspense } from 'react';
import dynamic from 'next/dynamic';
import { SEO } from '@/components/seo';
import {
  WhatWeDoHeroLoading,
  WhatWeDoServicesLoading,
  WhatWeDoProcessLoading,
  FAQSectionLoading,
} from '@/components/loading/what-we-do-loading';

// Dynamic imports
const HeroSection = dynamic(() => import('@/components/WhatWeDo/HeroSection'), {
  loading: () => <WhatWeDoHeroLoading />,
});

const ServicesSection = dynamic(() => import('@/components/WhatWeDo/ServicesSection'), {
  loading: () => <WhatWeDoServicesLoading />,
});

const ProcessSection = dynamic(() => import('@/components/WhatWeDo/ProcessSection'), {
  loading: () => <WhatWeDoProcessLoading />,
});

const FAQSection = dynamic(() => import('@/components/WhatWeDo/FAQSection'), {
  loading: () => <FAQSectionLoading />,
});

export const metadata: Metadata = {
  title: 'Our Services - Custom Software Development & Digital Solutions',
  description:
    'Explore our comprehensive range of software development services, from custom application development to digital transformation solutions.',
  openGraph: {
    title: 'Our Services - Custom Software Development & Digital Solutions | SolveJet',
    description:
      'Discover how our software development expertise can transform your business. Custom solutions, digital transformation, and more.',
    url: '/what-we-do',
  },
};

export default function WhatWeDoPage() {
  return (
    <>
      <SEO
        title="Our Services - Custom Software Development & Digital Solutions"
        description="Explore our comprehensive range of software development services, from custom application development to digital transformation solutions."
      />

      <main className="flex flex-col">
        <Suspense fallback={<WhatWeDoHeroLoading />}>
          <HeroSection />
        </Suspense>

        <Suspense fallback={<WhatWeDoServicesLoading />}>
          <ServicesSection />
        </Suspense>

        <Suspense fallback={<WhatWeDoProcessLoading />}>
          <ProcessSection />
        </Suspense>

        <Suspense fallback={<FAQSectionLoading />}>
          <FAQSection />
        </Suspense>
      </main>
    </>
  );
}
