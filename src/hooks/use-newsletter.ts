// src/hooks/use-newsletter.ts
import { useState } from 'react';
import { fetchWithCsrf } from '@/utils/api';

export type SubscriptionStatus = 'idle' | 'loading' | 'success' | 'error';

export const useNewsletter = () => {
  const [status, setStatus] = useState<SubscriptionStatus>('idle');
  const [message, setMessage] = useState('');

  const subscribe = async (email: string) => {
    if (!email || !email.trim()) {
      setStatus('error');
      setMessage('Please enter your email address');
      return false;
    }

    try {
      setStatus('loading');

      // First get CSRF token
      const csrfResponse = await fetch('/api/csrf', {
        method: 'GET',
        credentials: 'include',
      });

      if (!csrfResponse.ok) {
        throw new Error('Failed to get CSRF token');
      }

      // Get cookies for debugging
      const cookies = document.cookie;

      // Make newsletter request
      const response = await fetchWithCsrf('/api/newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: email.trim() }),
      });

      // Log full response for debugging
      const data = await response.json();

      if (response.ok) {
        setStatus('success');
        setMessage(data.message || 'Successfully subscribed!');
        return true;
      } else {
        setStatus('error');
        setMessage(data.message || 'Failed to subscribe. Please try again.');
        return false;
      }
    } catch (error) {
      console.error('Full error details:', error);
      setStatus('error');
      setMessage(error instanceof Error ? error.message : 'Failed to subscribe. Please try again.');
      return false;
    }
  };

  const reset = () => {
    setStatus('idle');
    setMessage('');
  };

  return {
    status,
    message,
    subscribe,
    reset,
  };
};
