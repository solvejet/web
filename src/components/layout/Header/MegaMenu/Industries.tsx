// src/components/layout/Header/MegaMenu/Industries.tsx
'use client';

import React, { useState, useCallback, memo } from 'react';
import Link from 'next/link';
import Image, { type ImageProps } from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ArrowRight } from 'lucide-react';
import { industriesItems, type IndustryFeature } from '@/config/menu-data';
import { cn } from '@/lib/utils';
import { useMemoWithCache } from '@/hooks/use-memo';

interface IndustriesProps {
  isOpen: boolean;
  menuId: string;
}

interface FeatureCardProps {
  feature: IndustryFeature;
}

const FeatureCard = memo(function FeatureCard({ feature }: FeatureCardProps) {
  const Icon = feature.icon;

  return (
    <motion.div
      whileHover={{ scale: 1.01 }}
      className={cn(
        'group flex items-start gap-3 p-3 rounded-lg',
        'transition-all duration-300 hover:bg-accent/5'
      )}
    >
      <div className="p-2 rounded-lg bg-accent/10 transition-all duration-300 group-hover:scale-105">
        <Icon className="w-4 h-4 text-accent" />
      </div>
      <div>
        <h4 className="text-sm font-medium mb-0.5 text-foreground group-hover:text-accent">
          {feature.title}
        </h4>
        <p className="text-xs text-muted-foreground leading-relaxed group-hover:text-accent/80">
          {feature.description}
        </p>
      </div>
    </motion.div>
  );
});

interface IndustryItemProps {
  industry: (typeof industriesItems)[number];
  isActive: boolean;
  onMouseEnter: (id: string) => void;
}

const IndustryItem = memo(function IndustryItem({
  industry,
  isActive,
  onMouseEnter,
}: IndustryItemProps) {
  const Icon = industry.icon;

  return (
    <motion.div
      onMouseEnter={() => onMouseEnter(industry.id)}
      whileHover={{ x: 2 }}
      className={cn(
        'group flex items-center gap-3 p-3 cursor-pointer rounded-lg',
        'transition-all duration-300 ease-out',
        isActive && 'bg-accent/5'
      )}
    >
      <div
        className={cn(
          'p-2 rounded-lg transition-all duration-300',
          'border border-accent/10',
          isActive ? 'bg-accent/10' : 'group-hover:bg-accent/5'
        )}
      >
        <Icon className="w-4 h-4 text-accent" />
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="text-sm font-medium text-foreground group-hover:text-accent truncate">
          {industry.title}
        </h3>
        <p className="text-xs text-muted-foreground line-clamp-1">{industry.description}</p>
      </div>
      <ChevronRight
        className={cn(
          'w-4 h-4 text-muted-foreground transition-transform duration-300',
          isActive && 'rotate-90 text-accent'
        )}
      />
    </motion.div>
  );
});

const Industries = ({ isOpen, menuId }: IndustriesProps) => {
  const [activeId, setActiveId] = useState<string>(industriesItems[0]?.id ?? '');
  const defaultTitle = 'Featured';

  const handleMouseEnter = useCallback((id: string) => {
    setActiveId(id);
  }, []);

  const activeIndustry = industriesItems.find((item) => item.id === activeId);

  const imageProps = useMemoWithCache<ImageProps>(
    () => ({
      src: '/images/industries/featured.webp',
      alt: activeIndustry
        ? `${activeIndustry.title} industry solutions and features`
        : `${defaultTitle} industry solutions and features`,
      width: 400,
      height: 300,
      sizes: '(max-width: 768px) 100vw, 400px',
      loading: 'eager',
    }),
    [activeIndustry?.title ?? defaultTitle],
    { maxSize: 1 }
  );

  // Also update where we use activeIndustry to add a safety check
  if (!industriesItems.length || !activeIndustry) {
    return null;
  }

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
          className="relative w-full border-b border-border bg-background/80 backdrop-blur-sm"
          id={`${menuId}-content`}
          role="region"
          aria-label={`${activeIndustry.title} solutions`}
        >
          <div className="container mx-auto">
            <div className="grid grid-cols-12 gap-4 py-4">
              {/* Left Navigation */}
              <nav
                className="col-span-3 space-y-1 pr-4"
                role="menu"
                aria-label="Industry categories"
              >
                {industriesItems.map((industry) => (
                  <IndustryItem
                    key={industry.id}
                    industry={industry}
                    isActive={activeId === industry.id}
                    onMouseEnter={handleMouseEnter}
                  />
                ))}
              </nav>

              {/* Right Content */}
              <motion.div
                key={activeIndustry.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
                className="col-span-9"
              >
                <div className="grid grid-cols-2 gap-6 p-4">
                  {/* Features Section */}
                  <div className="space-y-4">
                    <div>
                      <h2 className="text-lg font-semibold text-foreground mb-1">
                        {activeIndustry.title}
                      </h2>
                      <p className="text-sm text-muted-foreground">{activeIndustry.description}</p>
                    </div>

                    <div className="space-y-1">
                      {activeIndustry.features.map((feature, index) => (
                        <FeatureCard key={index} feature={feature} />
                      ))}
                    </div>

                    <Link
                      href={`/industries/${activeIndustry.id}`}
                      className={cn(
                        'inline-flex items-center gap-2 px-4 py-2 rounded-lg',
                        'bg-accent text-accent-foreground text-sm font-medium',
                        'transition-all duration-300 hover:bg-accent/90',
                        'hover:gap-3'
                      )}
                    >
                      Explore Solutions
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>

                  {/* Image Section */}
                  <div className="space-y-4">
                    <div className="aspect-[4/3] rounded-lg overflow-hidden bg-muted">
                      <Image
                        {...imageProps}
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default memo(Industries);
