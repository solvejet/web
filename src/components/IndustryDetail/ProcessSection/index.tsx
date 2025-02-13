// src/components/IndustryDetail/ProcessSection/index.tsx
'use client';

import { motion } from 'framer-motion';
import { Lightbulb, Code, Rocket, CheckCircle, Repeat } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { IndustryDetailProps } from '@/types/industry';

interface ProcessSectionProps {
  industry: IndustryDetailProps;
}

export default function ProcessSection({ industry }: ProcessSectionProps) {
  const process = [
    {
      icon: Lightbulb,
      title: `${industry.title} Analysis`,
      description: 'We analyze your specific needs and industry requirements',
      gradient: 'from-blue-500/20 to-indigo-500/20',
    },
    {
      icon: Code,
      title: 'Solution Design',
      description: 'Custom solution design aligned with industry standards',
      gradient: 'from-green-500/20 to-emerald-500/20',
    },
    {
      icon: Rocket,
      title: 'Implementation',
      description: 'Seamless deployment with minimal business disruption',
      gradient: 'from-purple-500/20 to-pink-500/20',
    },
    {
      icon: CheckCircle,
      title: 'Quality Assurance',
      description: 'Rigorous testing and industry compliance validation',
      gradient: 'from-amber-500/20 to-orange-500/20',
    },
    {
      icon: Repeat,
      title: 'Continuous Support',
      description: 'Ongoing maintenance and performance optimization',
      gradient: 'from-cyan-500/20 to-blue-500/20',
    },
  ];

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
            Implementation
            <span className="block bg-gradient-to-r from-accent to-accent/60 bg-clip-text text-transparent">
              Process
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-6 text-lg text-muted-foreground"
          >
            Our proven approach to delivering successful {industry.title.toLowerCase()} solutions
          </motion.p>
        </div>

        {/* Process Timeline */}
        <div className="relative mx-auto max-w-5xl">
          {/* Connecting Line */}
          <div
            className="absolute left-1/2 top-0 h-full w-0.5 -translate-x-1/2 bg-accent/20 hidden md:block"
            aria-hidden="true"
          />

          {/* Process Steps */}
          <div className="space-y-12 md:space-y-16">
            {process.map((step, index) => {
              const Icon = step.icon;
              const isEven = index % 2 === 0;

              return (
                <div key={step.title} className="relative">
                  {/* Step Number */}
                  <div
                    className={cn(
                      'absolute left-1/2 -translate-x-1/2 flex h-12 w-12',
                      'items-center justify-center rounded-full',
                      'border-4 border-background bg-accent text-accent-foreground',
                      'z-10'
                    )}
                  >
                    <span className="text-sm font-bold">{index + 1}</span>
                  </div>

                  <motion.div
                    initial={{ opacity: 0, x: isEven ? -20 : 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className={cn(
                      'flex flex-col md:flex-row items-center gap-8',
                      isEven ? 'md:flex-row-reverse' : 'md:flex-row'
                    )}
                  >
                    {/* Content */}
                    <div className="flex-1 w-full md:w-auto pt-16 md:pt-0">
                      <div
                        className={cn(
                          'relative rounded-2xl border border-border/50',
                          'bg-background/50 p-6 md:p-8 transition-all duration-300',
                          'hover:border-accent/50 hover:shadow-lg'
                        )}
                      >
                        <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
                          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent/10 text-accent">
                            <Icon className="h-6 w-6" />
                          </div>
                          <div>
                            <h3 className="text-xl font-semibold">{step.title}</h3>
                            <p className="mt-2 text-muted-foreground">{step.description}</p>
                          </div>
                        </div>

                        {/* Background Gradient */}
                        <div
                          className={cn(
                            'absolute inset-0 -z-10 opacity-0',
                            'bg-gradient-to-br',
                            step.gradient,
                            'transition-opacity duration-300 group-hover:opacity-100',
                            'rounded-2xl'
                          )}
                          aria-hidden="true"
                        />
                      </div>
                    </div>

                    {/* Spacer for timeline */}
                    <div className="hidden md:block w-1/2" />
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
