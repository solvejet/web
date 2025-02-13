// src/components/IndustryDetail/TechnologyStack/index.tsx
'use client';

import { motion } from 'framer-motion';
import { Code2, Server, Database, Cloud } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { IndustryDetailProps } from '@/types/industry';

interface TechnologyStackProps {
  industry: IndustryDetailProps;
}

export default function TechnologyStack({ industry }: TechnologyStackProps) {
  // Helper function to get technologies for a category
  const getTechnologies = (categoryName: string) => {
    const category = industry.technologies.find((cat) => cat.category === categoryName);
    return category?.items || [];
  };

  const sections = [
    {
      title: 'Frontend Development',
      icon: Code2,
      technologies: getTechnologies('Frontend'),
      gradient: 'from-blue-500/20 to-indigo-500/20',
    },
    {
      title: 'Backend & APIs',
      icon: Server,
      technologies: getTechnologies('Backend'),
      gradient: 'from-green-500/20 to-emerald-500/20',
    },
    {
      title: 'Database & Storage',
      icon: Database,
      technologies: getTechnologies('Database'),
      gradient: 'from-purple-500/20 to-pink-500/20',
    },
    {
      title: 'Cloud Infrastructure',
      icon: Cloud,
      technologies: getTechnologies('Cloud'),
      gradient: 'from-amber-500/20 to-orange-500/20',
    },
  ].filter((section) => section.technologies.length > 0);

  if (sections.length === 0) {
    return null;
  }

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
            Technology
            <span className="block bg-gradient-to-r from-accent to-accent/60 bg-clip-text text-transparent">
              Stack & Architecture
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-6 text-lg text-muted-foreground"
          >
            Explore our comprehensive technology ecosystem designed for {industry.title}
          </motion.p>
        </div>

        {/* Technology Grid */}
        <div className="grid gap-8 md:grid-cols-2">
          {sections.map((section, sectionIndex) => {
            const Icon = section.icon;
            const technologies = section.technologies;

            if (!technologies.length) return null;

            return (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: sectionIndex * 0.1 }}
                className="group relative"
              >
                <div
                  className={cn(
                    'relative overflow-hidden rounded-2xl',
                    'border border-border/50 bg-background/50 p-8',
                    'transition-all duration-300',
                    'hover:border-accent/50 hover:shadow-lg'
                  )}
                >
                  {/* Section Content */}
                  <div className="relative z-10">
                    {/* Header */}
                    <div className="mb-6 flex items-center gap-4">
                      <div
                        className={cn(
                          'inline-flex rounded-xl bg-accent/10 p-3',
                          'text-accent transition-colors group-hover:bg-accent/20'
                        )}
                      >
                        <Icon className="h-6 w-6" />
                      </div>
                      <h3 className="text-xl font-semibold">{section.title}</h3>
                    </div>

                    {/* Technologies Grid */}
                    <div className="flex flex-wrap gap-2">
                      {technologies.map((tech, techIndex) => (
                        <motion.div
                          key={tech}
                          initial={{ opacity: 0, scale: 0.9 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: sectionIndex * 0.1 + techIndex * 0.05 }}
                          className={cn(
                            'rounded-full border border-border/50 px-4 py-1',
                            'text-sm transition-colors duration-300',
                            'hover:border-accent/50 hover:bg-accent/5'
                          )}
                        >
                          {tech}
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Background Gradient */}
                  <div
                    className={cn(
                      'absolute inset-0 -z-10 opacity-0',
                      'bg-gradient-to-br',
                      section.gradient,
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
