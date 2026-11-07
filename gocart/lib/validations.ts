import { z } from 'zod';

export const productFilterSchema = z.object({
  query: z.string().optional(),
  category: z.string().optional(),
  brand: z.string().optional(),
  minPrice: z.coerce.number().optional(),
  maxPrice: z.coerce.number().optional(),
  minRating: z.coerce.number().optional(),
  inStock: z.enum(['true', 'false']).optional(),
  sort: z.enum(['featured', 'price-asc', 'price-desc', 'rating-desc', 'newest']).default('featured'),
  page: z.coerce.number().min(1).default(1),
  limit: z.coerce.number().min(1).max(100).default(24),
});

export type ProductFilterInput = z.infer<typeof productFilterSchema>;

export const addressSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  street: z.string().min(5, 'Street address is required'),
  city: z.string().min(2, 'City is required'),
  state: z.string().min(2, 'State is required'),
  zip: z.string().min(3, 'Postal code is required'),
  country: z.string().min(2, 'Country is required'),
  phone: z.string().min(8, 'Phone number is required'),
});

export type AddressInput = z.infer<typeof addressSchema>;

export const createStoreSchema = z.object({
  name: z.string().min(3, 'Store name must be at least 3 characters'),
  username: z.string().min(3, 'Username must be at least 3 characters').regex(/^[a-z0-9_-]+$/, 'Only lowercase letters, numbers, hyphens, and underscores'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  email: z.string().email('Invalid email'),
  contact: z.string().min(8, 'Contact phone is required'),
  address: z.string().min(5, 'Address is required'),
  logo: z.string().url('Logo must be a valid image URL').optional().or(z.literal('')),
});

export type CreateStoreInput = z.infer<typeof createStoreSchema>;

export const couponSchema = z.object({
  code: z.string().min(3, 'Coupon code must be at least 3 characters').toUpperCase(),
  description: z.string().min(5, 'Description is required'),
  discountPercent: z.number().min(1).max(90).optional(),
  discountAmount: z.number().min(1).optional(),
  minCartAmount: z.number().default(0),
  forNewUser: z.boolean().default(false),
  isPublic: z.boolean().default(true),
  usageLimit: z.number().min(1).default(500),
  expiresAt: z.string().or(z.date()),
});

export type CouponInput = z.infer<typeof couponSchema>;

