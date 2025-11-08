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
    <div className="relative w-full max-w-2xl">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>
      <input
        defaultValue={q}
        onChange={(e) => update(e.target.value)}
        placeholder="Buscar productos, categorías..."
        className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all placeholder:text-gray-400 shadow-sm"
      />
    </div>
  );
}
