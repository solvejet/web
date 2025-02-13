// src/components/IndustryDetail/HeroSection.tsx
'use client';

import { motion } from 'framer-motion';
import { ArrowUpRight, type LucideIcon } from 'lucide-react';
import Button from '@/components/ui/Button';
import { cn } from '@/lib/utils';

interface IndustryData {
  title: string;
  description: string;
  icon: LucideIcon;
  stats: Array<{ value: string; label: string }>;
  gradient: string;
}

interface HeroSectionProps {
  industry: IndustryData;
}

export default function HeroSection({ industry }: HeroSectionProps) {
  const Icon = industry.icon;

  return (
    <section className="relative min-h-[90vh] overflow-hidden pt-20">
      {/* Background Pattern */}
      <div
        className="absolute inset-0 opacity-[0.1]"
        style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, var(--border) 1px, transparent 0)',
          backgroundSize: '40px 40px',
          maskImage: 'linear-gradient(to bottom, black 50%, transparent)',
          WebkitMaskImage: 'linear-gradient(to bottom, black 50%, transparent)',
        }}
      />

      <div className="container relative mx-auto px-4">
        <div className="relative z-10">
          {/* Hero Content */}
          <div className="mx-auto max-w-4xl text-center">
            {/* Industry Icon */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className={cn('mx-auto mb-6 inline-flex rounded-2xl', 'bg-accent/10 p-4 text-accent')}
            >
              <Icon className="h-8 w-8" />
            </motion.div>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-7xl"
            >
              {industry.title}
              <span className="block bg-gradient-to-r from-accent to-accent/60 bg-clip-text text-transparent">
                Solutions
              </span>
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground"
            >
              {industry.description}
            </motion.p>

            {/* CTA Buttons */}
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
                Get Started
              </Button>
              <Button
                href="/case-studies"
                variant="outline"
                size="lg"
                icon={<ArrowUpRight className="h-4 w-4" />}
              >
                View Case Studies
              </Button>
            </motion.div>

            {/* Statistics Grid */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="mt-16 grid gap-8 sm:grid-cols-3"
            >
              {industry.stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  className="group relative"
                >
                  <div
                    className={cn(
                      'relative overflow-hidden rounded-2xl',
                      'border border-border/50 bg-background/50 p-6',
                      'transition-all duration-300',
                      'hover:border-accent/50 hover:shadow-lg'
                    )}
                  >
                    {/* Stat Content */}
                    <div className="relative z-10">
                      <div className="text-3xl font-bold text-accent">{stat.value}</div>
                      <div className="mt-1 text-sm text-muted-foreground">{stat.label}</div>
                    </div>

                    {/* Background Gradient */}
                    <div
                      className={cn(
                        'absolute inset-0 -z-10 opacity-0',
                        'bg-gradient-to-br',
                        industry.gradient,
                        'transition-opacity duration-300 group-hover:opacity-100'
                      )}
                      aria-hidden="true"
                    />
                  </div>
                </motion.div>
              ))}
            </motion.div>
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
}
