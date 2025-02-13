// src/components/Industries/TechnologyStack/index.tsx
'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { industries } from '@/config/industry-data';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Code2, Server, Database, Cloud } from 'lucide-react';
import type { Industry } from '@/types/industry';

interface CategoryIconMap {
  [key: string]: typeof Code2;
}

const categoryIcons: CategoryIconMap = {
  Frontend: Code2,
  Backend: Server,
  Database: Database,
  Cloud: Cloud,
};

const TechnologyStack = () => {
  const defaultIndustry: Industry = {
    id: 'default',
    title: 'Technology',
    icon: Code2,
    shortDescription: 'Technology solutions',
    fullDescription: 'Comprehensive technology solutions',
    gradient: 'from-blue-500/20 to-indigo-500/20',
    stats: [],
    solutions: [],
    technologies: [],
    keyFeatures: [],
    caseStudyStats: [], // Add the missing required property
  };

  const [selectedIndustry, setSelectedIndustry] = useState<Industry>(
    industries?.[0] ?? defaultIndustry
  );

  // Early return if no industries
  if (!industries?.length) {
    return null;
  }

  // Guard clause for empty industries
  if (!industries || industries.length === 0) {
    return null;
  }

  return (
    <section className="py-24 lg:py-32">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl"
          >
            Technology
            <span className="block bg-gradient-to-r from-accent to-accent/60 bg-clip-text text-transparent">
              Stack
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-6 text-lg text-muted-foreground"
          >
            Explore our comprehensive technology ecosystem for {selectedIndustry.title}
          </motion.p>
        </div>

        {/* Industry Quick Select */}
        <div className="mb-12">
          <div className="flex flex-wrap justify-center gap-2">
            {industries.map((industry) => (
              <button
                key={industry.id}
                onClick={() => setSelectedIndustry(industry)}
                className={cn(
                  'rounded-lg px-4 py-2 text-sm font-medium transition-all',
                  'border-2',
                  selectedIndustry.id === industry.id
                    ? 'border-accent bg-accent/10 text-accent'
                    : 'border-transparent hover:border-accent/30 hover:bg-accent/5'
                )}
              >
                {industry.title}
              </button>
            ))}
          </div>
        </div>

        {/* Technology Categories */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedIndustry.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="grid gap-8 md:grid-cols-2"
          >
            {selectedIndustry.technologies?.map((category, index) => {
              const Icon = categoryIcons[category.category] || Code2;

              return (
                <motion.div
                  key={category.category}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={cn(
                    'group relative overflow-hidden rounded-2xl',
                    'border border-border/50 bg-background/50 p-6',
                    'transition-all duration-300',
                    'hover:border-accent/50 hover:shadow-lg'
                  )}
                >
                  {/* Category Header */}
                  <div className="mb-6 flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 text-accent">
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="text-xl font-semibold">{category.category}</h3>
                  </div>

                  {/* Technology Tags */}
                  <div className="flex flex-wrap gap-2">
                    {category.items.map((tech, techIndex) => (
                      <motion.span
                        key={tech}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: techIndex * 0.05 }}
                        className={cn(
                          'rounded-full px-4 py-1.5 text-sm',
                          'bg-accent/5 text-accent',
                          'transition-colors duration-300',
                          'hover:bg-accent/10'
                        )}
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </div>

                  {/* Background Gradient */}
                  <div
                    className={cn(
                      'absolute inset-0 -z-10 opacity-0',
                      'bg-gradient-to-br',
                      selectedIndustry.gradient,
                      'transition-opacity duration-300 group-hover:opacity-100'
                    )}
                  />
                </motion.div>
              );
            })}
          </motion.div>
        </AnimatePresence>

        {/* Key Features */}
        {selectedIndustry.keyFeatures && selectedIndustry.keyFeatures.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-16 rounded-2xl border border-border/50 p-8"
          >
            <h3 className="mb-6 text-center text-xl font-semibold">Key Technology Features</h3>
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
              {selectedIndustry.keyFeatures.map((feature, index) => (
                <div
                  key={index}
                  className={cn(
                    'rounded-lg p-4 text-center',
                    'bg-accent/5',
                    'transition-colors duration-300',
                    'hover:bg-accent/10'
                  )}
                >
                  <span className="text-sm text-muted-foreground">{feature}</span>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default TechnologyStack;
