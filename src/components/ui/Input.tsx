// src/components/ui/Input.tsx
import React from 'react';
import { cn } from '@/lib/utils';
import { useMemoWithCache } from '@/hooks/use-memo';
import { usePerformance } from '@/hooks/use-performance';

// Omit the size prop from HTMLInputElement attributes
export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string;
  error?: string;
  helperText?: string;
  icon?: React.ReactNode;
  fullWidth?: boolean;
  // Add our custom size prop
  size?: 'sm' | 'md' | 'lg';
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      label,
      error,
      helperText,
      icon,
      id,
      size = 'md',
      fullWidth = true,
      onFocus,
      onBlur,
      ...props
    },
    ref
  ) => {
    // Always call useId hook unconditionally
    const generatedId = React.useId();
    // Use provided id or fall back to generated one
    const inputId = id || generatedId;
    const errorId = `${inputId}-error`;
    const helperId = `${inputId}-helper`;
    const { measureUserInteraction } = usePerformance();

    // Memoize size styles
    const sizeStyles = useMemoWithCache(
      () => ({
        sm: 'h-8 text-sm',
        md: 'h-10 text-base',
        lg: 'h-12 text-lg',
      }),
      [],
      { maxSize: 1 }
    );

    // Memoize input styles
    const inputStyles = useMemoWithCache(
      () =>
        cn(
          'block rounded-lg border border-input bg-background px-3 text-foreground',
          'placeholder:text-muted-foreground shadow-sm',
          'focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          'transition-all duration-200',
          sizeStyles[size],
          icon && 'pl-10',
          error && 'border-red-500 focus:ring-red-500 focus:border-red-500',
          fullWidth && 'w-full',
          className
        ),
      [className, icon, error, size, fullWidth],
      { maxSize: 50 }
    );

    // Handle focus with performance tracking
    const handleFocus = React.useCallback(
      (e: React.FocusEvent<HTMLInputElement>) => {
        const cleanup = measureUserInteraction('input-focus');
        onFocus?.(e);
        cleanup();
      },
      [onFocus, measureUserInteraction]
    );

    // Handle blur with performance tracking
    const handleBlur = React.useCallback(
      (e: React.FocusEvent<HTMLInputElement>) => {
        const cleanup = measureUserInteraction('input-blur');
        onBlur?.(e);
        cleanup();
      },
      [onBlur, measureUserInteraction]
    );

    return (
      <div className={cn('space-y-1.5', fullWidth && 'w-full')}>
        {label && (
          <label htmlFor={inputId} className="block text-sm font-medium text-foreground">
            {label}
          </label>
        )}

        <div className="relative">
          {icon && (
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-muted-foreground">
              {icon}
            </div>
          )}

          <input
            ref={ref}
            id={inputId}
            aria-invalid={!!error}
            aria-describedby={error ? errorId : helperText ? helperId : undefined}
            className={inputStyles}
            onFocus={handleFocus}
            onBlur={handleBlur}
            {...props}
          />

          {/* Focus ring animation */}
          <div
            className={cn(
              'absolute inset-0 pointer-events-none rounded-lg',
              'ring-2 ring-accent/50 ring-offset-2',
              'opacity-0 scale-105',
              'focus-within:opacity-100 focus-within:scale-100',
              'transition-all duration-200',
              props.disabled && 'hidden'
            )}
            aria-hidden="true"
          />
        </div>

        {/* Error message */}
        {error && (
          <p id={errorId} role="alert" className="text-sm text-red-500 animate-shake">
            {error}
          </p>
        )}

        {/* Helper text */}
        {helperText && !error && (
          <p id={helperId} className="text-sm text-muted-foreground">
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;
