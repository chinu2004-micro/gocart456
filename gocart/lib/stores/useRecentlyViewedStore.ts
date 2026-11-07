import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product } from '@/types/vellora';

interface RecentlyViewedStore {
  items: Product[];
  recordView: (product: Product) => void;
  clearRecentlyViewed: () => void;
}

export const useRecentlyViewedStore = create<RecentlyViewedStore>()(
  persist(
    (set, get) => ({
      items: [],
      recordView: (product) => {
        set((state) => {
          const filtered = state.items.filter((p) => p.id !== product.id);
          return {
            items: [product, ...filtered].slice(0, 10),
          };
        });
      },
      clearRecentlyViewed: () => set({ items: [] }),
    }),
    {
      name: 'vellora-recently-viewed',
    }
  )
);

