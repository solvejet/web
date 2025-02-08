// src/components/Home/HeroSection/index.tsx
'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import useMediaQuery from '@/hooks/useMediaQuery';
import { ArrowUpRight, Code, Rocket, Shield, Users } from 'lucide-react';
import Button from '@/components/ui/Button';

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

const HeroSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isMobile = useMediaQuery('(max-width: 768px)');

  useEffect(() => {
    if (!sectionRef.current || typeof window === 'undefined') return;

    // Immediately show content
    gsap.set(['.hero-title', '.hero-description', '.cta-button', '.feature-card'], {
      opacity: 1,
      y: 0,
    });

    // Animate background elements with minimal delay
    gsap.to('.gradient-orb', {
      opacity: 1,
      scale: 1,
      duration: 1,
      ease: 'power2.out',
      stagger: 0.1,
    });
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[85vh] overflow-hidden px-4 pt-16"
      aria-label="Hero section"
    >
      {/* Background Elements - Prerendered with initial opacity */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="gradient-orb absolute -left-20 top-20 h-72 w-72 rounded-full bg-gradient-to-r from-[#FF8BAE]/20 to-[#C400FF]/20 blur-2xl opacity-0"
          style={{ transform: 'scale(0.9)' }}
        />
        <div
          className="gradient-orb absolute right-10 top-40 h-64 w-64 rounded-full bg-gradient-to-r from-[#00E1FF]/20 to-[#0047FF]/20 blur-2xl opacity-0"
          style={{ transform: 'scale(0.9)' }}
        />
        <div
          className="gradient-orb absolute bottom-20 left-1/3 h-80 w-80 rounded-full bg-gradient-to-r from-[#FFB800]/20 to-[#FF5C00]/20 blur-2xl opacity-0"
          style={{ transform: 'scale(0.9)' }}
        />
      </div>

      {/* Grid Pattern Overlay */}
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

      {/* Main Content - Prerendered without initial transforms */}
      <div className="relative mx-auto max-w-6xl">
        <div className="hero-content text-center">
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

          {/* CTA Buttons */}
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

          {/* Features Grid */}
          <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <div
                  key={feature.title}
                  className="feature-card group relative rounded-xl border border-border bg-background/50 p-6 transition-all hover:border-accent/50 hover:shadow-lg"
                >
                  <div className="mb-4 inline-flex rounded-lg bg-accent/10 p-3 text-accent transition-colors group-hover:bg-accent/20">
                    <Icon className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <h2 className="mb-2 text-lg font-semibold">{feature.title}</h2>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
