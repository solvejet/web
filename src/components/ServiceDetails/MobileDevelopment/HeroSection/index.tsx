// src/components/ServiceDetails/MobileDevelopment/HeroSection/index.tsx
'use client';

import { motion, useAnimation } from 'framer-motion';
import { ArrowDown, Shield, Zap, Smartphone, Globe } from 'lucide-react';
import { useEffect } from 'react';
import Button from '@/components/ui/Button';
import { cn } from '@/lib/utils';
import SocialAppUI from './SocialAppUI';
import MobileDevice from '@/components/ui/MobileDevice';

const features = [
  {
    icon: Smartphone,
    title: 'Native Apps',
    description: 'High-performance native iOS and Android applications',
  },
  {
    icon: Globe,
    title: 'Cross-Platform',
    description: 'Cost-effective solutions that work on all devices',
  },
  {
    icon: Zap,
    title: 'Fast Development',
    description: 'Rapid development with latest mobile technologies',
  },
  {
    icon: Shield,
    title: 'Secure & Scalable',
    description: 'Enterprise-grade security and scalability',
  },
] as const;

const MobileDevHero = () => {
  const controls = useAnimation();

  // Animate interaction sequence
  useEffect(() => {
    const sequence = async () => {
      await controls.start('visible');
      while (true) {
        await controls.start('interact1');
        await new Promise((resolve) => setTimeout(resolve, 1000));
        await controls.start('interact2');
        await new Promise((resolve) => setTimeout(resolve, 1000));
        await controls.start('interact3');
        await new Promise((resolve) => setTimeout(resolve, 1000));
        await controls.start('visible');
        await new Promise((resolve) => setTimeout(resolve, 2000));
      }
    };
    void sequence();
  }, [controls]);

  return (
    <section className="relative min-h-[90vh] overflow-hidden pt-20">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-purple-500/5 via-transparent to-purple-500/5" />
      <div
        className="absolute inset-0 opacity-[0.15]"
        style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, var(--border) 1px, transparent 0)',
          backgroundSize: '40px 40px',
          maskImage: 'linear-gradient(to bottom, black 50%, transparent)',
          WebkitMaskImage: 'linear-gradient(to bottom, black 50%, transparent)',
        }}
      />

      <div className="container relative mx-auto px-4">
        <div className="relative z-10 grid gap-16 lg:grid-cols-2 lg:gap-8">
          {/* Left Content */}
          <div className="flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center rounded-full bg-purple-500/10 px-3 py-1 text-sm font-medium text-purple-500 backdrop-blur-sm"
            >
              Mobile App Development Services
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mt-6 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl"
            >
              Turn Your Vision Into
              <span className="relative mt-2 block">
                <span className="relative z-10 bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
                  Mobile Reality
                </span>
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-6 text-lg text-muted-foreground"
            >
              Create powerful, intuitive mobile applications that engage users and drive business
              growth. Our expert team delivers native and cross-platform solutions using
              cutting-edge technologies.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-8 flex flex-wrap gap-4"
            >
              <Button href="/contact" variant="primary" size="lg">
                Start Your Project
              </Button>
              <Button href="/portfolio" variant="outline" size="lg">
                View Our Work
              </Button>
            </motion.div>
          </div>

          {/* Right Animation - Phone Mockup */}
          <div className="relative flex items-center justify-center">
            <MobileDevice variant="iphone" floatingEffect={true}>
              <SocialAppUI controls={controls} />
            </MobileDevice>
          </div>
        </div>

        {/* Features Grid */}
        <div className="mt-24 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 + 0.4 }}
                className="group relative"
              >
                <div
                  className={cn(
                    'relative h-full min-h-[200px] overflow-hidden rounded-2xl border border-purple-500/20',
                    'bg-background/50 p-8 text-center transition-all duration-300',
                    'hover:border-purple-500/40 hover:shadow-lg hover:shadow-purple-500/5'
                  )}
                >
                  <div className="relative z-10 flex h-full flex-col items-center justify-between">
                    <div
                      className={cn(
                        'mb-4 inline-flex rounded-xl bg-purple-500/10 p-3',
                        'text-purple-500 transition-colors group-hover:bg-purple-500/20',
                        'transform transition-transform duration-300 group-hover:scale-110'
                      )}
                    >
                      <Icon className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="mb-2 text-lg font-semibold transition-colors duration-300 group-hover:text-purple-500">
                        {feature.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">{feature.description}</p>
                    </div>
                  </div>

                  <div
                    className={cn(
                      'absolute inset-0 -z-10 opacity-0 transition-opacity duration-300',
                      'group-hover:opacity-100 bg-gradient-to-br from-purple-500/10 to-transparent'
                    )}
                  />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Bottom fade */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 1,
          delay: 1,
          repeat: Infinity,
          repeatType: 'reverse',
        }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 transform"
      >
        <ArrowDown className="h-6 w-6 text-muted-foreground" />
      </motion.div>
    </section>
  );
};

export default MobileDevHero;
