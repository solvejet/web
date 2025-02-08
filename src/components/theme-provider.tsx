// src/components/theme-provider.tsx
'use client';

import * as React from 'react';
import { Moon, Sun } from 'lucide-react';
import { usePerformance } from '@/hooks/use-performance';
import { cn } from '@/lib/utils';

type Theme = 'dark' | 'light' | 'system';

interface ThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
  attribute?: string;
  enableSystem?: boolean;
}

interface ThemeProviderState {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const initialState: ThemeProviderState = {
  theme: 'system',
  setTheme: () => null,
};

const ThemeProviderContext = React.createContext<ThemeProviderState>(initialState);

export function ThemeProvider({
  children,
  defaultTheme = 'system',
  storageKey = 'ui-theme',
  attribute = 'class',
  enableSystem = true,
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = React.useState<Theme>(() => {
    if (typeof window !== 'undefined') {
      return (localStorage.getItem(storageKey) as Theme) || defaultTheme;
    }
    return defaultTheme;
  });

  const [mounted] = React.useState(false);

  // Update theme in localStorage and document
  const updateTheme = React.useCallback(
    (newTheme: Theme) => {
      const root = window.document.documentElement;

      // Remove existing classes
      root.classList.remove('light', 'dark');

      // Apply new theme
      if (newTheme === 'system') {
        const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
          ? 'dark'
          : 'light';

        if (attribute === 'class') {
          root.classList.add(systemTheme);
        } else {
          root.setAttribute(attribute, systemTheme);
        }
      } else {
        if (attribute === 'class') {
          root.classList.add(newTheme);
        } else {
          root.setAttribute(attribute, newTheme);
        }
      }
    },
    [attribute]
  );

  // Handle theme change
  React.useEffect(() => {
    if (mounted && typeof window !== 'undefined') {
      try {
        localStorage.setItem(storageKey, theme);
      } catch (e) {
        console.warn('Failed to save theme preference:', e);
      }
      updateTheme(theme);
    }
  }, [theme, storageKey, mounted, updateTheme]);

  // Handle system theme changes
  React.useEffect(() => {
    if (!enableSystem) return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const handleChange = () => {
      if (theme === 'system') {
        updateTheme('system');
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [theme, updateTheme, enableSystem]);

  // Handle initial mount
  React.useEffect(() => {
    if (!mounted) return;

    if (!enableSystem && theme === 'system') {
      // If system theme is disabled and current theme is system,
      // fallback to light theme
      setTheme('light');
      return;
    }

    updateTheme(theme);
  }, [theme, updateTheme, mounted, enableSystem]);

  const value = React.useMemo(
    () => ({
      theme,
      setTheme: (newTheme: Theme) => {
        setTheme(newTheme);
      },
    }),
    [theme]
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
  const context = React.useContext(ThemeProviderContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

interface ThemeToggleProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: 'sm' | 'md' | 'lg';
}

export const ThemeToggle = React.forwardRef<HTMLButtonElement, ThemeToggleProps>(
  ({ className, size = 'md', ...props }, ref) => {
    const { theme, setTheme } = useTheme();
    const { measureUserInteraction } = usePerformance();
    const isDark = theme === 'dark';

    const handleClick = React.useCallback(() => {
      const cleanup = measureUserInteraction('theme-toggle');
      setTheme(isDark ? 'light' : 'dark');
      cleanup();
    }, [isDark, setTheme, measureUserInteraction]);

    const sizeClasses = React.useMemo(
      () => ({
        sm: 'h-8 w-8',
        md: 'h-10 w-10',
        lg: 'h-12 w-12',
      }),
      []
    );

    return (
      <button
        ref={ref}
        type="button"
        onClick={handleClick}
        className={cn(
          'relative inline-flex items-center justify-center rounded-full',
          'text-foreground hover:bg-accent/10',
          'focus-visible:outline-none focus-visible:ring-2',
          'focus-visible:ring-accent focus-visible:ring-offset-2',
          'disabled:pointer-events-none disabled:opacity-50',
          'transition-colors duration-200',
          sizeClasses[size],
          className
        )}
        aria-label={`Switch to ${isDark ? 'light' : 'dark'} theme`}
        {...props}
      >
        <Sun
          className={cn(
            'absolute h-[60%] w-[60%]',
            'transition-all duration-200',
            isDark ? 'scale-0 opacity-0' : 'scale-100 opacity-100',
            'rotate-0 hover:rotate-90'
          )}
        />
        <Moon
          className={cn(
            'absolute h-[60%] w-[60%]',
            'transition-all duration-200',
            isDark ? 'scale-100 opacity-100' : 'scale-0 opacity-0',
            'rotate-0 hover:rotate-90'
          )}
        />
      </button>
    );
  }
);

ThemeToggle.displayName = 'ThemeToggle';
