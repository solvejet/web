// src/components/ServiceDetails/TechnologyConsulting/ServicesSection/index.tsx
'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import {
  ArrowRight,
  LineChart,
  Shield,
  Network,
  Users,
  Lock,
  Building,
  CloudCog,
  Database,
  BarChart3,
  Brain,
  Settings,
  FileCode2,
  Factory,
  Search,
  Lightbulb,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import Button from '@/components/ui/Button';

const services = [
  {
    id: 'strategy',
    title: 'Strategic IT Consulting',
    description: 'Align technology with your business objectives',
    icon: Lightbulb,
    features: [
      {
        title: 'Digital Strategy',
        description: 'Strategic roadmap development',
        icon: ArrowRight,
      },
      {
        title: 'IT Assessment',
        description: 'Current state analysis',
        icon: Search,
      },
      {
        title: 'Process Optimization',
        description: 'Workflow improvement',
        icon: Settings,
      },
      {
        title: 'Innovation Planning',
        description: 'Future-ready solutions',
        icon: Brain,
      },
    ],
    color: 'from-blue-500/20 to-blue-600/20',
  },
  {
    id: 'transformation',
    title: 'Digital Transformation',
    description: 'Modernize your business operations',
    icon: Factory,
    features: [
      {
        title: 'Legacy Modernization',
        description: 'System upgrades and migration',
        icon: FileCode2,
      },
      {
        title: 'Cloud Migration',
        description: 'Cloud-first strategies',
        icon: CloudCog,
      },
      {
        title: 'Data Analytics',
        description: 'Data-driven insights',
        icon: BarChart3,
      },
      {
        title: 'Digital Integration',
        description: 'Seamless system integration',
        icon: Network,
      },
    ],
    color: 'from-purple-500/20 to-purple-600/20',
  },
  {
    id: 'security',
    title: 'Security & Compliance',
    description: 'Protect your digital assets',
    icon: Shield,
    features: [
      {
        title: 'Security Audit',
        description: 'Comprehensive assessment',
        icon: Search,
      },
      {
        title: 'Risk Management',
        description: 'Proactive protection',
        icon: Lock,
      },
      {
        title: 'Compliance',
        description: 'Regulatory adherence',
        icon: Building,
      },
      {
        title: 'Employee Training',
        description: 'Security awareness',
        icon: Users,
      },
    ],
    color: 'from-emerald-500/20 to-emerald-600/20',
  },
  {
    id: 'analytics',
    title: 'Data & Analytics',
    description: 'Transform data into insights',
    icon: LineChart,
    features: [
      {
        title: 'Data Strategy',
        description: 'Architecture planning',
        icon: Database,
      },
      {
        title: 'BI Solutions',
        description: 'Business intelligence',
        icon: BarChart3,
      },
      {
        title: 'Predictive Analytics',
        description: 'Future insights',
        icon: Brain,
      },
      {
        title: 'Data Integration',
        description: 'Unified data platform',
        icon: Network,
      },
    ],
    color: 'from-pink-500/20 to-pink-600/20',
  },
] as const;

const ConsultingServicesSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const sectionOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.6, 1, 1, 0.6]);

  return (
    <section ref={containerRef} className="relative bg-background py-24 lg:py-32">
      <div className="container relative z-10 mx-auto px-4">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex rounded-full bg-accent/10 px-4 py-1.5 text-sm font-medium text-accent"
          >
            Our Services
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-6 text-4xl font-bold tracking-tight sm:text-5xl"
          >
            Technology Consulting
            <div className="mt-2 block bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent">
              Solutions
            </div>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-6 text-lg text-muted-foreground"
          >
            Transform your business with our comprehensive technology consulting services. Our
            expert team delivers strategic insights and actionable solutions.
          </motion.p>
        </div>

        {/* Services Grid */}
        <motion.div style={{ opacity: sectionOpacity }} className="mt-20 grid gap-8 md:grid-cols-2">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="group relative"
              >
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  transition={{
                    type: 'spring',
                    stiffness: 300,
                    damping: 20,
                  }}
                  className={cn(
                    'relative overflow-hidden rounded-2xl',
                    'border border-border/50 bg-background/50 p-8',
                    'backdrop-blur-sm transition-all duration-500',
                    'hover:border-accent/40 hover:shadow-2xl hover:shadow-accent/5'
                  )}
                >
                  {/* Service Header */}
                  <div className="relative z-10 mb-6 flex items-center gap-4">
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className={cn(
                        'flex h-16 w-16 items-center justify-center rounded-xl',
                        'bg-gradient-to-br transition-transform duration-300',
                        service.color
                      )}
                    >
                      <Icon className="h-8 w-8 text-accent" />
                    </motion.div>
                    <div>
                      <h3 className="text-2xl font-bold">{service.title}</h3>
                      <p className="mt-1 text-muted-foreground">{service.description}</p>
                    </div>
                  </div>

                  {/* Features Grid */}
                  <div className="grid gap-4 sm:grid-cols-2">
                    {service.features.map((feature, featureIndex) => {
                      const FeatureIcon = feature.icon;
                      return (
                        <motion.div
                          key={feature.title}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: index * 0.1 + featureIndex * 0.05 }}
                          className="relative rounded-xl border border-border/50 bg-background/50 p-4 transition-all duration-300 hover:border-accent/40"
                        >
                          <div className="flex items-center gap-3">
                            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-accent/10">
                              <FeatureIcon className="h-4 w-4 text-accent" />
                            </div>
                            <div>
                              <h4 className="font-medium">{feature.title}</h4>
                              <p className="mt-1 text-sm text-muted-foreground">
                                {feature.description}
                              </p>
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>

                  {/* Background Effects */}
                  <div
                    className={cn(
                      'absolute inset-0 -z-10 opacity-0 transition-opacity duration-500',
                      'group-hover:opacity-100',
                      'bg-gradient-to-br',
                      service.color
                    )}
                  />
                </motion.div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <Button
            href="/contact"
            variant="outline"
            className="group inline-flex items-center gap-2"
          >
            <span>Schedule a Consultation</span>
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Button>
        </motion.div>
      </div>

      {/* Background Effects */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-accent/5 via-transparent to-accent/5" />
        <div className="absolute inset-0 bg-[radial-gradient(40%_40%_at_50%_50%,var(--accent)/3%_0%,transparent_100%)]" />
      </div>
    </section>
  );
};

export default ConsultingServicesSection;
