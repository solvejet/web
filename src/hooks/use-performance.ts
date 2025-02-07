// src/hooks/use-performance.ts
'use client';

import { useEffect, useCallback, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { analyticsQueue } from '@/utils/analytics-queue';

type MetricType = 'CLS' | 'FID' | 'LCP' | 'FCP' | 'TTFB';

interface PerformanceMetric {
  name: MetricType;
  value: number;
  rating: 'good' | 'needs-improvement' | 'poor';
  delta: number;
  id: string;
}

interface CustomPerformanceEntry extends PerformanceEntry {
  value?: number;
  element?: Element;
  hadRecentInput?: boolean;
}

export const usePerformance = () => {
  const pathname = usePathname();
  const metricsRef = useRef<Set<string>>(new Set());

  const getRating = (name: MetricType, value: number): 'good' | 'needs-improvement' | 'poor' => {
    switch (name) {
      case 'CLS':
        return value <= 0.1 ? 'good' : value <= 0.25 ? 'needs-improvement' : 'poor';
      case 'FID':
        return value <= 100 ? 'good' : value <= 300 ? 'needs-improvement' : 'poor';
      case 'LCP':
        return value <= 2500 ? 'good' : value <= 4000 ? 'needs-improvement' : 'poor';
      case 'FCP':
        return value <= 1800 ? 'good' : value <= 3000 ? 'needs-improvement' : 'poor';
      case 'TTFB':
        return value <= 800 ? 'good' : value <= 1800 ? 'needs-improvement' : 'poor';
      default:
        return 'needs-improvement';
    }
  };

  const reportWebVital = useCallback(
    (metric: PerformanceMetric) => {
      // Prevent duplicate metrics
      const metricKey = `${metric.name}-${pathname}`;
      if (metricsRef.current.has(metricKey)) return;
      metricsRef.current.add(metricKey);

      analyticsQueue.enqueue('/api/analytics', {
        type: 'performance',
        payload: {
          metric: metric.name,
          value: metric.value,
          rating: metric.rating,
          pathname,
          timestamp: new Date().toISOString(),
        },
      });
    },
    [pathname]
  );

  useEffect(() => {
    const observer = new PerformanceObserver((list) => {
      list.getEntries().forEach((entry: CustomPerformanceEntry) => {
        const metricName = entry.name as MetricType;
        const metricValue = entry.value ?? entry.startTime;

        const metric: PerformanceMetric = {
          name: metricName,
          value: metricValue,
          rating: getRating(metricName, metricValue),
          delta: metricValue,
          id: `${entry.name}-${Date.now()}`,
        };

        reportWebVital(metric);
      });
    });

    try {
      observer.observe({
        entryTypes: ['paint', 'largest-contentful-paint', 'first-input', 'layout-shift'],
      });
    } catch (error) {
      console.warn('PerformanceObserver error:', error);
    }

    return () => {
      try {
        observer.disconnect();
      } catch (error) {
        console.warn('Error disconnecting observer:', error);
      }
    };
  }, [reportWebVital]);

  const measureUserInteraction = useCallback(
    (eventType: string) => {
      const startTime = performance.now();

      return () => {
        const duration = performance.now() - startTime;

        analyticsQueue.enqueue('/api/analytics', {
          type: 'performance',
          payload: {
            metric: 'UserInteraction',
            event: eventType,
            value: duration,
            pathname,
            timestamp: new Date().toISOString(),
          },
        });
      };
    },
    [pathname]
  );

  return { measureUserInteraction };
};

export default usePerformance;
