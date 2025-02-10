// src/components/Home/HeroSection/index.tsx
'use client';

import { useEffect, useRef, memo, useState } from 'react';
import { gsap } from 'gsap';
import useMediaQuery from '@/hooks/useMediaQuery';
import { ArrowUpRight, Code, Rocket, Shield, Users, type LucideIcon } from 'lucide-react';
import Button from '@/components/ui/Button';
import { cn } from '@/lib/utils';

interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
}

const features: Feature[] = [
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

const FeatureCard = memo(({ feature }: { feature: Feature }) => {
  const Icon = feature.icon;
  return (
    <div className="feature-card group relative rounded-xl border border-border bg-background/50 p-6 transition-all hover:border-accent/50 hover:shadow-lg will-change-transform">
      <div className="mb-4 inline-flex rounded-lg bg-accent/10 p-3 text-accent transition-colors group-hover:bg-accent/20">
        <Icon className="h-6 w-6" aria-hidden="true" />
      </div>
      <h2 className="mb-2 text-lg font-semibold">{feature.title}</h2>
      <p className="text-sm text-muted-foreground">{feature.description}</p>
    </div>
  );
});

FeatureCard.displayName = 'FeatureCard';

const BackgroundElements = memo(() => (
  <>
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div
        className="gradient-orb absolute -left-20 top-20 h-72 w-72 rounded-full bg-gradient-to-r from-[#FF8BAE]/20 to-[#C400FF]/20 blur-2xl opacity-0 will-change-transform"
        style={{ transform: 'scale(0.9)' }}
      />
      <div
        className="gradient-orb absolute right-10 top-40 h-64 w-64 rounded-full bg-gradient-to-r from-[#00E1FF]/20 to-[#0047FF]/20 blur-2xl opacity-0 will-change-transform"
        style={{ transform: 'scale(0.9)' }}
      />
      <div
        className="gradient-orb absolute bottom-20 left-1/3 h-80 w-80 rounded-full bg-gradient-to-r from-[#FFB800]/20 to-[#FF5C00]/20 blur-2xl opacity-0 will-change-transform"
        style={{ transform: 'scale(0.9)' }}
      />
    </div>
    <div
      className="absolute inset-0 opacity-[0.15] pointer-events-none"
      style={{
        backgroundImage: 'radial-gradient(circle at 1px 1px, var(--border) 1px, transparent 0)',
        backgroundSize: '40px 40px',
        maskImage: 'linear-gradient(to bottom, black 80%, transparent)',
        WebkitMaskImage: 'linear-gradient(to bottom, black 80%, transparent)',
        willChange: 'mask-image',
      }}
      aria-hidden="true"
    />
  </>
));

BackgroundElements.displayName = 'BackgroundElements';

export function HeroSkeleton() {
  return (
    <div className="min-h-[85vh] animate-pulse">
      <div className="mx-auto max-w-6xl px-4 pt-16">
        <div className="space-y-6">
          <div className="h-12 w-3/4 bg-accent/10 rounded-lg mx-auto" />
          <div className="h-24 w-2/3 bg-accent/5 rounded-lg mx-auto" />
          <div className="flex justify-center gap-4">
            <div className="h-12 w-32 bg-accent/10 rounded-lg" />
            <div className="h-12 w-32 bg-accent/5 rounded-lg" />
          </div>
        </div>
      </div>
    </div>
  );
}

const HeroSection = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const isMobile = useMediaQuery('(max-width: 768px)');
  const animationRef = useRef<gsap.Context | null>(null);

  useEffect(() => {
    if (!sectionRef.current || typeof window === 'undefined') return;

    setIsLoaded(true);

    animationRef.current = gsap.context(() => {
      gsap.fromTo(
        ['.hero-title', '.hero-description', '.cta-button'],
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.2,
          duration: 0.8,
          ease: 'power2.out',
        }
      );

      gsap.fromTo(
        '.feature-card',
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.1,
          duration: 0.6,
          ease: 'power2.out',
          delay: 0.5,
        }
      );

      gsap.to('.gradient-orb', {
        opacity: 0.8,
        scale: 1,
        duration: 1.5,
        ease: 'power2.out',
        stagger: 0.2,
      });
    }, sectionRef);

    return () => {
      if (animationRef.current) {
        animationRef.current.revert();
      }
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[85vh] overflow-hidden px-4 pt-16"
      aria-label="Hero section"
    >
      <BackgroundElements />

      <div className="relative mx-auto max-w-6xl">
        <div className={cn('hero-content text-center', !isLoaded && 'opacity-0')}>
          <h1 className="hero-title text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            Crafting Digital Excellence with{' '}
            <span className="block bg-gradient-to-r from-[#FF8BAE] to-[#0047FF] bg-clip-text text-transparent">
              Innovation & Precision
            </span>
          </h1>

          <p className="hero-description mx-auto mt-6 max-w-2xl text-base text-muted-foreground sm:text-lg">
            From startup visions to enterprise solutions, we blend technical expertise with creative
            innovation. Our mission is to engineer digital solutions that not just meet expectations
            but redefine them.
          </p>

          <div className="relative z-10 mt-8 flex flex-wrap items-center justify-center gap-4">
            <Button
              href="/contact"
              variant="primary"
              size={isMobile ? 'md' : 'lg'}
              className="cta-button"
              icon={<ArrowUpRight className="h-4 w-4" />}
            >
              Start Your Project
            </Button>

            <Button
              href="/portfolio"
              variant="outline"
              size={isMobile ? 'md' : 'lg'}
              className="cta-button"
              icon={<ArrowUpRight className="h-4 w-4" />}
            >
              Explore Our Work
            </Button>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => (
              <FeatureCard key={feature.title} feature={feature} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default memo(HeroSection);
