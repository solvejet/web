// src/components/ServiceDetails/CloudServices/FAQSection/index.tsx
'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';
import { cn } from '@/lib/utils';

const faqs = [
  {
    question: 'What cloud platforms do you support?',
    answer:
      'We provide comprehensive support for all major cloud platforms including Amazon Web Services (AWS), Microsoft Azure, and Google Cloud Platform (GCP). Our expertise extends to multi-cloud and hybrid cloud solutions, allowing us to choose the best platform or combination of platforms to meet your specific business needs.',
  },
  {
    question: 'How do you ensure cloud security?',
    answer:
      'We implement multiple layers of security including encryption at rest and in transit, identity and access management (IAM), network security, and continuous monitoring. We follow industry best practices and compliance standards (ISO 27001, SOC 2, GDPR, etc.) while implementing security measures. Regular security audits and updates ensure your cloud infrastructure remains protected against evolving threats.',
  },
  {
    question: 'What is your cloud migration process?',
    answer:
      'Our cloud migration process follows a systematic approach: 1) Assessment - evaluating current infrastructure and requirements, 2) Planning - developing a detailed migration strategy, 3) Proof of Concept - testing with a small workload, 4) Migration - executing the migration in phases, and 5) Optimization - fine-tuning performance and costs. We ensure minimal disruption to your business operations during the migration.',
  },
  {
    question: 'How do you handle cloud cost optimization?',
    answer:
      'We employ various strategies for cost optimization including right-sizing resources, implementing auto-scaling, using reserved instances, and monitoring usage patterns. Our continuous monitoring tools help identify unused resources and opportunities for cost reduction. We provide regular cost analysis reports and recommendations for optimizing your cloud spend.',
  },
  {
    question: 'Do you provide 24/7 cloud support?',
    answer:
      'Yes, we offer 24/7 monitoring and support for your cloud infrastructure. Our team of certified cloud engineers is available round-the-clock to handle any issues or emergencies. We use advanced monitoring tools to detect and respond to potential problems before they impact your business operations.',
  },
  {
    question: 'How do you handle disaster recovery?',
    answer:
      'Our disaster recovery solutions include regular backups, multi-region deployment options, and automated failover procedures. We help develop and implement comprehensive disaster recovery plans tailored to your business continuity requirements. Regular testing ensures that recovery procedures work effectively when needed.',
  },
  {
    question: 'Can you help with cloud compliance requirements?',
    answer:
      'Yes, we have extensive experience in implementing cloud solutions that meet various compliance requirements including HIPAA, PCI DSS, GDPR, and SOC 2. We help implement necessary controls, documentation, and monitoring to maintain compliance. Regular audits ensure ongoing adherence to compliance standards.',
  },
  {
    question: 'What about cloud performance optimization?',
    answer:
      'We optimize cloud performance through various methods including architecture optimization, caching strategies, load balancing, and content delivery networks (CDN). Regular performance monitoring and analytics help identify bottlenecks and opportunities for improvement. We also implement auto-scaling to handle varying workloads efficiently.',
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
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6 text-muted-foreground">{answer}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const CloudFAQSection = () => {
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
            className="inline-flex rounded-full bg-cyan-500/10 px-4 py-1.5 text-sm font-medium text-cyan-500"
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
            <span className="mt-2 block bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text text-transparent">
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
            Find answers to common questions about our cloud services and solutions
          </motion.p>
        </div>

        {/* FAQ List */}
        <div className="mx-auto mt-16 max-w-4xl">
          <div className="divide-y divide-border/50">
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
      </div>

      {/* Background Effects */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/5 via-transparent to-cyan-500/5" />
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

export default CloudFAQSection;
