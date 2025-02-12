// src/components/Industries/TechnologyStack/index.tsx
'use client';

import { motion } from 'framer-motion';
import { industries } from '@/config/industry-data';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import type { Industry } from '@/config/industry-data';

const TechnologyStack = () => {
  // Add type assertion for initial state
  const defaultIndustry = industries[0] as Industry;
  const [selectedIndustry, setSelectedIndustry] = useState<Industry>(defaultIndustry);

  // Early return if no industries are available
  if (industries.length === 0) {
    return null;
  }

  return (
    <section className="relative overflow-hidden py-24 lg:py-32">
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
            Industry-specific technologies and tools that power our solutions
          </motion.p>
        </div>

        {/* Industry Selector */}
        <div className="mb-12 flex flex-wrap justify-center gap-4">
          {industries.map((industry) => {
            const Icon = industry.icon;
            const isSelected = selectedIndustry.id === industry.id;

            return (
              <button
                key={industry.id}
                onClick={() => setSelectedIndustry(industry)}
                className={cn(
                  'flex items-center gap-2 rounded-full px-4 py-2',
                  'border border-border/50 bg-background/50',
                  'transition-all duration-300',
                  isSelected && 'border-accent bg-accent/10 text-accent',
                  !isSelected && 'hover:border-accent/50 hover:bg-accent/5'
                )}
              >
                <Icon className="h-4 w-4" />
                <span className="text-sm font-medium">{industry.title}</span>
              </button>
            );
          })}
        </div>

        {/* Technology Categories */}
        <motion.div
          key={selectedIndustry.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
        >
          {selectedIndustry.technologies.map((category, index) => (
            <motion.div
              key={category.category}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <h3 className="mb-4 text-lg font-semibold">{category.category}</h3>
              <div className="flex flex-wrap gap-2">
                {category.items.map((tech) => (
                  <div
                    key={tech}
                    className={cn(
                      'rounded-full px-3 py-1 text-sm',
                      'border border-border/50 bg-background/50',
                      'transition-all duration-300 hover:border-accent/50',
                      'hover:bg-accent/5'
                    )}
                  >
                    {tech}
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Key Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 rounded-2xl border border-border/50 bg-background/50 p-8"
        >
          <h3 className="mb-6 text-center text-xl font-semibold">Key Features</h3>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {selectedIndustry.keyFeatures.map((feature, index) => (
              <div key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                <div className="h-1.5 w-1.5 rounded-full bg-accent" />
                {feature}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TechnologyStack;
