// src/components/layout/Header/Navbar.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ChevronDown } from 'lucide-react';
import Logo from '@/components/ui/Logo';
import Button from '@/components/ui/Button';
import { cn } from '@/lib/utils';
import { useMemoWithCache } from '@/hooks/use-memo';
import HamburgerIcon from '@/components/ui/HamburgerIcon';
import MobileMenu from './MobileMenu';
import { AnimatePresence } from 'framer-motion';

export type MenuId = 'what-we-do' | 'industries' | 'technologies' | 'company' | 'case-studies';

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  isActive?: boolean;
  menu?: MenuId;
  onMenuOpenAction?: (menu: MenuId) => void;
}

interface NavbarProps {
  openMenu: MenuId | null;
  onMenuOpenAction: (menu: MenuId) => void;
  onMouseLeaveAction: () => void;
}

const NavLink = ({ href, children, isActive, menu, onMenuOpenAction }: NavLinkProps) => {
  const handleMouseEnter = () => {
    if (menu && onMenuOpenAction) {
      onMenuOpenAction(menu);
    }
  };

  return (
    <div className="relative" onMouseEnter={handleMouseEnter} role="none">
      <Link
        href={href}
        className={cn(
          'group inline-flex items-center relative px-3 py-2 text-sm',
          'focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2',
          isActive && 'text-accent'
        )}
        aria-current={isActive ? 'page' : undefined}
        aria-expanded={isActive}
        role="menuitem"
      >
        <span className="flex items-center gap-1">
          {children}
          <ChevronDown
            className={cn(
              'h-3.5 w-3.5 opacity-50 transition-transform duration-200',
              isActive ? '-rotate-180' : 'group-hover:-rotate-180'
            )}
            aria-hidden="true"
          />
        </span>
        <span
          className={cn(
            'absolute left-3 right-3 -bottom-1 h-[2px] bg-brand-primary origin-left transition-transform duration-300 ease-out',
            isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
          )}
          aria-hidden="true"
        />
      </Link>
    </div>
  );
};

export default function Navbar({ openMenu, onMenuOpenAction, onMouseLeaveAction }: NavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleCloseAction = () => {
    setIsMobileMenuOpen(false);
  };

  const menuItems = useMemoWithCache(
    () => [
      { id: 'what-we-do' as const, title: 'What We Do', href: '/what-we-do' },
      { id: 'industries' as const, title: 'Industries', href: '/industries' },
      { id: 'technologies' as const, title: 'Technology', href: '/technologies' },
      { id: 'company' as const, title: 'Company', href: '/company' },
      { id: 'case-studies' as const, title: 'Case Studies', href: '/case-studies' },
    ],
    [],
    { maxSize: 1 }
  );

  return (
    <>
      <nav
        className={cn(
          'sticky top-0 z-40 w-full border-b border-border transition-colors',
          'bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60'
        )}
        aria-label="Main navigation"
        onMouseLeave={onMouseLeaveAction}
        suppressHydrationWarning
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Left section with Logo and Desktop Nav */}
            <div className="flex items-center">
              {/* Logo */}
              <div className="flex-shrink-0">
                <Link
                  href="/"
                  className="focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2"
                  aria-label="SolveJet - Return to homepage"
                >
                  <Logo preserveColor className="h-12 w-auto" />
                </Link>
              </div>

              {/* Desktop Navigation */}
              <div
                className="hidden md:flex items-center justify-center space-x-8 ml-8"
                role="menubar"
                aria-label="Desktop navigation"
              >
                {menuItems.map(({ id, title, href }) => (
                  <NavLink
                    key={id}
                    href={href}
                    menu={id}
                    onMenuOpenAction={onMenuOpenAction}
                    isActive={openMenu === id}
                  >
                    {title}
                  </NavLink>
                ))}
              </div>
            </div>

            {/* Right section with CTA and Mobile Menu */}
            <div className="flex items-center space-x-4">
              {/* CTA Button */}
              <div className="hidden md:block">
                <Button
                  size="sm"
                  className="text-sm px-4 py-1.5"
                  onClick={() => (window.location.href = '/contact')}
                  aria-label="Contact us"
                >
                  Get in Touch
                </Button>
              </div>

              {/* Mobile Menu Toggle */}
              <div className="md:hidden">
                <HamburgerIcon
                  isOpen={isMobileMenuOpen}
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="md:hidden"
                />
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu with AnimatePresence for smooth transitions */}
      <AnimatePresence>
        {isMobileMenuOpen && <MobileMenu onCloseAction={handleCloseAction} />}
      </AnimatePresence>
    </>
  );
}
