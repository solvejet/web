// src/app/what-we-do/mobile/page.tsx
import { Suspense } from 'react';
import { SEO } from '@/components/seo';
import {
  FAQLoading,
  ServiceHeroLoading,
  ServicesLoading,
} from '@/components/loading/service-loading';
import dynamic from 'next/dynamic';

// Dynamic imports with loading states
const MobileHero = dynamic(
  () => import('@/components/ServiceDetails/MobileDevelopment/HeroSection'),
  {
    ssr: true,
    loading: () => <ServiceHeroLoading />,
  }
);

const MobileServicesSection = dynamic(
  () => import('@/components/ServiceDetails/MobileDevelopment/ServicesSection'),
  {
    ssr: true,
    loading: () => <ServicesLoading />,
  }
);

const ProcessSection = dynamic(
  () => import('@/components/ServiceDetails/SharedSections/ProcessSection'),
  {
    ssr: true,
  }
);

const WhyChooseSection = dynamic(
  () => import('@/components/ServiceDetails/SharedSections/WhyChooseSection'),
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

const MobileFAQSection = dynamic(
  () => import('@/components/ServiceDetails/MobileDevelopment/FAQSection'),
  {
    ssr: true,
    loading: () => <FAQLoading />,
  }
);

export default function MobileDevelopmentPage() {
  // Structured data for SEO
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Mobile App Development Services',
    description:
      'Professional mobile application development services for iOS and Android platforms, including native and cross-platform solutions.',
    provider: {
      '@type': 'Organization',
      name: 'SolveJet',
      url: process.env['NEXT_PUBLIC_APP_URL'],
    },
    areaServed: 'Worldwide',
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Mobile Development Services',
      itemListElement: [
        {
          '@type': 'Offer',
          name: 'iOS App Development',
          description: 'Native iOS applications using Swift and SwiftUI',
        },
        {
          '@type': 'Offer',
          name: 'Android App Development',
          description: 'Native Android applications using Kotlin and Jetpack Compose',
        },
        {
          '@type': 'Offer',
          name: 'Cross-Platform Development',
          description: 'Multi-platform applications using React Native and Flutter',
        },
        {
          '@type': 'Offer',
          name: 'Enterprise Mobile Solutions',
          description: 'Secure and scalable enterprise mobile applications',
        },
      ],
    },
  };

  return (
    <>
      <SEO
        title="Mobile App Development Services - Native & Cross-Platform Solutions"
        description="Transform your business with powerful mobile applications. We create engaging, high-performance apps for iOS, Android, and cross-platform deployment using cutting-edge technologies."
        keywords={[
          'mobile app development',
          'iOS development',
          'Android development',
          'React Native',
          'Flutter',
          'native mobile apps',
          'cross-platform apps',
          'enterprise mobile solutions',
          'app store optimization',
          'mobile UI/UX design',
          'Swift development',
          'Kotlin development',
        ]}
        image="/og/mobile-development.png"
        structuredData={structuredData}
        suffix="SolveJet"
      />

      <main className="flex flex-col">
        <Suspense fallback={<ServiceHeroLoading />}>
          <MobileHero />
        </Suspense>

        <WhyChooseSection />

        <ProcessSection />

        <Suspense fallback={<ServicesLoading />}>
          <MobileServicesSection />
        </Suspense>

        <IndustriesSection
          title="Industries We Serve"
          subtitle="Mobile solutions across diverse sectors"
        />

        <TechnologySection
          title="Mobile Development Stack"
          subtitle="Cutting-edge technologies for robust mobile applications"
          selectedCategories={['mobile', 'backend', 'database', 'cloud']}
        />

        <Suspense fallback={<FAQLoading />}>
          <MobileFAQSection />
        </Suspense>
      </main>
    </>
  );
}
