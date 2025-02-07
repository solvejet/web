// src/components/ui/HamburgerIcon.tsx
import { memo } from 'react';
import { cn } from '@/lib/utils';

interface HamburgerIconProps {
  isOpen: boolean;
  onClick: () => void;
  className?: string;
}

const HamburgerIcon = memo(function HamburgerIcon({
  isOpen,
  onClick,
  className,
}: HamburgerIconProps) {
  return (
    <button
      type="button"
      className={cn(
        'relative inline-flex h-12 w-12 items-center justify-center rounded-full',
        'transition-colors duration-200',
        'hover:bg-accent/5 active:bg-accent/10',
        'focus-visible:outline-none focus-visible:ring-2',
        'focus-visible:ring-accent focus-visible:ring-offset-2',
        className
      )}
      onClick={onClick}
      aria-expanded={isOpen}
      aria-label={isOpen ? 'Close menu' : 'Open menu'}
    >
      {/* Hamburger Lines Container */}
      <div className="flex h-4 w-5 flex-col justify-between">
        {/* Top line */}
        <span
          className={cn(
            'h-0.5 rounded-full bg-foreground',
            'origin-right transition-all duration-300 ease-in-out',
            'group-hover:bg-accent',
            isOpen ? 'w-3 translate-y-[2px] rotate-[-45deg]' : 'w-5'
          )}
        />
        {/* Middle line */}
        <span
          className={cn(
            'h-0.5 w-5 rounded-full bg-foreground',
            'transition-all duration-200 ease-in-out',
            'group-hover:bg-accent',
            isOpen && 'opacity-0 translate-x-3'
          )}
        />
        {/* Bottom line */}
        <span
          className={cn(
            'h-0.5 rounded-full bg-foreground',
            'origin-right transition-all duration-300 ease-in-out',
            'group-hover:bg-accent',
            isOpen ? 'w-3 translate-y-[-2px] rotate-45' : 'w-5'
          )}
        />
      </div>
    </button>
  );
});

export default HamburgerIcon;
