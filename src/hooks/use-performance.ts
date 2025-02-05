// src/hooks/use-performance.ts
'use client';

import { useEffect, useCallback, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { fetchWithCsrf } from '@/utils/api';

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

const MAX_RETRIES = 3;
const RETRY_DELAY = 5000;

export const usePerformance = () => {
  const pathname = usePathname();
  const metricsQueue = useRef<Array<{ metric: PerformanceMetric; retries: number }>>([]);
  const isProcessing = useRef(false);
  const processingTimeout = useRef<NodeJS.Timeout>();

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

  const processMetricsQueue = useCallback(async () => {
    if (isProcessing.current || metricsQueue.current.length === 0) return;

    isProcessing.current = true;
    if (processingTimeout.current) {
      clearTimeout(processingTimeout.current);
    }

    try {
      const currentMetrics = [...metricsQueue.current];
      metricsQueue.current = [];

      for (const { metric, retries } of currentMetrics) {
        try {
          await fetchWithCsrf('/api/analytics', {
            method: 'POST',
            body: JSON.stringify({
              type: 'performance',
              payload: {
                metric: metric.name,
                value: metric.value,
                rating: metric.rating,
                pathname,
                timestamp: new Date().toISOString(),
              },
            }),
          });
        } catch (error) {
          console.warn('Error reporting metric:', metric.name, error);

          // Only retry if we haven't exceeded max retries
          if (retries < MAX_RETRIES) {
            metricsQueue.current.push({
              metric,
              retries: retries + 1,
            });
          }
        }
      }
    } finally {
      isProcessing.current = false;

      // If there are still items in the queue, schedule next processing
      if (metricsQueue.current.length > 0) {
        processingTimeout.current = setTimeout(() => {
          void processMetricsQueue();
        }, RETRY_DELAY);
      }
    }
  }, [pathname]);

  const reportWebVital = useCallback(
    (metric: PerformanceMetric) => {
      metricsQueue.current.push({ metric, retries: 0 });
      void processMetricsQueue();
    },
    [processMetricsQueue]
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
      if (processingTimeout.current) {
        clearTimeout(processingTimeout.current);
      }
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

        reportWebVital({
          name: 'FID',
          value: duration,
          rating: getRating('FID', duration),
          delta: duration,
          id: `${eventType}-${Date.now()}`,
        });
      };
    },
    [reportWebVital]
  );

  return { measureUserInteraction };
};

export default usePerformance;
