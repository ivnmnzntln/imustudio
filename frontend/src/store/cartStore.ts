import { create } from 'zustand';

interface CartItem {
  productId: string;
  title: string;
  price: number;
  quantity: number;
  image?: string;
}

interface CartStore {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clear: () => void;
  total: () => number;
  count: () => number;
}

export const useCart = create<CartStore>((set, get) => ({
  items: JSON.parse(localStorage.getItem('cart') || '[]'),

  addItem: (item) =>
    set((state) => {
      const existing = state.items.find((i) => i.productId === item.productId);
      const updated = existing
        ? state.items.map((i) =>
            i.productId === item.productId ? { ...i, quantity: i.quantity + item.quantity } : i
          )
        : [...state.items, item];
      localStorage.setItem('cart', JSON.stringify(updated));
      return { items: updated };
    }),

  removeItem: (productId) =>
    set((state) => {
      const updated = state.items.filter((i) => i.productId !== productId);
      localStorage.setItem('cart', JSON.stringify(updated));
      return { items: updated };
    }),

  updateQuantity: (productId, quantity) =>
    set((state) => {
      const updated = state.items.map((i) =>
        i.productId === productId ? { ...i, quantity } : i
      );
      localStorage.setItem('cart', JSON.stringify(updated));
      return { items: updated };
    }),

  clear: () => {
    set({ items: [] });
    localStorage.removeItem('cart');
  },

  total: () => {
    return get().items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  },

  count: () => {
    return get().items.reduce((sum, item) => sum + item.quantity, 0);
  },
}));

export default useCart;
