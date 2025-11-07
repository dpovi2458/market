"use client";
import { useRouter, useSearchParams } from 'next/navigation';
import { useDebouncedCallback } from './useDebouncedCallback';

export default function SearchBar() {
  const router = useRouter();
  const params = useSearchParams();
  const q = params.get('q') || '';

  const update = useDebouncedCallback((value) => {
    const next = new URLSearchParams(params.toString());
    if (value) next.set('q', value); else next.delete('q');
    router.push(`/?${next.toString()}`);
  }, 300);

  return (
    <input
      defaultValue={q}
      onChange={(e) => update(e.target.value)}
      placeholder="Buscar productos..."
      className="w-full max-w-md rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
    />
  );
}
