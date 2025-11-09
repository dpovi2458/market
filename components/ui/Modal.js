'use client';

import { useEffect } from 'react';

export default function Modal({ isOpen, onClose, children, title }) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="cart-modal open" role="dialog" aria-modal="true" aria-labelledby="modal-title">
      <div className="cart-modal-overlay" onClick={onClose} aria-hidden="true" />
      <div className="cart-modal-content">
        <div className="cart-modal-header">
          <h2 id="modal-title" className="cart-modal-title">
            {title}
          </h2>
          <button
            className="cart-modal-close"
            onClick={onClose}
            aria-label="Cerrar modal"
          >
            <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
