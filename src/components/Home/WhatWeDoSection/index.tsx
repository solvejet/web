// src/components/Home/WhatWeDoSection/index.tsx
'use client';

import { useRef } from 'react';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { Code, Cloud, Brain, Globe, Smartphone, Blocks } from 'lucide-react';

// Define our services directly to ensure data availability
const services = [
  {
    title: 'Custom Software Development',
    description: 'Tailored solutions built to address your unique business challenges',
    icon: Code,
    href: '/services/custom-software',
  },
  {
    title: 'Web Development',
    description: 'Modern web applications built with cutting-edge technologies',
    icon: Globe,
    href: '/services/web-development',
  },
  {
    title: 'AI/ML Solutions',
    description: 'Intelligent solutions powered by advanced AI and machine learning',
    icon: Brain,
    href: '/services/ai-ml',
  },
  {
    title: 'Cloud Services',
    description: 'Scalable cloud solutions for modern business needs',
    icon: Cloud,
    href: '/services/cloud',
  },
  {
    title: 'Mobile App Development',
    description: 'Native and cross-platform mobile applications',
    icon: Smartphone,
    href: '/services/mobile',
  },
  {
    title: 'Blockchain Development',
    description: 'Secure and innovative blockchain solutions',
    icon: Blocks,
    href: '/services/blockchain',
  },
];

interface ServiceCardProps {
  title: string;
  description: string;
  icon: typeof Code;
  href: string;
}

const ServiceCard = ({ title, description, icon: Icon, href }: ServiceCardProps) => {
  return (
    <Link
      href={href}
      className={cn(
        'service-card group relative block overflow-hidden',
        'rounded-lg border border-border/40 bg-background/50',
        'transition duration-300 ease-out',
        'hover:border-accent/20 hover:bg-accent/[0.02] hover:shadow-lg'
      )}
    >
      <div className="p-6">
        {/* Icon */}
        <div
          className={cn(
            'mb-4 inline-flex rounded-lg p-3',
            'bg-accent/5',
            'transition-transform duration-300 ease-out',
            'group-hover:scale-105'
          )}
        >
          <Icon className="h-6 w-6" />
        </div>

        {/* Content */}
        <div className="transition-transform duration-300 ease-out group-hover:translate-y-[-2px]">
          <h3 className="mb-2 text-lg font-semibold">{title}</h3>
          <p className="text-muted-foreground">{description}</p>
        </div>

        {/* Learn More */}
        <div
          className={cn(
            'mt-4 flex items-center gap-2 text-sm font-medium',
            'transform opacity-0 transition duration-300 ease-out',
            'group-hover:translate-x-0 group-hover:opacity-100'
          )}
        >
          Learn more
          <svg
            className={cn(
              'h-4 w-4 transform transition-transform duration-300',
              'group-hover:translate-x-1'
            )}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 8l4 4m0 0l-4 4m4-4H3"
            />
          </svg>
        </div>
      </div>
    </Link>
  );
};

const WhatWeDoSection = () => {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-gradient-to-b from-background to-accent/[0.02] px-4 py-24 lg:py-32"
      aria-labelledby="what-we-do-title"
    >
      {/* Background Accent */}
      <div
        className="pointer-events-none absolute inset-0 opacity-30"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, var(--border) 1px, transparent 0)`,
          backgroundSize: '48px 48px',
        }}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center">
          <h2
            id="what-we-do-title"
            className="section-heading mb-6 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl"
          >
            {['We', 'Transform', 'Ideas', 'Into', 'Reality'].map((word, i) => (
              <span key={i} className="mx-1 inline-block">
                {word}
              </span>
            ))}
          </h2>
          <p className="text-base text-muted-foreground sm:text-lg">
            We combine innovation with expertise to create solutions that drive your business
            forward. Our comprehensive suite of services ensures your success in the digital
            landscape.
          </p>
        </div>

        {/* Services Grid */}
        <div
          className={cn(
            'services-grid mt-16',
            'grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3'
          )}
        >
          {services.map((service) => (
            <ServiceCard key={service.title} {...service} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhatWeDoSection;
