// src/components/layout/Header/MobileMenu.tsx
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronDown } from 'lucide-react';
import { whatWeDoItems } from '@/config/menu-data';
import { techCategories } from '@/config/tech-data';
import { CompanyLinks } from '@/config/company-data';
import { cn } from '@/lib/utils';

interface MobileSubmenuProps {
  title: string;
  isOpen: boolean;
  onToggleAction: () => void;
  children: React.ReactNode;
}

interface MobileMenuProps {
  onCloseAction: () => void;
}

const MobileSubmenu = ({ title, isOpen, onToggleAction, children }: MobileSubmenuProps) => (
  <div className="border-b border-border/50">
    <button
      onClick={onToggleAction}
      className="flex w-full items-center justify-between p-4 text-left"
      aria-expanded={isOpen}
    >
      <span className="text-sm font-medium">{title}</span>
      <ChevronDown
        className={cn(
          'h-4 w-4 text-muted-foreground transition-transform duration-200',
          isOpen && 'rotate-180'
        )}
      />
    </button>
    <AnimatePresence initial={false}>
      {isOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="overflow-hidden bg-muted/50"
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  </div>
);

export default function MobileMenu({ onCloseAction }: MobileMenuProps) {
  const [openSection, setOpenSection] = useState<string | null>(null);

  const toggleSection = (section: string) => {
    setOpenSection(openSection === section ? null : section);
  };

  return (
    <>
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 top-[105px] z-40 bg-background/30 backdrop-blur-sm"
        onClick={onCloseAction}
        aria-hidden="true"
      />

      {/* Menu Content with Glassmorphism */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
        className={cn(
          'fixed inset-x-0 top-[105px] z-50 h-[calc(100vh-105px)] overflow-y-auto',
          'bg-background/80 backdrop-blur-md',
          'border-t border-border/50',
          'pb-safe-bottom shadow-lg',
          'supports-[backdrop-filter]:bg-background/60'
        )}
      >
        <div className="divide-y divide-border/50">
          {/* What We Do Section */}
          <MobileSubmenu
            title="What We Do"
            isOpen={openSection === 'what-we-do'}
            onToggleAction={() => toggleSection('what-we-do')}
          >
            <div className="space-y-1 p-2">
              {whatWeDoItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={onCloseAction}
                    className="flex items-center gap-3 rounded-md p-3 transition-colors hover:bg-accent/5"
                  >
                    <Icon className="h-5 w-5 text-accent" />
                    <div>
                      <div className="text-sm font-medium">{item.title}</div>
                      <div className="text-xs text-muted-foreground">{item.description}</div>
                    </div>
                    <ChevronRight className="ml-auto h-4 w-4 text-muted-foreground" />
                  </Link>
                );
              })}
            </div>
          </MobileSubmenu>

          {/* Technologies Section */}
          <MobileSubmenu
            title="Technologies"
            isOpen={openSection === 'technologies'}
            onToggleAction={() => toggleSection('technologies')}
          >
            <div className="space-y-1 p-2">
              {techCategories.map((category) => {
                const Icon = category.icon;
                return (
                  <Link
                    key={category.id}
                    href={`/technologies/${category.id}`}
                    onClick={onCloseAction}
                    className="flex items-center gap-3 rounded-md p-3 transition-colors hover:bg-accent/5"
                  >
                    <Icon className="h-5 w-5 text-accent" />
                    <div>
                      <div className="text-sm font-medium">{category.title}</div>
                      <div className="text-xs text-muted-foreground">{category.description}</div>
                    </div>
                    <ChevronRight className="ml-auto h-4 w-4 text-muted-foreground" />
                  </Link>
                );
              })}
            </div>
          </MobileSubmenu>

          {/* Company Section */}
          <MobileSubmenu
            title="Company"
            isOpen={openSection === 'company'}
            onToggleAction={() => toggleSection('company')}
          >
            <div className="space-y-1 p-2">
              {CompanyLinks.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={onCloseAction}
                    className="flex items-center gap-3 rounded-md p-3 transition-colors hover:bg-accent/5"
                  >
                    <Icon className="h-5 w-5 text-accent" />
                    <div>
                      <div className="text-sm font-medium">{item.title}</div>
                      <div className="text-xs text-muted-foreground">{item.description}</div>
                    </div>
                    <ChevronRight className="ml-auto h-4 w-4 text-muted-foreground" />
                  </Link>
                );
              })}
            </div>
          </MobileSubmenu>

          {/* Additional Links */}
          <div className="space-y-1 p-4">
            <Link
              href="/partnership"
              onClick={onCloseAction}
              className="flex items-center justify-between rounded-md p-3 text-sm transition-colors hover:bg-accent/5"
            >
              Become a Partner
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            </Link>
            <Link
              href="/contact"
              onClick={onCloseAction}
              className="flex items-center justify-between rounded-md p-3 text-sm transition-colors hover:bg-accent/5"
            >
              Contact
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            </Link>
            <Link
              href="/login"
              onClick={onCloseAction}
              className="flex items-center justify-between rounded-md p-3 text-sm transition-colors hover:bg-accent/5"
            >
              Login
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            </Link>
          </div>
        </div>
      </motion.div>
    </>
  );
}
