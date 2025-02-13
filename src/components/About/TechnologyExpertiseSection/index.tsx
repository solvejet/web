// src/components/About/TechnologyExpertiseSection/index.tsx
'use client';

import { motion } from 'framer-motion';
import { Code2, Server, Database, Cloud, Smartphone, Layout } from 'lucide-react';
import { cn } from '@/lib/utils';

const expertiseAreas = [
  {
    icon: Code2,
    title: 'Frontend Development',
    description:
      'Expert in building responsive, performant, and accessible web applications using modern frameworks and best practices',
    technologies: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS'],
    years: 5,
    gradient: 'from-blue-500/20 to-indigo-500/20',
  },
  {
    icon: Server,
    title: 'Backend Development',
    description:
      'Building robust, scalable server architectures with focus on security, performance, and maintainability',
    technologies: ['Node.js', 'Python', 'Java', 'GraphQL'],
    years: 5,
    gradient: 'from-emerald-500/20 to-teal-500/20',
  },
  {
    icon: Database,
    title: 'Database Management',
    description:
      'Designing and optimizing database architectures for high-performance data operations and scalability',
    technologies: ['PostgreSQL', 'MongoDB', 'Redis', 'MySQL'],
    years: 5,
    gradient: 'from-purple-500/20 to-pink-500/20',
  },
  {
    icon: Cloud,
    title: 'Cloud Services',
    description:
      'Implementing cloud-native solutions with focus on scalability, reliability, and cost optimization',
    technologies: ['AWS', 'Azure', 'Google Cloud', 'Docker'],
    years: 4,
    gradient: 'from-cyan-500/20 to-blue-500/20',
  },
  {
    icon: Smartphone,
    title: 'Mobile Development',
    description:
      'Creating high-performance native and cross-platform mobile applications with seamless user experience',
    technologies: ['React Native', 'iOS', 'Android', 'Flutter'],
    years: 3,
    gradient: 'from-amber-500/20 to-orange-500/20',
  },
  {
    icon: Layout,
    title: 'UI/UX Design',
    description:
      'Crafting user-centered designs with focus on accessibility, usability, and modern design principles',
    technologies: ['Figma', 'Adobe XD', 'Sketch', 'Prototyping'],
    years: 4,
    gradient: 'from-violet-500/20 to-purple-500/20',
  },
] as const;

export default function TechnologyExpertiseSection() {
  return (
    <section
      className="relative overflow-hidden bg-background py-24 lg:py-32"
      aria-labelledby="technology-expertise-title"
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
            id="technology-expertise-title"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl"
          >
            Technology
            <span className="block bg-gradient-to-r from-accent to-accent/60 bg-clip-text text-transparent">
              Expertise
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-6 text-lg text-muted-foreground"
          >
            Leveraging cutting-edge technologies to deliver innovative solutions
          </motion.p>
        </header>

        {/* Expertise Grid */}
        <div
          className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
          role="list"
          aria-label="Technology expertise areas"
        >
          {expertiseAreas.map((area, index) => {
            const Icon = area.icon;
            return (
              <motion.div
                key={area.title}
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
                      area.gradient
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
                    <h3 className="mb-2 text-xl font-semibold">{area.title}</h3>
                    <p className="mb-4 flex-grow text-muted-foreground">{area.description}</p>

                    <div
                      className="mb-4 flex flex-wrap gap-2"
                      aria-label={`${area.title} technologies`}
                    >
                      {area.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="rounded-full bg-accent/10 px-3 py-1 text-xs font-medium text-accent"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    <div className="text-sm text-muted-foreground">
                      <span className="font-medium">{area.years}+</span> years of experience
                    </div>
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
