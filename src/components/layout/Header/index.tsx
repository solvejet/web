// src/components/layout/Header/index.tsx
'use client';

import { useState, useRef } from 'react';
import { cn } from '@/lib/utils';
import Topbar from './Topbar';
import Navbar from './Navbar';
import WhatWeDo from './MegaMenu/WhatWeDo';
import Industries from './MegaMenu/Industries';
import Technologies from './MegaMenu/Technologies';

export type MenuId = 'what-we-do' | 'industries' | 'technologies' | 'company' | 'case-studies';

const SkipToContent = () => (
  <a
    href="#main-content"
    className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[100] focus:px-4 focus:py-2 focus:bg-background focus:text-foreground focus:outline-none focus:ring-2 focus:ring-accent rounded-md"
  >
    Skip to main content
  </a>
);

const Header = () => {
  const [openMenu, setOpenMenu] = useState<MenuId | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout>();
  const menuRef = useRef<HTMLDivElement>(null);
  const menuId = 'main-mega-menu';

  const handleMenuOpen = (menu: MenuId) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setOpenMenu(menu);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setOpenMenu(null);
    }, 150);
  };

  return (
    <>
      <SkipToContent />
      <header
        className="sticky top-0 w-full z-50 bg-background"
        role="banner"
        aria-label="Main header"
      >
        <Topbar />
        <div ref={menuRef} className="relative">
          <Navbar openMenu={openMenu} onMenuOpen={handleMenuOpen} onMouseLeave={handleMouseLeave} />

          {/* Mega Menu Container */}
          <div
            id={menuId}
            className={cn(
              'absolute left-0 right-0 bg-background shadow-lg',
              'before:absolute before:inset-0 before:bg-background/60 before:backdrop-blur-md before:-z-10',
              openMenu ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
            )}
            onMouseEnter={() => {
              if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
              }
            }}
            onMouseLeave={handleMouseLeave}
            style={{
              transition: 'opacity 0.2s ease-in-out',
            }}
          >
            {openMenu === 'what-we-do' && (
              <WhatWeDo
                isOpen={true}
                menuId={menuId}
                onClose={function (): void {
                  throw new Error('Function not implemented.');
                }}
              />
            )}
            {openMenu === 'industries' && <Industries isOpen={true} menuId={menuId} />}
            {openMenu === 'technologies' && <Technologies isOpen={true} menuId={menuId} />}
          </div>
        </div>
      </header>
    </>
  );
};

// Prevent unnecessary re-renders
export default Header;
