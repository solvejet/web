// src/components/IndustryDetail/loading.tsx
'use client';

import { cn } from '@/lib/utils';

export function DetailHeroLoading() {
  return (
    <section className="relative min-h-[90vh] overflow-hidden pt-20">
      <div className="container relative mx-auto px-4">
        <div className="mx-auto max-w-4xl text-center">
          {/* Icon */}
          <div className="mx-auto h-16 w-16 rounded-2xl bg-accent/10" />

          {/* Title */}
          <div className="mt-6 space-y-4">
            <div className="mx-auto h-16 w-3/4 rounded-lg bg-accent/5" />
            <div className="mx-auto h-16 w-2/3 rounded-lg bg-accent/5" />
          </div>

          {/* Description */}
          <div className="mx-auto mt-8 h-20 w-full rounded-lg bg-accent/5" />

          {/* CTA Buttons */}
          <div className="mt-8 flex justify-center gap-4">
            <div className="h-12 w-32 rounded-lg bg-accent/10" />
            <div className="h-12 w-32 rounded-lg bg-accent/5" />
          </div>

          {/* Stats */}
          <div className="mt-16 grid gap-8 sm:grid-cols-3">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className={cn('rounded-2xl border border-border/50', 'bg-background/50 p-6')}
              >
                <div className="flex flex-col items-center space-y-2">
                  <div className="h-8 w-16 rounded-lg bg-accent/10" />
                  <div className="h-4 w-24 rounded-lg bg-accent/5" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function DetailSolutionsLoading() {
  return (
    <section className="py-24 lg:py-32">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center mb-16">
          <div className="h-10 w-2/3 mx-auto rounded-lg bg-accent/10" />
          <div className="mt-4 h-8 w-1/2 mx-auto rounded-lg bg-accent/5" />
        </div>

        {/* Solutions Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="rounded-2xl border border-border/50 bg-background/50 p-8">
              <div className="h-12 w-12 rounded-xl bg-accent/10" />
              <div className="mt-6 h-6 w-3/4 rounded-lg bg-accent/5" />
              <div className="mt-2 h-20 rounded-lg bg-accent/5" />
              <div className="mt-6 space-y-3">
                {[...Array(4)].map((_, j) => (
                  <div key={j} className="h-4 rounded-lg bg-accent/5" />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function DetailTechStackLoading() {
  return (
    <section className="py-24 lg:py-32">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center mb-16">
          <div className="h-10 w-2/3 mx-auto rounded-lg bg-accent/10" />
          <div className="mt-4 h-8 w-1/2 mx-auto rounded-lg bg-accent/5" />
        </div>

        {/* Tech Grid */}
        <div className="grid gap-8 md:grid-cols-2">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="rounded-2xl border border-border/50 bg-background/50 p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="h-12 w-12 rounded-xl bg-accent/10" />
                <div className="h-6 flex-1 rounded-lg bg-accent/5" />
              </div>
              <div className="flex flex-wrap gap-2">
                {[...Array(6)].map((_, j) => (
                  <div key={j} className="h-8 w-24 rounded-full bg-accent/5" />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function DetailBenefitsLoading() {
  return (
    <section className="py-24 lg:py-32">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center mb-16">
          <div className="h-10 w-2/3 mx-auto rounded-lg bg-accent/10" />
          <div className="mt-4 h-8 w-1/2 mx-auto rounded-lg bg-accent/5" />
        </div>

        {/* Benefits Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="rounded-2xl border border-border/50 bg-background/50 p-8">
              <div className="h-12 w-12 rounded-xl bg-accent/10" />
              <div className="mt-6 h-6 w-3/4 rounded-lg bg-accent/5" />
              <div className="mt-2 h-16 rounded-lg bg-accent/5" />
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="mt-20 rounded-2xl border border-border/50 bg-background/50 p-8">
          <div className="grid gap-8 md:grid-cols-3">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="text-center">
                <div className="h-8 w-16 mx-auto rounded-lg bg-accent/10" />
                <div className="mt-2 h-4 w-24 mx-auto rounded-lg bg-accent/5" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function DetailProcessLoading() {
  return (
    <section className="py-24 lg:py-32">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center mb-16">
          <div className="h-10 w-2/3 mx-auto rounded-lg bg-accent/10" />
          <div className="mt-4 h-8 w-1/2 mx-auto rounded-lg bg-accent/5" />
        </div>

        {/* Process Steps */}
        <div className="relative mx-auto max-w-5xl">
          {/* Connecting Line */}
          <div className="absolute left-1/2 top-0 h-full w-0.5 -translate-x-1/2 bg-accent/20 hidden md:block" />

          {/* Steps */}
          <div className="space-y-16">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="relative">
                {/* Step Number */}
                <div className="absolute left-1/2 -translate-x-1/2 flex h-12 w-12 items-center justify-center rounded-full bg-accent" />

                <div className="flex flex-col md:flex-row items-center gap-8">
                  <div className="w-full md:w-1/2">
                    <div className="rounded-2xl border border-border/50 bg-background/50 p-8">
                      <div className="flex items-center gap-4">
                        <div className="h-12 w-12 rounded-xl bg-accent/10" />
                        <div className="flex-1">
                          <div className="h-6 w-3/4 rounded-lg bg-accent/5" />
                          <div className="mt-2 h-16 rounded-lg bg-accent/5" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="w-full md:w-1/2" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function DetailFAQLoading() {
  return (
    <section className="py-24 lg:py-32">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center mb-16">
          <div className="h-10 w-2/3 mx-auto rounded-lg bg-accent/10" />
          <div className="mt-4 h-8 w-1/2 mx-auto rounded-lg bg-accent/5" />
        </div>

        {/* FAQ List */}
        <div className="mx-auto max-w-4xl">
          <div className="divide-y divide-border/50">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="py-6">
                <div className="flex justify-between items-center">
                  <div className="h-6 w-3/4 rounded-lg bg-accent/10" />
                  <div className="h-8 w-8 rounded-full bg-accent/5" />
                </div>
              </div>
            ))}
          </div>

          {/* Contact CTA */}
          <div className="mt-16 text-center">
            <div className="h-4 w-64 mx-auto rounded-lg bg-accent/5" />
          </div>
        </div>
      </div>
    </section>
  );
}
