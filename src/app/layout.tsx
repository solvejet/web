// src/app/layout.tsx
import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import Analytics from '@/components/Analytics';
import { ThemeProvider } from '@/components/theme-provider';
import '@/app/globals.css';
import Header from '@/components/layout/Header';
import type { PropsWithChildren } from 'react';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-poppins',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env['NEXT_PUBLIC_APP_URL'] || 'http://localhost:3000'),
  title: {
    default: 'SolveJet - Custom Software Development Company',
    template: '%s | SolveJet',
  },
  description: 'Next.js application with full SEO, analytics, and performance optimization',
  keywords: ['Next.js', 'React', 'JavaScript', 'TypeScript'],
  authors: [{ name: 'Your Name' }],
  creator: 'Your Name',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
    title: 'SolveJet',
    description: 'Next.js application with full SEO, analytics, and performance optimization',
    siteName: 'SolveJet',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'SolveJet',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SolveJet',
    description: 'Next.js application with full SEO, analytics, and performance optimization',
    creator: '@yourusername',
    images: ['/twitter-image.png'],
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
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
  },
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        className={`${poppins.variable} min-h-dvh bg-background font-sans antialiased overflow-x-hidden`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          storageKey="solvejet-theme"
        >
          <div className="relative flex min-h-dvh flex-col overflow-x-hidden">
            <Header />
            <main className="flex-1 mt-[105px]">{children}</main>
            <Analytics />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
