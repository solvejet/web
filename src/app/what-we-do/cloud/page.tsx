// src/app/what-we-do/cloud/page.tsx
import { Suspense } from 'react';
import type { Metadata } from 'next';
import { SEO } from '@/components/seo';
import {
  FAQLoading,
  ServiceHeroLoading,
  ServicesLoading,
} from '@/components/loading/service-loading';
import dynamic from 'next/dynamic';

// Dynamic imports for cloud-specific components
const CloudHeroSection = dynamic(
  () => import('@/components/ServiceDetails/CloudServices/HeroSection'),
  {
    loading: () => <ServiceHeroLoading />,
  }
);

const CloudServicesSection = dynamic(
  () => import('@/components/ServiceDetails/CloudServices/ServicesSection'),
  {
    loading: () => <ServicesLoading />,
  }
);

const CloudFAQSection = dynamic(
  () => import('@/components/ServiceDetails/CloudServices/FAQSection'),
  {
    loading: () => <FAQLoading />,
  }
);

// Dynamic imports for shared components
const WhyChooseSection = dynamic(
  () => import('@/components/ServiceDetails/SharedSections/WhyChooseSection'),
  {
    loading: () => <div className="py-24 text-center">Loading Why Choose Section...</div>,
  }
);

const ProcessSection = dynamic(
  () => import('@/components/ServiceDetails/SharedSections/ProcessSection'),
  {
    loading: () => <div className="py-24 text-center">Loading Process Section...</div>,
  }
);

const IndustriesSection = dynamic(
  () => import('@/components/ServiceDetails/SharedSections/IndustriesSection'),
  {
    loading: () => <div className="py-24 text-center">Loading Industries Section...</div>,
  }
);

const TechnologySection = dynamic(
  () => import('@/components/ServiceDetails/SharedSections/TechnologySection'),
  {
    loading: () => <div className="py-24 text-center">Loading Technology Section...</div>,
  }
);

export const metadata: Metadata = {
  title: 'Cloud Services - Enterprise Solutions for Digital Excellence',
  description:
    'Transform your business with our enterprise-grade cloud solutions. We provide secure, scalable, and efficient cloud services for modern businesses.',
  keywords: [
    'cloud services',
    'cloud computing',
    'cloud migration',
    'cloud security',
    'aws services',
    'azure solutions',
    'google cloud',
    'cloud infrastructure',
    'cloud management',
    'enterprise cloud',
    'cloud optimization',
    'hybrid cloud',
  ],
  openGraph: {
    title: 'Cloud Services | SolveJet',
    description:
      'Enterprise-grade cloud solutions for modern businesses. Secure, scalable, and efficient cloud services.',
    url: '/what-we-do/cloud',
    type: 'website',
    images: [
      {
        url: '/og/cloud-services.png',
        width: 1200,
        height: 630,
        alt: 'Cloud Services',
      },
    ],
  },
  alternates: {
    canonical: '/what-we-do/cloud',
  },
};

export default function CloudServicesPage() {
  // Structured data for SEO
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Cloud Services',
    description:
      'Enterprise-grade cloud solutions including infrastructure management, migration services, security implementation, and optimization.',
    provider: {
      '@type': 'Organization',
      name: 'SolveJet',
      url: process.env['NEXT_PUBLIC_APP_URL'],
    },
    areaServed: 'Worldwide',
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Cloud Services',
      itemListElement: [
        {
          '@type': 'Offer',
          name: 'Cloud Infrastructure',
          description: 'Scalable and reliable cloud infrastructure solutions',
        },
        {
          '@type': 'Offer',
          name: 'Cloud Migration',
          description: 'Seamless migration to cloud platforms',
        },
        {
          '@type': 'Offer',
          name: 'Cloud Security',
          description: 'Enterprise-grade cloud security solutions',
        },
        {
          '@type': 'Offer',
          name: 'Cloud Management',
          description: 'Ongoing cloud operations and optimization services',
        },
      ],
    },
  };

  return (
    <>
      <SEO
        title="Cloud Services - Enterprise Solutions for Digital Excellence"
        description="Transform your business with our enterprise-grade cloud solutions. We provide secure, scalable, and efficient cloud services for modern businesses."
        keywords={[
          'cloud services',
          'cloud computing',
          'cloud migration',
          'cloud security',
          'cloud infrastructure',
          'cloud management',
        ]}
        image="/og/cloud-services.png"
        structuredData={structuredData}
        suffix="SolveJet"
      />

      <main className="flex flex-col">
        <Suspense fallback={<ServiceHeroLoading />}>
          <CloudHeroSection />
        </Suspense>

        <WhyChooseSection />

        <ProcessSection />

        <Suspense fallback={<ServicesLoading />}>
          <CloudServicesSection />
        </Suspense>

        <IndustriesSection
          title="Industries We Serve"
          subtitle="Cloud solutions across diverse sectors"
        />

        <TechnologySection
          title="Cloud Technologies"
          subtitle="Leading cloud platforms and tools"
          selectedCategories={['cloud', 'database', 'frameworks', 'backend']}
        />

        <Suspense fallback={<FAQLoading />}>
          <CloudFAQSection />
        </Suspense>
      </main>
    </>
  );
}
