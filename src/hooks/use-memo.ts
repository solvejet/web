// src/hooks/use-memo.ts
'use client';

import { useMemo, useCallback, type DependencyList, useRef, useEffect, useState } from 'react';

const DEFAULT_MAX_SIZE = 100;
const DEFAULT_TIMEOUT = 3600000;

interface MemoOptions {
  maxSize?: number;
  timeout?: number;
}

interface CacheItem<T> {
  value: T;
  timestamp: number;
}

function getDependencyKey(dep: unknown): string {
  if (dep === null) return 'null';
  if (dep === undefined) return 'undefined';
  if (typeof dep === 'string') return `str:${dep}`;
  if (typeof dep === 'number') return `num:${dep}`;
  if (typeof dep === 'boolean') return `bool:${dep}`;
  if (typeof dep === 'function') return 'function';
  if (dep instanceof Date) return `date:${dep.getTime()}`;

  if (Array.isArray(dep)) {
    return `array:[${dep.map((item) => getDependencyKey(item)).join(',')}]`;
  }

  if (dep && typeof dep === 'object') {
    try {
      const keys = Object.keys(dep).sort();
      const safeKeys = keys.filter((key) => {
        const val = dep[key as keyof typeof dep];
        return (
          val !== null &&
          typeof val !== 'function' &&
          typeof val !== 'object' &&
          !('current' in dep) &&
          !('$$typeof' in dep)
        );
      });

      return `obj:{${safeKeys
        .map((key) => {
          const val = dep[key as keyof typeof dep];
          return `${key}:${getDependencyKey(val)}`;
        })
        .join(',')}}`;
    } catch {
      return `obj:${Date.now()}`;
    }
  }

  return 'unknown';
}

function createCacheKey(deps: DependencyList): string {
  try {
    return deps.map(getDependencyKey).join('|');
  } catch {
    return `fallback:${Date.now()}`;
  }
}

export function useMemoWithCache<T>(
  factory: () => T,
  deps: DependencyList,
  { maxSize = DEFAULT_MAX_SIZE, timeout = DEFAULT_TIMEOUT }: MemoOptions = {
    maxSize: DEFAULT_MAX_SIZE,
    timeout: DEFAULT_TIMEOUT,
  }
): T {
  const cache = useRef<Map<string, CacheItem<T>>>(new Map());
  const factoryRef = useRef(factory);

  useEffect(() => {
    factoryRef.current = factory;
  }, [factory]);

  useEffect(() => {
    const cleanupInterval = setInterval(() => {
      const now = Date.now();
      cache.current.forEach((item, key) => {
        if (now - item.timestamp > timeout) {
          cache.current.delete(key);
        }
      });
    }, 60000);

    return () => clearInterval(cleanupInterval);
  }, [timeout]);

  return useMemo(() => {
    try {
      const key = createCacheKey(deps);
      const now = Date.now();
      const cached = cache.current.get(key);

      if (cached && now - cached.timestamp <= timeout) {
        return cached.value;
      }

      const value = factoryRef.current();

      if (cache.current.size >= maxSize) {
        const oldestKey = Array.from(cache.current.keys())[0];
        if (oldestKey) {
          cache.current.delete(oldestKey);
        }
      }

      cache.current.set(key, { value, timestamp: now });
      return value;
    } catch (error) {
      console.warn('Cache operation failed:', error);
      return factoryRef.current();
    }
  }, deps);
}

export function useDeepMemo<T>(value: T, dependencies: DependencyList): T {
  const valueRef = useRef(value);

  useEffect(() => {
    valueRef.current = value;
  }, [value]);

  return useMemo(() => valueRef.current, dependencies);
}

interface AsyncMemoResult<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
  refresh: () => Promise<void>;
}

export function useAsyncMemo<T>(
  asyncFactory: () => Promise<T>,
  dependencies: DependencyList,
  initialValue: T | null = null
): AsyncMemoResult<T> {
  const [data, setData] = useState<T | null>(initialValue);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const asyncFactoryRef = useRef(asyncFactory);

  useEffect(() => {
    asyncFactoryRef.current = asyncFactory;
  }, [asyncFactory]);

  const refresh = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await asyncFactoryRef.current();
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err : new Error(String(err)));
    } finally {
      setLoading(false);
    }
  }, dependencies);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  return { data, loading, error, refresh };
}

interface DebouncedMemoOptions extends MemoOptions {
  delay?: number;
  maxWait?: number;
}

export function useDebouncedMemo<T>(
  factory: () => T,
  dependencies: DependencyList,
  { delay = 300, maxWait = 1000, ...options }: DebouncedMemoOptions = {}
): T {
  const lastRun = useRef<number>(0);
  const timeout = useRef<NodeJS.Timeout>();
  const value = useRef<T>();
  const factoryRef = useRef(factory);

  useEffect(() => {
    factoryRef.current = factory;
  }, [factory]);

  return useMemoWithCache(
    () => {
      const now = Date.now();

      if (timeout.current) {
        clearTimeout(timeout.current);
      }

      if (now - lastRun.current >= maxWait) {
        lastRun.current = now;
        value.current = factoryRef.current();
        return value.current;
      }

      timeout.current = setTimeout(() => {
        lastRun.current = Date.now();
        value.current = factoryRef.current();
      }, delay);

      return value.current ?? factoryRef.current();
    },
    dependencies,
    options
  );
}

export function useShallowMemo<T>(value: T, dependencies: DependencyList): T {
  const valueRef = useRef(value);

  useEffect(() => {
    valueRef.current = value;
  }, [value]);

  return useMemo(() => valueRef.current, dependencies);
}

export function useMemoCompare<T extends Record<string, unknown>>(
  value: T,
  compare: (previous: T | undefined, current: T) => boolean
): T {
  const previousRef = useRef<T>();
  const valueRef = useRef(value);
  const isEqual = previousRef.current ? compare(previousRef.current, value) : false;

  useEffect(() => {
    previousRef.current = valueRef.current;
    valueRef.current = value;
  }, [value]);

  return useMemo(() => (isEqual ? previousRef.current! : value), [isEqual, value]);
}
