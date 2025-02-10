// src/components/WhatWeDo/ServicesSection/index.tsx
'use client';

import { motion } from 'framer-motion';
import { whatWeDoItems } from '@/config/menu-data';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';

const ServicesSection = () => {
  return (
    <section className="relative bg-background py-24 lg:py-32">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl"
          >
            Comprehensive
            <span className="block bg-gradient-to-r from-accent to-accent/60 bg-clip-text text-transparent">
              Digital Solutions
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-6 text-lg text-muted-foreground"
          >
            We offer a full spectrum of services to help organizations transform their technology
            landscape
          </motion.p>
        </div>

        {/* Services Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {whatWeDoItems.map((service, index) => {
            const Icon = service.icon;

            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group relative"
              >
                <div
                  className={cn(
                    'relative overflow-hidden rounded-2xl border border-border/50',
                    'bg-background/50 p-8 transition-all duration-300',
                    'hover:border-accent/50 hover:shadow-lg'
                  )}
                >
                  {/* Service Icon */}
                  <div
                    className={cn(
                      'mb-6 inline-flex rounded-xl bg-accent/10 p-3',
                      'text-accent transition-colors group-hover:bg-accent/20'
                    )}
                  >
                    <Icon className="h-6 w-6" />
                  </div>

                  {/* Service Content */}
                  <h3 className="mb-3 text-xl font-semibold tracking-tight">{service.title}</h3>
                  <p className="mb-6 text-muted-foreground">{service.description}</p>

                  {/* Learn More Link */}
                  <Link
                    href={service.href}
                    className={cn(
                      'inline-flex items-center text-sm font-medium',
                      'text-accent transition-colors hover:text-accent/80'
                    )}
                  >
                    Learn more
                    <ArrowRight className="ml-1 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>

                  {/* Decorative gradient */}
                  <div
                    className={cn(
                      'absolute inset-0 -z-10 opacity-0',
                      'bg-gradient-to-br from-accent/10 via-transparent to-transparent',
                      'transition-opacity duration-300 group-hover:opacity-100'
                    )}
                    aria-hidden="true"
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

export default ServicesSection;
