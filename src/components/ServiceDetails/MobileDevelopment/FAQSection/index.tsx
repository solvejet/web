// src/components/ServiceDetails/MobileDevelopment/FAQSection/index.tsx
'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';
import { cn } from '@/lib/utils';

const faqs = [
  {
    question: 'What mobile platforms do you develop for?',
    answer:
      'We develop for both iOS and Android platforms, offering native development using Swift/SwiftUI for iOS and Kotlin/Jetpack Compose for Android. We also provide cross-platform solutions using React Native and Flutter, allowing you to reach users on both platforms with a single codebase.',
  },
  {
    question: 'How long does it take to develop a mobile app?',
    answer:
      'The development timeline varies based on the complexity and features of your app. A basic app might take 2-3 months, while complex enterprise applications can take 6+ months. We follow an agile methodology, delivering working versions throughout the development process, allowing you to test and provide feedback.',
  },
  {
    question: 'Should I choose native or cross-platform development?',
    answer:
      'The choice between native and cross-platform depends on your specific needs. Native development offers the best performance and platform-specific features but requires separate codebases. Cross-platform development is more cost-effective and faster to market but may have slight performance trade-offs. We can help you make the right choice based on your requirements, budget, and timeline.',
  },
  {
    question: 'How do you ensure app security?',
    answer:
      'We implement multiple layers of security including encrypted data storage, secure API communications, biometric authentication, and protection against common mobile vulnerabilities. We follow platform-specific security best practices and regularly update our security measures to protect against new threats.',
  },
  {
    question: 'Do you provide app maintenance and updates?',
    answer:
      'Yes, we offer comprehensive maintenance and support services. This includes regular updates, bug fixes, performance optimization, and platform compatibility updates. We also monitor app performance and user feedback to make continuous improvements.',
  },
  {
    question: 'Can you help with app store submission and optimization?',
    answer:
      'Absolutely! We handle the entire app store submission process for both Apple App Store and Google Play Store. This includes preparing necessary assets, optimizing store listings, and ensuring compliance with platform guidelines. We also implement App Store Optimization (ASO) strategies to improve visibility and downloads.',
  },
  {
    question: 'What about offline functionality?',
    answer:
      'We can implement robust offline capabilities in your app, allowing users to access key features without an internet connection. This includes local data storage, offline data synchronization, and seamless state management when transitioning between online and offline modes.',
  },
  {
    question: 'Do you integrate analytics and crash reporting?',
    answer:
      'Yes, we implement comprehensive analytics and crash reporting tools to monitor app performance, user behavior, and any issues. This includes integration with platforms like Firebase Analytics, Crashlytics, or custom analytics solutions based on your needs.',
  },
] as const;

const MobileFAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="relative overflow-hidden py-24 lg:py-32">
      <div className="container relative z-10 mx-auto px-4">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex rounded-full bg-purple-500/10 px-4 py-1.5 text-sm font-medium text-purple-500"
          >
            FAQ
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-6 text-4xl font-bold tracking-tight sm:text-5xl"
          >
            Frequently Asked
            <span className="mt-2 block bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
              Questions
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-6 text-lg text-muted-foreground"
          >
            Find answers to common questions about our mobile app development services
          </motion.p>
        </div>

        {/* FAQ List */}
        <div className="mx-auto mt-16 max-w-4xl">
          <div className="divide-y divide-border/50">
            {faqs.map((faq, index) => {
              const isOpen = openIndex === index;

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className={cn('group py-6', isOpen && 'bg-accent/5')}
                >
                  {/* Question */}
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    className="flex w-full items-start justify-between text-left"
                  >
                    <span className="text-lg font-medium">{faq.question}</span>
                    <span className="ml-6 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-border/50">
                      {isOpen ? (
                        <Minus className="h-4 w-4 text-accent" />
                      ) : (
                        <Plus className="h-4 w-4 text-accent" />
                      )}
                    </span>
                  </button>

                  {/* Answer */}
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <p className="mt-4 text-muted-foreground">{faq.answer}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Background Effects */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-500/5 via-transparent to-purple-500/5" />
        <div className="absolute inset-0 bg-[radial-gradient(40%_40%_at_50%_50%,var(--accent)/3%_0%,transparent_100%)]" />
        <div
          className="absolute inset-0 opacity-[0.15]"
          style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, var(--border) 1px, transparent 0)',
            backgroundSize: '40px 40px',
            maskImage: 'linear-gradient(to bottom, black 50%, transparent)',
            WebkitMaskImage: 'linear-gradient(to bottom, black 50%, transparent)',
          }}
        />
      </div>
    </section>
  );
};

export default MobileFAQSection;
