// src/components/ServiceDetails/SharedSections/TechnologySection/index.tsx
'use client';

import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import { techCategories } from '@/config/tech-data';

interface TechnologySectionProps {
  title?: string;
  subtitle?: string;
  selectedCategories?: string[];
}

const TechnologySection = ({
  title = 'Technologies We Use',
  subtitle = 'Modern tech stack for robust solutions',
  selectedCategories = ['frontend', 'backend', 'database', 'frameworks'],
}: TechnologySectionProps) => {
  // Filter categories based on selected ones
  const filteredCategories = techCategories.filter((cat) => selectedCategories.includes(cat.id));

  return (
    <section className="relative overflow-hidden py-24 lg:py-32">
      <div className="container relative z-10 mx-auto px-4">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl"
          >
            {title}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-4 text-lg text-muted-foreground"
          >
            {subtitle}
          </motion.p>
        </div>

        {/* Technology Categories */}
        <div className="mt-16 grid gap-8 md:grid-cols-2">
          {filteredCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: categoryIndex * 0.1 }}
              className="group relative"
            >
              <div className="relative h-full overflow-hidden rounded-2xl border border-border/50 bg-background/50 p-8 transition-all duration-300 hover:border-accent/40 hover:shadow-lg hover:shadow-accent/5">
                {/* Category Header */}
                <div className="relative z-10 mb-6">
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-accent/20 to-accent/30">
                      <category.icon className="h-6 w-6 text-accent" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold">{category.title}</h3>
                      <p className="mt-1 text-sm text-muted-foreground">{category.description}</p>
                    </div>
                  </div>
                </div>

                {/* Technologies Grid */}
                <div className="grid gap-3 sm:grid-cols-2">
                  {category.technologies.map((tech, techIndex) => (
                    <motion.div
                      key={tech.name}
                      initial={{ opacity: 0, scale: 0.95 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: categoryIndex * 0.1 + techIndex * 0.05 }}
                    >
                      <div className="group/tech relative rounded-xl border border-border/50 bg-background/50 p-4 transition-all duration-300 hover:border-accent/40 hover:shadow-md">
                        <div className="flex items-center justify-between">
                          <span className="font-medium">{tech.name}</span>
                          {tech.popular && (
                            <Star className="h-4 w-4 text-yellow-500" fill="currentColor" />
                          )}
                        </div>
                        <p className="mt-1 text-sm text-muted-foreground">{tech.description}</p>

                        {/* Hover gradient effect */}
                        <div className="absolute inset-0 -z-10 rounded-xl bg-gradient-to-br from-accent/5 to-transparent opacity-0 transition-opacity duration-300 group-hover/tech:opacity-100" />
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Category Hover Effect */}
                <div className="absolute inset-0 -z-20 bg-gradient-to-br from-accent/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </div>
            </motion.div>
          ))}
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

export default TechnologySection;
