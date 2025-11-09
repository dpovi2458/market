"use client";
import React, { useState } from 'react';
import Link from 'next/link';

// Iconos SVG Profesionales
const TodosIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M2 3.5C2 2.67157 2.67157 2 3.5 2H12.5C13.3284 2 14 2.67157 14 3.5V12.5C14 13.3284 13.3284 14 12.5 14H3.5C2.67157 14 2 13.3284 2 12.5V3.5Z" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M5 8L7 10L11 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const UtilesIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3 2H5V14H3V2Z" fill="currentColor"/>
    <path d="M6.5 4H8.5V14H6.5V4Z" fill="currentColor"/>
    <path d="M10 6H12V14H10V6Z" fill="currentColor"/>
    <rect x="2" y="13" width="12" height="1.5" fill="currentColor"/>
  </svg>
);

const ComidaIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M8 5L9.5 7H6.5L8 5Z" fill="currentColor"/>
    <path d="M8 11L9.5 9H6.5L8 11Z" fill="currentColor"/>
    <path d="M5 8L7 9.5V6.5L5 8Z" fill="currentColor"/>
    <path d="M11 8L9 9.5V6.5L11 8Z" fill="currentColor"/>
  </svg>
);

const TecnologiaIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="2" y="3" width="12" height="8" rx="1" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M2 9H14" stroke="currentColor" strokeWidth="1.5"/>
    <rect x="6" y="11" width="4" height="2" fill="currentColor"/>
    <circle cx="8" cy="6" r="1" fill="currentColor"/>
  </svg>
);

const RopaIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M8 2L11 4V6L13 7V14H3V7L5 6V4L8 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
    <path d="M5 6L3 7M11 6L13 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

const OtrosIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="4" cy="4" r="2" stroke="currentColor" strokeWidth="1.5"/>
    <circle cx="12" cy="4" r="2" stroke="currentColor" strokeWidth="1.5"/>
    <circle cx="4" cy="12" r="2" stroke="currentColor" strokeWidth="1.5"/>
    <circle cx="12" cy="12" r="2" stroke="currentColor" strokeWidth="1.5"/>
  </svg>
);

export default function CategoryFilter({ activeCategory, searchQuery }) {
  const categories = [
    { key: 'todos', label: 'Todos', icon: TodosIcon },
    { key: 'utiles', label: 'Útiles', icon: UtilesIcon },
    { key: 'comida', label: 'Comida', icon: ComidaIcon },
    { key: 'tecnologia', label: 'Tecnología', icon: TecnologiaIcon },
    { key: 'ropa', label: 'Ropa', icon: RopaIcon },
    { key: 'otros', label: 'Otros', icon: OtrosIcon }
  ];

  return (
    <div className="category-filter-wrapper">
      <div className="category-filter-container">
        {categories.map(({ key, label, icon: IconComponent }) => {
          const isActive = (activeCategory || 'todos') === key;
          const href = `/?${new URLSearchParams({
            ...(searchQuery && { q: searchQuery }),
            ...(key !== 'todos' && { categoria: key })
          }).toString()}`;

          return (
            <Link
              key={key}
              href={href}
              className={`category-filter-button ${isActive ? 'active' : ''}`}
            >
              <IconComponent />
              <span>{label}</span>
            </Link>
          );
        })}
      </div>

      <style jsx>{`
        .category-filter-wrapper {
          padding: 1.5rem 0;
          background-color: #f9fafb;
          border-bottom: 1px solid #e5e7eb;
          overflow-x: auto;
          scrollbar-width: none;
        }

        .category-filter-wrapper::-webkit-scrollbar {
          display: none;
        }

        .category-filter-container {
          display: flex;
          gap: 0.75rem;
          flex-wrap: wrap;
          padding: 0 1rem;
          max-width: 1200px;
          margin: 0 auto;
          justify-content: flex-start;
        }

        .category-filter-button {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.625rem 1.25rem;
          background-color: white;
          border: 1px solid #d1d5db;
          border-bottom: 3px solid transparent;
          border-radius: 0.5rem;
          cursor: pointer;
          transition: all 200ms ease-in-out;
          text-decoration: none;
          font-size: 0.875rem;
          font-weight: 500;
          color: #374151;
          white-space: nowrap;
          flex-shrink: 0;
          position: relative;
        }

        .category-filter-button:hover {
          color: #14b8a6;
          border-bottom-color: #14b8a6;
          box-shadow: 0 2px 8px rgba(20, 184, 166, 0.12);
          transform: translateY(-1px);
        }

        .category-filter-button:hover svg {
          color: #14b8a6;
          transform: scale(1.1);
        }

        .category-filter-button.active {
          background-color: white;
          color: #14b8a6;
          border-bottom-color: #14b8a6;
          box-shadow: 0 4px 12px rgba(20, 184, 166, 0.15);
        }

        .category-filter-button.active svg {
          color: #14b8a6;
        }

        .category-filter-button.active:hover {
          color: #0d9488;
          border-bottom-color: #0d9488;
          box-shadow: 0 6px 16px rgba(20, 184, 166, 0.25);
          transform: translateY(-2px);
        }

        .category-filter-button.active:hover svg {
          color: #0d9488;
        }

        .category-filter-button svg {
          width: 16px;
          height: 16px;
          color: #6b7280;
          flex-shrink: 0;
          transition: all 200ms ease-in-out;
        }

        .category-filter-button span {
          font-weight: 600;
          transition: color 200ms ease-in-out;
        }

        /* Mobile responsivo */
        @media (max-width: 640px) {
          .category-filter-wrapper {
            padding: 1rem 0;
            overflow-x: auto;
            -webkit-overflow-scrolling: touch;
          }

          .category-filter-container {
            padding: 0 1rem;
            gap: 0.5rem;
            flex-wrap: nowrap;
            min-width: min-content;
          }

          .category-filter-button {
            padding: 0.5rem 1rem;
            font-size: 0.8125rem;
            gap: 0.375rem;
          }

          .category-filter-button svg {
            width: 14px;
            height: 14px;
          }
        }
      `}</style>
    </div>
  );
}
