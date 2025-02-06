// src/components/layout/Header/MobileMenu.tsx
import { useState } from 'react';
import { ChevronDown, Link, Menu, X } from 'lucide-react';
import Button from '@/components/ui/Button';

const MobileMenuButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        className="inline-flex items-center justify-center rounded-md p-2 text-foreground/80 hover:bg-muted hover:text-accent focus:outline-none focus:ring-2 focus:ring-inset focus:ring-accent"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="sr-only">Open main menu</span>
        {isOpen ? (
          <X className="h-6 w-6" aria-hidden="true" />
        ) : (
          <Menu className="h-6 w-6" aria-hidden="true" />
        )}
      </button>

      {/* Mobile Menu Panel */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 bg-background border-b border-border">
          <div className="px-4 pt-2 pb-3 space-y-1">
            <MobileNavLink href="/what-we-do">What We Do</MobileNavLink>
            <MobileNavLink href="/industries">Industries</MobileNavLink>
            <MobileNavLink href="/solutions">Solutions</MobileNavLink>
            <MobileNavLink href="/company">Company</MobileNavLink>
            <MobileNavLink href="/case-studies">Case Studies</MobileNavLink>

            <div className="pt-4">
              <Button className="w-full justify-center">Get in Touch</Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

const MobileNavLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <Link
    href={href}
    className="block px-3 py-2 text-base font-medium text-foreground/80 hover:text-accent hover:bg-muted/50 rounded-md transition-colors"
  >
    <span className="flex items-center justify-between">
      {children}
      <ChevronDown className="h-4 w-4 opacity-50" />
    </span>
  </Link>
);

export { MobileMenuButton };
