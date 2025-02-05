// src/components/theme-provider.tsx
'use client';

import * as React from 'react';
import { createContext, useContext, useEffect, useState } from 'react';

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
    // In case of any localStorage errors
    console.warn('Error reading from localStorage:', e);
    return fallback;
  }
};

export function ThemeProvider({
  children,
  defaultTheme = 'system',
  storageKey = 'ui-theme',
  attribute = 'class',
  enableSystem = true,
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(() => getThemeFromStorage(storageKey, defaultTheme));

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

  const value = {
    theme,
    setTheme: (newTheme: Theme) => {
      try {
        localStorage.setItem(storageKey, newTheme);
      } catch (e) {
        console.warn('Error writing to localStorage:', e);
      }
      setTheme(newTheme);
    },
  };

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext);

  if (context === undefined) throw new Error('useTheme must be used within a ThemeProvider');

  return context;
};
