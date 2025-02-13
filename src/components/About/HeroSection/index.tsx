// src/components/About/HeroSection/index.tsx
'use client';

import { motion } from 'framer-motion';
import { Building2, Globe, ShieldCheck, Users } from 'lucide-react';
import { cn } from '@/lib/utils';

const stats = [
  {
    icon: Users,
    value: '15+',
    label: 'Team Members',
    description: 'Expert developers and engineers',
    gradient: 'from-blue-500/20 to-purple-500/20',
  },
  {
    icon: Globe,
    value: '2+',
    label: 'Countries',
    description: 'Global presence and reach',
    gradient: 'from-emerald-500/20 to-cyan-500/20',
  },
  {
    icon: Building2,
    value: '50+',
    label: 'Projects',
    description: 'Successfully delivered',
    gradient: 'from-amber-500/20 to-orange-500/20',
  },
  {
    icon: ShieldCheck,
    value: '27001',
    label: 'ISO Certified',
    description: 'Quality assured processes',
    gradient: 'from-indigo-500/20 to-blue-500/20',
  },
] as const;

export default function HeroSection() {
  return (
    <section className="relative min-h-[80vh] overflow-hidden px-4 pt-20">
      {/* Background pattern */}
      <div
        className="absolute inset-0 opacity-[0.15]"
        style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, var(--border) 1px, transparent 0)',
          backgroundSize: '40px 40px',
          maskImage: 'linear-gradient(to bottom, black 80%, transparent)',
          WebkitMaskImage: 'linear-gradient(to bottom, black 80%, transparent)',
        }}
        aria-hidden="true"
      />

      <div className="container relative mx-auto">
        {/* Hero Content */}
        <div className="mx-auto max-w-4xl text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-sm font-semibold uppercase tracking-wider text-accent"
          >
            About SolveJet
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl"
          >
            Crafting Digital Excellence with{' '}
            <span className="bg-gradient-to-r from-accent to-accent/60 bg-clip-text text-transparent">
              Purpose & Passion
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground"
          >
            We are more than just a software development company. We are innovators,
            problem-solvers, and digital transformation partners committed to your success.
          </motion.p>
        </div>

        {/* Stats Grid */}
        <div className="mt-20 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => {
            const Icon = stat.icon;

            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
                className="group relative"
              >
                <div
                  className={cn(
                    'absolute inset-0 rounded-2xl bg-gradient-to-br opacity-0',
                    'transition-opacity duration-300 group-hover:opacity-100',
                    stat.gradient
                  )}
                  aria-hidden="true"
                />

                <div className="relative space-y-6 rounded-2xl border border-border/50 bg-background/50 p-6 transition-all duration-300 group-hover:border-accent/50">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 text-accent transition-colors duration-300 group-hover:bg-accent/20">
                    <Icon className="h-6 w-6" />
                  </div>

                  <div>
                    <div className="text-3xl font-bold tracking-tight">{stat.value}</div>
                    <div className="mt-2 font-medium text-foreground">{stat.label}</div>
                    <div className="mt-1 text-sm text-muted-foreground">{stat.description}</div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
