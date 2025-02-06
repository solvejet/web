// src/components/theme-provider.tsx
'use client';

import * as React from 'react';
import { createContext, useContext, useEffect, useState } from 'react';
import { useMemoWithCache } from '@/hooks/use-memo';
import { usePerformance } from '@/hooks/use-performance';
import { cn } from '@/lib/utils';

type Theme = 'dark' | 'light' | 'system';

type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
  attribute?: string;
  enableSystem?: boolean;
};

type ThemeProviderState = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

const initialState: ThemeProviderState = {
  theme: 'system',
  setTheme: () => null,
};

const ThemeProviderContext = createContext<ThemeProviderState>(initialState);

const getThemeFromStorage = (key: string, fallback: Theme): Theme => {
  if (typeof window === 'undefined') return fallback;

  try {
    const stored = localStorage.getItem(key);
    return (stored as Theme) || fallback;
  } catch (e) {
    console.warn('Error reading from localStorage:', e);
    return fallback;
  }
};

// Theme Toggle Button Component
interface ThemeToggleProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: 'sm' | 'md' | 'lg';
}

export const ThemeToggle = React.forwardRef<HTMLButtonElement, ThemeToggleProps>(
  ({ className, size = 'md', ...props }, ref) => {
    const { theme, setTheme } = useTheme();
    const { measureUserInteraction } = usePerformance();

    // Cache size styles
    const sizeStyles = useMemoWithCache(
      () => ({
        sm: 'h-8 w-8',
        md: 'h-10 w-10',
        lg: 'h-12 w-12',
      }),
      [],
      { maxSize: 1 }
    );

    // Cache button styles
    const buttonStyles = useMemoWithCache(
      () =>
        cn(
          'rounded-full flex items-center justify-center',
          'text-foreground hover:bg-muted',
          'focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          'transition-all duration-200',
          sizeStyles[size],
          className
        ),
      [size, className],
      { maxSize: 20 }
    );

    // Handle click with performance tracking
    const handleToggle = React.useCallback(() => {
      const cleanup = measureUserInteraction('theme-toggle');
      setTheme(theme === 'dark' ? 'light' : 'dark');
      cleanup();
    }, [theme, setTheme, measureUserInteraction]);

    // Cache icon styles
    const iconStyles = useMemoWithCache(
      () => ({
        sun: cn(
          'w-5 h-5 stroke-current absolute',
          'transition-all duration-500',
          theme === 'dark' ? 'scale-0 opacity-0 rotate-90' : 'scale-100 opacity-100 rotate-0'
        ),
        moon: cn(
          'w-5 h-5 stroke-current absolute',
          'transition-all duration-500',
          theme === 'dark' ? 'scale-100 opacity-100 rotate-0' : 'scale-0 opacity-0 rotate-90'
        ),
      }),
      [theme],
      { maxSize: 2 }
    );

    return (
      <button
        ref={ref}
        type="button"
        className={buttonStyles}
        onClick={handleToggle}
        aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
        {...props}
      >
        {/* Sun icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={iconStyles.sun}
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="5" />
          <line x1="12" y1="1" x2="12" y2="3" />
          <line x1="12" y1="21" x2="12" y2="23" />
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
          <line x1="1" y1="12" x2="3" y2="12" />
          <line x1="21" y1="12" x2="23" y2="12" />
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
        </svg>

        {/* Moon icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={iconStyles.moon}
          aria-hidden="true"
        >
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>

        {/* Focus ring animation */}
        <div
          className={cn(
            'absolute inset-0 pointer-events-none rounded-full',
            'ring-2 ring-accent/50 ring-offset-2',
            'opacity-0 scale-105',
            'focus-within:opacity-100 focus-within:scale-100',
            'transition-all duration-200',
            props.disabled && 'hidden'
          )}
          aria-hidden="true"
        />
      </button>
    );
  }
);

ThemeToggle.displayName = 'ThemeToggle';

export function ThemeProvider({
  children,
  defaultTheme = 'system',
  storageKey = 'ui-theme',
  attribute = 'class',
  enableSystem = true,
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(() => getThemeFromStorage(storageKey, defaultTheme));
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const root = window.document.documentElement;
    const attributeValue =
      theme === 'system' && enableSystem
        ? window.matchMedia('(prefers-color-scheme: dark)').matches
          ? 'dark'
          : 'light'
        : theme;

    if (attribute === 'class') {
      root.classList.remove('light', 'dark');
      root.classList.add(attributeValue);
    } else {
      root.setAttribute(attribute, attributeValue);
    }
  }, [theme, attribute, enableSystem]);

  useEffect(() => {
    if (!enableSystem) return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const handleChange = () => {
      if (theme === 'system') {
        const root = window.document.documentElement;
        const systemTheme = mediaQuery.matches ? 'dark' : 'light';

        if (attribute === 'class') {
          root.classList.remove('light', 'dark');
          root.classList.add(systemTheme);
        } else {
          root.setAttribute(attribute, systemTheme);
        }
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [theme, attribute, enableSystem]);

  const value = React.useMemo(
    () => ({
      theme,
      setTheme: (newTheme: Theme) => {
        try {
          localStorage.setItem(storageKey, newTheme);
        } catch (e) {
          console.warn('Error writing to localStorage:', e);
        }
        setTheme(newTheme);
      },
    }),
    [theme, storageKey]
  );

  if (!mounted) {
    return null;
  }

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
