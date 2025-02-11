// src/components/ServiceDetails/SharedSections/ProcessSection/index.tsx
'use client';

import { motion, useScroll } from 'framer-motion';
import React, { useRef } from 'react';
import { FileSearch, Code, TestTube, Rocket, Wrench } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ProcessStep {
  icon: React.ElementType;
  title: string;
  description: string;
  color?: {
    from: string;
    to: string;
  };
}

interface ProcessSectionProps {
  title?: string;
  subtitle?: string;
  steps?: ProcessStep[];
}

const defaultColors = [
  { from: 'blue-500', to: 'blue-600' },
  { from: 'indigo-500', to: 'indigo-600' },
  { from: 'purple-500', to: 'purple-600' },
  { from: 'pink-500', to: 'pink-600' },
  { from: 'red-500', to: 'red-600' },
] as const;

const defaultSteps: ProcessStep[] = [
  {
    icon: FileSearch,
    title: 'Discovery & Planning',
    description: 'We analyze your requirements and create a detailed project roadmap.',
    color: { from: 'blue-500', to: 'blue-600' },
  },
  {
    icon: Code,
    title: 'Development',
    description: 'Our team implements the solution using modern technologies and best practices.',
    color: { from: 'indigo-500', to: 'indigo-600' },
  },
  {
    icon: TestTube,
    title: 'Testing & QA',
    description: 'Rigorous testing ensures high quality and reliable performance.',
    color: { from: 'purple-500', to: 'purple-600' },
  },
  {
    icon: Rocket,
    title: 'Deployment',
    description: 'We handle the deployment process and ensure smooth transition.',
    color: { from: 'pink-500', to: 'pink-600' },
  },
  {
    icon: Wrench,
    title: 'Maintenance & Support',
    description: 'Ongoing support and updates to keep your solution running optimally.',
    color: { from: 'red-500', to: 'red-600' },
  },
];

const ProcessSection: React.FC<ProcessSectionProps> = ({
  title = 'Our Development Process',
  subtitle = 'A streamlined approach to delivering exceptional results',
  steps = defaultSteps,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start center', 'end center'],
  });

  // Helper function to get color with fallback
  const getStepColor = (step: ProcessStep, index: number): { from: string; to: string } => {
    if (step.color) {
      return step.color;
    }
    // Safely get default color, falling back to first color if index is out of bounds
    const defaultColorIndex = index % defaultColors.length;
    const defaultColor = defaultColors[defaultColorIndex] || defaultColors[0];
    return {
      from: defaultColor.from,
      to: defaultColor.to,
    };
  };

  return (
    <section ref={containerRef} className="relative overflow-hidden py-24 lg:py-32">
      <div className="container relative z-10 mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto max-w-3xl text-center"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex rounded-full bg-accent/10 px-4 py-1.5 text-sm font-medium text-accent"
          >
            Our Process
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-6 text-4xl font-bold tracking-tight sm:text-5xl"
          >
            {title}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-lg text-muted-foreground"
          >
            {subtitle}
          </motion.p>
        </motion.div>

        {/* Timeline Steps */}
        <div className="relative mt-20">
          {/* Central Line Container - Extends full height */}
          <div className="absolute left-1/2 top-0 h-full w-0.5 -translate-x-1/2 transform">
            {/* Animated Line Fill */}
            <motion.div
              className="h-full w-full bg-gradient-to-b from-accent/40 via-accent/60 to-accent/40"
              style={{
                scaleY: scrollYProgress,
                transformOrigin: 'top',
              }}
            />
          </div>

          {/* Steps */}
          <div className="relative space-y-24">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isEven = index % 2 === 0;
              const stepColor = getStepColor(step, index);

              return (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-100px' }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                  className="relative"
                >
                  <div
                    className={cn(
                      'flex items-center gap-8',
                      isEven ? 'flex-row' : 'flex-row-reverse'
                    )}
                  >
                    {/* Content Box */}
                    <div className="w-[calc(50%-2rem)]">
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        className={cn(
                          'group relative overflow-hidden rounded-2xl',
                          'border border-border/50 bg-background/50 p-8',
                          'backdrop-blur-sm transition-all duration-300',
                          'hover:border-accent/40 hover:shadow-2xl hover:shadow-accent/5'
                        )}
                      >
                        <div className="relative z-10">
                          <motion.div
                            whileHover={{ scale: 1.1, rotate: 5 }}
                            className={cn(
                              'mb-6 inline-flex h-16 w-16 items-center justify-center rounded-xl',
                              'bg-gradient-to-br transition-transform duration-300',
                              `from-${stepColor.from} to-${stepColor.to}`,
                              'bg-opacity-20'
                            )}
                          >
                            <Icon className="h-8 w-8 text-accent" />
                          </motion.div>
                          <h3 className="text-xl font-semibold">{step.title}</h3>
                          <p className="mt-2 text-muted-foreground">{step.description}</p>
                        </div>

                        {/* Hover Effects */}
                        <div
                          className={cn(
                            'absolute inset-0 -z-10 opacity-0 transition-opacity duration-300',
                            'group-hover:opacity-100',
                            'bg-gradient-to-br',
                            `from-${stepColor.from}/10 to-transparent`
                          )}
                        />

                        <div className="absolute -right-4 -top-4 h-20 w-20 rotate-12 transform rounded-xl bg-accent/5 opacity-0 transition-all duration-500 group-hover:opacity-100" />
                      </motion.div>
                    </div>

                    {/* Timeline Node */}
                    <div className="relative flex h-8 w-8 shrink-0 items-center justify-center">
                      <motion.div
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true }}
                        className={cn(
                          'absolute h-4 w-4 rounded-full',
                          'bg-gradient-to-br from-accent to-accent/80'
                        )}
                      />
                      <motion.div
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true }}
                        className="absolute h-8 w-8 animate-ping rounded-full bg-accent/20"
                      />
                    </div>

                    {/* Step Number */}
                    <div className="w-[calc(50%-2rem)] flex items-center justify-center relative">
                      <motion.div
                        initial={{ opacity: 0, scale: 0.5 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="relative"
                      >
                        {/* Background number for depth */}
                        <span
                          className={cn(
                            'absolute inset-0 text-[120px] font-bold leading-none',
                            'bg-gradient-to-br bg-clip-text text-transparent blur-sm',
                            `from-${stepColor.from}/20 to-${stepColor.to}/20`
                          )}
                        >
                          {(index + 1).toString().padStart(2, '0')}
                        </span>

                        {/* Main number */}
                        <span
                          className={cn(
                            'relative text-[120px] font-bold leading-none block',
                            'bg-gradient-to-br bg-clip-text text-transparent',
                            `from-${stepColor.from}/40 to-${stepColor.to}/40`
                          )}
                        >
                          {(index + 1).toString().padStart(2, '0')}
                        </span>
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-accent/5 via-transparent to-accent/5" />
      <div
        className="absolute inset-0 opacity-[0.15]"
        style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, var(--border) 1px, transparent 0)',
          backgroundSize: '40px 40px',
          maskImage: 'linear-gradient(to bottom, black 50%, transparent)',
          WebkitMaskImage: 'linear-gradient(to bottom, black 50%, transparent)',
        }}
      />
    </section>
  );
};

export default ProcessSection;
