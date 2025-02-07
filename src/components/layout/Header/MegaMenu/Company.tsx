// src/components/layout/Header/MegaMenu/Company.tsx
'use client';

import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { ArrowRight } from 'lucide-react';
import { CompanyLinks } from '@/config/company-data';

interface CompanyProps {
  isOpen: boolean;
  menuId: string;
}

const Company = ({ isOpen, menuId }: CompanyProps) => {
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
          aria-label="Company menu"
        >
          <div className="container mx-auto py-6">
            <div className="grid grid-cols-4 gap-6">
              {CompanyLinks.map((section, index) => {
                const Icon = section.icon;
                return (
                  <motion.div
                    key={section.title}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="group"
                  >
                    {/* Main Section Link */}
                    <Link
                      href={section.href}
                      className={cn(
                        'relative flex flex-col gap-2 p-4 rounded-lg',
                        'transition-all duration-300',
                        'hover:bg-accent/5 hover:shadow-lg hover:-translate-y-0.5',
                        'after:absolute after:bottom-0 after:left-4 after:right-4',
                        'after:h-0.5 after:bg-accent after:scale-x-0',
                        'hover:after:scale-x-100 after:transition-transform',
                        'after:origin-left after:duration-300'
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-md bg-accent/10 transition-colors group-hover:bg-accent/20">
                          <Icon className="w-5 h-5 text-accent" />
                        </div>
                        <h3 className="text-base font-semibold text-foreground group-hover:text-accent">
                          {section.title}
                        </h3>
                      </div>
                      <p className="text-sm text-muted-foreground pl-12">{section.description}</p>
                    </Link>

                    {/* Quick Links */}
                    <div className="mt-2 space-y-1 pl-12">
                      {section.links.map((link) => (
                        <Link
                          key={link.href}
                          href={link.href}
                          className={cn(
                            'group/link flex items-center text-sm text-muted-foreground',
                            'py-1.5 px-3 rounded-md transition-all duration-200',
                            'hover:text-accent hover:bg-accent/5'
                          )}
                        >
                          <span className="relative">
                            {link.text}
                            <span className="absolute bottom-0 left-0 w-full h-px bg-accent transform scale-x-0 transition-transform group-hover/link:scale-x-100" />
                          </span>
                          <ArrowRight className="w-4 h-4 ml-auto opacity-0 -translate-x-2 transition-all group-hover/link:opacity-100 group-hover/link:translate-x-0" />
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Company;
