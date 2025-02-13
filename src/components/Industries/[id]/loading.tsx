// src/app/industries/[id]/loading.tsx
'use client';

export default function IndustryDetailLoading() {
  return (
    <div className="animate-pulse space-y-24 py-24 lg:py-32">
      {/* Hero Section Loading */}
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl text-center">
          <div className="h-8 w-48 rounded-full bg-accent/10 mx-auto" />
          <div className="mt-6 h-16 w-3/4 rounded-lg bg-accent/5 mx-auto" />
          <div className="mt-4 h-16 w-2/3 rounded-lg bg-accent/5 mx-auto" />
          <div className="mt-6 h-20 w-full rounded-lg bg-accent/5" />
          <div className="mt-8 flex justify-center gap-4">
            <div className="h-12 w-32 rounded-lg bg-accent/10" />
            <div className="h-12 w-32 rounded-lg bg-accent/5" />
          </div>
        </div>
      </div>

      {/* Solutions Section Loading */}
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl text-center mb-16">
          <div className="h-10 w-2/3 rounded-lg bg-accent/10 mx-auto" />
          <div className="mt-4 h-8 w-1/2 rounded-lg bg-accent/5 mx-auto" />
        </div>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="rounded-2xl border border-border/50 bg-background/50 p-8">
              <div className="h-12 w-12 rounded-xl bg-accent/10" />
              <div className="mt-6 h-6 w-3/4 rounded-lg bg-accent/5" />
              <div className="mt-2 h-20 rounded-lg bg-accent/5" />
            </div>
          ))}
        </div>
      </div>

      {/* Technology Stack Loading */}
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl text-center mb-16">
          <div className="h-10 w-2/3 rounded-lg bg-accent/10 mx-auto" />
          <div className="mt-4 h-8 w-1/2 rounded-lg bg-accent/5 mx-auto" />
        </div>
        <div className="grid gap-8 md:grid-cols-3">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="rounded-2xl border border-border/50 bg-background/50 p-8">
              <div className="space-y-4">
                <div className="h-8 w-1/3 rounded-lg bg-accent/10" />
                <div className="flex flex-wrap gap-2">
                  {[...Array(6)].map((_, j) => (
                    <div key={j} className="h-8 w-24 rounded-full bg-accent/5" />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
