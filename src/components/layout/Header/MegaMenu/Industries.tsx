// src/components/layout/Header/MegaMenu/Industries.tsx
'use client';

import React, { useState, useCallback, memo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ArrowRight } from 'lucide-react';
import { industriesItems, type IndustryFeature } from '@/config/menu-data';
import { cn } from '@/lib/utils';

interface IndustriesProps {
  isOpen: boolean;
  menuId: string;
}

// Modern color palette
const industryColors = {
  'real-estate': {
    primary: '#4F46E5', // Indigo
    light: '#E0E7FF', // Light Indigo
  },
  ecommerce: {
    primary: '#0891B2', // Cyan
    light: '#CFFAFE', // Light Cyan
  },
  manufacturing: {
    primary: '#2563EB', // Blue
    light: '#DBEAFE', // Light Blue
  },
  'travel-tourism': {
    primary: '#7C3AED', // Purple
    light: '#EDE9FE', // Light Purple
  },
  logistics: {
    primary: '#059669', // Emerald
    light: '#D1FAE5', // Light Emerald
  },
} as const;

type IndustryId = keyof typeof industryColors;

const isValidIndustryId = (id: string): id is IndustryId => {
  return id in industryColors;
};

const getIndustryColors = (id: string) => {
  if (isValidIndustryId(id)) {
    return industryColors[id];
  }
  return industryColors['ecommerce']; // default
};

interface FeatureCardProps {
  feature: IndustryFeature;
  colors: (typeof industryColors)[IndustryId];
}

const FeatureCard = memo(function FeatureCard({ feature, colors }: FeatureCardProps) {
  const Icon = feature.icon;

  return (
    <motion.div
      whileHover={{ scale: 1.01 }}
      className="group flex items-start gap-3 p-3 rounded-lg transition-all duration-300
                 hover:bg-white/50 dark:hover:bg-white/5"
    >
      <div
        className="p-2 rounded-lg transition-all duration-300 group-hover:scale-105"
        style={{
          backgroundColor: colors.light,
          color: colors.primary,
        }}
      >
        <Icon className="w-4 h-4" />
      </div>
      <div>
        <h4 className="text-sm font-medium mb-0.5 text-foreground">{feature.title}</h4>
        <p className="text-xs text-muted-foreground leading-relaxed">{feature.description}</p>
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
  const colors = getIndustryColors(industry.id);

  return (
    <motion.div
      onMouseEnter={() => onMouseEnter(industry.id)}
      whileHover={{ x: 2 }}
      className={cn(
        'group flex items-center gap-3 p-3 cursor-pointer rounded-lg',
        'transition-all duration-300 ease-out',
        isActive && 'bg-white/50 dark:bg-white/5'
      )}
    >
      <div
        className={cn(
          'p-2 rounded-lg transition-all duration-300',
          isActive ? 'scale-105' : 'group-hover:scale-105'
        )}
        style={{
          backgroundColor: isActive ? colors.light : 'transparent',
          color: colors.primary,
          border: `1px solid ${colors.light}`,
        }}
      >
        <Icon className="w-4 h-4" />
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="text-sm font-medium text-foreground mb-0.5 truncate">{industry.title}</h3>
        <p className="text-xs text-muted-foreground line-clamp-1">{industry.description}</p>
      </div>
      <ChevronRight
        className={cn(
          'w-4 h-4 text-muted-foreground/50 transition-transform duration-300',
          isActive && 'rotate-90'
        )}
      />
    </motion.div>
  );
});

const Industries: React.FC<IndustriesProps> = ({ isOpen, menuId }) => {
  const [activeId, setActiveId] = useState<string>(industriesItems[0]?.id ?? '');

  const handleMouseEnter = useCallback((id: string) => {
    setActiveId(id);
  }, []);

  const activeIndustry = industriesItems.find((item) => item.id === activeId);

  if (!industriesItems.length || !activeIndustry) {
    return null;
  }

  const colors = getIndustryColors(activeIndustry.id);

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
          className="relative w-full border-b border-border backdrop-blur-md 
                     bg-background/80 dark:bg-background/50"
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
                className="col-span-9 relative"
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
                        <FeatureCard key={index} feature={feature} colors={colors} />
                      ))}
                    </div>

                    <Link
                      href={`/industries/${activeIndustry.id}`}
                      className={cn(
                        'inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm',
                        'text-white font-medium transition-all duration-300',
                        'hover:gap-3'
                      )}
                      style={{ backgroundColor: colors.primary }}
                    >
                      Explore Solutions
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>

                  {/* Stats & Image Section */}
                  <div className="space-y-4">
                    <div className="aspect-[4/3] rounded-lg overflow-hidden">
                      <Image
                        src={activeIndustry.image}
                        alt={activeIndustry.title}
                        width={400}
                        height={300}
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                      />
                    </div>

                    <div className="grid grid-cols-3 gap-3">
                      {activeIndustry.stats.map((stat, index) => (
                        <div
                          key={index}
                          className="p-3 rounded-lg text-center bg-white/50 dark:bg-white/5 
                                   backdrop-blur-sm transition-all duration-300 hover:scale-105"
                        >
                          <p className="text-sm font-bold mb-0.5" style={{ color: colors.primary }}>
                            {stat.value}
                          </p>
                          <p className="text-xs text-muted-foreground">{stat.label}</p>
                        </div>
                      ))}
                    </div>

                    {activeIndustry.solutions && (
                      <div className="flex flex-wrap gap-2">
                        {activeIndustry.solutions.map((solution, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 text-xs rounded-md transition-all 
                                     duration-300 hover:scale-105"
                            style={{
                              backgroundColor: colors.light,
                              color: colors.primary,
                            }}
                          >
                            {solution}
                          </span>
                        ))}
                      </div>
                    )}
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
