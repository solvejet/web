// src/utils/api.ts
let csrfInitialized = false;
let csrfInitializationPromise: Promise<void> | null = null;

async function initializeCsrf(): Promise<void> {
  if (csrfInitialized) return;

  if (csrfInitializationPromise) {
    return csrfInitializationPromise;
  }

  csrfInitializationPromise = new Promise<void>(async (resolve, reject) => {
    try {
      const response = await fetch('/api/csrf');
      if (!response.ok) {
        throw new Error('Failed to fetch CSRF token');
      }
      // Wait a bit for the cookie to be set
      await new Promise((r) => setTimeout(r, 100));
      csrfInitialized = true;
      resolve();
    } catch (error) {
      console.warn('CSRF initialization failed:', error);
      reject(error);
    } finally {
      csrfInitializationPromise = null;
    }
  });

  return csrfInitializationPromise;
}

export async function fetchWithCsrf(url: string, options: RequestInit = {}): Promise<Response> {
  try {
    // Initialize CSRF if needed
    if (!csrfInitialized) {
      await initializeCsrf();
    }

    // Get the CSRF token from cookie
    const csrfToken = document.cookie
      .split('; ')
      .find((row) => row.startsWith('csrf-token='))
      ?.split('=')[1];

    if (!csrfToken) {
      throw new Error('CSRF token not found in cookies');
    }

    // Create headers with type safety
    const headers = new Headers(options.headers);
    headers.set('Content-Type', 'application/json');
    headers.set('X-CSRF-Token', csrfToken);

    // Return fetch with properly typed headers
    const response = await fetch(url, {
      ...options,
      headers,
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response;
  } catch (error) {
    // If CSRF token is missing, try to reinitialize once
    if (
      error instanceof Error &&
      error.message === 'CSRF token not found in cookies' &&
      csrfInitialized
    ) {
      csrfInitialized = false;
      return fetchWithCsrf(url, options);
    }
    throw error;
  }
}

// Type-safe wrapper for JSON responses
export async function fetchWithCsrfJson<T>(url: string, options: RequestInit = {}): Promise<T> {
  const response = await fetchWithCsrf(url, options);
  return response.json() as Promise<T>;
}
