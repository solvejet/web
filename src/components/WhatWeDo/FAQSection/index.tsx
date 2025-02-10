// src/components/WhatWeDo/FAQSection/index.tsx
'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';
import { serviceFAQs } from '@/config/faq-data';
import { cn } from '@/lib/utils';

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="relative overflow-hidden bg-background py-24 lg:py-32">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-accent/5 via-transparent to-accent/5" />
      <div
        className="absolute inset-0 opacity-[0.15]"
        style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, var(--border) 1px, transparent 0)',
          backgroundSize: '40px 40px',
        }}
      />

      <div className="container relative mx-auto px-4">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl"
          >
            Frequently Asked
            <span className="block bg-gradient-to-r from-accent to-accent/60 bg-clip-text text-transparent">
              Questions
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-6 text-lg text-muted-foreground"
          >
            Find answers to common questions about our services and development process
          </motion.p>
        </div>

        {/* FAQ Grid */}
        <div className="mx-auto max-w-4xl">
          <div className="divide-y divide-border/50">
            {serviceFAQs.map((faq, index) => {
              const isOpen = openIndex === index;

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    className={cn(
                      'group flex w-full items-start justify-between py-6 text-left transition-colors',
                      'hover:text-accent focus:outline-none focus-visible:text-accent'
                    )}
                  >
                    <span className="text-lg font-medium">{faq.question}</span>
                    <span className="ml-6 flex h-7 w-7 flex-none items-center justify-center rounded-full border border-border/50">
                      {isOpen ? (
                        <Minus className="h-4 w-4 transition-transform group-hover:text-accent" />
                      ) : (
                        <Plus className="h-4 w-4 transition-transform group-hover:text-accent" />
                      )}
                    </span>
                  </button>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className="overflow-hidden"
                      >
                        <p className="pb-6 text-muted-foreground">{faq.answer}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>

          {/* Contact CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-16 text-center"
          >
            <p className="text-muted-foreground">
              Still have questions?{' '}
              <a
                href="/contact"
                className="font-medium text-accent hover:text-accent/80 focus:outline-none focus-visible:text-accent/80"
              >
                Contact our team
              </a>{' '}
              for more information.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
