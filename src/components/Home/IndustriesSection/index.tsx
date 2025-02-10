// src/components/Home/IndustriesSection/index.tsx
'use client';

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { industriesItems } from '@/config/menu-data';
import type { IndustryItem } from '@/config/menu-data';
import { cn } from '@/lib/utils';
import Button from '@/components/ui/Button';
import { ArrowUpRight } from 'lucide-react';

// SEO Schema for Industries Section
const industriesSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Industry Solutions',
  description:
    'Delivering innovative solutions across diverse sectors, tailored to meet industry-specific challenges',
  provider: {
    '@type': 'Organization',
    name: 'SolveJet',
  },
  areaServed: industriesItems.map((industry) => ({
    '@type': 'ServiceArea',
    name: industry.title,
    description: industry.description,
  })),
};

const IndustriesSection = () => {
  // Ensure we have a default industry and handle potential empty array
  const defaultIndustry = industriesItems[0];
  if (!defaultIndustry) {
    throw new Error('No industries found. At least one industry must be defined.');
  }
  const [activeIndustry, setActiveIndustry] = useState<IndustryItem>(defaultIndustry);

  // Track industry selection in analytics
  const handleIndustryClick = useCallback((industry: NonNullable<IndustryItem>) => {
    setActiveIndustry(industry);

    // Google Analytics Event
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'industry_selection', {
        event_category: 'Industry Engagement',
        event_label: industry.title,
        industry_id: industry.id,
      });
    }

    // Google Tag Manager Event
    if (typeof window !== 'undefined' && window.dataLayer) {
      window.dataLayer.push({
        event: 'industry_selection',
        industryName: industry.title,
        industryId: industry.id,
      });
    }
  }, []);

  // Track CTA click
  const handleCTAClick = useCallback(() => {
    // Google Analytics Event
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'cta_click', {
        event_category: 'Industry Section',
        event_label: 'Explore All Industries',
        outbound: true,
      });
    }

    // Google Tag Manager Event
    if (typeof window !== 'undefined' && window.dataLayer) {
      window.dataLayer.push({
        event: 'industry_cta_click',
        ctaLocation: 'industry_section',
        ctaText: 'Explore All Industries',
      });
    }
  }, []);

  return (
    <section
      className="relative overflow-hidden bg-background py-24 lg:py-32"
      aria-labelledby="industries-title"
    >
      {/* SEO Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(industriesSchema) }}
      />

      {/* Background Patterns */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0 opacity-[0.15]"
          style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, var(--border) 1px, transparent 0)',
            backgroundSize: '40px 40px',
            maskImage: 'linear-gradient(to bottom, black, transparent)',
            WebkitMaskImage: 'linear-gradient(to bottom, black, transparent)',
          }}
        />
        <div className="absolute bottom-0 left-0 right-0 h-96 bg-gradient-to-t from-background to-transparent" />
      </div>

      <div className="container relative mx-auto px-4">
        {/* Section Header with Semantic HTML */}
        <header className="mx-auto max-w-2xl text-center mb-16">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-sm font-semibold uppercase tracking-wider text-accent"
          >
            Industries We Serve
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            id="industries-title"
            className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl"
          >
            Expertise Across
            <span className="block bg-gradient-to-r from-accent to-accent/60 bg-clip-text text-transparent">
              Multiple Industries
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-6 text-lg text-muted-foreground"
          >
            Delivering innovative solutions across diverse sectors, tailored to meet
            industry-specific challenges
          </motion.p>
        </header>

        {/* Interactive Content */}
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Left: Industry List */}
          <nav className="space-y-4" aria-label="Industries navigation">
            {industriesItems.map((industry, index) => {
              const Icon = industry.icon;
              const isActive = activeIndustry.id === industry.id;

              return (
                <motion.div
                  key={industry.id}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <button
                    onClick={() => handleIndustryClick(industry)}
                    className={cn(
                      'w-full rounded-xl p-4 text-left transition-all duration-300',
                      'hover:bg-accent/5 focus:outline-none focus:ring-2 focus:ring-accent/50',
                      isActive && 'bg-accent/10'
                    )}
                    aria-current={isActive ? 'true' : undefined}
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className={cn(
                          'flex h-12 w-12 items-center justify-center rounded-lg',
                          'transition-all duration-300',
                          isActive ? 'bg-accent text-accent-foreground' : 'bg-accent/10 text-accent'
                        )}
                      >
                        <Icon className="h-6 w-6" aria-hidden="true" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold">{industry.title}</h3>
                        <p className="mt-1 text-sm text-muted-foreground">{industry.description}</p>
                      </div>
                    </div>
                  </button>
                </motion.div>
              );
            })}
          </nav>

          {/* Right: Industry Details */}
          <div className="relative lg:sticky lg:top-8">
            <AnimatePresence mode="wait">
              <motion.article
                key={activeIndustry.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="rounded-2xl border border-border/50 bg-background/50 p-8"
              >
                {/* Features Grid */}
                <div className="mb-8 grid gap-6 sm:grid-cols-2">
                  {activeIndustry.features.map((feature, index) => {
                    const FeatureIcon = feature.icon;
                    return (
                      <motion.div
                        key={feature.title}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="group space-y-3 rounded-xl bg-accent/5 p-6 transition-colors hover:bg-accent/10"
                      >
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10 text-accent transition-colors group-hover:bg-accent/20">
                          <FeatureIcon className="h-5 w-5" aria-hidden="true" />
                        </div>
                        <h4 className="font-medium">{feature.title}</h4>
                        <p className="text-sm text-muted-foreground">{feature.description}</p>
                      </motion.div>
                    );
                  })}
                </div>

                {/* Stats */}
                <div className="mb-8 grid grid-cols-3 gap-4 rounded-xl bg-accent/5 p-6">
                  {activeIndustry.stats.map((stat, index) => (
                    <motion.div
                      key={stat.label}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 + index * 0.1 }}
                      className="text-center"
                    >
                      <div className="text-2xl font-bold text-accent">{stat.value}</div>
                      <div className="mt-1 text-sm text-muted-foreground">{stat.label}</div>
                    </motion.div>
                  ))}
                </div>

                {/* Solutions */}
                {activeIndustry.solutions && (
                  <div className="space-y-4">
                    <h4 className="font-medium">Solutions</h4>
                    <div className="flex flex-wrap gap-2">
                      {activeIndustry.solutions.map((solution) => (
                        <span
                          key={solution}
                          className="rounded-full bg-accent/10 px-3 py-1 text-sm text-accent"
                        >
                          {solution}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </motion.article>
            </AnimatePresence>
          </div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <Button
            href="/industries"
            variant="outline"
            size="lg"
            icon={<ArrowUpRight className="h-4 w-4" />}
            onClick={handleCTAClick}
          >
            Explore All Industries
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default IndustriesSection;
