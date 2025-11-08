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
      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: '#4B9CA3' }}>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>
      <input
        defaultValue={q}
        onChange={(e) => update(e.target.value)}
        placeholder="Buscar productos, categorías..."
        className="w-full pl-11 pr-4 py-3 rounded-[10px] border-2 bg-white focus:outline-none focus:ring-[3px] focus:ring-[#94c2ff] focus:ring-offset-1 focus:border-transparent transition-all shadow-sm"
        style={{
          fontFamily: 'Noto Sans, sans-serif',
          borderColor: '#C3DEE0',
          color: '#031E21'
        }}
      />
    </div>
  );
}
