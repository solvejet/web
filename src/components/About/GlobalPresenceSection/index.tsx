// src/components/About/GlobalPresenceSection/index.tsx
'use client';

import { motion } from 'framer-motion';
import { Globe2, Users2, Building2, Briefcase } from 'lucide-react';
import { cn } from '@/lib/utils';

const regions = [
  {
    name: 'North America',
    offices: ['United States'],
    clients: 25,
    projects: 30,
    team: 10,
  },
  {
    name: 'Asia Pacific',
    offices: ['India'],
    clients: 25,
    projects: 40,
    team: 5,
  },
] as const;

const metrics = [
  {
    icon: Globe2,
    value: '2+',
    label: 'Countries',
    gradient: 'from-blue-500/20 to-indigo-500/20',
  },
  {
    icon: Users2,
    value: '50+',
    label: 'Global Clients',
    gradient: 'from-emerald-500/20 to-teal-500/20',
  },
  {
    icon: Building2,
    value: '2',
    label: 'Office Locations',
    gradient: 'from-purple-500/20 to-pink-500/20',
  },
  {
    icon: Briefcase,
    value: '70+',
    label: 'Projects Delivered',
    gradient: 'from-amber-500/20 to-orange-500/20',
  },
] as const;

export default function GlobalPresenceSection() {
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
            Global
            <span className="block bg-gradient-to-r from-accent to-accent/60 bg-clip-text text-transparent">
              Presence
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-6 text-lg text-muted-foreground"
          >
            Delivering excellence across borders with our worldwide network
          </motion.p>
        </div>

        {/* Metrics Grid */}
        <div className="mb-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {metrics.map((metric, index) => {
            const Icon = metric.icon;
            return (
              <motion.div
                key={metric.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group relative"
              >
                <div
                  className={cn(
                    'relative overflow-hidden rounded-2xl border border-border/50',
                    'bg-background/50 p-8 text-center transition-all duration-300',
                    'hover:border-accent/50 hover:shadow-lg'
                  )}
                >
                  <div
                    className={cn(
                      'absolute inset-0 -z-10 opacity-0',
                      'transition-opacity duration-300 group-hover:opacity-100',
                      'bg-gradient-to-br',
                      metric.gradient
                    )}
                  />

                  <div className="relative z-10">
                    <div className="mx-auto mb-6 inline-flex rounded-xl bg-accent/10 p-3 text-accent transition-colors group-hover:bg-accent/20">
                      <Icon className="h-6 w-6" />
                    </div>
                    <div className="text-3xl font-bold">{metric.value}</div>
                    <div className="mt-2 text-muted-foreground">{metric.label}</div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Regions Grid */}
        <div className="grid gap-8 md:grid-cols-2">
          {regions.map((region, index) => (
            <motion.div
              key={region.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 + index * 0.1 }}
              className="relative overflow-hidden rounded-2xl border border-border/50 bg-background/50 p-8"
            >
              <h3 className="mb-6 text-2xl font-bold">{region.name}</h3>

              <div className="mb-6">
                <h4 className="mb-2 font-semibold text-accent">Offices</h4>
                <ul className="space-y-2">
                  {region.offices.map((office) => (
                    <li key={office} className="text-muted-foreground">
                      {office}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <div className="text-2xl font-bold">{region.clients}</div>
                  <div className="text-sm text-muted-foreground">Clients</div>
                </div>
                <div>
                  <div className="text-2xl font-bold">{region.projects}</div>
                  <div className="text-sm text-muted-foreground">Projects</div>
                </div>
                <div>
                  <div className="text-2xl font-bold">{region.team}</div>
                  <div className="text-sm text-muted-foreground">Team Members</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
