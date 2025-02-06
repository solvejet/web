// src/utils/api.ts
let csrfInitialized = false;
let csrfInitializationPromise: Promise<void> | null = null;
let initializationAttempts = 0;
const MAX_ATTEMPTS = 3;
const RETRY_DELAY = 1000;

async function initializeCsrf(): Promise<void> {
  if (csrfInitialized) return;

  if (csrfInitializationPromise) {
    return csrfInitializationPromise;
  }

  if (initializationAttempts >= MAX_ATTEMPTS) {
    throw new Error('Max CSRF initialization attempts reached');
  }

  csrfInitializationPromise = new Promise<void>(async (resolve, reject) => {
    try {
      initializationAttempts++;
      const response = await fetch('/api/csrf', {
        credentials: 'include',
        headers: {
          Accept: 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch CSRF token');
      }

      // Wait for cookies to be set
      await new Promise((r) => setTimeout(r, 100));

      const tokenCookie = document.cookie.split('; ').find((row) => row.startsWith('csrf-token='));

      if (!tokenCookie) {
        if (initializationAttempts < MAX_ATTEMPTS) {
          await new Promise((r) => setTimeout(r, RETRY_DELAY));
          csrfInitializationPromise = null;
          return initializeCsrf();
        }
        throw new Error('CSRF token not set in cookies');
      }

      csrfInitialized = true;
      resolve();
    } catch (error) {
      console.error('CSRF initialization failed:', error);
      csrfInitialized = false;
      reject(error);
    } finally {
      csrfInitializationPromise = null;
    }
  });

  return csrfInitializationPromise;
}

export async function fetchWithCsrf(url: string, options: RequestInit = {}): Promise<Response> {
  if (!csrfInitialized) {
    await initializeCsrf();
  }

  const csrfToken = document.cookie
    .split('; ')
    .find((row) => row.startsWith('csrf-token='))
    ?.split('=')[1];

  if (!csrfToken) {
    throw new Error('CSRF token not found');
  }

  const headers = new Headers(options.headers);
  headers.set('Content-Type', 'application/json');
  headers.set('X-CSRF-Token', csrfToken);

  const response = await fetch(url, {
    ...options,
    credentials: 'include',
    headers,
  });

  if (!response.ok) {
    if (response.status === 403) {
      // Reset CSRF state and retry once
      csrfInitialized = false;
      await initializeCsrf();
      return fetchWithCsrf(url, options);
    }
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response;
}
