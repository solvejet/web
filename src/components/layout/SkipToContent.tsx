// src/components/layout/SkipToContent.tsx
import { cn } from '@/lib/utils';

const SkipToContent = () => (
  <a
    href="#main-content"
    className={cn(
      // Base styles
      'sr-only',
      // Focus styles
      'focus:not-sr-only focus:fixed focus:top-4 focus:left-4',
      'focus:z-50 focus:block',
      // Visual styles
      'focus:bg-background focus:text-foreground',
      'focus:px-4 focus:py-3',
      'focus:rounded-md focus:shadow-lg',
      'focus:outline-none focus:ring-2 focus:ring-accent',
      // Touch target size
      'min-h-[44px] min-w-[44px]',
      // Ensure proper contrast
      'text-base font-medium'
    )}
  >
    Skip to main content
  </a>
);

export default SkipToContent;
