// src/components/ServiceDetails/TechnologyConsulting/ConsultingClientWrapper.tsx
'use client';

import dynamic from 'next/dynamic';
import { Suspense } from 'react';

const ErrorBoundary = dynamic(
  () => import('@/components/ErrorBoundary').then((mod) => mod.ErrorBoundary),
  { ssr: false }
);

interface WrapperProps {
  children: React.ReactNode;
  loading?: React.ReactNode;
}

export function SectionWrapper({ children, loading = <div>Loading...</div> }: WrapperProps) {
  return (
    <ErrorBoundary fallback={loading}>
      <Suspense fallback={loading}>{children}</Suspense>
    </ErrorBoundary>
  );
}
