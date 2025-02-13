// src/components/About/CSRSection/index.tsx
'use client';

import { motion } from 'framer-motion';
import { Leaf, Heart, BookOpen, Globe } from 'lucide-react';
import { cn } from '@/lib/utils';

const initiatives = [
  {
    icon: Leaf,
    title: 'Environmental Sustainability',
    description:
      'Leading by example in reducing environmental impact through innovative technology practices and sustainable operations',
    points: [
      'Carbon-neutral cloud operations and green hosting',
      'Comprehensive e-waste recycling and management',
      'Digital-first, paperless workplace solutions',
    ],
    gradient: 'from-green-500/20 to-emerald-500/20',
  },
  {
    icon: Heart,
    title: 'Community Support',
    description:
      'Empowering local communities through technology initiatives and sustainable development programs',
    points: [
      'Free coding bootcamps for underserved communities',
      'Technology grants for local non-profits',
      'Mentorship programs for tech startups',
    ],
    gradient: 'from-red-500/20 to-pink-500/20',
  },
  {
    icon: BookOpen,
    title: 'Education Initiatives',
    description:
      'Investing in the future of technology through comprehensive educational programs and partnerships',
    points: [
      'University collaboration programs',
      'STEM education sponsorships',
      'Industry-academia research projects',
    ],
    gradient: 'from-blue-500/20 to-indigo-500/20',
  },
  {
    icon: Globe,
    title: 'Global Impact',
    description:
      'Contributing to worldwide technological advancement while promoting accessibility and inclusion',
    points: [
      'Open source project contributions',
      'Global digital literacy campaigns',
      'Cross-border tech innovation programs',
    ],
    gradient: 'from-purple-500/20 to-violet-500/20',
  },
] as const;

export default function CSRSection() {
  return (
    <section
      className="relative overflow-hidden bg-background py-24 lg:py-32"
      aria-labelledby="csr-title"
    >
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
        <header className="mx-auto max-w-3xl text-center mb-16">
          <motion.h2
            id="csr-title"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl"
          >
            Corporate Social
            <span className="block bg-gradient-to-r from-accent to-accent/60 bg-clip-text text-transparent">
              Responsibility
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-6 text-lg text-muted-foreground"
          >
            Making a positive impact through technology and community engagement
          </motion.p>
        </header>

        {/* Initiatives Grid */}
        <div className="grid gap-8 md:grid-cols-2" role="list" aria-label="CSR initiatives">
          {initiatives.map((initiative, index) => {
            const Icon = initiative.icon;
            return (
              <motion.div
                key={initiative.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group relative h-full"
                role="listitem"
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
                      initiative.gradient
                    )}
                    aria-hidden="true"
                  />

                  <div className="relative z-10 flex h-full flex-col">
                    <div
                      className="mb-6 inline-flex rounded-xl bg-accent/10 p-3 text-accent transition-colors group-hover:bg-accent/20"
                      aria-hidden="true"
                    >
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="mb-2 text-xl font-semibold">{initiative.title}</h3>
                    <p className="mb-6 flex-grow text-muted-foreground">{initiative.description}</p>

                    <ul className="space-y-2" aria-label={`${initiative.title} key points`}>
                      {initiative.points.map((point) => (
                        <li key={point} className="flex items-center gap-2">
                          <div className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
                          <span className="text-sm text-muted-foreground">{point}</span>
                        </li>
                      ))}
                    </ul>
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
