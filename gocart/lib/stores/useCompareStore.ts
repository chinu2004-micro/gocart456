import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product } from '@/types/vellora';

interface CompareStore {
  items: Product[];
  isOpen: boolean;
  addToCompare: (product: Product) => { success: boolean; message: string };
  removeFromCompare: (productId: string) => void;
  clearCompare: () => void;
  openCompare: () => void;
  closeCompare: () => void;
  toggleCompare: () => void;
  isInCompare: (productId: string) => boolean;
}

export const useCompareStore = create<CompareStore>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,

      addToCompare: (product) => {
        const current = get().items;
        if (current.some((p) => p.id === product.id)) {
          return { success: false, message: `${product.name} is already in comparison tray.` };
        }
        if (current.length >= 4) {
          return { success: false, message: 'You can compare up to 4 products at a time.' };
        }
        set({ items: [...current, product], isOpen: true });
        return { success: true, message: `Added ${product.name} to compare tray.` };
      },

      removeFromCompare: (productId) => {
        set((state) => ({ items: state.items.filter((p) => p.id !== productId) }));
      },

      clearCompare: () => set({ items: [], isOpen: false }),
      openCompare: () => set({ isOpen: true }),
      closeCompare: () => set({ isOpen: false }),
      toggleCompare: () => set((state) => ({ isOpen: !state.isOpen })),

      isInCompare: (productId) => {
        return get().items.some((p) => p.id === productId);
      },
    }),
    {
      name: 'vellora-compare-store',
    }
  )
);

