// src/components/layout/Header/Topbar.tsx
import Link from 'next/link';
import { Phone, LogIn } from 'lucide-react';
import { ThemeToggle } from '@/components/theme-provider';

const TopbarLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <Link href={href} className="group inline-flex items-center space-x-1 relative">
    <span className="flex items-center gap-1">{children}</span>
    <span className="absolute left-0 -bottom-1 w-full h-[2px] bg-brand-primary origin-left scale-x-0 transition-transform duration-300 ease-out group-hover:scale-x-100" />
  </Link>
);

const Topbar = () => {
  return (
    <div className="relative w-full bg-background/95 text-foreground border-b border-border backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-9 items-center justify-between text-sm">
          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-6">
            <TopbarLink href="/partnership">
              <span className="relative">Become a partner</span>
            </TopbarLink>

            <TopbarLink href="/contact">
              <Phone className="h-3.5 w-3.5" />
              <span className="relative">Contact</span>
            </TopbarLink>

            <TopbarLink href="/login">
              <LogIn className="h-3.5 w-3.5" />
              <span className="relative">Login</span>
            </TopbarLink>
          </nav>

          {/* Mobile View */}
          <div className="flex lg:hidden items-center">
            <TopbarLink href="/partnership">
              <span className="text-xs">Become a Partner</span>
            </TopbarLink>
          </div>

          {/* Theme Toggle - Both Mobile and Desktop */}
          <div className="flex items-center pl-4">
            <ThemeToggle aria-label="Toggle theme" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Topbar;
