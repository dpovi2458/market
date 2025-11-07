"use client";
import { useMemo } from 'react';

export function useDebouncedCallback(fn, delay) {
  return useMemo(() => {
    let t;
    return (...args) => {
      clearTimeout(t);
      t = setTimeout(() => fn(...args), delay);
    };
  }, [fn, delay]);
}
