"use client";
import { createContext, useContext, useEffect, useMemo, useReducer, useState } from 'react';

const CarritoContext = createContext();

function reducer(state, action) {
  switch (action.type) {
    case 'INIT':
      return action.payload || [];
    case 'ADD': {
      const exists = state.find((it) => it.producto_id === action.payload.producto_id);
      if (exists) {
        return state.map((it) =>
          it.producto_id === action.payload.producto_id
            ? { ...it, cantidad: Math.min((it.stock ?? 99), it.cantidad + action.payload.cantidad) }
            : it
        );
      }
      return [...state, action.payload];
    }
    case 'UPDATE_QTY':
      return state.map((it) => (it.producto_id === action.id ? { ...it, cantidad: action.cantidad } : it));
    case 'REMOVE':
      return state.filter((it) => it.producto_id !== action.id);
    case 'CLEAR':
      return [];
    default:
      return state;
  }
}

export function CarritoProvider({ children }) {
  const [items, dispatch] = useReducer(reducer, []);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem('carrito');
      if (raw) dispatch({ type: 'INIT', payload: JSON.parse(raw) });
    } catch {}
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('carrito', JSON.stringify(items));
    } catch {}
  }, [items]);

  const api = useMemo(
    () => ({
      items,
      open,
      setOpen,
      addItem: (item) => dispatch({ type: 'ADD', payload: item }),
      updateCantidad: (id, cantidad) => dispatch({ type: 'UPDATE_QTY', id, cantidad }),
      removeItem: (id) => dispatch({ type: 'REMOVE', id }),
      clear: () => dispatch({ type: 'CLEAR' })
    }),
    [items, open]
  );

  return <CarritoContext.Provider value={api}>{children}</CarritoContext.Provider>;
}

export function useCarrito() {
  const ctx = useContext(CarritoContext);
  if (!ctx) throw new Error('useCarrito debe usarse dentro de CarritoProvider');
  return ctx;
}
