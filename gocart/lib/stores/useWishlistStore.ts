import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product } from '@/types/vellora';

interface WishlistStore {
  items: Product[];
  addItem: (product: Product) => void;
  removeItem: (id: string) => void;
  toggleItem: (product: Product) => boolean;
  isInWishlist: (id: string) => boolean;
  clearWishlist: () => void;
}

export const useWishlistStore = create<WishlistStore>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (product) => {
        if (!get().isInWishlist(product.id)) {
          set((state) => ({ items: [...state.items, product] }));
        }
      },
      removeItem: (id) => {
        set((state) => ({ items: state.items.filter((item) => item.id !== id) }));
      },
      toggleItem: (product) => {
        const exists = get().isInWishlist(product.id);
        if (exists) {
          get().removeItem(product.id);
          return false;
        } else {
          get().addItem(product);
          return true;
        }
      },
      isInWishlist: (id) => {
        return get().items.some((item) => item.id === id);
      },
      clearWishlist: () => set({ items: [] }),
    }),
    {
      name: 'vellora-wishlist-store',
    }
  )
);
