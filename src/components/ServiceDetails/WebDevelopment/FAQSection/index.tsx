// src/components/ServiceDetails/WebDevelopment/FAQSection/index.tsx
'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';
import { cn } from '@/lib/utils';

const faqs = [
  {
    question: 'What web development technologies do you specialize in?',
    answer:
      'We specialize in modern web technologies including React, Next.js, Node.js, and TypeScript for frontend development, along with robust backend solutions using Node.js, Python, and .NET. Our expertise extends to cloud platforms like AWS and Azure, ensuring scalable and reliable applications.',
  },
  {
    question: 'How long does it typically take to develop a web application?',
    answer:
      'The development timeline varies based on project complexity, features, and requirements. A basic web application might take 2-3 months, while complex enterprise solutions can take 6+ months. We provide detailed timelines during the discovery phase and follow agile methodologies for efficient delivery.',
  },
  {
    question: 'Do you provide maintenance and support after launch?',
    answer:
      'Yes, we offer comprehensive post-launch support and maintenance services. This includes bug fixes, security updates, performance optimization, and feature enhancements. We provide different maintenance packages tailored to your needs, ensuring your application runs smoothly.',
  },
  {
    question: 'How do you ensure the security of web applications?',
    answer:
      'Security is paramount in our development process. We implement multiple security layers including data encryption, secure authentication, regular security audits, and protection against common vulnerabilities (XSS, CSRF, SQL injection). We follow OWASP security guidelines and maintain ISO security standards.',
  },
  {
    question: 'What is your development process like?',
    answer:
      'Our development process follows an agile methodology with clear phases: Discovery & Planning, Design & Development, Testing & QA, Deployment, and Maintenance. We ensure regular communication, sprint reviews, and continuous integration/deployment (CI/CD) practices.',
  },
  {
    question: 'Can you help migrate or upgrade existing web applications?',
    answer:
      'Yes, we specialize in modernizing legacy applications and performing system migrations. Our approach includes thorough analysis of existing systems, planning the migration strategy, and implementing updates while ensuring minimal disruption to your business operations.',
  },
  {
    question: 'How do you handle scalability in web applications?',
    answer:
      'We design applications with scalability in mind from the start. This includes using microservices architecture, implementing caching strategies, optimizing database queries, and utilizing cloud services for auto-scaling. We ensure your application can handle growing user bases and increasing loads.',
  },
  {
    question: 'What makes your web development services different?',
    answer:
      'Our differentiators include ISO-certified development processes, a focus on performance optimization, comprehensive security measures, and extensive experience across various industries. We combine technical expertise with business understanding to deliver solutions that drive real value.',
  },
];

interface FAQItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}

const FAQItem = ({ question, answer, isOpen, onToggle }: FAQItemProps) => {
  return (
    <motion.div
      initial={false}
      animate={{ backgroundColor: isOpen ? 'rgba(var(--accent)/0.05)' : 'transparent' }}
      className={cn(
        'group rounded-2xl border border-border/50',
        'transition-colors duration-300',
        'hover:border-accent/40'
      )}
    >
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between p-6 text-left"
        aria-expanded={isOpen}
      >
        <span className="text-lg font-medium">{question}</span>
        <span className="ml-4 flex-shrink-0">
          {isOpen ? (
            <Minus className="h-5 w-5 text-accent" />
          ) : (
            <Plus className="h-5 w-5 text-accent" />
          )}
        </span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6 text-muted-foreground">{answer}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const WebDevFAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="relative overflow-hidden py-24 lg:py-32">
      <div className="container relative z-10 mx-auto px-4">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex rounded-full bg-accent/10 px-4 py-1.5 text-sm font-medium text-accent"
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
            Frequently Asked Questions
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-lg text-muted-foreground"
          >
            Get answers to common questions about our web development services
          </motion.p>
        </div>

        {/* FAQ Items */}
        <div className="mx-auto mt-16 max-w-4xl space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <FAQItem
                question={faq.question}
                answer={faq.answer}
                isOpen={openIndex === index}
                onToggle={() => setOpenIndex(openIndex === index ? null : index)}
              />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-accent/5 via-transparent to-accent/5" />
      <div
        className="absolute inset-0 opacity-[0.15]"
        style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, var(--border) 1px, transparent 0)',
          backgroundSize: '40px 40px',
          maskImage: 'linear-gradient(to bottom, black 50%, transparent)',
          WebkitMaskImage: 'linear-gradient(to bottom, black 50%, transparent)',
        }}
      />
    </section>
  );
};

export default WebDevFAQSection;
