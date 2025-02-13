// src/components/About/JoinTeamSection/index.tsx
'use client';

import { motion } from 'framer-motion';
import { Briefcase, ArrowUpRight, Star } from 'lucide-react';
import Button from '@/components/ui/Button';

const benefits = [
  {
    title: 'Flexible Work',
    description: 'Remote-first culture with flexible hours',
  },
  {
    title: 'Growth & Learning',
    description: 'Professional development opportunities',
  },
  {
    title: 'Health Benefits',
    description: 'Comprehensive health insurance coverage',
  },
  {
    title: 'Latest Tech Stack',
    description: 'Work with cutting-edge technologies',
  },
  {
    title: 'Work-Life Balance',
    description: 'Focus on sustainable work practices',
  },
  {
    title: 'Global Team',
    description: 'Collaborate with talent worldwide',
  },
] as const;

const positions = [
  {
    title: 'Senior Frontend Developer',
    type: 'Full-time',
    location: 'Remote',
    department: 'Engineering',
    experience: '5+ years',
  },
  {
    title: 'Backend Engineer',
    type: 'Full-time',
    location: 'Remote',
    department: 'Engineering',
    experience: '3+ years',
  },
  {
    title: 'DevOps Engineer',
    type: 'Full-time',
    location: 'Remote',
    department: 'Operations',
    experience: '4+ years',
  },
] as const;

export default function JoinTeamSection() {
  return (
    <section className="relative overflow-hidden bg-background py-24 lg:py-32">
      <div className="container relative mx-auto px-4">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-4 flex items-center justify-center gap-2 text-accent"
          >
            <Briefcase className="h-5 w-5" />
            <span className="text-sm font-semibold uppercase tracking-wider">Join Our Team</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl"
          >
            Build Your Career with
            <span className="block bg-gradient-to-r from-accent to-accent/60 bg-clip-text text-transparent">
              SolveJet
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-6 text-lg text-muted-foreground"
          >
            Join our team of innovators and help shape the future of technology
          </motion.p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Benefits */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-2xl border border-border/50 bg-background/50 p-8"
          >
            <h3 className="mb-8 text-2xl font-bold">Why Join Us?</h3>

            <div className="grid gap-6 sm:grid-cols-2">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={benefit.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start gap-4"
                >
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-accent/10 text-accent">
                    <Star className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="font-medium">{benefit.title}</h4>
                    <p className="mt-1 text-sm text-muted-foreground">{benefit.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Open Positions */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-2xl border border-border/50 bg-background/50 p-8"
          >
            <h3 className="mb-8 text-2xl font-bold">Open Positions</h3>

            <div className="space-y-6">
              {positions.map((position, index) => (
                <motion.div
                  key={position.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="group relative overflow-hidden rounded-xl border border-border/50 bg-background/50 p-6 transition-all hover:border-accent/50"
                >
                  <div className="mb-4 flex items-start justify-between gap-4">
                    <div>
                      <h4 className="font-medium">{position.title}</h4>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {position.department} · {position.type} · {position.location}
                      </p>
                    </div>
                    <Button
                      href="/careers"
                      variant="outline"
                      size="sm"
                      className="shrink-0"
                      icon={<ArrowUpRight className="h-4 w-4" />}
                    >
                      Apply Now
                    </Button>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Experience: {position.experience}
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="mt-8 text-center">
              <Button
                href="/careers"
                variant="outline"
                size="lg"
                icon={<ArrowUpRight className="h-4 w-4" />}
              >
                View All Positions
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
