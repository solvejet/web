// src/components/ServiceDetails/MobileDevelopment/ServicesSection/index.tsx
'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, type MotionStyle } from 'framer-motion';
import {
  ArrowRight,
  Smartphone,
  Database,
  Globe,
  Rocket,
  ShieldCheck,
  Cloud,
  Zap,
  LineChart,
  BellRing,
  Wifi,
  Map,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import Button from '@/components/ui/Button';

const services = [
  {
    id: 'native',
    title: 'Native App Development',
    description: 'High-performance native applications for iOS and Android platforms',
    icon: Smartphone,
    features: [
      {
        title: 'iOS Development',
        description: 'Native apps for iPhone and iPad using Swift and SwiftUI',
        icon: ArrowRight,
      },
      {
        title: 'Android Development',
        description: 'Custom Android apps using Kotlin and Jetpack Compose',
        icon: ArrowRight,
      },
      {
        title: 'Performance Optimization',
        description: 'Optimized for speed and resource efficiency',
        icon: Zap,
      },
      {
        title: 'Platform Integration',
        description: 'Deep integration with iOS and Android features',
        icon: Database,
      },
    ],
    color: 'from-purple-500/20 to-purple-600/20',
  },
  {
    id: 'cross-platform',
    title: 'Cross-Platform Solutions',
    description: 'Unified apps that work seamlessly across multiple platforms',
    icon: Globe,
    features: [
      {
        title: 'React Native',
        description: 'Cross-platform apps with native performance',
        icon: ArrowRight,
      },
      {
        title: 'Flutter Development',
        description: "Beautiful apps using Google's Flutter framework",
        icon: ArrowRight,
      },
      {
        title: 'Code Sharing',
        description: 'Single codebase for multiple platforms',
        icon: Database,
      },
      {
        title: 'Custom Modules',
        description: 'Platform-specific features when needed',
        icon: Rocket,
      },
    ],
    color: 'from-blue-500/20 to-blue-600/20',
  },
  {
    id: 'enterprise',
    title: 'Enterprise Mobile Solutions',
    description: 'Secure and scalable enterprise mobile applications',
    icon: ShieldCheck,
    features: [
      {
        title: 'Security Features',
        description: 'Enterprise-grade security implementations',
        icon: ShieldCheck,
      },
      {
        title: 'Cloud Integration',
        description: 'Seamless integration with cloud services',
        icon: Cloud,
      },
      {
        title: 'Analytics',
        description: 'Business intelligence and analytics',
        icon: LineChart,
      },
      {
        title: 'MDM Support',
        description: 'Mobile Device Management compatibility',
        icon: Database,
      },
    ],
    color: 'from-emerald-500/20 to-emerald-600/20',
  },
  {
    id: 'features',
    title: 'Advanced Features',
    description: 'Cutting-edge mobile app functionalities',
    icon: Rocket,
    features: [
      {
        title: 'Push Notifications',
        description: 'Real-time notifications and alerts',
        icon: BellRing,
      },
      {
        title: 'Offline Mode',
        description: 'Full functionality without internet',
        icon: Wifi,
      },
      {
        title: 'Location Services',
        description: 'GPS and location-based features',
        icon: Map,
      },
      {
        title: 'Real-time Sync',
        description: 'Instant data synchronization',
        icon: Cloud,
      },
    ],
    color: 'from-pink-500/20 to-pink-600/20',
  },
] as const;

const MobileServicesSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  // Transform values for scroll-based animations
  const sectionOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.6, 1, 1, 0.6]);

  // Pre-calculate transforms for each card
  const card1Transform = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, -80, -80, 0]);
  const card2Transform = useTransform(scrollYProgress, [0, 0.3, 0.9, 1], [0, -80, -80, 0]);
  const card3Transform = useTransform(scrollYProgress, [0, 0.4, 0.95, 1], [0, -80, -80, 0]);
  const card4Transform = useTransform(scrollYProgress, [0, 0.5, 1, 1], [0, -80, -80, 0]);

  const cardTransforms = [card1Transform, card2Transform, card3Transform, card4Transform];

  return (
    <section ref={containerRef} className="relative bg-background py-24 lg:py-32">
      <div className="container relative z-10 mx-auto px-4">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center">
          {/* ... header content remains the same ... */}
        </div>

        {/* Services Grid */}
        <motion.div style={{ opacity: sectionOpacity }} className="mt-24 grid gap-8 md:grid-cols-2">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.id}
                style={{ y: cardTransforms[index] } as MotionStyle}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
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
                        'bg-gradient-to-br transition-all duration-300',
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
            <span>Start Your Mobile Project</span>
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Button>
        </motion.div>
      </div>

      {/* Background Effects */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-500/5 via-transparent to-purple-500/5" />
        <div className="absolute inset-0 bg-[radial-gradient(40%_40%_at_50%_50%,var(--accent)/3%_0%,transparent_100%)]" />
      </div>
    </section>
  );
};

export default MobileServicesSection;
