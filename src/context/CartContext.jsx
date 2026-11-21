import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { PRODUCT_MAP, MAX_QTY } from '../data/products';

const STORAGE_KEY = 'carmotion_cart_v1';
const CartContext = createContext(null);

const loadCart = () => {
  try {
    const raw = JSON.parse(localStorage.getItem(STORAGE_KEY));
    return Array.isArray(raw) ? raw.filter((i) => PRODUCT_MAP[i.id] && i.qty > 0) : [];
  } catch {
    return [];
  }
};

export function CartProvider({ children }) {
  const [items, setItems] = useState(loadCart); // [{ id, qty }]
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      /* storage bloqueado: el carrito vive solo en memoria */
    }
  }, [items]);

  // Bloquear scroll del body con paneles abiertos
  useEffect(() => {
    const locked = drawerOpen || checkoutOpen;
    document.body.style.overflow = locked ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [drawerOpen, checkoutOpen]);

  const value = useMemo(() => {
    const lines = items
      .map((i) => ({ ...PRODUCT_MAP[i.id], qty: i.qty }))
      .filter((l) => l.id);
    const count = lines.reduce((s, l) => s + l.qty, 0);
    const total = lines.reduce((s, l) => s + l.price * l.qty, 0);

    const setQty = (id, qty) =>
      setItems((prev) => {
        const q = Math.max(0, Math.min(MAX_QTY, qty));
        if (q === 0) return prev.filter((i) => i.id !== id);
        return prev.some((i) => i.id === id)
          ? prev.map((i) => (i.id === id ? { ...i, qty: q } : i))
          : [...prev, { id, qty: q }];
      });

    return {
      lines,
      count,
      total,
      add: (id) => {
        const current = items.find((i) => i.id === id)?.qty || 0;
        setQty(id, current + 1);
        setDrawerOpen(true);
      },
      setQty,
      remove: (id) => setQty(id, 0),
      clear: () => setItems([]),
      drawerOpen,
      openDrawer: () => setDrawerOpen(true),
      closeDrawer: () => setDrawerOpen(false),
      checkoutOpen,
      openCheckout: () => { setDrawerOpen(false); setCheckoutOpen(true); },
      closeCheckout: () => setCheckoutOpen(false),
    };
  }, [items, drawerOpen, checkoutOpen]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart debe usarse dentro de <CartProvider>');
  return ctx;
};
