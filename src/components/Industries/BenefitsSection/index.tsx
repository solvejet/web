// src/components/Industries/BenefitsSection/index.tsx
'use client';

import { motion } from 'framer-motion';
import { Cpu, Shield, Rocket, BarChart, Globe, Users, type LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Benefit {
  icon: LucideIcon;
  title: string;
  description: string;
  gradient: string;
}

const benefits: Benefit[] = [
  {
    icon: Cpu,
    title: 'Industry-Specific Technology',
    description:
      'Custom solutions designed for your sector&apos;s unique requirements and challenges',
    gradient: 'from-blue-500/20 to-indigo-500/20',
  },
  {
    icon: Shield,
    title: 'Regulatory Compliance',
    description: 'Built-in compliance with industry standards and regulations',
    gradient: 'from-green-500/20 to-emerald-500/20',
  },
  {
    icon: Rocket,
    title: 'Rapid Implementation',
    description: 'Quick deployment with industry-tested frameworks and methodologies',
    gradient: 'from-purple-500/20 to-pink-500/20',
  },
  {
    icon: BarChart,
    title: 'Performance Analytics',
    description: 'Sector-specific KPIs and metrics for data-driven decisions',
    gradient: 'from-amber-500/20 to-orange-500/20',
  },
  {
    icon: Globe,
    title: 'Scalable Solutions',
    description: 'Grow and adapt your technology as your business expands',
    gradient: 'from-cyan-500/20 to-blue-500/20',
  },
  {
    icon: Users,
    title: 'Expert Support',
    description: 'Access to industry specialists and technical experts',
    gradient: 'from-red-500/20 to-rose-500/20',
  },
];

const BenefitsSection = () => {
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
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl"
          >
            Why Choose Our
            <span className="block bg-gradient-to-r from-accent to-accent/60 bg-clip-text text-transparent">
              Industry Solutions
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-6 text-lg text-muted-foreground"
          >
            Industry-specific expertise combined with cutting-edge technology to drive your success
          </motion.p>
        </div>

        {/* Benefits Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;

            return (
              <motion.div
                key={benefit.title}
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
                    'hover:border-accent/50 hover:shadow-lg'
                  )}
                >
                  {/* Benefit Icon */}
                  <div
                    className={cn(
                      'mb-6 inline-flex rounded-xl bg-accent/10 p-3',
                      'text-accent transition-colors group-hover:bg-accent/20'
                    )}
                  >
                    <Icon className="h-6 w-6" />
                  </div>

                  {/* Benefit Content */}
                  <h3 className="mb-3 text-xl font-semibold">{benefit.title}</h3>
                  <p className="text-muted-foreground">{benefit.description}</p>

                  {/* Background Gradient */}
                  <div
                    className={cn(
                      'absolute inset-0 -z-10 opacity-0',
                      'bg-gradient-to-br',
                      benefit.gradient,
                      'transition-opacity duration-300 group-hover:opacity-100'
                    )}
                    aria-hidden="true"
                  />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 rounded-2xl border border-border/50 bg-background/50 p-8"
        >
          <div className="grid gap-8 md:grid-cols-4">
            <div className="text-center">
              <div className="text-4xl font-bold text-accent">20+</div>
              <div className="mt-2 text-sm text-muted-foreground">Industry Solutions</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-accent">95%</div>
              <div className="mt-2 text-sm text-muted-foreground">Client Satisfaction</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-accent">5+</div>
              <div className="mt-2 text-sm text-muted-foreground">Years Experience</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-accent">50+</div>
              <div className="mt-2 text-sm text-muted-foreground">Successful Projects</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default BenefitsSection;
