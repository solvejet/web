// src/hooks/use-memo.ts
'use client';

import { useMemo, useCallback, type DependencyList, useRef, useEffect, useState } from 'react';

interface MemoOptions {
  maxSize?: number;
  timeout?: number;
}

interface CacheItem<T> {
  value: T;
  timestamp: number;
}

export function useMemoWithCache<T>(
  factory: () => T,
  dependencies: DependencyList,
  options: MemoOptions = {}
): T {
  const { maxSize = 100, timeout = 3600000 } = options;
  const cache = useRef<Map<string, CacheItem<T>>>(new Map());
  const factoryRef = useRef(factory);

  // Update factory ref when it changes
  useEffect(() => {
    factoryRef.current = factory;
  }, [factory]);

  // Clear expired items from cache
  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      for (const [key, item] of cache.current.entries()) {
        if (now - item.timestamp > timeout) {
          cache.current.delete(key);
        }
      }
    }, 60000);

    return () => clearInterval(interval);
  }, [timeout]);

  return useMemo(() => {
    const depsString = JSON.stringify(dependencies);
    const cachedItem = cache.current.get(depsString);
    const now = Date.now();

    if (cachedItem && now - cachedItem.timestamp <= timeout) {
      return cachedItem.value;
    }

    const result = factoryRef.current();

    if (cache.current.size >= maxSize) {
      const oldestKey = Array.from(cache.current.keys())[0];
      if (oldestKey) {
        cache.current.delete(oldestKey);
      }
    }

    cache.current.set(depsString, { value: result, timestamp: now });
    return result;
  }, [dependencies, timeout, maxSize]);
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
  }, dependencies); // Use dependencies directly

  useEffect(() => {
    void refresh();
  }, [refresh]);

  return { data, loading, error, refresh };
}

type DebouncedMemoOptions = {
  delay?: number;
  maxWait?: number;
} & MemoOptions;

export function useDebouncedMemo<T>(
  factory: () => T,
  dependencies: DependencyList,
  options: DebouncedMemoOptions = {}
): T {
  const { delay = 300, maxWait = 1000, ...memoOptions } = options;
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
    memoOptions
  );
}

export function useShallowMemo<T>(value: T, dependencies: DependencyList): T {
  const valueRef = useRef(value);

  useEffect(() => {
    valueRef.current = value;
  }, [value]);

  return useMemo(() => valueRef.current, dependencies);
}

interface ComparableObject {
  [key: string]: unknown;
}

export function useMemoCompare<T extends ComparableObject>(
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
