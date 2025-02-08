// src/components/ui/Input.tsx
import React from 'react';
import { cn } from '@/lib/utils';
import { useMemoWithCache } from '@/hooks/use-memo';
import { usePerformance } from '@/hooks/use-performance';

// Constants
const INPUT_SIZES = {
  sm: 'h-8 text-sm',
  md: 'h-10 text-base',
  lg: 'h-12 text-lg',
} as const;

type InputSize = keyof typeof INPUT_SIZES;

// Style constants
const STYLE_CONFIG = {
  base: [
    'block rounded-lg border border-input bg-background px-3 text-foreground',
    'placeholder:text-muted-foreground shadow-sm',
    'focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent',
    'disabled:opacity-50 disabled:cursor-not-allowed',
    'transition-all duration-200',
  ].join(' '),
  error: 'border-red-500 focus:ring-red-500 focus:border-red-500',
  withIcon: 'pl-10',
  focusRing: [
    'absolute inset-0 pointer-events-none rounded-lg',
    'ring-2 ring-accent/50 ring-offset-2',
    'opacity-0 scale-105',
    'focus-within:opacity-100 focus-within:scale-100',
    'transition-all duration-200',
  ].join(' '),
  label: 'block text-sm font-medium text-foreground',
  errorText: 'text-sm text-red-500 animate-shake',
  helperText: 'text-sm text-muted-foreground',
  iconWrapper:
    'absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-muted-foreground',
} as const;

// Types
export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /** Label text to display above the input */
  label?: string;
  /** Error message to display below the input */
  error?: string;
  /** Helper text to display below the input when there's no error */
  helperText?: string;
  /** Icon to display on the left side of the input */
  icon?: React.ReactNode;
  /** Whether the input should take up full width of its container */
  fullWidth?: boolean;
  /** Size variant of the input */
  size?: InputSize;
}

type InputEventHandler = (e: React.FocusEvent<HTMLInputElement>) => void;

/**
 * Input component with support for labels, icons, error states, and helper text.
 * Follows WAI-ARIA guidelines for accessibility.
 */
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
      disabled,
      'aria-label': ariaLabel,
      ...props
    },
    ref
  ) => {
    // Always call useId hook unconditionally
    const generatedId = React.useId();
    const inputId = id || generatedId;
    const errorId = `${inputId}-error`;
    const helperId = `${inputId}-helper`;
    const { measureUserInteraction } = usePerformance();

    // Memoize size styles
    const sizeStyles = useMemoWithCache(() => INPUT_SIZES, [], { maxSize: 1 });

    // Memoize input styles
    const inputStyles = useMemoWithCache(
      () =>
        cn(
          STYLE_CONFIG.base,
          sizeStyles[size],
          icon && STYLE_CONFIG.withIcon,
          error && STYLE_CONFIG.error,
          fullWidth && 'w-full',
          className
        ),
      [className, icon, error, size, fullWidth],
      { maxSize: 50 }
    );

    // Handle focus with performance tracking
    const handleFocus: InputEventHandler = React.useCallback(
      (e) => {
        const cleanup = measureUserInteraction('input-focus');
        onFocus?.(e);
        cleanup();
      },
      [onFocus, measureUserInteraction]
    );

    // Handle blur with performance tracking
    const handleBlur: InputEventHandler = React.useCallback(
      (e) => {
        const cleanup = measureUserInteraction('input-blur');
        onBlur?.(e);
        cleanup();
      },
      [onBlur, measureUserInteraction]
    );

    // Development-only accessibility checks
    if (process.env.NODE_ENV !== 'production' && !label && !ariaLabel) {
      console.warn(
        'Input component should have either a label or aria-label prop for accessibility'
      );
    }

    return (
      <div className={cn('space-y-1.5', fullWidth && 'w-full')}>
        {label && (
          <label htmlFor={inputId} className={STYLE_CONFIG.label}>
            {label}
          </label>
        )}

        <div className="relative">
          {icon && <div className={STYLE_CONFIG.iconWrapper}>{icon}</div>}

          <input
            ref={ref}
            id={inputId}
            aria-invalid={!!error}
            aria-describedby={error ? errorId : helperText ? helperId : undefined}
            disabled={disabled}
            className={inputStyles}
            onFocus={handleFocus}
            onBlur={handleBlur}
            {...props}
          />

          {/* Focus ring animation */}
          <div className={cn(STYLE_CONFIG.focusRing, disabled && 'hidden')} aria-hidden="true" />
        </div>

        {/* Error message */}
        {error && (
          <p id={errorId} role="alert" className={STYLE_CONFIG.errorText}>
            {error}
          </p>
        )}

        {/* Helper text */}
        {helperText && !error && (
          <p id={helperId} className={STYLE_CONFIG.helperText}>
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;
