// src/components/Industries/FeaturedIndustries/index.tsx
'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { industries } from '@/config/industry-data';
import { cn } from '@/lib/utils';
import Link from 'next/link';

const FeaturedIndustries = () => {
  return (
    <section className="relative bg-background py-24 lg:py-32">
      {/* Background Pattern */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-accent/5 via-transparent to-accent/5"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 opacity-[0.15]"
        style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, var(--border) 1px, transparent 0)',
          backgroundSize: '40px 40px',
        }}
        aria-hidden="true"
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
            Industries We
            <span className="block bg-gradient-to-r from-accent to-accent/60 bg-clip-text text-transparent">
              Transform
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-6 text-lg text-muted-foreground"
          >
            Discover how we drive innovation and growth across diverse industry sectors
          </motion.p>
        </div>

        {/* Industries Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {industries.map((industry, index) => {
            const Icon = industry.icon;

            return (
              <motion.div
                key={industry.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group relative h-full"
              >
                <Link href={`/industries/${industry.id}`} className="block h-full">
                  <div
                    className={cn(
                      'relative h-full overflow-hidden rounded-2xl border border-border/50',
                      'bg-background/50 p-8 transition-all duration-300',
                      'hover:border-accent/50 hover:shadow-lg',
                      'flex flex-col'
                    )}
                  >
                    {/* Industry Icon */}
                    <div
                      className={cn(
                        'mb-6 inline-flex rounded-xl bg-accent/10 p-3',
                        'text-accent transition-colors group-hover:bg-accent/20',
                        'self-start'
                      )}
                    >
                      <Icon className="h-6 w-6" />
                    </div>

                    {/* Industry Content */}
                    <div className="flex-grow">
                      <h3 className="mb-3 text-xl font-semibold tracking-tight">
                        {industry.title}
                      </h3>
                      <p className="mb-6 line-clamp-4 text-muted-foreground">
                        {industry.fullDescription}
                      </p>
                    </div>

                    {/* Stats Grid */}
                    <div className="mb-6 grid grid-cols-3 gap-4">
                      {industry.stats.map((stat, i) => (
                        <div key={i} className="text-center">
                          <div className="text-lg font-semibold text-accent">{stat.value}</div>
                          <div className="text-xs text-muted-foreground whitespace-nowrap">
                            {stat.label}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Learn More Link */}
                    <div
                      className={cn(
                        'inline-flex items-center text-sm font-medium',
                        'text-accent transition-colors group-hover:text-accent/80',
                        'mt-auto'
                      )}
                    >
                      Learn more
                      <ArrowRight className="ml-1 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </div>

                    {/* Decorative gradient */}
                    <div
                      className={cn(
                        'absolute inset-0 -z-10 opacity-0',
                        'bg-gradient-to-br',
                        industry.gradient,
                        'transition-opacity duration-300 group-hover:opacity-100'
                      )}
                      aria-hidden="true"
                    />
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeaturedIndustries;
