// src/components/ui/Button.tsx
import React, { useMemo } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface ButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'href'> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  icon?: React.ReactNode;
  href?: string;
  external?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'primary',
      size = 'md',
      loading,
      icon,
      href,
      external,
      children,
      ...props
    },
    ref
  ) => {
    // Memoize styles since they're computed from props
    const styles = useMemo(() => {
      const baseStyles = cn(
        // Base styles
        'inline-flex items-center justify-center rounded-md font-medium',
        'transition-all duration-300 ease-out-expo',
        // Focus and accessibility
        'focus:outline-none focus:ring-2 focus:ring-accent/50 focus:ring-offset-2',
        'disabled:opacity-50 disabled:pointer-events-none',
        // Touch target sizes
        'min-h-[44px] min-w-[44px]',
        // Spacing between icon and text
        'gap-2'
      );

      const variants = {
        primary:
          'bg-accent text-accent-foreground hover:bg-transparent hover:text-accent border-2 border-transparent hover:border-accent shadow-sm hover:shadow-md',
        secondary:
          'bg-muted text-muted-foreground hover:bg-transparent hover:text-muted-foreground border-2 border-transparent hover:border-muted',
        outline: 'border-2 border-accent text-accent hover:bg-accent/10',
        ghost: 'text-foreground hover:bg-muted/10 hover:text-accent',
      };

      const sizes = {
        sm: 'px-3 py-2 text-sm',
        md: 'px-4 py-2 text-base',
        lg: 'px-6 py-3 text-lg',
      };

      return cn(
        baseStyles,
        variants[variant],
        sizes[size],
        loading && 'relative !text-transparent',
        className
      );
    }, [variant, size, loading, className]);

    const spinnerStyles = cn(
      'animate-spin h-5 w-5',
      variant === 'primary' ? 'text-accent-foreground' : 'text-accent'
    );

    // Loading spinner with ARIA attributes
    const loadingSpinner = loading && (
      <span
        className="absolute inset-0 flex items-center justify-center"
        role="status"
        aria-label="Loading"
      >
        <svg className={spinnerStyles} viewBox="0 0 24 24">
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
            fill="none"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      </span>
    );

    const content = (
      <>
        {loadingSpinner}
        {icon && (
          <span className={cn('flex items-center', loading && 'opacity-0')} aria-hidden="true">
            {icon}
          </span>
        )}
        <span className={loading ? 'opacity-0' : ''}>{children}</span>
      </>
    );

    // If href is provided, render as Link
    if (href) {
      const linkProps = external
        ? {
            href: href,
            target: '_blank',
            rel: 'noopener noreferrer',
          }
        : { href: href };

      return (
        <Link {...linkProps} className={styles}>
          {content}
        </Link>
      );
    }

    // Otherwise render as button
    return (
      <button
        ref={ref}
        type={props.type || 'button'} // Explicitly set button type
        className={styles}
        disabled={loading || props.disabled}
        {...props}
        aria-busy={loading}
      >
        {content}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
