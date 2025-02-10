import type { Config } from 'tailwindcss';
import defaultTheme from 'tailwindcss/defaultTheme';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  future: {
    hoverOnlyWhenSupported: true,
  },
  darkMode: 'class',
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1400px',
      },
    },
    extend: {
      // Colors
      colors: {
        'brand-primary': 'rgb(var(--brand-primary) / <alpha-value>)', // #001926
        'brand-secondary': 'rgb(var(--brand-secondary) / <alpha-value>)', // #00629D
        background: 'rgb(var(--background) / <alpha-value>)',
        foreground: 'rgb(var(--foreground) / <alpha-value>)',
        muted: {
          DEFAULT: 'rgb(var(--muted) / <alpha-value>)',
          foreground: 'rgb(var(--muted-foreground) / <alpha-value>)',
        },
        accent: {
          DEFAULT: 'rgb(var(--accent) / <alpha-value>)',
          foreground: 'rgb(var(--accent-foreground) / <alpha-value>)',
        },
        border: 'rgb(var(--border) / <alpha-value>)',
        input: 'rgb(var(--input) / <alpha-value>)',
        ring: 'rgb(var(--ring) / <alpha-value>)',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      // Font Family
      fontFamily: {
        sans: ['var(--font-poppins)', ...defaultTheme.fontFamily.sans],
      },
      // Height
      height: {
        dvh: '100dvh',
        screen: '100vh',
      },
      minHeight: {
        dvh: '100dvh',
        screen: '100vh',
      },
      maxHeight: {
        dvh: '100dvh',
        screen: '100vh',
      },
      // Animations
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'fade-out': {
          '0%': { opacity: '1' },
          '100%': { opacity: '0' },
        },
        'slide-in-from-top': {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(0)' },
        },
        'slide-in-from-bottom': {
          '0%': { transform: 'translateY(100%)' },
          '100%': { transform: 'translateY(0)' },
        },
        'scale-in': {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'pulse-slow': {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '0.8' },
        },
        'wave-slow': {
          '0%, 100%': { transform: 'translate(0, 0) scale(1.5)' },
          '25%': { transform: 'translate(10%, -5%) scale(1.5)' },
          '50%': { transform: 'translate(-5%, 10%) scale(1.5)' },
          '75%': { transform: 'translate(-10%, -5%) scale(1.5)' },
        },
        'wave-slower': {
          '0%, 100%': { transform: 'translate(0, 0) scale(1.5)' },
          '25%': { transform: 'translate(-10%, 5%) scale(1.5)' },
          '50%': { transform: 'translate(5%, -10%) scale(1.5)' },
          '75%': { transform: 'translate(10%, 5%) scale(1.5)' },
        },
        'wave-slowest': {
          '0%, 100%': { transform: 'translate(0, 0) scale(1.5)' },
          '25%': { transform: 'translate(5%, 10%) scale(1.5)' },
          '50%': { transform: 'translate(-10%, -5%) scale(1.5)' },
          '75%': { transform: 'translate(-5%, -10%) scale(1.5)' },
        },
      },
      animation: {
        'fade-in': 'fade-in 0.5s ease-in-out',
        'fade-out': 'fade-out 0.5s ease-in-out',
        'slide-in-from-top': 'slide-in-from-top 0.3s ease-out',
        'slide-in-from-bottom': 'slide-in-from-bottom 0.3s ease-out',
        'scale-in': 'scale-in 0.2s ease-out',
        'wave-slow': 'wave-slow 20s ease-in-out infinite',
        'wave-slower': 'wave-slower 25s ease-in-out infinite',
        'wave-slowest': 'wave-slowest 30s ease-in-out infinite',
      },
      // Safe Area
      padding: {
        'safe-top': 'env(safe-area-inset-top)',
        'safe-bottom': 'env(safe-area-inset-bottom)',
        'safe-left': 'env(safe-area-inset-left)',
        'safe-right': 'env(safe-area-inset-right)',
      },
      // Added transition utilities
      transitionTimingFunction: {
        'in-expo': 'cubic-bezier(0.95, 0.05, 0.795, 0.035)',
        'out-expo': 'cubic-bezier(0.19, 1, 0.22, 1)',
      },
      backgroundColor: {
        'background/80': 'rgb(var(--background) / 0.8)',
      },
    },
  },
  plugins: [],
} satisfies Config;

export default config;
