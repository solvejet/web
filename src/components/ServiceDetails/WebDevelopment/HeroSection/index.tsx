// src/components/ServiceDetails/WebDevelopment/HeroSection/index.tsx
'use client';

import { motion } from 'framer-motion';
import { Code2, Globe2, Rocket, Shield } from 'lucide-react';
import Button from '@/components/ui/Button';
import { cn } from '@/lib/utils';

const features = [
  {
    icon: Globe2,
    title: 'Modern Web Apps',
    description: 'Progressive web applications with modern architectures',
  },
  {
    icon: Rocket,
    title: 'Performance Optimized',
    description: 'Lightning-fast load times and smooth interactions',
  },
  {
    icon: Shield,
    title: 'Security First',
    description: 'Enterprise-grade security implementations',
  },
  {
    icon: Code2,
    title: 'Clean Code',
    description: 'Maintainable and scalable codebase',
  },
] as const;

const codeSnippet = [
  {
    text: "import React from 'react';",
    color: 'text-blue-500',
    delay: 0.6,
  },
  {
    text: 'const WebApp = () => {',
    color: 'text-purple-500',
    delay: 0.8,
  },
  {
    text: '  const [loading, setLoading] = useState(false);',
    color: 'text-green-500',
    delay: 1.0,
  },
  {
    text: '  useEffect(() => {',
    color: 'text-pink-500',
    delay: 1.2,
  },
  {
    text: '    // Initialize app',
    color: 'text-gray-500',
    delay: 1.4,
  },
  {
    text: '    setLoading(true);',
    color: 'text-yellow-500',
    delay: 1.6,
  },
  {
    text: '  }, []);',
    color: 'text-pink-500',
    delay: 1.8,
  },
  {
    text: '  return (',
    color: 'text-purple-500',
    delay: 2.0,
  },
  {
    text: "    <div className='app'>",
    color: 'text-blue-500',
    delay: 2.2,
  },
  {
    text: '      <h1>Welcome!</h1>',
    color: 'text-green-500',
    delay: 2.4,
  },
  {
    text: '    </div>',
    color: 'text-blue-500',
    delay: 2.6,
  },
  {
    text: '  );',
    color: 'text-purple-500',
    delay: 2.8,
  },
  {
    text: '};',
    color: 'text-purple-500',
    delay: 3.0,
  },
  {
    text: 'export default WebApp;',
    color: 'text-blue-500',
    delay: 3.2,
  },
] as const;

const WebDevHero = () => {
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
              Web Development Services
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mt-6 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl"
            >
              Transform Your
              <span className="relative mt-2 block">
                <span className="relative z-10 bg-gradient-to-r from-blue-500 to-indigo-500 bg-clip-text text-transparent">
                  Digital Presence
                </span>
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.5, duration: 0.8, ease: 'circOut' }}
                  className="absolute -bottom-2 left-0 right-0 h-4 origin-left bg-accent/10"
                />
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-6 text-lg text-muted-foreground"
            >
              Create powerful, scalable web applications that engage users and drive business
              growth. Our expert team delivers modern solutions using cutting-edge technologies.
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

          {/* Right Animation - Browser Window */}
          <div className="relative lg:mt-0">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="relative flex items-center justify-center"
            >
              {/* Background blur effect */}
              <div className="absolute inset-0 translate-y-24 scale-[0.85] rounded-2xl bg-gradient-to-r from-blue-500 to-indigo-500 opacity-20 blur-3xl" />

              {/* Browser Window */}
              <motion.div
                initial={{ y: 20 }}
                animate={{ y: 0 }}
                transition={{
                  repeat: Infinity,
                  repeatType: 'reverse',
                  duration: 3,
                  ease: 'easeInOut',
                }}
                className="w-full max-w-2xl overflow-hidden rounded-xl border border-border/50 bg-background/80 shadow-2xl backdrop-blur-sm"
              >
                {/* Browser Header */}
                <div className="flex items-center gap-2 border-b border-border/50 bg-background/50 px-4 py-3">
                  <div className="flex gap-1.5">
                    <div className="h-3 w-3 rounded-full bg-red-500/80" />
                    <div className="h-3 w-3 rounded-full bg-yellow-500/80" />
                    <div className="h-3 w-3 rounded-full bg-green-500/80" />
                  </div>
                  <div className="ml-4 flex-1 rounded-md bg-background/50 px-3 py-1 text-xs text-muted-foreground">
                    https://myapp.com/src/app.tsx
                  </div>
                </div>

                {/* Code Editor Content */}
                <div className="bg-background/90 p-4 font-mono text-sm">
                  {codeSnippet.map((line, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: line.delay }}
                      className={cn('whitespace-pre', line.color)}
                    >
                      {line.text}
                    </motion.div>
                  ))}
                  {/* Blinking Cursor */}
                  <motion.div
                    animate={{ opacity: [1, 0] }}
                    transition={{
                      repeat: Infinity,
                      duration: 0.8,
                      ease: 'steps(2)',
                    }}
                    className="mt-1 inline-block h-4 w-2 bg-blue-500"
                  />
                </div>
              </motion.div>
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

      {/* Bottom fade */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};

export default WebDevHero;
