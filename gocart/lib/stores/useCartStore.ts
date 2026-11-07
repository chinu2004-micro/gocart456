import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product } from '@/types/vellora';
import { couponService } from '@/services/velloraServices';

export interface CartLineItem {
  id: string; // `${productId}-${variantId || 'std'}`
  product: Product;
  quantity: number;
  selectedVariant?: string;
}

interface CartStore {
  items: CartLineItem[];
  isOpen: boolean;
  lastUpdatedAt?: number;
  appliedCoupon: {
    code: string;
    discountAmount: number; // in paise
    description: string;
  } | null;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  addItem: (product: Product, quantity?: number, selectedVariant?: string) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  autoApplyEligibleCoupon: () => void;
  syncWithDatabase: () => Promise<void>;
  applyCouponCode: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;
  getSubtotalPaise: () => number;
  getDiscountPaise: () => number;
  getGstPaise: () => number;
  getShippingPaise: () => number;
  getGrandTotalPaise: () => number;
  getItemCount: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      appliedCoupon: null,

      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
      toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),

      addItem: (product, quantity = 1, selectedVariant) => {
        const lineId = `${product.id}-${selectedVariant || 'std'}`;
        set((state) => {
          const existing = state.items.find((item) => item.id === lineId);
          const now = Date.now();
          if (existing) {
            return {
              items: state.items.map((item) =>
                item.id === lineId ? { ...item, quantity: item.quantity + quantity } : item
              ),
              isOpen: true,
              lastUpdatedAt: now,
            };
          }
          return {
            items: [...state.items, { id: lineId, product, quantity, selectedVariant }],
            isOpen: true,
            lastUpdatedAt: now,
          };
        });
        get().autoApplyEligibleCoupon();
      },

      removeItem: (id) => {
        set((state) => ({ items: state.items.filter((item) => item.id !== id), lastUpdatedAt: Date.now() }));
        get().autoApplyEligibleCoupon();
      },

      updateQuantity: (id, quantity) => {
        if (quantity <= 0) {
          get().removeItem(id);
          return;
        }
        set((state) => ({
          items: state.items.map((item) => (item.id === id ? { ...item, quantity } : item)),
          lastUpdatedAt: Date.now(),
        }));
        get().autoApplyEligibleCoupon();
      },

      clearCart: () => set({ items: [], appliedCoupon: null, lastUpdatedAt: undefined }),

      autoApplyEligibleCoupon: () => {
        const subtotal = get().getSubtotalPaise();
        const current = get().appliedCoupon;
        // If subtotal >= ₹1,999 (199900 paise) and no coupon applied, or VELLORA10 is currently applied
        if (subtotal >= 199900) {
          if (!current) {
            get().applyCouponCode('VELLORA10');
          } else if (current.code === 'VELLORA10') {
            // Re-calculate 10% based on new subtotal
            const discountPaise = Math.round((subtotal * 10) / 100);
            if (discountPaise !== current.discountAmount) {
              set({
                appliedCoupon: {
                  ...current,
                  discountAmount: discountPaise,
                },
              });
            }
          }
        } else if (current && current.code === 'VELLORA10') {
          // If subtotal fell below threshold, remove VELLORA10
          set({ appliedCoupon: null });
        }
      },

      syncWithDatabase: async () => {
        const guestItems = get().items;
        try {
          if (guestItems.length > 0) {
            await fetch('/api/cart', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                items: guestItems.map((it) => ({
                  productId: it.product.id,
                  quantity: it.quantity,
                })),
              }),
            });
          }

          // Fetch merged items from DB
          const res = await fetch('/api/cart');
          if (res.ok) {
            const data = await res.json();
            if (data.items && data.items.length > 0) {
              set({ items: data.items, lastUpdatedAt: Date.now() });
            }
          }

          // Clear guest local storage once successfully merged into the account
          if (typeof window !== 'undefined') {
            try {
              localStorage.removeItem('vellora-cart-store');
              localStorage.removeItem('guest_cart_backup');
            } catch (err) {}
          }
        } catch (e) {
          console.error('Failed to sync cart with DB:', e);
        }
      },

      applyCouponCode: (code) => {
        const subtotal = get().getSubtotalPaise();
        const result = couponService.validate(code, subtotal);
        if (!result.valid || !result.coupon) {
          return { success: false, message: result.error || 'Invalid coupon code.' };
        }
        const c = result.coupon;
        let discountPaise = 0;
        if (c.discountPercent) {
          discountPaise = Math.round((subtotal * c.discountPercent) / 100);
        } else if (c.discountAmount) {
          discountPaise = Math.min(c.discountAmount, subtotal);
        }
        set({
          appliedCoupon: {
            code: c.code,
            discountAmount: discountPaise,
            description: c.description,
          },
        });
        return { success: true, message: `Coupon ${c.code} applied successfully!` };
      },

      removeCoupon: () => set({ appliedCoupon: null }),

      getSubtotalPaise: () => {
        return get().items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
      },

      getDiscountPaise: () => {
        return get().appliedCoupon?.discountAmount || 0;
      },

      getGstPaise: () => {
        // Compute itemized category-specific GST
        return get().items.reduce((sum, item) => {
          const lineTotal = item.product.price * item.quantity;
          const rate = item.product.gstRate || 18;
          return sum + Math.round((lineTotal * rate) / 100);
        }, 0);
      },

      getShippingPaise: () => {
        const subtotal = get().getSubtotalPaise();
        if (subtotal === 0 || subtotal >= 199900) return 0; // Free shipping over ₹1,999
        return 14900; // Flat ₹149 for standard shipping below ₹1,999
      },

      getGrandTotalPaise: () => {
        const sub = get().getSubtotalPaise();
        if (sub === 0) return 0;
        const discount = get().getDiscountPaise();
        const gst = get().getGstPaise();
        const ship = get().getShippingPaise();
        return Math.max(0, sub - discount + gst + ship);
      },

      getItemCount: () => {
        return get().items.reduce((sum, item) => sum + item.quantity, 0);
      },
    }),
    {
      name: 'vellora-cart-store',
      partialize: (state) => ({ items: state.items, appliedCoupon: state.appliedCoupon, lastUpdatedAt: state.lastUpdatedAt }),
      onRehydrateStorage: () => (state) => {
        if (!state) return;
        // Expire unauthenticated/guest carts older than 24 hours (86,400,000 ms)
        const EXPIRY_MS = 24 * 60 * 60 * 1000;
        if (state.lastUpdatedAt && Date.now() - state.lastUpdatedAt > EXPIRY_MS) {
          state.items = [];
          state.appliedCoupon = null;
          state.lastUpdatedAt = undefined;
        }
      },
    }
  )
);
