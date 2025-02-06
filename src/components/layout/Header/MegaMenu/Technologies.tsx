// src/components/layout/Header/MegaMenu/Technologies.tsx
'use client';

import React, { useState, useCallback, memo } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ArrowRight } from 'lucide-react';
import { techCategories, type TechCategory, type TechItem } from '@/config/tech-data';
import { cn } from '@/lib/utils';
import { useMemoWithCache } from '@/hooks/use-memo';

interface TechnologiesProps {
  isOpen: boolean;
  menuId: string;
}

interface CategoryItemProps {
  category: TechCategory;
  isActive: boolean;
  onHover: (id: string) => void;
}

const TechItem = memo(function TechItem({ tech }: { tech: TechItem }) {
  return (
    <Link
      href={tech.link}
      className={cn(
        'group relative flex items-start p-2 rounded-md',
        'transition-all duration-200 ease-out hover:bg-accent/5'
      )}
    >
      <div className="flex-1">
        <h4 className="text-sm font-medium text-foreground group-hover:text-accent">
          {tech.name}
          {tech.popular && (
            <span className="ml-2 inline-flex items-center rounded-full bg-accent/10 px-2 py-0.5 text-xs text-accent">
              Popular
            </span>
          )}
        </h4>
        <p className="text-xs text-muted-foreground group-hover:text-accent/80">
          {tech.description}
        </p>
      </div>
      <ChevronRight className="w-4 h-4 opacity-0 -translate-x-2 text-accent transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0" />
    </Link>
  );
});

const CategoryItem = memo(function CategoryItem({
  category,
  isActive,
  onHover,
}: CategoryItemProps) {
  const Icon = category.icon;

  return (
    <div
      onMouseEnter={() => onHover(category.id)}
      className={cn(
        'group flex items-center gap-3 p-3 cursor-pointer rounded-lg',
        'transition-all duration-200 ease-out',
        isActive && 'bg-accent/5'
      )}
    >
      <div
        className={cn(
          'p-2 rounded-lg transition-colors duration-200',
          isActive ? 'bg-accent/10 text-accent' : 'text-muted-foreground group-hover:text-accent'
        )}
      >
        <Icon className="w-4 h-4" />
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="text-sm font-medium text-foreground group-hover:text-accent truncate">
          {category.title}
        </h3>
        <p className="text-xs text-muted-foreground line-clamp-1">{category.description}</p>
      </div>
      <ChevronRight
        className={cn(
          'w-4 h-4 text-muted-foreground transition-transform duration-200',
          isActive && 'rotate-90 text-accent'
        )}
      />
    </div>
  );
});

const Technologies: React.FC<TechnologiesProps> = ({ isOpen, menuId }) => {
  const [activeId, setActiveId] = useState<string>(techCategories[0]?.id ?? '');

  const handleHover = useCallback((id: string) => {
    setActiveId(id);
  }, []);

  const activeCategory = techCategories.find((cat) => cat.id === activeId);
  const popularTechnologies = useMemoWithCache(
    () => techCategories.flatMap((cat) => cat.technologies.filter((tech) => tech.popular)),
    [],
    { maxSize: 1 }
  );

  if (!techCategories.length || !activeCategory) {
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
          className="relative w-full border-b border-border shadow-lg"
          id={`${menuId}-content`}
          role="region"
          aria-label="Technology categories"
        >
          <div className="container mx-auto py-6">
            <div className="grid grid-cols-12 gap-6">
              {/* Categories Navigation */}
              <nav className="col-span-3 space-y-1" role="menu">
                {techCategories.map((category) => (
                  <CategoryItem
                    key={category.id}
                    category={category}
                    isActive={activeId === category.id}
                    onHover={handleHover}
                  />
                ))}
              </nav>

              {/* Active Category Content */}
              <motion.div
                key={activeCategory.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
                className="col-span-9"
              >
                <div className="grid grid-cols-2 gap-6">
                  {/* Technologies List */}
                  <div className="space-y-4">
                    <div>
                      <h2 className="text-lg font-semibold text-foreground mb-1">
                        {activeCategory.title}
                      </h2>
                      <p className="text-sm text-muted-foreground">{activeCategory.description}</p>
                    </div>

                    <div className="grid grid-cols-1 gap-2">
                      {activeCategory.technologies.map((tech) => (
                        <TechItem key={tech.name} tech={tech} />
                      ))}
                    </div>

                    <Link
                      href={`/technologies/${activeCategory.id}`}
                      className={cn(
                        'inline-flex items-center gap-2 mt-4',
                        'text-sm font-medium text-accent hover:text-accent/80',
                        'transition-colors duration-200'
                      )}
                    >
                      View All {activeCategory.title}
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>

                  {/* Popular Technologies Section */}
                  <div className="bg-accent/5 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-foreground mb-4">
                      Popular Technologies
                    </h3>
                    <div className="grid grid-cols-1 gap-3">
                      {popularTechnologies.slice(0, 6).map((tech) => (
                        <Link
                          key={tech.name}
                          href={tech.link}
                          className={cn(
                            'group flex items-center justify-between p-3 rounded-md',
                            'bg-background hover:bg-accent/5',
                            'transition-all duration-200'
                          )}
                        >
                          <div>
                            <h4 className="text-sm font-medium text-foreground group-hover:text-accent">
                              {tech.name}
                            </h4>
                            <p className="text-xs text-muted-foreground">{tech.description}</p>
                          </div>
                          <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-accent" />
                        </Link>
                      ))}

                      <Link
                        href="/technologies"
                        className={cn(
                          'inline-flex items-center justify-center gap-2 mt-4 w-full',
                          'px-4 py-2 rounded-md',
                          'bg-accent text-accent-foreground',
                          'hover:bg-accent/90 transition-colors duration-200'
                        )}
                      >
                        View All Technologies
                        <ArrowRight className="w-4 h-4" />
                      </Link>
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

export default memo(Technologies);
