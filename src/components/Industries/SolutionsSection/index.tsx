// src/components/Industries/SolutionsSection/index.tsx
'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { industries } from '@/config/industry-data';
import { useState } from 'react';
import { type Industry } from '@/config/industry-data';
import { cn } from '@/lib/utils';
import { ArrowRight } from 'lucide-react';

const SolutionsSection = () => {
  const defaultIndustry = industries[0] as Industry;
  const [selectedIndustry, setSelectedIndustry] = useState<Industry>(defaultIndustry);

  if (industries.length === 0) return null;

  const handleIndustryChange = (industry: Industry) => {
    setSelectedIndustry(industry);
  };

  return (
    <section className="relative bg-background py-12 lg:py-24">
      {/* Background Effects */}
      <div className="absolute inset-0 " />
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
            Industry
            <span className="block bg-gradient-to-r from-accent to-accent/60 bg-clip-text text-transparent">
              Solutions
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-6 text-lg text-muted-foreground"
          >
            Tailored solutions designed to meet industry-specific challenges and drive innovation
          </motion.p>
        </div>

        {/* Industry Navigation */}
        <div className="relative mb-12">
          <div className="flex flex-nowrap gap-4 overflow-x-auto pb-4 scrollbar-none">
            {industries.map((industry) => {
              const Icon = industry.icon;
              const isSelected = selectedIndustry.id === industry.id;

              return (
                <motion.button
                  key={industry.id}
                  onClick={() => handleIndustryChange(industry)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={cn(
                    'flex items-center gap-3 rounded-xl px-6 py-4',
                    'border border-border/50 bg-background/50',
                    'transition-all duration-300 whitespace-nowrap min-w-max',
                    isSelected
                      ? 'border-accent bg-accent/10 text-accent shadow-lg'
                      : 'hover:border-accent/50 hover:bg-accent/5'
                  )}
                >
                  <Icon className="h-5 w-5" />
                  <span className="font-medium">{industry.title}</span>
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Solutions Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedIndustry.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
          >
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
                      'relative h-full overflow-hidden rounded-2xl',
                      'border border-border/50 bg-background/50 p-8',
                      'transition-all duration-300',
                      'hover:border-accent/50 hover:shadow-lg hover:scale-[1.02]'
                    )}
                  >
                    {/* Icon & Title */}
                    <div className="relative z-10 mb-6">
                      <div
                        className={cn(
                          'mb-4 inline-flex h-14 w-14 items-center justify-center',
                          'rounded-xl bg-accent/10 transition-transform duration-300',
                          'group-hover:scale-110 group-hover:bg-accent/20'
                        )}
                      >
                        <Icon className="h-7 w-7 text-accent" />
                      </div>
                      <h3 className="text-xl font-semibold">{solution.title}</h3>
                      <p className="mt-2 text-muted-foreground">{solution.description}</p>
                    </div>

                    {/* Features List */}
                    <ul className="relative z-10 space-y-3">
                      {solution.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center gap-3 text-sm">
                          <ArrowRight className="h-4 w-4 text-accent" />
                          <span className="text-muted-foreground">{feature}</span>
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
                    />
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default SolutionsSection;
