// src/components/Home/HeroSection/index.tsx
'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import useMediaQuery from '@/hooks/useMediaQuery';
import { ArrowUpRight, Code, Rocket, Shield, Users } from 'lucide-react';
import Button from '@/components/ui/Button';
import Link from 'next/link';
import type { Metadata } from 'next';

// Feature data for better code organization and maintainability
const features = [
  {
    icon: Code,
    title: 'Custom Development',
    description: 'Tailored solutions built specifically for your unique business needs',
  },
  {
    icon: Rocket,
    title: 'Rapid Deployment',
    description: 'Quick turnaround with our agile development methodology',
  },
  {
    icon: Shield,
    title: 'Enterprise Security',
    description: 'Bank-grade security with advanced encryption standards',
  },
  {
    icon: Users,
    title: 'Dedicated Support',
    description: 'Round-the-clock expert support for your peace of mind',
  },
] as const;

// Pre-defined animation settings for consistency
const ANIMATION_SETTINGS = {
  defaultEase: 'power2.out',
  staggerDelay: 0.1,
  duration: {
    orbs: 1,
    text: 0.6,
    buttons: 0.4,
    features: 0.5,
  },
} as const;

export const metadata: Metadata = {
  title: 'SolveJet - Custom Software Development Solutions',
  description:
    'From startup visions to enterprise solutions, we blend technical expertise with creative innovation.',
  keywords: [
    'software development',
    'custom solutions',
    'enterprise security',
    'digital transformation',
  ],
};

const HeroSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isMobile = useMediaQuery('(max-width: 768px)');

  useEffect(() => {
    // Only run animations if the section is mounted and visible
    if (!sectionRef.current || typeof window === 'undefined') return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: {
          ease: ANIMATION_SETTINGS.defaultEase,
          clearProps: 'transform,opacity', // Only clear necessary properties
        },
      });

      // Optimized animation sequence
      tl.fromTo(
        '.gradient-orb',
        {
          scale: 0.9,
          opacity: 0,
        },
        {
          scale: 1,
          opacity: 1,
          duration: ANIMATION_SETTINGS.duration.orbs,
          stagger: ANIMATION_SETTINGS.staggerDelay,
        }
      )
        .fromTo(
          '.hero-title .word',
          {
            y: 20,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: ANIMATION_SETTINGS.duration.text,
            stagger: ANIMATION_SETTINGS.staggerDelay,
          },
          '-=0.4'
        )
        .fromTo(
          '.hero-description',
          {
            y: 20,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: ANIMATION_SETTINGS.duration.text,
          },
          '-=0.2'
        )
        .fromTo(
          '.cta-button',
          {
            y: 10,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: ANIMATION_SETTINGS.duration.buttons,
            stagger: ANIMATION_SETTINGS.staggerDelay,
          },
          '-=0.2'
        )
        .fromTo(
          '.feature-card',
          {
            y: 20,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: ANIMATION_SETTINGS.duration.features,
            stagger: ANIMATION_SETTINGS.staggerDelay,
          },
          '-=0.2'
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[85vh] overflow-hidden px-4 pt-16"
      aria-label="Hero section"
    >
      {/* Background Elements - Reduced blur for better performance */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="gradient-orb absolute -left-20 top-20 h-72 w-72 rounded-full bg-gradient-to-r from-[#FF8BAE]/20 to-[#C400FF]/20 blur-2xl" />
        <div className="gradient-orb absolute right-10 top-40 h-64 w-64 rounded-full bg-gradient-to-r from-[#00E1FF]/20 to-[#0047FF]/20 blur-2xl" />
        <div className="gradient-orb absolute bottom-20 left-1/3 h-80 w-80 rounded-full bg-gradient-to-r from-[#FFB800]/20 to-[#FF5C00]/20 blur-2xl" />
      </div>

      {/* Grid Pattern Overlay - Using CSS mask for better performance */}
      <div
        className="absolute inset-0 opacity-[0.15] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, var(--border) 1px, transparent 0)',
          backgroundSize: '40px 40px',
          maskImage: 'linear-gradient(to bottom, black 80%, transparent)',
          WebkitMaskImage: 'linear-gradient(to bottom, black 80%, transparent)',
        }}
        aria-hidden="true"
      />

      {/* Main Content */}
      <div className="relative mx-auto max-w-6xl">
        <div className="hero-content text-center">
          {/* Semantic heading structure */}
          <h1 className="hero-title text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            {['Crafting', 'Digital', 'Excellence', 'with'].map((word, i) => (
              <span key={i} className="word mx-1 inline-block">
                {word}
              </span>
            ))}
            <span className="word block bg-gradient-to-r from-[#FF8BAE] to-[#0047FF] bg-clip-text text-transparent">
              Innovation & Precision
            </span>
          </h1>

          <p className="hero-description mx-auto mt-6 max-w-2xl text-base text-muted-foreground sm:text-lg">
            From startup visions to enterprise solutions, we blend technical expertise with creative
            innovation. Our mission is to engineer digital solutions that not just meet expectations
            but redefine them.
          </p>

          {/* CTA Buttons */}
          <div className="relative z-10 mt-8 flex flex-wrap items-center justify-center gap-4">
            <Button
              variant="primary"
              size={isMobile ? 'md' : 'lg'}
              className="cta-button"
              icon={<ArrowUpRight className="h-4 w-4" />}
            >
              <Link href="/contact">Start Your Project</Link>
            </Button>

            <Button
              variant="outline"
              size={isMobile ? 'md' : 'lg'}
              className="cta-button flex items-center gap-2"
              icon={<ArrowUpRight className="h-4 w-4" />}
            >
              <Link href="/portfolio">Explore Our Work</Link>
            </Button>
          </div>

          {/* Features Grid */}
          <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="feature-card group relative rounded-xl border border-border bg-background/50 p-6 transition-all hover:border-accent/50 hover:shadow-lg"
              >
                <div className="mb-4 inline-flex rounded-lg bg-accent/10 p-3 text-accent transition-colors group-hover:bg-accent/20">
                  <feature.icon className="h-6 w-6" />
                </div>
                <h3 className="mb-2 text-lg font-semibold">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
