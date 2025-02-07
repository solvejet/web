// src/utils/api.ts
let csrfInitialized = false;
let csrfInitializationPromise: Promise<void> | null = null;
let initializationAttempts = 0;
const MAX_ATTEMPTS = 3;
const RETRY_DELAY = 1000;

async function initializeCsrf(): Promise<void> {
  // If already initialized, return immediately
  if (csrfInitialized) return;

  // If initialization is in progress, wait for it
  if (csrfInitializationPromise) {
    return csrfInitializationPromise;
  }

  // Reset initialization state if max attempts reached
  if (initializationAttempts >= MAX_ATTEMPTS) {
    csrfInitialized = false;
    initializationAttempts = 0;
    csrfInitializationPromise = null;
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
          csrfInitializationPromise = null;
          await new Promise((r) => setTimeout(r, RETRY_DELAY));
          resolve(initializeCsrf());
          return;
        }
        throw new Error('CSRF token not set in cookies');
      }

      csrfInitialized = true;
      resolve();
    } catch (error) {
      console.warn('CSRF initialization failed:', error);
      csrfInitialized = false;

      if (initializationAttempts < MAX_ATTEMPTS) {
        csrfInitializationPromise = null;
        await new Promise((r) => setTimeout(r, RETRY_DELAY));
        resolve(initializeCsrf());
        return;
      }

      reject(error);
    } finally {
      if (initializationAttempts >= MAX_ATTEMPTS) {
        csrfInitializationPromise = null;
      }
    }
  });

  return csrfInitializationPromise;
}

export async function fetchWithCsrf(url: string, options: RequestInit = {}): Promise<Response> {
  try {
    if (!csrfInitialized) {
      await initializeCsrf();
    }

    const csrfToken = document.cookie
      .split('; ')
      .find((row) => row.startsWith('csrf-token='))
      ?.split('=')[1];

    if (!csrfToken) {
      // Instead of throwing, try to reinitialize
      csrfInitialized = false;
      await initializeCsrf();
      return fetchWithCsrf(url, options);
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
  } catch (error) {
    if (error instanceof Error) {
      console.error('Fetch error:', error.message);
    }
    throw error;
  }
}
