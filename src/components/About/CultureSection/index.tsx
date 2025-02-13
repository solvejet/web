// src/components/About/CultureSection/index.tsx
'use client';

import { motion } from 'framer-motion';
import { Book, Brain, Coffee, Heart, Users2, Rocket } from 'lucide-react';
import { cn } from '@/lib/utils';

const culturePoints = [
  {
    icon: Users2,
    title: 'Collaborative Environment',
    description:
      'Team-oriented workspace fostering creativity and knowledge sharing among diverse professionals',
    gradient: 'from-blue-500/20 to-indigo-500/20',
  },
  {
    icon: Book,
    title: 'Continuous Learning',
    description:
      'Regular training, workshops, and skill development programs to keep you ahead in technology',
    gradient: 'from-emerald-500/20 to-teal-500/20',
  },
  {
    icon: Brain,
    title: 'Innovation Culture',
    description: 'Freedom to experiment with new technologies and approaches to problem-solving',
    gradient: 'from-purple-500/20 to-pink-500/20',
  },
  {
    icon: Coffee,
    title: 'Open Communication',
    description: 'Direct access to leadership and transparent decision-making processes',
    gradient: 'from-orange-500/20 to-red-500/20',
  },
  {
    icon: Rocket,
    title: 'Career Growth',
    description: 'Clear advancement paths and opportunities to lead innovative projects',
    gradient: 'from-cyan-500/20 to-blue-500/20',
  },
  {
    icon: Heart,
    title: 'Health & Wellness',
    description:
      'Comprehensive benefits including health insurance, wellness programs, and mental health support',
    gradient: 'from-amber-500/20 to-yellow-500/20',
  },
] as const;

export default function CultureSection() {
  return (
    <section className="relative overflow-hidden bg-background py-24 lg:py-32">
      <div className="container relative mx-auto px-4">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl"
          >
            Our Company
            <span className="block bg-gradient-to-r from-accent to-accent/60 bg-clip-text text-transparent">
              Culture
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-6 text-lg text-muted-foreground"
          >
            Building a workplace where innovation thrives and people grow
          </motion.p>
        </div>

        {/* Culture Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {culturePoints.map((point, index) => {
            const Icon = point.icon;
            return (
              <motion.div
                key={point.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group relative h-full"
              >
                <div
                  className={cn(
                    'relative flex h-full flex-col overflow-hidden rounded-2xl border border-border/50',
                    'bg-background/50 p-8 transition-all duration-300',
                    'hover:border-accent/50 hover:shadow-lg'
                  )}
                >
                  <div
                    className={cn(
                      'absolute inset-0 -z-10 opacity-0',
                      'transition-opacity duration-300 group-hover:opacity-100',
                      'bg-gradient-to-br',
                      point.gradient
                    )}
                  />

                  <div className="relative z-10 flex h-full flex-col">
                    <div className="mb-6 inline-flex rounded-xl bg-accent/10 p-3 text-accent transition-colors group-hover:bg-accent/20">
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="mb-3 text-xl font-semibold">{point.title}</h3>
                    <p className="flex-grow text-muted-foreground">{point.description}</p>
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
