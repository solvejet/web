// src/components/ServiceDetails/CloudServices/HeroSection/index.tsx
'use client';

import { motion } from 'framer-motion';
import { Cloud, Database, Shield, Zap } from 'lucide-react';
import Button from '@/components/ui/Button';
import { cn } from '@/lib/utils';

const features = [
  {
    icon: Cloud,
    title: 'Cloud Infrastructure',
    description: 'Scalable and reliable cloud solutions',
  },
  {
    icon: Zap,
    title: 'High Performance',
    description: 'Optimized cloud architecture',
  },
  {
    icon: Shield,
    title: 'Security First',
    description: 'Enterprise-grade cloud security',
  },
  {
    icon: Database,
    title: 'Data Management',
    description: 'Efficient cloud data solutions',
  },
] as const;

const CloudHeroSection = () => {
  return (
    <section className="relative min-h-[90vh] overflow-hidden pt-20">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/5 via-transparent to-cyan-500/5" />
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
              className="inline-flex items-center rounded-full bg-cyan-500/10 px-3 py-1 text-sm font-medium text-cyan-500 backdrop-blur-sm"
            >
              Cloud Services
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mt-6 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl"
            >
              Scale Your Business
              <span className="relative mt-2 block">
                <span className="relative z-10 bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text text-transparent">
                  In The Cloud
                </span>
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-6 text-lg text-muted-foreground"
            >
              Transform your infrastructure with our enterprise-grade cloud solutions. We help
              businesses scale efficiently with secure, reliable, and cost-effective cloud services.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-8 flex flex-wrap gap-4"
            >
              <Button href="/contact" variant="primary" size="lg">
                Get Started
              </Button>
              <Button href="/case-studies" variant="outline" size="lg">
                View Case Studies
              </Button>
            </motion.div>
          </div>

          {/* Right Animation - Cloud Infrastructure Visualization */}
          <div className="relative lg:mt-0">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="relative flex items-center justify-center"
            >
              {/* Cloud Infrastructure Animation */}
              <div className="relative h-[400px] w-[400px]">
                {/* Background glow */}
                <div className="absolute inset-0 translate-y-24 scale-[0.85] rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 opacity-20 blur-3xl" />

                {/* Animated cloud elements */}
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={`cloud-${i}`}
                    initial={{ y: 0 }}
                    animate={{ y: [-20, 20] }}
                    transition={{
                      duration: 2,
                      ease: 'easeInOut',
                      repeat: Infinity,
                      repeatType: 'reverse',
                      delay: i * 0.3,
                    }}
                    className="absolute"
                    style={{
                      top: `${30 + i * 20}%`,
                      left: `${20 + i * 30}%`,
                    }}
                  >
                    <div className="flex h-20 w-20 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500/10 to-blue-500/10 p-4 backdrop-blur-sm">
                      <Cloud className="h-8 w-8 text-cyan-500" />
                    </div>
                  </motion.div>
                ))}

                {/* Connection lines */}
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={`line-${i}`}
                    className="absolute left-1/2 top-1/2 h-px w-32 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-cyan-500/20 to-blue-500/20"
                    style={{
                      transform: `rotate(${i * 72}deg) translateX(${100}px)`,
                    }}
                  />
                ))}
              </div>
            </motion.div>
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
                    'relative h-full min-h-[200px] overflow-hidden rounded-2xl border border-cyan-500/20',
                    'bg-background/50 p-8 text-center transition-all duration-300',
                    'hover:border-cyan-500/40 hover:shadow-lg hover:shadow-cyan-500/5'
                  )}
                >
                  <div className="relative z-10 flex h-full flex-col items-center justify-between">
                    <div
                      className={cn(
                        'mb-4 inline-flex rounded-xl bg-cyan-500/10 p-3',
                        'text-cyan-500 transition-colors group-hover:bg-cyan-500/20',
                        'transform transition-transform duration-300 group-hover:scale-110'
                      )}
                    >
                      <Icon className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="mb-2 text-lg font-semibold transition-colors duration-300 group-hover:text-cyan-500">
                        {feature.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">{feature.description}</p>
                    </div>
                  </div>

                  <div
                    className={cn(
                      'absolute inset-0 -z-10 opacity-0 transition-opacity duration-300',
                      'group-hover:opacity-100 bg-gradient-to-br from-cyan-500/10 to-transparent'
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
    </section>
  );
};

export default CloudHeroSection;
