export interface ProductVariant {
  id: string;
  title: string;
  sku: string;
  attributes: Record<string, string>; // e.g. { size: 'M', color: 'Midnight Teal' }
  price: number; // in paise
  stock: number;
}

export interface ProductReview {
  id: string;
  userName: string;
  rating: number; // 1-5
  title: string;
  comment: string;
  date: string;
  verifiedPurchase: boolean;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  brand: string;
  shortDescription: string;
  longDescription: string;
  specifications: Record<string, string>;
  images: string[];
  mrp: number; // in paise (e.g. 149900 = ₹1,499)
  price: number; // in paise
  discountPercent: number;
  ratingAvg: number;
  ratingCount: number;
  stockQuantity: number;
  variants?: ProductVariant[];
  category: string; // top-level
  subCategory: string; // second-level
  clothingGender?: 'Men' | 'Women' | 'Kids';
  itemType?: string;
  tags: string[];
  createdAt: string;
  popularityScore: number;
  gstRate: number; // percentage e.g. 18 for electronics, 12 for apparel
}

export interface CategoryNode {
  name: string;
  slug: string;
  description?: string;
  image?: string;
  subCategories?: {
    name: string;
    slug: string;
    items?: string[];
  }[];
}

export interface UserAddress {
  id: string;
  name: string;
  contact: string;
  street: string;
  city: string;
  state: string;
  pincode: string;
  country: string;
  isDefault: boolean;
}

export interface UserProfile {
  id: string;
  userId: string; // login identifier
  name: string;
  email: string;
  contact: string;
  addresses: UserAddress[];
  savedTheme: 'light' | 'dark' | 'system';
}

export type OrderStatus =
  | 'PLACED'
  | 'CONFIRMED'
  | 'SHIPPED'
  | 'OUT_FOR_DELIVERY'
  | 'DELIVERED'
  | 'CANCELLED'
  | 'RETURNED';

export interface OrderItem {
  productId: string;
  productName: string;
  productImage: string;
  quantity: number;
  unitPrice: number; // paise
  variantName?: string;
}

export interface Order {
  id: string; // e.g. VEL-2611-000123
  userId: string;
  createdAt: string;
  status: OrderStatus;
  items: OrderItem[];
  subtotal: number; // paise
  discount: number; // paise
  gstAmount: number; // paise
  shippingFee: number; // paise
  grandTotal: number; // paise
  deliveryAddress: UserAddress;
  deliveryOption: 'Standard' | 'Express' | 'Scheduled';
  paymentMethod: 'Card' | 'NetBanking' | 'UPI' | 'Wallet' | 'COD';
  paymentMaskedId?: string; // e.g. "•••• 4242" or "alex@okaxis"
  trackingEvents: {
    status: OrderStatus;
    title: string;
    description: string;
    timestamp: string;
    completed: boolean;
  }[];
}

export interface Coupon {
  code: string;
  description: string;
  discountPercent?: number;
  discountAmount?: number; // paise
  minCartAmount: number; // paise
  forNewUserOnly?: boolean;
  expiresAt: string;
}

