// src/components/Home/TechnologiesSection/index.tsx
'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { techCategories } from '@/config/tech-data';
import { cn } from '@/lib/utils';
import { ArrowUpRight, Dot } from 'lucide-react';

const TechnologiesSection = () => {
  const [selectedTech, setSelectedTech] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Flatten all technologies for the network view
  const allTechnologies = techCategories.flatMap((category) =>
    category.technologies.map((tech) => ({
      ...tech,
      category: category.id,
      categoryName: category.title,
      categoryIcon: category.icon,
    }))
  );

  const handleTechClick = useCallback((techName: string) => {
    setSelectedTech((prev) => (prev === techName ? null : techName));
  }, []);

  const selectedTechData = allTechnologies.find((t) => t.name === selectedTech);

  return (
    <section className="relative min-h-screen overflow-hidden bg-background py-24">
      {/* Dynamic Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-accent/5 via-transparent to-accent/5" />
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, var(--accent) 1px, transparent 0)',
          backgroundSize: '48px 48px',
        }}
      />

      <div className="container relative mx-auto px-4">
        {/* Section Header */}
        <div className="relative z-10 mb-20 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl"
          >
            Our Technology
            <span className="relative ml-2 inline-block">
              <span className="relative z-10 bg-gradient-to-r from-accent to-accent/60 bg-clip-text text-transparent">
                Ecosystem
              </span>
              <motion.span
                className="absolute -inset-1 -z-10 block rounded-lg bg-accent/10"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              />
            </span>
          </motion.h2>
        </div>

        {/* Interactive Technology Network */}
        <div ref={containerRef} className="relative mx-auto max-w-7xl">
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
            {allTechnologies.map((tech, index) => {
              const Icon = tech.categoryIcon;
              const isSelected = selectedTech === tech.name;

              return (
                <motion.div
                  key={tech.name}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                  className={cn(
                    'group relative cursor-pointer overflow-hidden rounded-xl',
                    'border border-border/50 bg-background/50 p-4',
                    'backdrop-blur-sm transition-all duration-300',
                    isSelected ? 'border-accent ring-2 ring-accent/20' : 'hover:border-accent/50',
                    selectedTech && !isSelected && 'opacity-50'
                  )}
                  onClick={() => handleTechClick(tech.name)}
                >
                  {/* Tech Card Content */}
                  <div className="relative z-10 flex items-start gap-3">
                    <div
                      className={cn(
                        'flex h-8 w-8 shrink-0 items-center justify-center rounded-lg',
                        'bg-accent/10 text-accent transition-colors group-hover:bg-accent/20'
                      )}
                    >
                      <Icon className="h-4 w-4" />
                    </div>

                    <div>
                      <h3 className="font-semibold leading-tight">{tech.name}</h3>
                      <p className="mt-1 text-xs text-muted-foreground">{tech.categoryName}</p>
                    </div>

                    {tech.popular && (
                      <span className="absolute right-2 top-2 flex items-center text-xs font-medium text-accent">
                        <Dot className="h-4 w-4" />
                        Popular
                      </span>
                    )}
                  </div>

                  {/* Connection Lines */}
                  {isSelected && (
                    <motion.div
                      className="absolute inset-0 -z-10"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-accent/20 via-transparent to-transparent opacity-20" />
                    </motion.div>
                  )}
                </motion.div>
              );
            })}
          </div>

          {/* Selected Technology Details */}
          <AnimatePresence mode="wait">
            {selectedTechData && (
              <motion.div
                key={selectedTechData.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="mt-8 rounded-xl border border-accent/20 bg-accent/5 p-6"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h4 className="text-xl font-semibold">{selectedTechData.name}</h4>
                    <p className="mt-2 text-sm text-muted-foreground">
                      {selectedTechData.description}
                    </p>
                  </div>

                  <a
                    href={selectedTechData.link}
                    className={cn(
                      'group flex items-center gap-1 rounded-lg px-3 py-2',
                      'bg-accent/10 text-sm font-medium text-accent',
                      'transition-colors hover:bg-accent/20'
                    )}
                  >
                    Learn More
                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default TechnologiesSection;
