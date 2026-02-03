import { useCallback, useState, useRef, type ReactNode } from 'react';

import type { IItem } from '../types';
import { DataContext } from './useData'; 

export const DataProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<IItem[]>([]);
  const [loading, setLoading] = useState(false);
  
  const abortControllerRef = useRef<AbortController | null>(null);

  const fetchItems = useCallback(async (query: string = '') => {
    if (abortControllerRef.current) abortControllerRef.current.abort();

    const controller = new AbortController();
    abortControllerRef.current = controller;

    setLoading(true);

    try {
      const url = new URL('http://localhost:4001/api/items');
      if (query) url.searchParams.append('q', query);
      url.searchParams.append('limit', '500');

      const res = await fetch(url.toString(), { signal: controller.signal });
      if (!res.ok) throw new Error(`Error: ${res.statusText}`);

      setItems(await res.json());
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      if (err.name !== 'AbortError') console.error(err);
    } finally {
      if (!controller.signal.aborted) setLoading(false);
    }
  }, []);

  return (
    <DataContext.Provider value={{ items, loading, fetchItems }}>{children}</DataContext.Provider>
  );
}