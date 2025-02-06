// src/components/layout/Header/MegaMenu/WhatWeDo.tsx
'use client';

import React, { useState, useCallback, memo } from 'react';
import Link from 'next/link';
import Image, { type ImageProps } from 'next/image';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { whatWeDoItems, type MenuItem } from '@/config/menu-data';
import { cn } from '@/lib/utils';
import { useMemoWithCache, useDeepMemo } from '@/hooks/use-memo';

interface MegaMenuProps {
  isOpen: boolean;
  onClose: () => void;
  menuId: string;
}

const ImageLoader = memo(function ImageLoader() {
  return <div className="absolute inset-0 bg-muted animate-pulse rounded-lg" aria-hidden="true" />;
});

interface MenuItemProps {
  item: MenuItem;
  isActive: boolean;
  onHover: (title: string | null) => void;
}

const MenuItem = memo(function MenuItem({ item, isActive, onHover }: MenuItemProps) {
  const Icon = item.icon;

  const itemStyles = useMemoWithCache(
    () => ({
      background: `color-mix(in srgb, ${item.color || 'rgb(var(--accent))'} 10%, transparent)`,
      iconColor: item.color || 'rgb(var(--accent))',
    }),
    [item.color],
    { maxSize: 50 }
  );

  return (
    <Link
      href={item.href}
      style={
        {
          '--hover-bg': `color-mix(in srgb, ${item.color || 'rgb(var(--accent))'} 8%, transparent)`,
        } as React.CSSProperties
      }
      className={cn(
        'group relative flex items-start p-3 rounded-lg',
        'transition-all duration-300 ease-out',
        'hover:scale-[1.02]',
        'active:scale-[0.98]',
        isActive && 'bg-muted/40'
      )}
      onMouseEnter={() => onHover(item.title)}
      onMouseLeave={() => onHover(null)}
      role="menuitem"
      aria-describedby={`${item.title.toLowerCase().replace(/\s+/g, '-')}-description`}
    >
      <div
        className={cn(
          'flex h-10 w-10 items-center justify-center rounded-lg',
          'transition-all duration-300 ease-out',
          'group-hover:scale-110 group-hover:rotate-3',
          'group-active:scale-95'
        )}
        style={{ backgroundColor: itemStyles.background }}
        aria-hidden="true"
      >
        <Icon
          className={cn('w-5 h-5', 'transition-all duration-300', 'group-hover:scale-110')}
          style={{ color: itemStyles.iconColor }}
        />
      </div>
      <div className="ml-3">
        <h4
          className={cn(
            'text-sm font-medium text-foreground mb-0.5',
            'transition-all duration-300',
            'group-hover:text-accent group-hover:translate-x-1'
          )}
        >
          {item.title}
        </h4>
        <p
          id={`${item.title.toLowerCase().replace(/\s+/g, '-')}-description`}
          className={cn(
            'text-xs text-muted-foreground line-clamp-2',
            'transition-all duration-300 delay-75',
            'group-hover:text-accent/80 group-hover:translate-x-1'
          )}
        >
          {item.description}
        </p>
      </div>
    </Link>
  );
});

interface FeaturedContentProps {
  imageProps: Omit<ImageProps, 'src'> & { src: string };
}

const FeaturedContent = memo(function FeaturedContent({ imageProps }: FeaturedContentProps) {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <aside className="col-span-1 bg-accent/5 rounded-lg p-4">
      <h3 className="text-lg font-semibold mb-3 text-foreground">Featured Case Study</h3>
      <div className="relative aspect-video rounded-lg bg-muted mb-3 overflow-hidden">
        {!imageLoaded && <ImageLoader />}
        <Image
          {...imageProps}
          alt={imageProps.alt || 'Featured case study illustration'}
          className={cn(
            'w-full h-full object-cover transition-all duration-300',
            'hover:scale-105',
            !imageLoaded && 'opacity-0'
          )}
          onLoad={() => setImageLoaded(true)}
          priority
        />
      </div>
      <h4 className="text-sm font-medium text-foreground mb-2">
        Enterprise Digital Transformation
      </h4>
      <p className="text-xs text-muted-foreground mb-3">
        How we helped a Fortune 500 company modernize their legacy systems
      </p>
      <Link
        href="/case-studies/enterprise-transformation"
        className={cn(
          'inline-flex items-center text-xs font-medium text-accent',
          'transition-all duration-300',
          'hover:text-accent/80 hover:gap-2',
          'focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2'
        )}
        aria-label="Read more about Enterprise Digital Transformation case study"
      >
        Read More
        <ChevronRight
          className={cn(
            'ml-1 h-3 w-3',
            'transition-transform duration-300',
            'group-hover:translate-x-1'
          )}
          aria-hidden="true"
        />
      </Link>
    </aside>
  );
});

const WhatWeDo: React.FC<MegaMenuProps> = ({ isOpen, menuId }) => {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  const imageProps = useMemoWithCache(
    () => ({
      src: '/case-study-image.webp',
      alt: 'Enterprise Digital Transformation Case Study visualization',
      width: 400,
      height: 225,
      sizes: '(max-width: 768px) 100vw, 400px',
      loading: 'eager' as const,
      className: 'object-cover w-full h-full rounded-lg',
    }),
    [],
    { maxSize: 1 }
  );

  const handleHover = useCallback((title: string | null) => {
    setHoveredItem(title);
  }, []);

  const menuItems = useDeepMemo(
    whatWeDoItems.map((item) => (
      <MenuItem
        key={item.title}
        item={item}
        isActive={hoveredItem === item.title}
        onHover={handleHover}
      />
    )),
    [hoveredItem, handleHover]
  );

  const variants: Variants = {
    initial: { opacity: 0, y: -20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <motion.div
          initial="initial"
          animate="animate"
          exit="exit"
          variants={variants}
          transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
          className="relative w-full"
          id={`${menuId}-content`}
        >
          <div className="relative border-b border-border shadow-lg">
            <div className="container mx-auto py-6">
              <h2 className="sr-only">Our Services Navigation</h2>
              <div
                className="grid grid-cols-3 gap-6 overflow-y-auto"
                style={{ maxHeight: 'calc(100vh - 200px)' }}
                role="menu"
              >
                <div className="col-span-2">
                  <h3 className="text-lg font-semibold mb-4 text-foreground">Our Services</h3>
                  <div className="grid grid-cols-2 gap-4" role="menu" aria-label="Services menu">
                    {menuItems}
                  </div>
                </div>
                <FeaturedContent imageProps={imageProps} />
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default memo(WhatWeDo);
