// src/components/layout/Header/Navbar.tsx
import { memo } from 'react';
import Link from 'next/link';
import { ChevronDown } from 'lucide-react';
import Logo from '@/components/ui/Logo';
import Button from '@/components/ui/Button';
import { MobileMenuButton } from './MobileMenu';
import { cn } from '@/lib/utils';
import type { MenuId } from './index';

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  isActive?: boolean;
  menu?: MenuId;
  onMenuOpen?: (menu: MenuId) => void;
}

const NavLink = memo(function NavLink({
  href,
  children,
  isActive,
  menu,
  onMenuOpen,
}: NavLinkProps) {
  const handleMouseEnter = () => {
    if (menu && onMenuOpen) {
      onMenuOpen(menu);
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
});

export interface NavbarProps {
  openMenu: MenuId | null;
  onMenuOpen: (menu: MenuId) => void;
  onMouseLeave: () => void;
}

const menuItems: Array<{ id: MenuId; title: string; href: string }> = [
  { id: 'what-we-do', title: 'What We Do', href: '/what-we-do' },
  { id: 'industries', title: 'Industries', href: '/industries' },
  { id: 'technologies', title: 'Technology', href: '/technologies' },
  { id: 'company', title: 'Company', href: '/company' },
  { id: 'case-studies', title: 'Case Studies', href: '/case-studies' },
] as const;

const Navbar = ({ openMenu, onMenuOpen, onMouseLeave }: NavbarProps) => {
  return (
    <nav className="relative border-b border-border" aria-label="Main navigation">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link
              href="/"
              className="focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2"
              aria-label="SolveJet - Return to homepage"
            >
              <Logo preserveColor />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div
            className="hidden md:flex items-center justify-center space-x-8"
            onMouseLeave={onMouseLeave}
            role="menubar"
            aria-label="Desktop navigation"
          >
            {menuItems.map(({ id, title, href }) => (
              <NavLink
                key={id}
                href={href}
                menu={id}
                onMenuOpen={onMenuOpen}
                isActive={openMenu === id}
              >
                {title}
              </NavLink>
            ))}
          </div>

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

          {/* Mobile Menu Button */}
          <div className="flex md:hidden">
            <MobileMenuButton />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default memo(Navbar);
