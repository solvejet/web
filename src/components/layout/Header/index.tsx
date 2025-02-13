// src/components/layout/Header/index.tsx
'use client';

import { useState, useRef } from 'react';
import { cn } from '@/lib/utils';
import Topbar from './Topbar';
import Navbar from './Navbar';
import WhatWeDo from './MegaMenu/WhatWeDo';
import Industries from './MegaMenu/Industries';
import Company from './MegaMenu/Company';
import SkipToContent from '../SkipToContent';

export type MenuId = 'what-we-do' | 'industries' | 'company' | 'case-studies';

export default function Header() {
  const [openMenu, setOpenMenu] = useState<MenuId | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout>();
  const menuRef = useRef<HTMLDivElement>(null);
  const menuId = 'main-mega-menu';

  const handleMenuOpenAction = (menu: MenuId) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setOpenMenu(menu);
  };

  const handleMouseLeaveAction = () => {
    timeoutRef.current = setTimeout(() => {
      setOpenMenu(null);
    }, 150);
  };

  return (
    <>
      <SkipToContent />
      <header
        className="fixed top-0 left-0 right-0 z-40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
        role="banner"
        aria-label="Main header"
      >
        <Topbar />
        <div ref={menuRef} className="relative">
          <Navbar
            openMenu={openMenu}
            onMenuOpenAction={handleMenuOpenAction}
            onMouseLeaveAction={handleMouseLeaveAction}
          />

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
            onMouseLeave={handleMouseLeaveAction}
            style={{
              transition: 'opacity 0.2s ease-in-out',
            }}
          >
            {/* Desktop Mega Menus - Only shown on desktop */}
            <div className="hidden md:block">
              {openMenu === 'what-we-do' && (
                <WhatWeDo isOpen={true} menuId={menuId} onClose={() => setOpenMenu(null)} />
              )}
              {openMenu === 'industries' && <Industries isOpen={true} menuId={menuId} />}
              {openMenu === 'company' && <Company isOpen={true} menuId={menuId} />}
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
