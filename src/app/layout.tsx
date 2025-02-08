// src/app/layout.tsx
import type { Metadata, Viewport } from 'next';
import { Poppins } from 'next/font/google';
import Analytics from '@/components/Analytics';
import { ThemeProvider } from '@/components/theme-provider';
import '@/app/globals.css';
import Header from '@/components/layout/Header';
import type { PropsWithChildren } from 'react';
import { SpeedInsights } from '@vercel/speed-insights/next';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-poppins',
  display: 'swap',
});

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#FFFFFF' },
    { media: '(prefers-color-scheme: dark)', color: '#0D1117' },
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
};

export const metadata: Metadata = {
  metadataBase: new URL(process.env['NEXT_PUBLIC_APP_URL'] || 'http://localhost:3000'),
  title: {
    default: 'SolveJet - ISO Certified Custom Software Development Company',
    template: '%s | SolveJet',
  },
  description:
    "Transform your business with SolveJet's innovative software solutions. We specialize in custom software development, enterprise solutions, and digital transformation with ISO certified quality standards.",
  applicationName: 'SolveJet',
  keywords: [
    'custom software development',
    'enterprise solutions',
    'digital transformation',
    'ISO certified development',
    'web development',
    'mobile app development',
    'cloud solutions',
    'AI development',
    'MVP development',
    'IT consulting',
    'software engineering',
    'Next.js',
    'React',
    'TypeScript',
  ],
  authors: [
    {
      name: 'Karan Shah',
      url: 'https://github.com/karansxa',
    },
  ],
  creator: 'Karan Shah',
  publisher: 'SolveJet',
  manifest: '/site.webmanifest',
  icons: {
    // Favicon
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    // Apple Touch Icons
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
    // Android Chrome Icons
    other: [
      { url: '/android-chrome-192x192.png', sizes: '192x192', type: 'image/png' },
      { url: '/android-chrome-512x512.png', sizes: '512x512', type: 'image/png' },
      { url: '/safari-pinned-tab.svg', rel: 'mask-icon', color: '#001926' },
    ],
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
    title: 'SolveJet - ISO Certified Custom Software Development',
    description:
      'Partner with SolveJet for innovative software solutions. We deliver custom development, enterprise solutions, and digital transformation services with ISO certified quality.',
    siteName: 'SolveJet',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'SolveJet - Custom Software Development Company',
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SolveJet - Custom Software Development Company',
    description:
      'Transform your business with our innovative software solutions. ISO certified custom development, enterprise solutions, and digital transformation services.',
    creator: '@karansxa',
    site: '@solvejet',
    images: [
      {
        url: '/twitter-image.png',
        width: 1200,
        height: 630,
        alt: 'SolveJet - Custom Software Development',
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: process.env['NEXT_PUBLIC_GOOGLE_VERIFICATION'],
    yandex: process.env['NEXT_PUBLIC_YANDEX_VERIFICATION'],
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'SolveJet',
  },
  formatDetection: {
    telephone: false, // Changed to false to prevent automatic phone number detection
  },
  category: 'technology',
  classification: 'Software Development',
  referrer: 'origin-when-cross-origin',
};

export default function RootLayout({ children }: PropsWithChildren) {
  const isProduction = process.env.NODE_ENV === 'production';

  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body className={`${poppins.variable} min-h-dvh bg-background font-sans antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          storageKey="solvejet-theme"
        >
          <div className="relative flex min-h-dvh flex-col">
            <Header />
            <main className="flex-1 pt-[105px]">{children}</main>
            <Analytics />
          </div>
        </ThemeProvider>
        {isProduction && <SpeedInsights />}
      </body>
    </html>
  );
}
