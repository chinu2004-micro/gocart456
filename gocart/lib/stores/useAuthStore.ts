import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { UserProfile, UserAddress } from '@/types/vellora';
import { userService } from '@/services/velloraServices';

interface AuthStore {
  user: UserProfile | null;
  isAuthenticated: boolean;
  loginModalOpen: boolean;
  authModalMode: 'login' | 'register';
  openLoginModal: (mode?: 'login' | 'register') => void;
  closeLoginModal: () => void;
  setAuthModalMode: (mode: 'login' | 'register') => void;
  login: (user: UserProfile) => void;
  logout: () => void;
  updateUser: (data: Partial<UserProfile>) => void;
  addAddress: (address: Omit<UserAddress, 'id'>) => void;
  deleteAddress: (id: string) => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      user: null, // Starts guest so login/register flows are visible and functional
      isAuthenticated: false,
      loginModalOpen: false,
      authModalMode: 'login',

      openLoginModal: (mode = 'login') => set({ loginModalOpen: true, authModalMode: mode }),
      closeLoginModal: () => set({ loginModalOpen: false }),
      setAuthModalMode: (mode) => set({ authModalMode: mode }),

      login: (user) => set({ user, isAuthenticated: true, loginModalOpen: false }),
      logout: async () => {
        set({ user: null, isAuthenticated: false });
        if (typeof window !== 'undefined') {
          localStorage.removeItem('vellora_auth_user');
          localStorage.removeItem('vellora_orders');
        }
        try {
          await fetch('/api/auth/logout', { method: 'POST' });
        } catch (e) {}
      },

      updateUser: (data) => {
        const updated = userService.updateProfile(data);
        set({ user: updated });
      },

      addAddress: (address) => {
        userService.addAddress(address);
        const user = userService.getCurrentUser();
        set({ user });
      },

      deleteAddress: (id) => {
        userService.deleteAddress(id);
        const user = userService.getCurrentUser();
        set({ user });
      },
    }),
    {
      name: 'vellora-auth-store',
    }
  )
);

