// src/components/Industries/SolutionsSection/index.tsx
'use client';

import { motion } from 'framer-motion';
import { industries } from '@/config/industry-data';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import type { Industry } from '@/config/industry-data';

const SolutionsSection = () => {
  // Add type assertion to ensure industries array isn't empty
  const defaultIndustry = industries[0] as Industry;
  const [selectedIndustry, setSelectedIndustry] = useState<Industry>(defaultIndustry);

  // Early return if no industries are available
  if (industries.length === 0) {
    return null;
  }

  return (
    <section className="relative bg-background py-24 lg:py-32">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-b from-accent/5 via-transparent to-accent/5" />
      <div
        className="absolute inset-0 opacity-[0.15]"
        style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, var(--border) 1px, transparent 0)',
          backgroundSize: '40px 40px',
        }}
      />

      <div className="container relative mx-auto px-4">
        {/* Rest of the code remains the same */}
        {/* ... */}

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

        {/* Solutions Grid */}
        <div key={selectedIndustry.id} className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {selectedIndustry.solutions.map((solution, index) => {
            const Icon = solution.icon;

            return (
              <motion.div
                key={solution.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group relative"
              >
                <div
                  className={cn(
                    'relative h-full overflow-hidden rounded-2xl border border-border/50',
                    'bg-background/50 p-8 transition-all duration-300',
                    'hover:border-accent/50 hover:shadow-lg'
                  )}
                >
                  {/* Solution Icon */}
                  <div
                    className={cn(
                      'mb-6 inline-flex rounded-xl bg-accent/10 p-3',
                      'text-accent transition-colors group-hover:bg-accent/20'
                    )}
                  >
                    <Icon className="h-6 w-6" />
                  </div>

                  {/* Solution Content */}
                  <h3 className="mb-3 text-xl font-semibold">{solution.title}</h3>
                  <p className="mb-6 text-muted-foreground">{solution.description}</p>

                  {/* Features List */}
                  <ul className="space-y-2">
                    {solution.features.map((feature, idx) => (
                      <li
                        key={idx}
                        className="flex items-center gap-2 text-sm text-muted-foreground"
                      >
                        <div className="h-1.5 w-1.5 rounded-full bg-accent" />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  {/* Background Gradient */}
                  <div
                    className={cn(
                      'absolute inset-0 -z-10 opacity-0',
                      'bg-gradient-to-br',
                      selectedIndustry.gradient,
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
};

export default SolutionsSection;
