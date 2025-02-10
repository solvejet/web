// src/components/loading/service-loading.tsx
import { cn } from '@/lib/utils';

export function ServiceHeroLoading() {
  return (
    <div className="animate-pulse py-24 lg:py-32">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl text-center">
          {/* Hero badge */}
          <div className="mx-auto h-8 w-48 rounded-full bg-accent/10" />

          {/* Hero title */}
          <div className="mt-6 h-16 w-3/4 mx-auto rounded-lg bg-accent/5" />
          <div className="mt-4 h-16 w-2/3 mx-auto rounded-lg bg-accent/5" />

          {/* Description */}
          <div className="mt-6 h-20 w-full rounded-lg bg-accent/5" />

          {/* CTA buttons */}
          <div className="mt-8 flex justify-center gap-4">
            <div className="h-12 w-32 rounded-lg bg-accent/10" />
            <div className="h-12 w-32 rounded-lg bg-accent/5" />
          </div>
        </div>

        {/* Features grid */}
        <div className="mt-20 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className={cn('rounded-2xl border border-border/50', 'bg-background/50 p-6')}
            >
              <div className="h-12 w-12 rounded-xl bg-accent/10" />
              <div className="mt-4 h-6 w-3/4 rounded-lg bg-accent/5" />
              <div className="mt-2 h-16 rounded-lg bg-accent/5" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function ServicesLoading() {
  return (
    <div className="animate-pulse py-24 lg:py-32">
      <div className="container mx-auto px-4">
        {/* Section header */}
        <div className="mx-auto max-w-3xl text-center mb-16">
          <div className="h-10 w-2/3 mx-auto rounded-lg bg-accent/10" />
          <div className="mt-4 h-8 w-1/2 mx-auto rounded-lg bg-accent/5" />
        </div>

        {/* Services grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className={cn('rounded-2xl border border-border/50', 'bg-background/50 p-8')}
            >
              <div className="h-12 w-12 rounded-xl bg-accent/10" />
              <div className="mt-6 h-6 w-3/4 rounded-lg bg-accent/5" />
              <div className="mt-2 h-20 rounded-lg bg-accent/5" />
              <div className="mt-4 flex gap-2">
                {[...Array(3)].map((_, j) => (
                  <div key={j} className="h-6 w-20 rounded-full bg-accent/10" />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function FAQLoading() {
  return (
    <div className="animate-pulse py-24 lg:py-32">
      <div className="container mx-auto px-4">
        {/* Section header */}
        <div className="mx-auto max-w-3xl text-center mb-16">
          <div className="h-10 w-2/3 mx-auto rounded-lg bg-accent/10" />
          <div className="mt-4 h-8 w-1/2 mx-auto rounded-lg bg-accent/5" />
        </div>

        {/* FAQ items */}
        <div className="mx-auto max-w-4xl">
          <div className="divide-y divide-border/50">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="py-6">
                <div className="flex justify-between items-center">
                  <div className="h-6 w-3/4 rounded-lg bg-accent/10" />
                  <div className="h-8 w-8 rounded-full bg-accent/5" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
