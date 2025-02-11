// src/components/ServiceDetails/SharedSections/WhyChooseSection/index.tsx
'use client';

import { motion } from 'framer-motion';
import { CheckCircle2, Shield, Clock, Users2, Zap, HeartHandshake } from 'lucide-react';
import { cn } from '@/lib/utils';

interface WhyChooseProps {
  title?: string;
  subtitle?: string;
  benefits?: Array<{
    icon: React.ElementType;
    title: string;
    description: string;
    color?: string;
  }>;
}

const defaultBenefits = [
  {
    icon: Shield,
    title: 'ISO Certified Quality',
    description:
      'Our development processes follow ISO certified standards ensuring highest quality deliverables.',
    color: 'from-blue-500/20 via-blue-500/10 to-transparent',
  },
  {
    icon: Clock,
    title: 'On-Time Delivery',
    description: 'We maintain strict timelines and ensure your project is delivered on schedule.',
    color: 'from-purple-500/20 via-purple-500/10 to-transparent',
  },
  {
    icon: Users2,
    title: 'Dedicated Team',
    description: 'Get a dedicated team of experts working exclusively on your project.',
    color: 'from-pink-500/20 via-pink-500/10 to-transparent',
  },
  {
    icon: Zap,
    title: 'Fast Development',
    description: 'Rapid development without compromising on quality or security.',
    color: 'from-amber-500/20 via-amber-500/10 to-transparent',
  },
  {
    icon: CheckCircle2,
    title: 'Best Practices',
    description: 'We follow industry best practices and latest development standards.',
    color: 'from-emerald-500/20 via-emerald-500/10 to-transparent',
  },
  {
    icon: HeartHandshake,
    title: 'Reliable Support',
    description: '24/7 support and maintenance to keep your solutions running smoothly.',
    color: 'from-cyan-500/20 via-cyan-500/10 to-transparent',
  },
];

const WhyChooseSection = ({
  title = 'Why Choose Us',
  subtitle = 'Partner with us for exceptional service and proven expertise',
  benefits = defaultBenefits,
}: WhyChooseProps) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 20,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 10,
      },
    },
  };

  const iconVariants = {
    hover: {
      scale: 1.2,
      rotate: 360,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 10,
      },
    },
  };

  return (
    <section className="relative overflow-hidden py-24 lg:py-32">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-accent/5 to-background" />

      {/* Radial Pattern */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: 'radial-gradient(circle at center, var(--accent) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />

      {/* Content Container */}
      <div className="container relative z-10 mx-auto px-4">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex rounded-full bg-accent/10 px-4 py-1.5 text-sm font-medium text-accent"
          >
            Our Advantages
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-6 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl"
          >
            {title}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-6 text-xl text-muted-foreground"
          >
            {subtitle}
          </motion.p>
        </div>

        {/* Benefits Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
        >
          {benefits.map((benefit) => {
            const Icon = benefit.icon;
            return (
              <motion.div
                key={benefit.title}
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
                className="group relative"
              >
                <div
                  className={cn(
                    'relative h-full overflow-hidden rounded-2xl border border-border/50',
                    'bg-background/80 backdrop-blur-sm p-8 transition-all duration-500',
                    'hover:border-accent/40 hover:shadow-2xl hover:shadow-accent/5'
                  )}
                >
                  {/* Content */}
                  <div className="relative z-10 flex h-full flex-col">
                    <motion.div
                      variants={iconVariants}
                      whileHover="hover"
                      className={cn(
                        'mb-6 inline-flex h-14 w-14 items-center justify-center rounded-xl',
                        'bg-gradient-to-br from-accent/20 to-accent/0',
                        'transition-colors duration-500 group-hover:from-accent/30 group-hover:to-accent/5'
                      )}
                    >
                      <Icon className="h-7 w-7 text-accent" />
                    </motion.div>

                    <h3 className="mb-3 text-xl font-semibold transition-colors duration-300">
                      {benefit.title}
                    </h3>
                    <p className="text-muted-foreground">{benefit.description}</p>
                  </div>

                  {/* Background Gradient */}
                  <div
                    className={cn(
                      'absolute inset-0 -z-10 opacity-0 transition-opacity duration-500',
                      'group-hover:opacity-100',
                      'bg-gradient-radial',
                      benefit.color
                    )}
                  />

                  {/* Decorative Corner */}
                  <div className="absolute -right-4 -top-4 h-16 w-16 rotate-12 transform rounded-xl bg-accent/5 opacity-0 transition-all duration-500 group-hover:opacity-100" />
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      {/* Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/20 to-transparent" />
    </section>
  );
};

export default WhyChooseSection;
