// src/components/IndustryDetail/SolutionsSection/index.tsx
'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { IndustryDetailProps } from '@/types/industry';

interface SolutionsSectionProps {
  industry: IndustryDetailProps;
}

export default function SolutionsSection({ industry }: SolutionsSectionProps) {
  return (
    <section className="relative bg-background py-24 lg:py-32">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-accent/5 via-transparent to-accent/5" />
      <div
        className="absolute inset-0 opacity-[0.15]"
        style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, var(--border) 1px, transparent 0)',
          backgroundSize: '40px 40px',
        }}
      />

      <div className="container relative mx-auto px-4">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl"
          >
            {industry.title}
            <span className="block bg-gradient-to-r from-accent to-accent/60 bg-clip-text text-transparent">
              Solutions & Features
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-6 text-lg text-muted-foreground"
          >
            Explore our comprehensive suite of solutions designed specifically for {industry.title}
          </motion.p>
        </div>

        {/* Solutions Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {industry.solutions.map((solution, index) => {
            const Icon = solution.icon;

            return (
              <motion.div
                key={solution.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group relative"
              >
                <div
                  className={cn(
                    'relative h-full overflow-hidden rounded-2xl',
                    'border border-border/50 bg-background/50 p-8',
                    'transition-all duration-300',
                    'hover:border-accent/50 hover:shadow-lg'
                  )}
                >
                  {/* Solution Content */}
                  <div className="relative z-10">
                    {/* Icon */}
                    <div
                      className={cn(
                        'mb-6 inline-flex rounded-xl bg-accent/10 p-3',
                        'text-accent transition-colors group-hover:bg-accent/20'
                      )}
                    >
                      <Icon className="h-6 w-6" />
                    </div>

                    {/* Title & Description */}
                    <h3 className="mb-3 text-xl font-semibold">{solution.title}</h3>
                    <p className="mb-6 text-muted-foreground">{solution.description}</p>

                    {/* Features List */}
                    <ul className="space-y-3">
                      {solution.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center gap-3 text-sm">
                          <ArrowRight className="h-4 w-4 text-accent" />
                          <span className="text-muted-foreground">{feature}</span>
                        </li>
                      ))}
                    </ul>
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
            );
          })}
        </div>
      </div>
    </section>
  );
}
