// src/components/IndustryDetail/IndustryContent.tsx
'use client';

import { Suspense, useMemo } from 'react';
import dynamic from 'next/dynamic';
import {
  Code2,
  Server,
  Database,
  Cloud,
  Globe,
  Users,
  Building2,
  Shield,
  Rocket,
  BarChart,
  Cpu,
  Factory,
  ShoppingBag,
  Truck,
  PlaneTakeoff,
  Waypoints,
  ShieldCheck,
  BarChart3,
  Users2,
  type LucideIcon,
} from 'lucide-react';
import { SEO } from '@/components/seo';
import {
  DetailHeroLoading,
  DetailSolutionsLoading,
  DetailTechStackLoading,
  DetailBenefitsLoading,
  DetailProcessLoading,
  DetailFAQLoading,
} from './loading';
import type { IndustryContentProps, IconName, IndustryDetailProps } from '@/types/industry';
import { ErrorBoundary } from '../ErrorBoundary';

// Dynamic imports for all sections
const HeroSection = dynamic(() => import('./HeroSection'), {
  loading: () => <DetailHeroLoading />,
});

const SolutionsSection = dynamic(() => import('./SolutionsSection'), {
  loading: () => <DetailSolutionsLoading />,
});

const TechnologyStack = dynamic(() => import('./TechnologyStack'), {
  loading: () => <DetailTechStackLoading />,
});

const BenefitsSection = dynamic(() => import('./BenefitsSection'), {
  loading: () => <DetailBenefitsLoading />,
});

const ProcessSection = dynamic(() => import('./ProcessSection'), {
  loading: () => <DetailProcessLoading />,
});

const FAQSection = dynamic(() => import('./FAQSection'), {
  loading: () => <DetailFAQLoading />,
});

// Map of icon names to components
const IconMap: Record<IconName, LucideIcon> = {
  Code2,
  Server,
  Database,
  Cloud,
  Globe,
  Users,
  Building2,
  Shield,
  Rocket,
  BarChart,
  Cpu,
  Factory,
  ShoppingBag,
  Truck,
  PlaneTakeoff,
  Waypoints,
  ShieldCheck,
  BarChart3: BarChart3,
  Users2: Users2,
};

export default function IndustryContent({
  title,
  description,
  icon,
  stats,
  solutions,
  technologies,
  gradient,
  caseStudyStats,
}: IndustryContentProps) {
  // Memoize the industryData to prevent unnecessary recalculations
  const industryData = useMemo<IndustryDetailProps>(() => {
    const IconComponent = IconMap[icon] || Building2;

    return {
      title,
      description,
      icon: IconComponent,
      stats,
      solutions: solutions.map((solution) => ({
        ...solution,
        icon: IconMap[solution.icon] || Building2,
      })),
      technologies,
      gradient,
      ...(caseStudyStats && { caseStudyStats }),
    };
  }, [title, description, icon, stats, solutions, technologies, gradient, caseStudyStats]);

  // If any required data is missing, render nothing
  if (!title || !description || !solutions || !technologies) {
    return null;
  }

  return (
    <>
      <SEO
        title={`${title} Solutions & Services`}
        description={description}
        keywords={[
          `${title.toLowerCase()} solutions`,
          'digital transformation',
          'software development',
          'technology solutions',
          ...technologies.flatMap((tech) => tech.items),
        ]}
      />

      <div className="flex flex-col">
        {/* Hero Section */}
        <Suspense fallback={<DetailHeroLoading />}>
          <HeroSection industry={industryData} />
        </Suspense>

        {/* Solutions Section */}
        <Suspense fallback={<DetailSolutionsLoading />}>
          <SolutionsSection industry={industryData} />
        </Suspense>

        {/* Technology Stack */}
        <Suspense fallback={<DetailTechStackLoading />}>
          <TechnologyStack industry={industryData} />
        </Suspense>

        {/* Benefits Section */}
        <Suspense fallback={<DetailBenefitsLoading />}>
          <BenefitsSection industry={industryData} />
        </Suspense>

        {/* Process Section */}
        <Suspense fallback={<DetailProcessLoading />}>
          <ProcessSection industry={industryData} />
        </Suspense>

        {/* FAQ Section */}
        <Suspense fallback={<DetailFAQLoading />}>
          <FAQSection industry={industryData} />
        </Suspense>
      </div>
    </>
  );
}

// Error boundary for the entire industry content
export function IndustryContentErrorBoundary(
  props: React.PropsWithChildren<{ fallback: React.ReactNode }>
) {
  return (
    <ErrorBoundary
      fallback={
        <div className="container mx-auto px-4 py-16 text-center">
          <h2 className="text-2xl font-bold">Something went wrong</h2>
          <p className="mt-4 text-muted-foreground">
            We apologize for the inconvenience. Please try refreshing the page.
          </p>
        </div>
      }
    >
      {props.children}
    </ErrorBoundary>
  );
}
