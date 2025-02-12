// src/components/ServiceDetails/TechnologyConsulting/FAQSection/index.tsx
'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';
import { cn } from '@/lib/utils';

const faqs = [
  {
    question: 'What technology consulting services do you offer?',
    answer:
      'We provide comprehensive technology consulting services including Digital Transformation Strategy, IT Infrastructure Assessment, Technology Roadmap Development, Security & Compliance Consulting, Cloud Migration Strategy, Enterprise Architecture Planning, and Data Analytics Consulting. Our services are tailored to help businesses leverage technology effectively for growth and innovation.',
  },
  {
    question: 'How do you approach digital transformation projects?',
    answer:
      'Our approach to digital transformation follows a structured methodology: First, we conduct a thorough assessment of your current technology landscape and business objectives. Then, we develop a strategic roadmap that outlines the transformation journey, considering factors like technology selection, risk management, and change management. We implement solutions in phases to ensure minimal disruption and maximum adoption.',
  },
  {
    question: 'What industries do you specialize in?',
    answer:
      'We have extensive experience across multiple industries including Financial Services, Healthcare, Manufacturing, Retail, Technology, and Professional Services. Our consultants bring industry-specific knowledge and best practices to each engagement, ensuring solutions are aligned with sector-specific requirements and regulations.',
  },
  {
    question: 'How do you ensure ROI from technology investments?',
    answer:
      'We focus on delivering measurable business value by: 1) Establishing clear KPIs and success metrics at the project outset, 2) Conducting thorough cost-benefit analyses for technology investments, 3) Implementing solutions in phases to validate returns early, 4) Providing detailed reporting and analytics to track progress, and 5) Continuously optimizing solutions based on performance data.',
  },
  {
    question: 'How do you handle data security and compliance?',
    answer:
      'Security and compliance are fundamental to our consulting approach. We implement comprehensive security frameworks, conduct regular security assessments, ensure compliance with industry regulations (GDPR, HIPAA, etc.), and provide security training. Our recommendations always prioritize data protection and regulatory compliance.',
  },
  {
    question: 'What is your expertise in emerging technologies?',
    answer:
      'We maintain deep expertise in emerging technologies including AI/ML, Blockchain, IoT, Cloud Computing, and Edge Computing. Our consultants regularly undergo training and certification programs to stay current with technological advancements. We help clients evaluate and adopt emerging technologies that align with their business objectives.',
  },
  {
    question: 'How do you manage change and ensure adoption?',
    answer:
      'Change management is integral to our consulting process. We develop comprehensive change management strategies that include stakeholder analysis, communication planning, training programs, and adoption monitoring. We work closely with your team to ensure smooth transition and maximum user adoption of new technologies.',
  },
  {
    question: 'What is your consulting engagement process?',
    answer:
      'Our engagement process typically includes: 1) Initial Discovery and Assessment, 2) Strategy Development and Planning, 3) Solution Design and Architecture, 4) Implementation Support and Guidance, 5) Change Management and Training, and 6) Ongoing Support and Optimization. We customize this process based on your specific needs and objectives.',
  },
] as const;

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

const ConsultingFAQSection = () => {
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
            Get answers to common questions about our technology consulting services
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

export default ConsultingFAQSection;
