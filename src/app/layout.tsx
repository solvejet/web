// src/app/layout.tsx
import type { Metadata } from 'next';
import { Suspense } from 'react';
import { Poppins } from 'next/font/google';
import Analytics from '@/components/Analytics';
import { ThemeProvider } from '@/components/theme-provider';
import '@/app/globals.css';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-poppins',
  display: 'swap',
});

// Default metadata
export const metadata: Metadata = {
  metadataBase: new URL(process.env['NEXT_PUBLIC_APP_URL'] || 'http://localhost:3000'),
  title: {
    default: 'SolveJet - Your Application',
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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // Get analytics IDs with type safety
  const analyticsIds = {
    GA_MEASUREMENT_ID: process.env['NEXT_PUBLIC_GA_ID'] ?? undefined,
    GTM_ID: process.env['NEXT_PUBLIC_GTM_ID'] ?? undefined,
    LINKEDIN_ID: process.env['NEXT_PUBLIC_LINKEDIN_ID'] ?? undefined,
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${poppins.variable} min-h-dvh bg-background font-sans antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          storageKey="solvejet-theme"
        >
          {/* Main content */}
          <main className="relative flex min-h-dvh flex-col">{children}</main>

          {/* Analytics with Suspense for better performance */}
          <Suspense fallback={null}>
            <Analytics {...analyticsIds} />
          </Suspense>
        </ThemeProvider>
      </body>
    </html>
  );
}
