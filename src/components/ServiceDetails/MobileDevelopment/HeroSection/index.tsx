// src/components/ServiceDetails/MobileDevelopment/HeroSection/index.tsx
import { Smartphone, Zap, Shield, Repeat } from 'lucide-react';
import Button from '@/components/ui/Button';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

const features = [
  {
    icon: Smartphone,
    title: 'Native Apps',
    description: 'High-performance iOS and Android applications',
  },
  {
    icon: Zap,
    title: 'Fast Development',
    description: 'Rapid development with modern frameworks',
  },
  {
    icon: Shield,
    title: 'App Security',
    description: 'Secure data handling and encryption',
  },
  {
    icon: Repeat,
    title: 'Cross-Platform',
    description: 'Unified apps for all platforms',
  },
] as const;

const phones = [
  { rotation: -15, scale: 0.9, translateY: 20 },
  { rotation: 0, scale: 1, translateY: 0 },
  { rotation: 15, scale: 0.9, translateY: 20 },
] as const;

const MobileDevHero = () => {
  return (
    <section className="relative min-h-[90vh] overflow-hidden pt-20">
      {/* Background Elements */}
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
              Mobile App Development
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mt-6 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl"
            >
              Bring Your App
              <span className="relative mt-2 block">
                <span className="relative z-10 bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
                  To Life
                </span>
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.5, duration: 0.8, ease: 'circOut' }}
                  className="absolute -bottom-2 left-0 right-0 h-4 origin-left bg-purple-500/10"
                />
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-6 text-lg text-muted-foreground"
            >
              Create stunning mobile applications that users love. From native iOS and Android apps
              to cross-platform solutions, we bring your mobile vision to reality.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-8 flex flex-wrap gap-4"
            >
              <Button
                href="/contact"
                variant="primary"
                className="bg-purple-500 text-white hover:bg-purple-600"
              >
                Start Your App
              </Button>
              <Button
                href="/portfolio"
                variant="outline"
                className="border-purple-500 text-purple-500 hover:bg-purple-500/10"
              >
                View Our Work
              </Button>
            </motion.div>
          </div>

          {/* Right Animation */}
          <div className="relative flex items-center justify-center lg:mt-0">
            <div className="relative h-[600px] w-full">
              {phones.map((phone, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{
                    opacity: 1,
                    scale: phone.scale,
                    rotate: phone.rotation,
                    y: phone.translateY,
                  }}
                  transition={{
                    delay: 0.2 + index * 0.1,
                    y: {
                      repeat: Infinity,
                      repeatType: 'reverse',
                      duration: 2,
                      ease: 'easeInOut',
                      delay: index * 0.2,
                    },
                  }}
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                >
                  <div
                    className={cn(
                      'h-[400px] w-[200px] rounded-3xl border-8 border-purple-500/20',
                      'bg-background shadow-xl shadow-purple-500/20',
                      'flex items-center justify-center'
                    )}
                  >
                    <Smartphone className="h-12 w-12 text-purple-500" strokeWidth={1.5} />
                  </div>
                </motion.div>
              ))}
            </div>
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
                    'relative overflow-hidden rounded-2xl border border-purple-500/20',
                    'bg-background/50 p-6 transition-all duration-300',
                    'hover:border-purple-500/40 hover:shadow-lg hover:shadow-purple-500/5'
                  )}
                >
                  <div className="relative z-10">
                    <div
                      className={cn(
                        'mx-auto mb-4 inline-flex rounded-xl bg-purple-500/10 p-3',
                        'text-purple-500 transition-colors group-hover:bg-purple-500/20'
                      )}
                    >
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="mb-2 text-lg font-semibold">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </div>

                  {/* Hover gradient effect */}
                  <div
                    className={cn(
                      'absolute inset-0 -z-10 opacity-0 transition-opacity duration-300',
                      'group-hover:opacity-100 bg-gradient-to-br from-purple-500/10 via-pink-500/10 to-transparent'
                    )}
                  />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Technologies Banner */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-24 rounded-2xl border border-purple-500/20 bg-purple-500/5 p-6 backdrop-blur-sm"
        >
          <div className="flex flex-wrap items-center justify-center gap-8">
            <span className="text-sm font-medium text-purple-500">Technologies:</span>
            {['iOS', 'Android', 'React Native', 'Flutter', 'Swift', 'Kotlin'].map((tech) => (
              <span
                key={tech}
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-purple-500"
              >
                {tech}
              </span>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Floating elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Decorative circles */}
        <div className="absolute -left-20 top-20 h-72 w-72 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 blur-3xl" />
        <div className="absolute right-10 top-40 h-64 w-64 rounded-full bg-gradient-to-r from-pink-500/20 to-purple-500/20 blur-3xl" />
      </div>

      {/* Bottom fade */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};

export default MobileDevHero;
