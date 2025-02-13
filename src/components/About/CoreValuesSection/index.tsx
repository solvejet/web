// src/components/About/CoreValuesSection/index.tsx
'use client';

import { motion } from 'framer-motion';
import { Heart, Lightbulb, Shield, Users, Target, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';

const values = [
  {
    icon: Lightbulb,
    title: 'Innovation',
    description:
      'Continuously pushing boundaries and exploring new technologies to deliver cutting-edge solutions.',
    gradient: 'from-blue-500/20 to-purple-500/20',
  },
  {
    icon: Shield,
    title: 'Quality',
    description:
      'Maintaining the highest standards in code quality, security, and project delivery.',
    gradient: 'from-emerald-500/20 to-cyan-500/20',
  },
  {
    icon: Users,
    title: 'Collaboration',
    description: 'Working closely with clients as true partners in their digital journey.',
    gradient: 'from-amber-500/20 to-orange-500/20',
  },
  {
    icon: Heart,
    title: 'Passion',
    description: 'Bringing enthusiasm and dedication to every project we undertake.',
    gradient: 'from-pink-500/20 to-rose-500/20',
  },
  {
    icon: Target,
    title: 'Results',
    description: 'Focusing on delivering measurable business value and tangible outcomes.',
    gradient: 'from-violet-500/20 to-purple-500/20',
  },
  {
    icon: Zap,
    title: 'Agility',
    description: 'Adapting quickly to changes and maintaining flexibility in our approach.',
    gradient: 'from-indigo-500/20 to-blue-500/20',
  },
] as const;

export default function CoreValuesSection() {
  return (
    <section className="relative overflow-hidden bg-background py-24 lg:py-32">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-accent/5 via-transparent to-accent/5" />
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
        <div className="mx-auto max-w-2xl text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl"
          >
            Our Core
            <span className="block bg-gradient-to-r from-accent to-accent/60 bg-clip-text text-transparent">
              Values
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-6 text-lg text-muted-foreground"
          >
            The principles that guide our work and shape our culture
          </motion.p>
        </div>

        {/* Values Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {values.map((value, index) => {
            const Icon = value.icon;

            return (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group relative"
              >
                <div
                  className={cn(
                    'absolute inset-0 rounded-2xl bg-gradient-to-br opacity-0',
                    'transition-opacity duration-300 group-hover:opacity-100',
                    value.gradient
                  )}
                  aria-hidden="true"
                />

                <div className="relative flex h-full flex-col rounded-2xl border border-border/50 bg-background/50 p-8 transition-all duration-300 group-hover:border-accent/50">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 text-accent transition-colors duration-300 group-hover:bg-accent/20">
                    <Icon className="h-6 w-6" />
                  </div>

                  <div className="mt-6 flex h-full flex-col">
                    <h3 className="text-xl font-bold">{value.title}</h3>
                    <p className="mt-2 flex-grow text-muted-foreground">{value.description}</p>
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
