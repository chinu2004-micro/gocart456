import { Product, CategoryNode, Coupon, Order, UserProfile, UserAddress } from '@/types/vellora';
import { generateSeedProducts, CATEGORY_TREE, SEED_COUPONS, DEMO_USERS } from './seedData';
import { IMPORTED_PRODUCTS } from './importedData';

// In-memory + persistent localStorage cache
let cachedProducts: Product[] | null = null;
let cachedOrders: Order[] | null = null;
let currentUser: UserProfile | null = DEMO_USERS[0];

const delay = (ms = 250) => new Promise((resolve) => setTimeout(resolve, ms));

function getStoredProducts(): Product[] {
  if (cachedProducts) return cachedProducts;
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem('vellora_products_cache_v3');
    if (saved) {
      try {
        cachedProducts = JSON.parse(saved);
        return cachedProducts!;
      } catch (e) {}
    }
  }
  const baseProducts = generateSeedProducts();
  cachedProducts = [...baseProducts, ...IMPORTED_PRODUCTS];
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem('vellora_products_cache_v3', JSON.stringify(cachedProducts));
    } catch (e) {
      // quota or private mode fallback
    }
  }
  return cachedProducts;
}

export const productService = {
  async getAll(): Promise<Product[]> {
    await delay(120);
    return getStoredProducts();
  },

  async getBySlug(slug: string): Promise<Product | null> {
    await delay(100);
    const products = getStoredProducts();
    return products.find((p) => p.slug === slug || p.id === slug) || null;
  },

  async query(options: {
    search?: string;
    category?: string;
    subCategory?: string;
    clothingGender?: string;
    brand?: string;
    minPrice?: number;
    maxPrice?: number;
    minRating?: number;
    inStockOnly?: boolean;
    sort?: 'price-asc' | 'price-desc' | 'popularity' | 'rating' | 'newest';
    page?: number;
    limit?: number;
  }): Promise<{ products: Product[]; total: number; page: number; totalPages: number }> {
    await delay(150);
    let items = [...getStoredProducts()];

    if (options.search) {
      const q = options.search.toLowerCase().trim();
      items = items.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.subCategory.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q))
      );
    }

    if (options.category) {
      const cat = options.category.toLowerCase().replace(/-/g, ' ');
      items = items.filter((p) => p.category.toLowerCase().includes(cat) || p.subCategory.toLowerCase().includes(cat));
    }

    if (options.subCategory) {
      const sub = options.subCategory.toLowerCase().replace(/-/g, ' ');
      items = items.filter((p) => p.subCategory.toLowerCase().includes(sub));
    }

    if (options.clothingGender) {
      items = items.filter((p) => p.clothingGender?.toLowerCase() === options.clothingGender?.toLowerCase());
    }

    if (options.brand) {
      items = items.filter((p) => p.brand.toLowerCase() === options.brand?.toLowerCase());
    }

    if (options.minPrice !== undefined) {
      items = items.filter((p) => p.price >= options.minPrice!);
    }

    if (options.maxPrice !== undefined) {
      items = items.filter((p) => p.price <= options.maxPrice!);
    }

    if (options.minRating !== undefined) {
      items = items.filter((p) => p.ratingAvg >= options.minRating!);
    }

    if (options.inStockOnly) {
      items = items.filter((p) => p.stockQuantity > 0);
    }

    // Sort
    switch (options.sort) {
      case 'price-asc':
        items.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        items.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        items.sort((a, b) => b.ratingAvg - a.ratingAvg);
        break;
      case 'newest':
        items.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
      case 'popularity':
      default:
        items.sort((a, b) => b.popularityScore - a.popularityScore);
        break;
    }

    const page = options.page || 1;
    const limit = options.limit || 24;
    const start = (page - 1) * limit;
    const paginated = items.slice(start, start + limit);

    return {
      products: paginated,
      total: items.length,
      page,
      totalPages: Math.ceil(items.length / limit),
    };
  },
};

export const categoryService = {
  getTree(): CategoryNode[] {
    return CATEGORY_TREE;
  },
  getBySlug(slug: string): CategoryNode | undefined {
    return CATEGORY_TREE.find((c) => c.slug === slug);
  },
};

export const couponService = {
  validate(code: string, cartSubtotalPaise: number): { valid: boolean; coupon?: Coupon; error?: string } {
    const clean = code.trim().toUpperCase();
    const found = SEED_COUPONS.find((c) => c.code === clean);
    if (!found) return { valid: false, error: 'Invalid promotional coupon code.' };
    if (cartSubtotalPaise < found.minCartAmount) {
      return {
        valid: false,
        error: `Requires minimum cart order of ₹${(found.minCartAmount / 100).toLocaleString('en-IN')}`,
      };
    }
    return { valid: true, coupon: found };
  },
};

export const orderService = {
  getOrders(): Order[] {
    if (cachedOrders) return cachedOrders;
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('vellora_orders');
      if (saved) {
        try {
          cachedOrders = JSON.parse(saved);
          return cachedOrders!;
        } catch (e) {}
      }
    }
    // Do not show hardcoded fake orders
    cachedOrders = [];
    return cachedOrders;
  },

  createOrder(orderData: Omit<Order, 'id' | 'createdAt' | 'trackingEvents'>): Order {
    const newId = `VEL-2611-000${Math.floor(100 + Math.random() * 900)}`;
    const newOrder: Order = {
      ...orderData,
      id: newId,
      createdAt: new Date().toISOString(),
      trackingEvents: [
        { status: 'PLACED', title: 'Order Placed', description: 'Payment confirmed and order reserved', timestamp: 'Just now', completed: true },
        { status: 'CONFIRMED', title: 'Order Confirmed', description: 'Warehouse allocating items', timestamp: 'Estimated within 2h', completed: false },
        { status: 'SHIPPED', title: 'Shipped', description: 'Handed to premium courier', timestamp: 'Estimated tomorrow', completed: false },
        { status: 'OUT_FOR_DELIVERY', title: 'Out for Delivery', description: 'Final local leg delivery', timestamp: 'Estimated in 2 days', completed: false },
        { status: 'DELIVERED', title: 'Delivered', description: 'Package receipt confirmation', timestamp: 'Estimated in 3 days', completed: false },
      ],
    };

    const current = this.getOrders();
    cachedOrders = [newOrder, ...current];
    if (typeof window !== 'undefined') {
      localStorage.setItem('vellora_orders', JSON.stringify(cachedOrders));
    }
    return newOrder;
  },

  getOrderById(id: string): Order | undefined {
    return this.getOrders().find((o) => o.id === id);
  },

  cancelOrder(id: string): boolean {
    const orders = this.getOrders();
    const target = orders.find((o) => o.id === id);
    if (target && target.status === 'PLACED') {
      target.status = 'CANCELLED';
      if (typeof window !== 'undefined') {
        localStorage.setItem('vellora_orders', JSON.stringify(orders));
      }
      return true;
    }
    return false;
  },

  requestReturn(id: string): boolean {
    const orders = this.getOrders();
    const target = orders.find((o) => o.id === id);
    if (target && target.status === 'DELIVERED') {
      target.status = 'RETURNED';
      if (typeof window !== 'undefined') {
        localStorage.setItem('vellora_orders', JSON.stringify(orders));
      }
      return true;
    }
    return false;
  },
};

export const userService = {
  getCurrentUser(): UserProfile | null {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('vellora_auth_user');
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch (e) {}
      }
    }
    return currentUser;
  },

  updateProfile(data: Partial<UserProfile>): UserProfile {
    const current = this.getCurrentUser() || DEMO_USERS[0];
    const updated = { ...current, ...data };
    currentUser = updated;
    if (typeof window !== 'undefined') {
      localStorage.setItem('vellora_auth_user', JSON.stringify(updated));
    }
    return updated;
  },

  addAddress(address: Omit<UserAddress, 'id'>): UserAddress {
    const current = this.getCurrentUser() || DEMO_USERS[0];
    const newAddr: UserAddress = {
      ...address,
      id: `addr-${Date.now()}`,
    };
    if (newAddr.isDefault) {
      current.addresses.forEach((a) => (a.isDefault = false));
    }
    current.addresses.push(newAddr);
    this.updateProfile({ addresses: current.addresses });
    return newAddr;
  },

  deleteAddress(id: string) {
    const current = this.getCurrentUser();
    if (!current) return;
    const remaining = current.addresses.filter((a) => a.id !== id);
    this.updateProfile({ addresses: remaining });
  },
};

