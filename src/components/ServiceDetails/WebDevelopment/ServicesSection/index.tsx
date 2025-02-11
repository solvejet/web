// src/components/ServiceDetails/WebDevelopment/ServicesSection/index.tsx
'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, type MotionStyle } from 'framer-motion';
import { ArrowRight, Code2, Database, Globe, Library } from 'lucide-react';
import { cn } from '@/lib/utils';
import Button from '@/components/ui/Button';

const services = [
  {
    id: 'frontend',
    title: 'Frontend Development',
    description: 'Create engaging user interfaces with modern web technologies',
    icon: Code2,
    features: [
      'Responsive Web Design',
      'Single Page Applications',
      'Progressive Web Apps',
      'Cross-browser Compatibility',
      'Performance Optimization',
      'Modern UI/UX Implementation',
    ],
    color: 'from-blue-500/20 to-blue-600/20',
  },
  {
    id: 'backend',
    title: 'Backend Development',
    description: 'Robust server-side solutions and API development',
    icon: Database,
    features: [
      'RESTful API Development',
      'Database Architecture',
      'Server Management',
      'Authentication & Authorization',
      'Performance Scaling',
      'Security Implementation',
    ],
    color: 'from-purple-500/20 to-purple-600/20',
  },
  {
    id: 'fullstack',
    title: 'Full Stack Development',
    description: 'End-to-end web application development services',
    icon: Library,
    features: [
      'Complete Web Solutions',
      'System Integration',
      'Cloud Deployment',
      'Technical Architecture',
      'DevOps Implementation',
      'Continuous Integration',
    ],
    color: 'from-emerald-500/20 to-emerald-600/20',
  },
  {
    id: 'pwa',
    title: 'Progressive Web Apps',
    description: 'Modern web apps with native-like capabilities',
    icon: Globe,
    features: [
      'Offline Functionality',
      'Push Notifications',
      'App-like Experience',
      'Cross-platform Support',
      'Fast Loading Speed',
      'SEO Optimization',
    ],
    color: 'from-amber-500/20 to-amber-600/20',
  },
] as const;

const WebServicesSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  // Transform values for scroll-based animations
  const sectionOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.6, 1, 1, 0.6]);

  // Create separate transforms for each card
  const card1Transform = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, -80, -80, 0]);
  const card2Transform = useTransform(scrollYProgress, [0, 0.3, 0.9, 1], [0, -80, -80, 0]);
  const card3Transform = useTransform(scrollYProgress, [0, 0.4, 0.95, 1], [0, -80, -80, 0]);
  const card4Transform = useTransform(scrollYProgress, [0, 0.5, 1, 1], [0, -80, -80, 0]);

  const cardTransforms = [card1Transform, card2Transform, card3Transform, card4Transform];

  return (
    <section ref={containerRef} className="relative bg-background py-24 lg:py-32">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row lg:gap-16">
          {/* Sticky Left Section */}
          <div className="lg:sticky lg:top-32 lg:h-fit lg:w-[40%] lg:pt-24">
            <div className="flex flex-col">
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
                Web Development
                <span className="mt-2 block bg-gradient-to-r from-blue-500 to-indigo-500 bg-clip text-transparent">
                  Solutions
                </span>
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="mt-6 text-lg text-muted-foreground"
              >
                Transform your digital presence with our comprehensive web development solutions. We
                create scalable, secure, and high-performance applications tailored to your needs.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="mt-8"
              >
                <Button
                  href="/contact"
                  variant="outline"
                  className="group inline-flex items-center gap-2"
                >
                  <span>Start Your Project</span>
                  <ArrowRight className="inline-block h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Button>
              </motion.div>
            </div>
          </div>

          {/* Scrolling Cards Section */}
          <motion.div
            style={{ opacity: sectionOpacity } as MotionStyle}
            className="mt-16 lg:mt-0 lg:w-[60%] lg:pt-24"
          >
            <div className="relative">
              {services.map((service, index) => {
                const Icon = service.icon;
                return (
                  <motion.div
                    key={service.id}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-100px' }}
                    transition={{ duration: 0.5, delay: index * 0.2 }}
                    style={{ y: cardTransforms[index] } as MotionStyle}
                    className={cn('relative mb-6', index !== 0 && '-mt-4')}
                  >
                    <motion.div
                      whileHover={{
                        scale: 1.02,
                        y: -10,
                      }}
                      transition={{
                        type: 'spring',
                        stiffness: 300,
                        damping: 20,
                      }}
                      className={cn(
                        'group relative overflow-hidden rounded-2xl',
                        'border border-border/50 bg-background/50 p-8',
                        'backdrop-blur-sm transition-all duration-500',
                        'hover:border-accent/40 hover:shadow-2xl hover:shadow-accent/5',
                        'transform-gpu' // Add hardware acceleration
                      )}
                      style={
                        {
                          zIndex: services.length - index,
                        } as MotionStyle
                      }
                    >
                      {/* Service Content */}
                      <div className="relative z-10">
                        <motion.div
                          whileHover={{ scale: 1.1, rotate: 5 }}
                          className={cn(
                            'mb-6 inline-flex h-16 w-16 items-center justify-center rounded-xl',
                            'bg-gradient-to-br transition-transform duration-300',
                            service.color,
                            'bg-opacity-20'
                          )}
                        >
                          <Icon className="h-8 w-8 text-accent" />
                        </motion.div>

                        <h3 className="mb-3 text-2xl font-bold">{service.title}</h3>
                        <p className="mb-6 text-muted-foreground">{service.description}</p>

                        {/* Features Grid */}
                        <div className="grid gap-3 sm:grid-cols-2">
                          {service.features.map((feature, featureIndex) => (
                            <motion.div
                              key={feature}
                              initial={{ opacity: 0, x: -20 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              viewport={{ once: true }}
                              transition={{ delay: index * 0.1 + featureIndex * 0.05 }}
                              className="flex items-center gap-2"
                            >
                              <div
                                className={cn(
                                  'flex h-6 w-6 shrink-0 items-center justify-center rounded-full',
                                  'bg-accent/10 text-accent transition-transform duration-300',
                                  'group-hover:scale-110'
                                )}
                              >
                                <ArrowRight className="h-4 w-4" />
                              </div>
                              <span className="text-sm">{feature}</span>
                            </motion.div>
                          ))}
                        </div>
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

                      <div className="absolute -right-4 -top-4 h-24 w-24 rotate-12 transform rounded-xl bg-accent/5 opacity-0 transition-all duration-500 group-hover:opacity-100" />
                    </motion.div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Background Effects */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-accent/5 via-transparent to-accent/5" />
        <div className="absolute inset-0 bg-[radial-gradient(40%_40%_at_50%_50%,var(--accent)/3%_0%,transparent_100%)]" />
        <div
          className="absolute inset-0 opacity-[0.15]"
          style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, var(--border) 1px, transparent 0)',
            backgroundSize: '40px 40px',
            maskImage: 'linear-gradient(to bottom, black 50%, transparent)',
            WebkitMaskImage: 'linear-gradient(to bottom, black 50%, transparent)',
          }}
        />
      </div>
    </section>
  );
};

export default WebServicesSection;
