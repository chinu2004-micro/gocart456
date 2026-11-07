import { prisma } from './prisma';

export interface ProductCatalogItem {
  id: string;
  name: string;
  slug: string;
  description: string;
  mrp: number; // in cents or dollars
  price: number;
  images: string[];
  category: { id: string; name: string; slug: string };
  store: { id: string; name: string; username: string };
  inStock: boolean;
  stockCount: number;
  ratingAvg: number;
  ratingCount: number;
  isFeatured: boolean;
}

// Fallback seed catalog if database server is not reachable during local static runs
export const FALLBACK_CATALOG: ProductCatalogItem[] = [
  {
    id: 'prod-1',
    name: 'Spatial ANC Wireless Headphones',
    slug: 'audio-spatial-anc-wireless-headphones-1',
    description: 'Custom titanium drivers, dynamic head tracking, and ultra-plush memory foam earcups with 40-hour battery life.',
    mrp: 399,
    price: 329,
    images: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=800&auto=format&fit=crop&q=80',
    ],
    category: { id: 'c-audio', name: 'Audio & Acoustics', slug: 'audio' },
    store: { id: 's-apex', name: 'Apex Studio', username: 'apexstudio' },
    inStock: true,
    stockCount: 45,
    ratingAvg: 4.8,
    ratingCount: 124,
    isFeatured: true,
  },
  {
    id: 'prod-2',
    name: 'Precision Mechanical Keyboard 75%',
    slug: 'workspace-precision-mechanical-keyboard-75-2',
    description: 'CNC anodized aluminum body, pre-lubed tactile switches, gasket mounted acoustics, and hot-swappable PCB.',
    mrp: 189,
    price: 149,
    images: [
      'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1595225476474-87563907a212?w=800&auto=format&fit=crop&q=80',
    ],
    category: { id: 'c-workspace', name: 'Smart Workspace', slug: 'workspace' },
    store: { id: 's-apex', name: 'Apex Studio', username: 'apexstudio' },
    inStock: true,
    stockCount: 30,
    ratingAvg: 4.9,
    ratingCount: 88,
    isFeatured: true,
  },
  {
    id: 'prod-3',
    name: 'Titanium Minimalist Chronograph',
    slug: 'wearables-titanium-minimalist-chronograph-3',
    description: 'Aerospace-grade Grade 5 titanium, sapphire crystal with anti-reflective coating, and Italian vegetable-tanned leather strap.',
    mrp: 299,
    price: 249,
    images: [
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop&q=80',
    ],
    category: { id: 'c-wearables', name: 'Watches & Wearables', slug: 'wearables' },
    store: { id: 's-mono', name: 'Atelier Monochrome', username: 'monochrome' },
    inStock: true,
    stockCount: 18,
    ratingAvg: 4.7,
    ratingCount: 52,
    isFeatured: true,
  },
  {
    id: 'prod-4',
    name: 'Monochrome Runner Sneakers',
    slug: 'footwear-monochrome-runner-sneakers-4',
    description: 'Breathable recycled knit upper, dual-density responsive foam midsole, and grippy rubber traction outsole.',
    mrp: 175,
    price: 135,
    images: [
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&auto=format&fit=crop&q=80',
    ],
    category: { id: 'c-footwear', name: 'Footwear & Sneakers', slug: 'footwear' },
    store: { id: 's-mono', name: 'Atelier Monochrome', username: 'monochrome' },
    inStock: true,
    stockCount: 60,
    ratingAvg: 4.6,
    ratingCount: 94,
    isFeatured: true,
  },
  {
    id: 'prod-5',
    name: 'Aerolite Waterproof Commuter Backpack 24L',
    slug: 'travel-gear-aerolite-waterproof-commuter-backpack-24l-5',
    description: 'Weatherproof Cordura ballistic nylon, dedicated 16-inch fleece laptop compartment, and magnetic Fidlock buckles.',
    mrp: 199,
    price: 159,
    images: [
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&auto=format&fit=crop&q=80',
    ],
    category: { id: 'c-travel', name: 'Bags & Travel Gear', slug: 'travel-gear' },
    store: { id: 's-lumina', name: 'Lumina Tech Store', username: 'luminatech' },
    inStock: true,
    stockCount: 25,
    ratingAvg: 4.8,
    ratingCount: 67,
    isFeatured: true,
  },
  {
    id: 'prod-6',
    name: 'Solid Walnut Monitor Riser & Desk Shelf',
    slug: 'workspace-solid-walnut-monitor-riser-desk-shelf-6',
    description: 'Hand-rubbed natural walnut timber, cork padded aluminum feet, and modular accessory trays.',
    mrp: 160,
    price: 125,
    images: [
      'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=800&auto=format&fit=crop&q=80',
    ],
    category: { id: 'c-workspace', name: 'Smart Workspace', slug: 'workspace' },
    store: { id: 's-apex', name: 'Apex Studio', username: 'apexstudio' },
    inStock: true,
    stockCount: 14,
    ratingAvg: 4.9,
    ratingCount: 42,
    isFeatured: true,
  },
  {
    id: 'prod-7',
    name: 'Ceramic Pour-Over Coffee Brewer Set',
    slug: 'kitchen-ceramic-pour-over-coffee-brewer-set-7',
    description: 'Double-walled artisanal ceramic dripper, heat-resistant borosilicate glass server, and precision micro-mesh filter.',
    mrp: 85,
    price: 68,
    images: [
      'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=800&auto=format&fit=crop&q=80',
    ],
    category: { id: 'c-kitchen', name: 'Kitchen & Dining', slug: 'kitchen' },
    store: { id: 's-lumina', name: 'Lumina Tech Store', username: 'luminatech' },
    inStock: true,
    stockCount: 80,
    ratingAvg: 4.5,
    ratingCount: 39,
    isFeatured: false,
  },
  {
    id: 'prod-8',
    name: 'Studio Mirrorless 4K Camera Body',
    slug: 'photography-studio-mirrorless-4k-camera-body-8',
    description: 'Full-frame 33MP BSI CMOS sensor, 5-axis in-body image stabilization, and dual native ISO recording.',
    mrp: 1899,
    price: 1649,
    images: [
      'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&auto=format&fit=crop&q=80',
    ],
    category: { id: 'c-photo', name: 'Photography & Optics', slug: 'photography' },
    store: { id: 's-apex', name: 'Apex Studio', username: 'apexstudio' },
    inStock: true,
    stockCount: 10,
    ratingAvg: 4.9,
    ratingCount: 28,
    isFeatured: true,
  },
];

// Helper to query products with DB priority and in-memory fallback
export async function getProducts(options?: {
  categorySlug?: string;
  featured?: boolean;
  search?: string;
  limit?: number;
}) {
  try {
    const where: any = {};
    if (options?.featured) where.isFeatured = true;
    if (options?.categorySlug) where.category = { slug: options.categorySlug };
    if (options?.search) {
      where.OR = [
        { name: { contains: options.search, mode: 'insensitive' } },
        { description: { contains: options.search, mode: 'insensitive' } },
      ];
    }

    const dbProducts = await prisma.product.findMany({
      where,
      take: options?.limit || 50,
      include: {
        category: true,
        store: true,
      },
      orderBy: { createdAt: 'desc' },
    });

    if (dbProducts && dbProducts.length > 0) {
      return dbProducts.map((p) => ({
        id: p.id,
        name: p.name,
        slug: p.slug,
        description: p.description,
        mrp: p.mrp / 100,
        price: p.price / 100,
        images: p.images,
        category: { id: p.category.id, name: p.category.name, slug: p.category.slug },
        store: { id: p.store.id, name: p.store.name, username: p.store.username },
        inStock: p.inStock,
        stockCount: p.stockCount,
        ratingAvg: p.ratingAvg,
        ratingCount: p.ratingCount,
        isFeatured: p.isFeatured,
      }));
    }
  } catch (err) {
    // If DB is offline, fall back gracefully
  }

  // Filter fallback catalog
  let filtered = [...FALLBACK_CATALOG];
  if (options?.featured) filtered = filtered.filter((p) => p.isFeatured);
  if (options?.categorySlug) filtered = filtered.filter((p) => p.category.slug === options.categorySlug);
  if (options?.search) {
    const q = options.search.toLowerCase();
    filtered = filtered.filter((p) => p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q));
  }
  return filtered.slice(0, options?.limit || 50);
}

export async function getProductBySlugOrId(slugOrId: string) {
  try {
    const p = await prisma.product.findFirst({
      where: {
        OR: [{ slug: slugOrId }, { id: slugOrId }],
      },
      include: {
        category: true,
        store: true,
        reviews: {
          include: { user: true },
          orderBy: { createdAt: 'desc' },
        },
      },
    });

    if (p) {
      return {
        id: p.id,
        name: p.name,
        slug: p.slug,
        description: p.description,
        mrp: p.mrp / 100,
        price: p.price / 100,
        images: p.images,
        category: { id: p.category.id, name: p.category.name, slug: p.category.slug },
        store: { id: p.store.id, name: p.store.name, username: p.store.username },
        inStock: p.inStock,
        stockCount: p.stockCount,
        ratingAvg: p.ratingAvg,
        ratingCount: p.ratingCount,
        isFeatured: p.isFeatured,
      };
    }
  } catch (err) {
    // Fallback
  }

  return FALLBACK_CATALOG.find((p) => p.slug === slugOrId || p.id === slugOrId) || FALLBACK_CATALOG[0];
}

