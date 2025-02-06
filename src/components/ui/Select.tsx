// src/components/ui/Select.tsx
import React from 'react';
import { cn } from '@/lib/utils';
import { useMemoWithCache, useDeepMemo } from '@/hooks/use-memo';
import { usePerformance } from '@/hooks/use-performance';

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
  description?: string;
}

export interface SelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'size'> {
  label?: string;
  error?: string;
  helperText?: string;
  options: SelectOption[];
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  icon?: React.ReactNode;
}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      className,
      label,
      error,
      helperText,
      options,
      size = 'md',
      fullWidth = true,
      icon,
      id,
      onChange,
      ...props
    },
    ref
  ) => {
    // Always call useId hook unconditionally
    const generatedId = React.useId();
    // Use provided id or fall back to generated one
    const selectId = id || generatedId;
    const errorId = `${selectId}-error`;
    const helperId = `${selectId}-helper`;
    const { measureUserInteraction } = usePerformance();

    // Memoize options to prevent unnecessary re-renders
    const memoizedOptions = useDeepMemo(options, [options]);

    // Cache size styles
    const sizeStyles = useMemoWithCache(
      () => ({
        sm: 'h-8 text-sm',
        md: 'h-10 text-base',
        lg: 'h-12 text-lg',
      }),
      [],
      { maxSize: 1 }
    );

    // Cache select styles
    const selectStyles = useMemoWithCache(
      () =>
        cn(
          'block rounded-lg border border-input bg-background text-foreground',
          'appearance-none shadow-sm',
          'focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          'transition-all duration-200',
          sizeStyles[size],
          icon ? 'pl-10' : 'pl-3',
          'pr-10', // Space for the chevron icon
          error && 'border-red-500 focus:ring-red-500 focus:border-red-500',
          fullWidth && 'w-full',
          className
        ),
      [className, icon, error, size, fullWidth],
      { maxSize: 50 }
    );

    // Handle change with performance tracking
    const handleChange = React.useCallback(
      (e: React.ChangeEvent<HTMLSelectElement>) => {
        const cleanup = measureUserInteraction('select-change');
        onChange?.(e);
        cleanup();
      },
      [onChange, measureUserInteraction]
    );

    return (
      <div className={cn('space-y-1.5', fullWidth && 'w-full')}>
        {label && (
          <label htmlFor={selectId} className="block text-sm font-medium text-foreground">
            {label}
          </label>
        )}

        <div className="relative">
          {icon && (
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-muted-foreground">
              {icon}
            </div>
          )}

          <select
            ref={ref}
            id={selectId}
            aria-invalid={!!error}
            aria-describedby={error ? errorId : helperText ? helperId : undefined}
            onChange={handleChange}
            className={selectStyles}
            {...props}
          >
            {memoizedOptions.map((option) => (
              <option
                key={option.value}
                value={option.value}
                disabled={option.disabled}
                title={option.description}
              >
                {option.label}
              </option>
            ))}
          </select>

          {/* Custom chevron icon */}
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2 text-muted-foreground">
            <svg
              className="h-5 w-5 transition-transform duration-200 ease-in-out"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                clipRule="evenodd"
              />
            </svg>
          </div>

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

Select.displayName = 'Select';

export default Select;
