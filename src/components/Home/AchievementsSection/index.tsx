// src/components/Home/AchievementsSection/index.tsx
'use client';

import { useCallback } from 'react';
import { motion } from 'framer-motion';
import {
  Award,
  Users,
  Building2,
  CheckCircle2,
  Briefcase,
  Globe,
  ShieldCheck,
  Clock,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const achievements = [
  {
    icon: Building2,
    label: 'Global Clients',
    value: '50+',
    description: 'Trusted by businesses worldwide',
    color: 'from-blue-500/20 to-purple-500/20',
  },
  {
    icon: Users,
    label: 'Team Strength',
    value: '15+',
    description: 'Skilled professionals',
    color: 'from-emerald-500/20 to-cyan-500/20',
  },
  {
    icon: Award,
    label: 'Client Satisfaction',
    value: '98%',
    description: 'Consistently exceeding expectations',
    color: 'from-orange-500/20 to-red-500/20',
  },
  {
    icon: CheckCircle2,
    label: 'Projects Delivered',
    value: '70+',
    description: 'Successfully completed projects',
    color: 'from-indigo-500/20 to-blue-500/20',
  },
  {
    icon: Briefcase,
    label: 'Industries Served',
    value: '5+',
    description: 'Across diverse sectors',
    color: 'from-pink-500/20 to-rose-500/20',
  },
  {
    icon: Globe,
    label: 'Countries',
    value: '2+',
    description: 'Global presence',
    color: 'from-violet-500/20 to-purple-500/20',
  },
  {
    icon: ShieldCheck,
    label: 'ISO Certified',
    value: '27001:2022',
    description: 'Information Security Management',
    color: 'from-teal-500/20 to-emerald-500/20',
  },
  {
    icon: Clock,
    label: 'Years of Excellence',
    value: '5+',
    description: 'Industry experience',
    color: 'from-cyan-500/20 to-blue-500/20',
  },
] as const;

const AchievementsSection = () => {
  // Track hover interactions for analytics
  const handleStatHover = useCallback((statLabel: string) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'stat_hover', {
        event_category: 'Achievement Stats',
        event_label: statLabel,
      });
    }
  }, []);

  return (
    <section className="relative overflow-hidden py-24 lg:py-32">
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0 opacity-[0.15]"
          style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, var(--border) 1px, transparent 0)',
            backgroundSize: '40px 40px',
            maskImage: 'linear-gradient(to bottom, transparent, black, transparent)',
            WebkitMaskImage: 'linear-gradient(to bottom, transparent, black, transparent)',
          }}
        />
      </div>

      <div className="container relative mx-auto px-4">
        {/* Section Header */}
        <div className="mx-auto max-w-2xl text-center mb-16">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-sm font-semibold uppercase tracking-wider text-accent"
          >
            Our Impact
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl"
          >
            Driving Success Through
            <span className="block bg-gradient-to-r from-accent to-accent/60 bg-clip-text text-transparent">
              Digital Excellence
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-6 text-lg text-muted-foreground"
          >
            Our track record of delivering exceptional results speaks for itself
          </motion.p>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {achievements.map((stat, index) => {
            const Icon = stat.icon;

            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                onMouseEnter={() => handleStatHover(stat.label)}
                className="group relative"
              >
                <div
                  className={cn(
                    'absolute inset-0 rounded-2xl bg-gradient-to-br opacity-0',
                    'transition-opacity duration-300 group-hover:opacity-100',
                    stat.color
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
};

export default AchievementsSection;
