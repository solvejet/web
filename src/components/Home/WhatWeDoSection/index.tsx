// src/components/Home/WhatWeDoSection/index.tsx
'use client';
import React, { useRef } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { whatWeDoItems } from '@/config/menu-data';
import { cn } from '@/lib/utils';
import Button from '@/components/ui/Button';

const WhatWeDoSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: scrollContainerRef,
    offset: ['start end', 'end end'],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 0.2], [50, 0]);

  return (
    <section
      ref={sectionRef}
      className="relative bg-background py-24 lg:py-32"
      aria-labelledby="what-we-do-title"
    >
      <div className="container mx-auto">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16">
          {/* Left Sticky Content */}
          <div className="lg:sticky lg:top-32 lg:h-fit">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="max-w-xl"
            >
              <h2 className="text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
                Transforming Ideas into{' '}
                <span className="bg-gradient-to-r from-accent to-accent/60 bg-clip-text text-transparent">
                  Digital Reality
                </span>
              </h2>
              <p className="mt-6 text-lg text-muted-foreground">
                Our comprehensive suite of services combines innovation with expertise to create
                solutions that drive your business forward. From concept to execution, we&apos;re
                your partner in digital transformation.
              </p>
              <div className="mt-8 flex items-center gap-4">
                <Button
                  href="/portfolio"
                  variant="outline"
                  className="group"
                  icon={
                    <ArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
                  }
                >
                  View Our Work
                </Button>
              </div>
            </motion.div>
          </div>

          {/* Right Scrolling Content */}
          <motion.div ref={scrollContainerRef} style={{ opacity, y }} className="space-y-8">
            {whatWeDoItems.map((item, index) => {
              const Icon = item.icon;

              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.1,
                  }}
                  className={cn(
                    'group relative rounded-2xl border border-border/50',
                    'overflow-hidden bg-background/50 p-8',
                    'backdrop-blur-sm transition-all duration-300',
                    'hover:border-accent/50 hover:bg-accent/[0.02]',
                    'hover:shadow-lg hover:shadow-accent/5'
                  )}
                >
                  {/* Service Content */}
                  <div className="relative z-10 flex gap-6">
                    <div
                      className={cn(
                        'flex h-12 w-12 shrink-0 items-center justify-center',
                        'rounded-lg bg-accent/10 text-accent',
                        'transition-all duration-300 group-hover:scale-110 group-hover:bg-accent/20'
                      )}
                    >
                      <Icon className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold tracking-tight">{item.title}</h3>
                      <p className="mt-2 text-muted-foreground">{item.description}</p>
                      <Link
                        href={item.href}
                        className={cn(
                          'mt-4 inline-flex items-center text-sm text-accent',
                          'transition-colors duration-200 hover:text-accent/80',
                          'focus-visible:outline-none focus-visible:ring-2',
                          'focus-visible:ring-accent focus-visible:ring-offset-2'
                        )}
                      >
                        <span className="font-medium">Learn more</span>
                        <ArrowRight className="ml-1 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                      </Link>
                    </div>
                  </div>

                  {/* Decorative gradient */}
                  <div
                    className={cn(
                      'absolute inset-0 z-0 opacity-0',
                      'bg-gradient-to-br from-accent/10 via-transparent to-transparent',
                      'transition-opacity duration-300 group-hover:opacity-100'
                    )}
                    aria-hidden="true"
                  />
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default WhatWeDoSection;
