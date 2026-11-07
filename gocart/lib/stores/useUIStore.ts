import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface UIState {
  theme: 'light' | 'dark' | 'system';
  setTheme: (theme: 'light' | 'dark' | 'system') => void;
  isSearchOpen: boolean;
  openSearch: () => void;
  closeSearch: () => void;
  toggleSearch: () => void;
  recentSearches: string[];
  addRecentSearch: (query: string) => void;
  clearRecentSearches: () => void;
}

export const useUIStore = create<UIState>()(
  persist(
    (set, get) => ({
      theme: 'system',
      setTheme: (theme) => set({ theme }),
      isSearchOpen: false,
      openSearch: () => set({ isSearchOpen: true }),
      closeSearch: () => set({ isSearchOpen: false }),
      toggleSearch: () => set((state) => ({ isSearchOpen: !state.isSearchOpen })),
      recentSearches: ['Headphones', 'Sneakers', 'Smart Watch', 'Backpack', 'Minimalist Desk Lamp'],
      addRecentSearch: (query) => {
        const trimmed = query.trim();
        if (!trimmed) return;
        set((state) => ({
          recentSearches: [trimmed, ...state.recentSearches.filter((s) => s.toLowerCase() !== trimmed.toLowerCase())].slice(0, 8),
        }));
      },
      clearRecentSearches: () => set({ recentSearches: [] }),
    }),
    {
      name: 'gocart-ui-storage',
      partialize: (state) => ({ theme: state.theme, recentSearches: state.recentSearches }),
    }
  )
);

