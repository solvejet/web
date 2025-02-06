// src/components/ui/Button.tsx
import React, { useMemo } from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  icon?: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', loading, icon, children, ...props }, ref) => {
    // Memoize styles since they're computed from props
    const styles = useMemo(() => {
      const baseStyles =
        'inline-flex items-center justify-center rounded-md font-medium transition-all duration-300 ease-out-expo';

      const variants = {
        primary:
          'bg-accent text-accent-foreground hover:bg-transparent hover:text-accent border-2 border-transparent hover:border-accent',
        secondary:
          'bg-muted text-muted-foreground hover:bg-transparent hover:text-muted-foreground border-2 border-transparent hover:border-muted',
        outline: 'border-2 border-accent text-accent hover:bg-accent/10',
        ghost: 'text-foreground hover:bg-muted/10 hover:text-accent',
      };

      const sizes = {
        sm: 'px-3 py-1.5 text-sm',
        md: 'px-4 py-2 text-base',
        lg: 'px-6 py-3 text-lg',
      };

      return cn(
        baseStyles,
        variants[variant],
        sizes[size],
        loading && 'relative !text-transparent',
        'focus:outline-none focus:ring-2 focus:ring-accent/50 focus:ring-offset-2',
        'disabled:opacity-50 disabled:pointer-events-none',
        className
      );
    }, [variant, size, loading, className]);

    const spinnerStyles = cn(
      'animate-spin h-5 w-5',
      variant === 'primary' ? 'text-accent-foreground' : 'text-accent'
    );

    // Loading spinner with adjusted styles
    const loadingSpinner = loading && (
      <span className="absolute inset-0 flex items-center justify-center">
        <svg className={spinnerStyles} viewBox="0 0 24 24" aria-hidden="true">
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

    return (
      <button ref={ref} className={styles} disabled={loading || props.disabled} {...props}>
        {loadingSpinner}
        {icon && <span className={cn('mr-2', loading && 'opacity-0')}>{icon}</span>}
        <span className={loading ? 'opacity-0' : ''}>{children}</span>
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
