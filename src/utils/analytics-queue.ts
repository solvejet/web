// src/utils/analytics-queue.ts
import { getSessionId } from './analytics';
import { fetchWithCsrf } from './api';

type EventType = 'pageview' | 'performance' | 'utm' | 'campaign';

interface AnalyticsPayload {
  type: EventType;
  payload: Record<string, unknown>;
}

interface QueuedEvent {
  url: string;
  data: AnalyticsPayload;
  retries: number;
}

class AnalyticsQueue {
  private queue: QueuedEvent[] = [];
  private processing = false;
  private maxRetries = 3;
  private retryDelay = 1000;
  private maxQueueSize = 1000;

  private async processQueue() {
    if (this.processing || this.queue.length === 0) return;

    this.processing = true;

    try {
      const event = this.queue[0];
      if (!event) return;

      // Use fetchWithCsrf instead of regular fetch
      const response = await fetchWithCsrf(event.url, {
        method: 'POST',
        body: JSON.stringify(event.data),
      });

      if (!response.ok) {
        if (response.status === 429) {
          // Rate limited - wait and retry
          const retryAfter = parseInt(response.headers.get('Retry-After') || '1', 10);
          await new Promise((resolve) => setTimeout(resolve, retryAfter * 1000));

          if (event.retries < this.maxRetries) {
            event.retries++;
            // Move to the end of the queue
            this.queue.push({ ...event });
          }
        } else if (response.status === 403) {
          // CSRF error - retry with fresh token
          if (event.retries < this.maxRetries) {
            event.retries++;
            setTimeout(() => {
              this.queue.push({ ...event });
            }, this.retryDelay * event.retries);
          }
        } else if (response.status >= 500) {
          // Server error - retry
          if (event.retries < this.maxRetries) {
            event.retries++;
            setTimeout(() => {
              this.queue.push({ ...event });
            }, this.retryDelay * event.retries);
          }
        }
      }

      // Remove the processed event
      this.queue.shift();
    } catch (error) {
      console.warn('Error processing analytics event:', error);
      const event = this.queue.shift();
      if (event && event.retries < this.maxRetries) {
        event.retries++;
        setTimeout(() => {
          this.queue.push(event);
        }, this.retryDelay * event.retries);
      }
    }

    this.processing = false;
    // Continue processing queue
    if (this.queue.length > 0) {
      setTimeout(() => this.processQueue(), 100);
    }
  }

  public enqueue(url: string, data: AnalyticsPayload): void {
    // Prevent queue from growing too large
    if (this.queue.length >= this.maxQueueSize) {
      console.warn('Analytics queue is full, dropping oldest event');
      this.queue.shift();
    }

    this.queue.push({ url, data, retries: 0 });
    void this.processQueue();
  }
}

export const analyticsQueue = new AnalyticsQueue();

// Updated trackPageView function using fetchWithCsrf
export async function trackPageView(pathname: string, utmId?: string): Promise<void> {
  analyticsQueue.enqueue('/api/analytics', {
    type: 'pageview',
    payload: {
      pathname,
      sessionId: getSessionId(),
      utmId,
    },
  });
}

// Update other tracking functions similarly
export async function trackPerformanceMetric(metric: string, value: number): Promise<void> {
  analyticsQueue.enqueue('/api/analytics', {
    type: 'performance',
    payload: {
      metric,
      value,
      timestamp: new Date().toISOString(),
    },
  });
}
