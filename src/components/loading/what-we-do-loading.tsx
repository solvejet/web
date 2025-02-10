// src/components/loading/what-we-do-loading.tsx
import { cn } from '@/lib/utils';

export function WhatWeDoHeroLoading() {
  return (
    <div className="animate-pulse py-24 lg:py-32">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl text-center">
          <div className="h-12 w-3/4 mx-auto rounded-lg bg-accent/10" />
          <div className="mt-4 h-12 w-2/3 mx-auto rounded-lg bg-accent/5" />
          <div className="mt-8 flex justify-center gap-4">
            <div className="h-12 w-32 rounded-lg bg-accent/10" />
            <div className="h-12 w-32 rounded-lg bg-accent/5" />
          </div>
        </div>
      </div>
    </div>
  );
}

export function WhatWeDoServicesLoading() {
  return (
    <div className="animate-pulse py-24 lg:py-32">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl text-center mb-16">
          <div className="h-10 w-2/3 mx-auto rounded-lg bg-accent/10" />
          <div className="mt-4 h-8 w-1/2 mx-auto rounded-lg bg-accent/5" />
        </div>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className={cn('rounded-2xl border border-border/50', 'bg-background/50 p-8')}
            >
              <div className="h-12 w-12 rounded-xl bg-accent/10" />
              <div className="mt-6 h-6 w-3/4 rounded-lg bg-accent/5" />
              <div className="mt-4 h-20 rounded-lg bg-accent/5" />
              <div className="mt-4 h-4 w-24 rounded-lg bg-accent/10" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function WhatWeDoProcessLoading() {
  return (
    <div className="animate-pulse py-24 lg:py-32">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl text-center mb-16">
          <div className="h-10 w-2/3 mx-auto rounded-lg bg-accent/10" />
          <div className="mt-4 h-8 w-1/2 mx-auto rounded-lg bg-accent/5" />
        </div>
        <div className="mx-auto max-w-5xl space-y-16">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex items-center gap-8">
              <div className="w-1/2">
                <div className={cn('rounded-2xl border border-border/50', 'bg-background/50 p-8')}>
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-xl bg-accent/10" />
                    <div className="flex-1">
                      <div className="h-6 w-3/4 rounded-lg bg-accent/5" />
                      <div className="mt-2 h-16 rounded-lg bg-accent/5" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-1/2" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function FAQSectionLoading() {
  return (
    <div className="animate-pulse py-24 lg:py-32">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl text-center mb-16">
          <div className="h-10 w-2/3 mx-auto rounded-lg bg-accent/10" />
          <div className="mt-4 h-8 w-1/2 mx-auto rounded-lg bg-accent/5" />
        </div>
        <div className="mx-auto max-w-4xl space-y-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="py-6">
              <div className="flex justify-between items-center">
                <div className="h-6 w-3/4 rounded-lg bg-accent/10" />
                <div className="h-7 w-7 rounded-full bg-accent/5" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
