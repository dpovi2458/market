"use client";
import { createContext, useContext, useEffect, useMemo, useReducer, useState, useRef } from 'react';

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

  // Anti doble-click / doble-dispatch rápido: almacena últimos añadidos por 300ms
  const recentAddsRef = useRef(new Map());

  const api = useMemo(() => {
    const addItem = (item) => {
      if (!item || !item.producto_id) return;
      const now = Date.now();
      const last = recentAddsRef.current.get(item.producto_id);
      // Si se intentó agregar exactamente el mismo producto dentro de 300ms, ignorar
      if (last && now - last < 300) return;
      recentAddsRef.current.set(item.producto_id, now);
      dispatch({ type: 'ADD', payload: { ...item, cantidad: Math.max(1, item.cantidad || 1) } });
    };

    return {
      items,
      open,
      setOpen,
      addItem,
      updateCantidad: (id, cantidad) => dispatch({ type: 'UPDATE_QTY', id, cantidad }),
      removeItem: (id) => dispatch({ type: 'REMOVE', id }),
      clear: () => dispatch({ type: 'CLEAR' }),
      totalItems: items.reduce((sum, item) => sum + item.cantidad, 0),
      totalPrice: items.reduce((sum, item) => sum + (item.precio * item.cantidad), 0),
      increaseQuantity: (id) => {
        const item = items.find(it => it.producto_id === id);
        if (item) {
          const newQty = Math.min((item.stock ?? 99), item.cantidad + 1);
          dispatch({ type: 'UPDATE_QTY', id, cantidad: newQty });
        }
      },
      decreaseQuantity: (id) => {
        const item = items.find(it => it.producto_id === id);
        if (item && item.cantidad > 1) {
          dispatch({ type: 'UPDATE_QTY', id, cantidad: item.cantidad - 1 });
        }
      }
    };
  }, [items, open]);

  return <CarritoContext.Provider value={api}>{children}</CarritoContext.Provider>;
}

export function useCarrito() {
  const ctx = useContext(CarritoContext);
  if (!ctx) throw new Error('useCarrito debe usarse dentro de CarritoProvider');
  return ctx;
}
