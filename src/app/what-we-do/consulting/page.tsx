// src/app/what-we-do/consulting/page.tsx
import dynamic from 'next/dynamic';
import type { Metadata } from 'next';
import { SEO } from '@/components/seo';
import { SectionWrapper } from '@/components/ServiceDetails/TechnologyConsulting/ConsultingClientWrapper';
import {
  FAQLoading,
  ServiceHeroLoading,
  ServicesLoading,
} from '@/components/loading/service-loading';

// Dynamic imports for consulting specific components
const ConsultingHeroSection = dynamic(
  () => import('@/components/ServiceDetails/TechnologyConsulting/HeroSection'),
  {
    loading: () => <ServiceHeroLoading />,
  }
);

const ConsultingServicesSection = dynamic(
  () => import('@/components/ServiceDetails/TechnologyConsulting/ServicesSection'),
  {
    loading: () => <ServicesLoading />,
  }
);

const ConsultingFAQSection = dynamic(
  () => import('@/components/ServiceDetails/TechnologyConsulting/FAQSection'),
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
  title: 'Technology Consulting Services - Strategic Digital Solutions',
  description:
    'Transform your business with our expert technology consulting services. We provide strategic insights and innovative solutions for digital transformation.',
  keywords: [
    'technology consulting',
    'digital transformation',
    'IT strategy',
    'enterprise architecture',
    'technology roadmap',
    'IT consulting',
    'digital strategy consulting',
    'cloud strategy',
    'business transformation',
    'technology advisory',
  ],
  openGraph: {
    title: 'Technology Consulting Services | SolveJet',
    description:
      'Partner with our expert consultants to navigate digital transformation, optimize operations, and drive innovation.',
    url: '/what-we-do/consulting',
    type: 'website',
    images: [
      {
        url: '/og/technology-consulting.png',
        width: 1200,
        height: 630,
        alt: 'Technology Consulting Services',
      },
    ],
  },
  alternates: {
    canonical: '/what-we-do/consulting',
  },
};

export default function TechnologyConsultingPage() {
  return (
    <>
      <SEO
        title="Technology Consulting Services - Strategic Digital Solutions"
        description="Transform your business with our expert technology consulting services. We provide strategic insights and innovative solutions for digital transformation."
        keywords={[
          'technology consulting',
          'digital transformation',
          'IT strategy',
          'enterprise architecture',
          'technology roadmap',
          'IT consulting',
          'digital strategy',
        ]}
      />

      <main className="flex flex-col">
        <div suppressHydrationWarning>
          {/* Hero Section */}
          <SectionWrapper loading={<ServiceHeroLoading />}>
            <ConsultingHeroSection />
          </SectionWrapper>

          {/* Why Choose Section */}
          <SectionWrapper
            loading={<div className="py-24 text-center">Loading Why Choose Section...</div>}
          >
            <WhyChooseSection />
          </SectionWrapper>

          {/* Process Section */}
          <SectionWrapper
            loading={<div className="py-24 text-center">Loading Process Section...</div>}
          >
            <ProcessSection />
          </SectionWrapper>

          {/* Services Section */}
          <SectionWrapper loading={<ServicesLoading />}>
            <ConsultingServicesSection />
          </SectionWrapper>

          {/* Industries Section */}
          <SectionWrapper
            loading={<div className="py-24 text-center">Loading Industries Section...</div>}
          >
            <IndustriesSection />
          </SectionWrapper>

          {/* Technology Section */}
          <SectionWrapper
            loading={<div className="py-24 text-center">Loading Technology Section...</div>}
          >
            <TechnologySection
              selectedCategories={['cloud', 'frameworks', 'database', 'ecommerce']}
            />
          </SectionWrapper>

          {/* FAQ Section */}
          <SectionWrapper loading={<FAQLoading />}>
            <ConsultingFAQSection />
          </SectionWrapper>
        </div>
      </main>
    </>
  );
}
