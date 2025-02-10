// src/components/WhatWeDo/HeroSection/index.tsx
'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Star, Shield, Trophy, Users } from 'lucide-react';
import Button from '@/components/ui/Button';
import { cn } from '@/lib/utils';
import gsap from 'gsap';

const highlights = [
  {
    icon: Trophy,
    title: 'Industry Leader',
    description: '5+ years of excellence in software development',
    gradient: 'from-blue-500/20 to-purple-500/20',
  },
  {
    icon: Shield,
    title: 'ISO Certified',
    description: 'ISO 27001:2022 certified development processes',
    gradient: 'from-emerald-500/20 to-cyan-500/20',
  },
  {
    icon: Users,
    title: 'Expert Team',
    description: 'Highly skilled developers and engineers',
    gradient: 'from-amber-500/20 to-orange-500/20',
  },
  {
    icon: Star,
    title: 'Client Success',
    description: '98% client satisfaction rate across projects',
    gradient: 'from-indigo-500/20 to-blue-500/20',
  },
] as const;

const HeroSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // Floating shapes animation
      gsap.to('.floating-shape', {
        y: '-20px',
        duration: 2,
        ease: 'power1.inOut',
        yoyo: true,
        repeat: -1,
        stagger: {
          each: 0.5,
          from: 'random',
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative min-h-[90vh] overflow-hidden pt-20">
      {/* Grid pattern for additional texture */}
      <div
        className="absolute inset-0 opacity-[0.1]"
        style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, var(--border) 1px, transparent 0)',
          backgroundSize: '40px 40px',
          maskImage: 'linear-gradient(to bottom, black 50%, transparent)',
          WebkitMaskImage: 'linear-gradient(to bottom, black 50%, transparent)',
        }}
      />

      {/* Main Content */}
      <div className="container relative mx-auto px-4">
        <div className="relative z-10">
          {/* Hero Text Section */}
          <div className="mx-auto max-w-4xl text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center rounded-full bg-accent/10 px-3 py-1 text-sm font-medium text-accent backdrop-blur-sm"
            >
              Trusted by Fortune 500 Companies
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="mt-6 text-4xl font-bold tracking-tight sm:text-5xl lg:text-7xl"
            >
              Transform Your
              <div className="relative mt-2 inline-flex flex-col">
                <span className="relative z-10 bg-gradient-to-r from-blue-500 to-indigo-500 bg-clip-text text-transparent">
                  Digital Future
                </span>
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.5, duration: 0.8, ease: 'circOut' }}
                  className="absolute -bottom-2 left-0 right-0 h-4 origin-left bg-accent/10"
                />
              </div>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground"
            >
              We combine technical expertise with innovative thinking to deliver cutting-edge
              solutions that drive your business forward in the digital age.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="mt-8 flex justify-center gap-4"
            >
              <Button
                href="/contact"
                variant="primary"
                size="lg"
                icon={<ArrowUpRight className="h-4 w-4" />}
              >
                Start Your Project
              </Button>
              <Button
                href="/portfolio"
                variant="outline"
                size="lg"
                icon={<ArrowUpRight className="h-4 w-4" />}
              >
                View Our Work
              </Button>
            </motion.div>
          </div>

          {/* Company Highlights */}
          <div className="mt-20 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {highlights.map((highlight, index) => {
              const Icon = highlight.icon;
              return (
                <motion.div
                  key={highlight.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="group relative"
                >
                  <div
                    className={cn(
                      'relative h-full overflow-hidden rounded-2xl border border-border/50',
                      'bg-background/50 p-8 text-center transition-all duration-300',
                      'hover:border-accent/50 hover:shadow-lg will-change-transform',
                      'hover:shadow-accent/5'
                    )}
                  >
                    {/* Content */}
                    <div className="relative z-10 flex h-full flex-col items-center">
                      <div
                        className={cn(
                          'mb-6 inline-flex rounded-xl bg-accent/10 p-3',
                          'text-accent transition-colors duration-300',
                          'group-hover:scale-110 group-hover:bg-accent/20',
                          'transform will-change-transform'
                        )}
                      >
                        <Icon className="h-6 w-6" />
                      </div>
                      <h3 className="mb-3 text-lg font-semibold transition-colors duration-300 group-hover:text-accent">
                        {highlight.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">{highlight.description}</p>
                    </div>

                    {/* Background Gradient */}
                    <div
                      className={cn(
                        'absolute inset-0 -z-10 opacity-0',
                        'transition-opacity duration-500 ease-out',
                        'group-hover:opacity-100 bg-gradient-to-br',
                        highlight.gradient
                      )}
                      aria-hidden="true"
                    />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div
        className="pointer-events-none absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent"
        aria-hidden="true"
      />
    </section>
  );
};

export default HeroSection;
