// src/app/page.tsx
'use client';

import { usePerformance } from '@/hooks/use-performance';

export default function ClientHome() {
  const { measureUserInteraction } = usePerformance();

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-12 text-center">
        <h1 className="mb-4 text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl">
          Welcome to SolveJet
        </h1>
        <p className="text-lg text-muted-foreground">Your fully optimized Next.js application</p>
      </header>

      <main className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {/* Features Section */}
        <section className="rounded-lg border bg-background p-6 shadow-sm">
          <h2 className="mb-4 text-2xl font-semibold">Features</h2>
          <ul className="space-y-3">
            <li className="flex items-center gap-2">
              <span className="text-accent">✓</span>
              SEO Optimization
            </li>
            <li className="flex items-center gap-2">
              <span className="text-accent">✓</span>
              Performance Monitoring
            </li>
            <li className="flex items-center gap-2">
              <span className="text-accent">✓</span>
              Analytics Integration
            </li>
          </ul>
        </section>
      </main>

      {/* Example of performance measurement for user interactions */}
      <button
        onClick={() => {
          const cleanup = measureUserInteraction('button-click');
          // Your button logic here
          cleanup();
        }}
        className="mt-8 rounded-full bg-accent px-6 py-3 text-accent-foreground hover:bg-accent/90"
      >
        Try Me
      </button>
    </div>
  );
}
