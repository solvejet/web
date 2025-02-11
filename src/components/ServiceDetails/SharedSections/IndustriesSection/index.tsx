// src/components/ServiceDetails/SharedSections/IndustriesSection/index.tsx
'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import type { IndustryItem } from '@/config/menu-data';
import { industriesItems } from '@/config/menu-data';

interface IndustriesSectionProps {
  title?: string;
  subtitle?: string;
  industries?: IndustryItem[];
}

const IndustriesSection = ({
  title = 'Industries We Serve',
  subtitle = 'Delivering specialized solutions across diverse sectors',
  industries = industriesItems,
}: IndustriesSectionProps) => {
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

        {/* Industries Grid */}
        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {industries.map((industry, index) => {
            const Icon = industry.icon;
            return (
              <motion.div
                key={industry.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group relative"
              >
                <div
                  className={cn(
                    'relative h-full overflow-hidden rounded-2xl border border-border/50',
                    'bg-background/50 p-8 transition-all duration-300',
                    'hover:border-accent/40 hover:shadow-lg hover:shadow-accent/5'
                  )}
                >
                  {/* Industry Header */}
                  <div className="relative z-10 mb-6 flex items-center gap-4">
                    <div
                      className={cn(
                        'flex h-12 w-12 items-center justify-center rounded-xl',
                        'bg-gradient-to-br from-accent/20 to-accent/30',
                        'transition-colors duration-300'
                      )}
                    >
                      <Icon className="h-6 w-6 text-accent" />
                    </div>
                    <h3 className="text-xl font-semibold">{industry.title}</h3>
                  </div>

                  {/* Description */}
                  <p className="mb-6 text-muted-foreground">{industry.description}</p>

                  {/* Features */}
                  <div className="space-y-4">
                    {industry.features.map((feature, featureIndex) => (
                      <motion.div
                        key={feature.title}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 + featureIndex * 0.05 }}
                        className="flex items-start gap-4"
                      >
                        <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent/10">
                          <feature.icon className="h-3 w-3 text-accent" />
                        </div>
                        <div>
                          <h4 className="font-medium">{feature.title}</h4>
                          <p className="mt-1 text-sm text-muted-foreground">
                            {feature.description}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Statistics */}
                  {industry.stats && (
                    <div className="mt-8 flex flex-wrap gap-4">
                      {industry.stats.map((stat, statIndex) => (
                        <motion.div
                          key={stat.label}
                          initial={{ opacity: 0, scale: 0.95 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: index * 0.1 + statIndex * 0.05 }}
                          className="flex-1"
                        >
                          <div className="text-2xl font-bold text-accent">{stat.value}</div>
                          <div className="mt-1 text-sm text-muted-foreground">{stat.label}</div>
                        </motion.div>
                      ))}
                    </div>
                  )}

                  {/* Hover effect gradient */}
                  <div
                    className={cn(
                      'absolute inset-0 -z-10 opacity-0 transition-opacity duration-300',
                      'group-hover:opacity-100',
                      'bg-gradient-to-br from-accent/10 to-transparent'
                    )}
                  />
                </div>
              </motion.div>
            );
          })}
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

export default IndustriesSection;
