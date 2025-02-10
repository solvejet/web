// src/components/ui/GradientWaves.tsx
'use client';

import { useRef } from 'react';
import { cn } from '@/lib/utils';
import { useTheme } from '@/components/theme-provider';

interface GradientWavesProps {
  className?: string;
  intensity?: 'subtle' | 'medium' | 'high';
}

const GradientWaves = ({ className, intensity = 'medium' }: GradientWavesProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();

  const intensityConfig = {
    subtle: { opacity: 0.03, blur: 60 },
    medium: { opacity: 0.05, blur: 80 },
    high: { opacity: 0.08, blur: 100 },
  };

  const { opacity, blur } = intensityConfig[intensity];

  return (
    <div
      ref={containerRef}
      className={cn(
        'fixed inset-0 z-[-1] overflow-hidden pointer-events-none select-none',
        className
      )}
      aria-hidden="true"
    >
      {/* Wave layers */}
      <div className="absolute inset-0">
        {/* First wave layer */}
        <div
          className="absolute inset-0 animate-wave-slow"
          style={{
            background:
              theme === 'dark'
                ? `radial-gradient(circle at 50% 50%, rgba(255, 255, 255, ${opacity}) 0%, transparent 50%)`
                : `radial-gradient(circle at 50% 50%, rgba(0, 25, 38, ${opacity}) 0%, transparent 50%)`,
            filter: `blur(${blur}px)`,
            transform: 'scale(1.5)',
          }}
        />

        {/* Second wave layer */}
        <div
          className="absolute inset-0 animate-wave-slower"
          style={{
            background:
              theme === 'dark'
                ? `radial-gradient(circle at 70% 30%, rgba(255, 255, 255, ${opacity}) 0%, transparent 50%)`
                : `radial-gradient(circle at 70% 30%, rgba(0, 98, 157, ${opacity}) 0%, transparent 50%)`,
            filter: `blur(${blur}px)`,
            transform: 'scale(1.5)',
          }}
        />

        {/* Third wave layer */}
        <div
          className="absolute inset-0 animate-wave-slowest"
          style={{
            background:
              theme === 'dark'
                ? `radial-gradient(circle at 30% 70%, rgba(255, 255, 255, ${opacity}) 0%, transparent 50%)`
                : `radial-gradient(circle at 30% 70%, rgba(0, 98, 157, ${opacity}) 0%, transparent 50%)`,
            filter: `blur(${blur}px)`,
            transform: 'scale(1.5)',
          }}
        />
      </div>
    </div>
  );
};

export default GradientWaves;
