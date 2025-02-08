// src/components/Home/FeaturedProjects/index.tsx
'use client';

import { motion } from 'framer-motion';
import { ArrowUpRight, Rocket, ArrowRight } from 'lucide-react';
import Button from '@/components/ui/Button';

const projects = [
  {
    title: 'E-Learning Platform',
    description:
      'Modern online learning platform with interactive courses, live sessions, and progress tracking. Built for scale with real-time collaboration.',
    tech: ['Next.js', 'TypeScript', 'MongoDB', 'WebRTC'],
    industry: 'Education',
    gradient: 'from-blue-500/20 to-purple-500/20',
    results: ['50K+ Active Users', '98% Success Rate'],
  },
  {
    title: 'Healthcare Analytics',
    description:
      'AI-powered analytics dashboard helping healthcare providers make data-driven decisions with predictive insights and patient monitoring.',
    tech: ['React', 'Python', 'TensorFlow', 'AWS'],
    industry: 'Healthcare',
    gradient: 'from-emerald-500/20 to-cyan-500/20',
    results: ['30% Cost Reduction', '45% Faster Diagnosis'],
  },
  {
    title: 'FinTech Solution',
    description:
      'Secure financial management platform enabling real-time transactions, portfolio management, and automated reporting.',
    tech: ['Node.js', 'React', 'PostgreSQL', 'Redis'],
    industry: 'Finance',
    gradient: 'from-orange-500/20 to-red-500/20',
    results: ['$2M+ Processed', '99.9% Uptime'],
  },
  {
    title: 'Supply Chain Platform',
    description:
      'End-to-end supply chain management solution with real-time tracking, inventory management, and predictive analytics.',
    tech: ['React', 'Node.js', 'GraphQL', 'Docker'],
    industry: 'Logistics',
    gradient: 'from-indigo-500/20 to-blue-500/20',
    results: ['40% Efficiency Gain', '28% Cost Savings'],
  },
  {
    title: 'Smart Retail System',
    description:
      'IoT-enabled retail management system with inventory tracking, customer analytics, and automated restocking.',
    tech: ['React Native', 'Python', 'TensorFlow', 'AWS'],
    industry: 'Retail',
    gradient: 'from-pink-500/20 to-rose-500/20',
    results: ['35% Sales Increase', '45% Time Saved'],
  },
  {
    title: 'Real Estate Platform',
    description:
      'Comprehensive real estate management platform with virtual tours, automated valuations, and market analytics.',
    tech: ['Vue.js', 'Django', 'PostgreSQL', 'AWS'],
    industry: 'Real Estate',
    gradient: 'from-teal-500/20 to-emerald-500/20',
    results: ['500+ Properties', '3x Lead Generation'],
  },
] as const;

export default function FeaturedProjects() {
  return (
    <section className="relative overflow-hidden py-24 lg:py-32">
      {/* Background elements */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/5 to-transparent"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: 'radial-gradient(circle at 4px 4px, var(--border) 2px, transparent 0)',
          backgroundSize: '48px 48px',
          opacity: 0.2,
          maskImage: 'linear-gradient(to bottom, transparent, black, transparent)',
          WebkitMaskImage: 'linear-gradient(to bottom, transparent, black, transparent)',
        }}
        aria-hidden="true"
      />

      <div className="container relative mx-auto px-4">
        {/* Section Header */}
        <div className="mb-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-4 flex items-center justify-center gap-2 text-accent"
          >
            <Rocket className="h-5 w-5" />
            <span className="text-sm font-semibold uppercase tracking-wider">Featured Work</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl"
          >
            Transforming Ideas into{' '}
            <span className="bg-gradient-to-r from-accent to-accent/60 bg-clip-text text-transparent">
              Digital Success
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mx-auto max-w-2xl text-muted-foreground"
          >
            Explore our portfolio of successful projects where we&apos;ve helped businesses achieve
            their
          </motion.p>
        </div>

        {/* Projects Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative overflow-hidden rounded-2xl border border-border/50 bg-background/50 p-8"
            >
              {/* Project gradient background */}
              <div
                className={`absolute inset-0 opacity-0 bg-gradient-to-br ${project.gradient} transition-opacity duration-300 group-hover:opacity-100`}
                aria-hidden="true"
              />

              {/* Content */}
              <div className="relative space-y-4">
                <div className="space-y-2">
                  <div className="text-sm font-medium text-accent">{project.industry}</div>
                  <h3 className="text-xl font-semibold tracking-tight">{project.title}</h3>
                  <p className="text-sm text-muted-foreground">{project.description}</p>
                </div>

                {/* Tech stack */}
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full bg-accent/10 px-3 py-1 text-xs font-medium text-accent"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Results */}
                <div className="flex items-center gap-4 pt-4 text-sm">
                  {project.results.map((result) => (
                    <div key={result} className="flex items-center gap-1 font-medium">
                      <ArrowRight className="h-3 w-3 text-accent" />
                      {result}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <Button
            href="/portfolio"
            variant="outline"
            size="lg"
            icon={<ArrowUpRight className="h-4 w-4" />}
          >
            View Full Portfolio
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
