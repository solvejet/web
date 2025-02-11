// src/app/what-we-do/web-development/page.tsx
import { Suspense } from 'react';
import type { Metadata } from 'next';
import { SEO } from '@/components/seo';
import { FAQLoading, ServiceHeroLoading, ServicesLoading } from '@/components/loading/service-loading';
import WebDevHero from '@/components/ServiceDetails/WebDevelopment/HeroSection';
import dynamic from 'next/dynamic';
import WhyChooseSection from '@/components/ServiceDetails/SharedSections/WhyChooseSection';
import WebDevFAQSection from '@/components/ServiceDetails/WebDevelopment/FAQSection';

const WebServicesSection = dynamic(
  () => import('@/components/ServiceDetails/WebDevelopment/ServicesSection'),
  {
    ssr: true,
  }
);

const ProcessSection = dynamic(
  () => import('@/components/ServiceDetails/SharedSections/ProcessSection'),
  {
    ssr: true,
  }
);

const IndustriesSection = dynamic(
  () => import('@/components/ServiceDetails/SharedSections/IndustriesSection'),
  {
    ssr: true,
  }
);

const TechnologySection = dynamic(
  () => import('@/components/ServiceDetails/SharedSections/TechnologySection'),
  {
    ssr: true,
  }
);

export const metadata: Metadata = {
  title: 'Web Development Services - Modern Solutions for Digital Success',
  description:
    'Transform your digital presence with our expert web development services. We create scalable, secure, and high-performance web applications.',
  openGraph: {
    title: 'Web Development Services | SolveJet',
    description:
      'Custom web development solutions for modern businesses. Create powerful, scalable web applications with cutting-edge technologies.',
    url: '/what-we-do/web-development',
    type: 'website',
    images: [
      {
        url: '/og/web-development.png',
        width: 1200,
        height: 630,
        alt: 'Web Development Services',
      },
    ],
  },
  alternates: {
    canonical: '/what-we-do/web-development',
  },
};

export default function WebDevelopmentPage() {
  return (
    <>
      <SEO
        title="Web Development Services - Modern Solutions for Digital Success"
        description="Transform your digital presence with our expert web development services. We create scalable, secure, and high-performance web applications."
        keywords={[
          'web development',
          'custom web applications',
          'frontend development',
          'backend development',
          'full stack development',
          'React development',
          'Next.js development',
        ]}
      />

      <main className="flex flex-col">
        <Suspense fallback={<ServiceHeroLoading />}>
          <WebDevHero />
        </Suspense>

        <WhyChooseSection />

        <ProcessSection />

        <Suspense fallback={<ServicesLoading />}>
          <WebServicesSection />
        </Suspense>

        <IndustriesSection />

        <TechnologySection
          title="Our Technology Stack"
          subtitle="We use cutting-edge technologies to build robust web applications"
          selectedCategories={['frontend', 'backend', 'database', 'cloud']}
        />

        <Suspense fallback={<FAQLoading />}>
          <WebDevFAQSection />
        </Suspense>
      </main>
    </>
  );
}
