// src/components/ServiceDetails/TechnologyConsulting/HeroSection/index.tsx
'use client';

import { motion } from 'framer-motion';
import { LightbulbIcon, ChartBarIcon, ShieldCheckIcon, GlobeIcon } from 'lucide-react';
import Button from '@/components/ui/Button';
import { cn } from '@/lib/utils';

interface Feature {
  icon: typeof LightbulbIcon;
  title: string;
  description: string;
}

const features: Feature[] = [
  {
    icon: LightbulbIcon,
    title: 'Strategic Innovation',
    description: 'Transform your business with cutting-edge technology strategies',
  },
  {
    icon: ChartBarIcon,
    title: 'Data-Driven Insights',
    description: 'Make informed decisions with comprehensive analytics',
  },
  {
    icon: ShieldCheckIcon,
    title: 'Risk Management',
    description: 'Protect your digital assets with robust security measures',
  },
  {
    icon: GlobeIcon,
    title: 'Digital Transformation',
    description: 'Navigate your journey to digital excellence',
  },
] as const;

const ConsultingHeroSection = () => {
  return (
    <section className="relative min-h-[90vh] overflow-hidden pt-20">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-500/5 via-transparent to-blue-500/5" />
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
              className="inline-flex items-center rounded-full bg-blue-500/10 px-3 py-1 text-sm font-medium text-blue-500 backdrop-blur-sm"
            >
              Technology Consulting Services
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mt-6 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl"
            >
              Transform Your
              <span className="relative mt-2 block">
                <span className="relative z-10 bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent">
                  Business Strategy
                </span>
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-6 text-lg text-muted-foreground"
            >
              Partner with our expert consultants to navigate digital transformation, optimize
              operations, and drive innovation. We deliver strategic insights and actionable
              solutions tailored to your business needs.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-8 flex flex-wrap gap-4"
            >
              <Button href="/contact" variant="primary" size="lg">
                Schedule Consultation
              </Button>
              <Button href="/case-studies" variant="outline" size="lg">
                View Case Studies
              </Button>
            </motion.div>
          </div>

          {/* Right Animation - 3D Consulting Graphics */}
          <div className="relative flex items-center justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="relative flex items-center justify-center"
            >
              {/* Animated Chart Elements */}
              <div className="relative h-[400px] w-[400px]">
                {/* Background glow */}
                <div className="absolute inset-0 translate-y-24 scale-[0.85] rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 opacity-20 blur-3xl" />

                {/* Animated chart bars */}
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ height: '20%' }}
                    animate={{ height: ['20%', '80%', '50%', '90%', '60%'] }}
                    transition={{
                      duration: 3,
                      ease: 'easeInOut',
                      repeat: Infinity,
                      repeatType: 'reverse',
                      delay: i * 0.2,
                    }}
                    className="absolute bottom-0 w-12 rounded-t-lg bg-gradient-to-t from-blue-500/20 to-cyan-500/20 backdrop-blur-sm"
                    style={{ left: `${i * 20}%` }}
                  />
                ))}

                {/* Floating elements */}
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={`float-${i}`}
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
                    <div className="h-16 w-16 rounded-xl bg-gradient-to-br from-blue-500/10 to-cyan-500/10 p-4 backdrop-blur-sm" />
                  </motion.div>
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
                    'relative h-full min-h-[200px] overflow-hidden rounded-2xl border border-blue-500/20',
                    'bg-background/50 p-8 text-center transition-all duration-300',
                    'hover:border-blue-500/40 hover:shadow-lg hover:shadow-blue-500/5'
                  )}
                >
                  <div className="relative z-10 flex h-full flex-col items-center justify-between">
                    <div
                      className={cn(
                        'mb-4 inline-flex rounded-xl bg-blue-500/10 p-3',
                        'text-blue-500 transition-colors group-hover:bg-blue-500/20',
                        'transform transition-transform duration-300 group-hover:scale-110'
                      )}
                    >
                      <Icon className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="mb-2 text-lg font-semibold transition-colors duration-300 group-hover:text-blue-500">
                        {feature.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">{feature.description}</p>
                    </div>
                  </div>

                  <div
                    className={cn(
                      'absolute inset-0 -z-10 opacity-0 transition-opacity duration-300',
                      'group-hover:opacity-100 bg-gradient-to-br from-blue-500/10 to-transparent'
                    )}
                  />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ConsultingHeroSection;
