import { PrismaClient, Role, StoreStatus, OrderStatus, PaymentMethod } from '@prisma/client';

const prisma = new PrismaClient();

const CATEGORIES = [
  { name: 'Electronics', slug: 'electronics', image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=600&auto=format&fit=crop&q=80' },
  { name: 'Audio & Acoustics', slug: 'audio', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&auto=format&fit=crop&q=80' },
  { name: 'Apparel & Fashion', slug: 'fashion', image: 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=600&auto=format&fit=crop&q=80' },
  { name: 'Footwear & Sneakers', slug: 'footwear', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&auto=format&fit=crop&q=80' },
  { name: 'Home & Living', slug: 'home-living', image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=600&auto=format&fit=crop&q=80' },
  { name: 'Smart Workspace', slug: 'workspace', image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=600&auto=format&fit=crop&q=80' },
  { name: 'Watches & Wearables', slug: 'wearables', image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&auto=format&fit=crop&q=80' },
  { name: 'Photography & Optics', slug: 'photography', image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=600&auto=format&fit=crop&q=80' },
  { name: 'Beauty & Wellness', slug: 'wellness', image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600&auto=format&fit=crop&q=80' },
  { name: 'Bags & Travel Gear', slug: 'travel-gear', image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&auto=format&fit=crop&q=80' },
  { name: 'Kitchen & Dining', slug: 'kitchen', image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=600&auto=format&fit=crop&q=80' },
  { name: 'Sports & Outdoors', slug: 'outdoors', image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=600&auto=format&fit=crop&q=80' },
];

const BRANDS = [
  { name: 'Aura Design', slug: 'aura-design' },
  { name: 'Nordic Craft', slug: 'nordic-craft' },
  { name: 'Vertex Labs', slug: 'vertex-labs' },
  { name: 'Studio Obsidian', slug: 'studio-obsidian' },
  { name: 'Nomad Goods', slug: 'nomad-goods' },
  { name: 'Kanso Living', slug: 'kanso-living' },
];

const STORES = [
  {
    name: 'Apex Studio',
    username: 'apexstudio',
    description: 'Purveyors of precision hardware, studio audio, and minimalist desk gear.',
    email: 'contact@apexstudio.io',
    contact: '+1 (555) 234-5678',
    address: '742 Evergreen Terrace, San Francisco, CA',
    logo: 'https://images.unsplash.com/photo-1572021335469-31706a17aaef?w=200&auto=format&fit=crop&q=80',
    banner: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=1200&auto=format&fit=crop&q=80',
  },
  {
    name: 'Atelier Monochrome',
    username: 'monochrome',
    description: 'High-end streetwear, technical outerwear, and accessories in monochrome palettes.',
    email: 'support@monochrome.style',
    contact: '+1 (555) 876-5432',
    address: '10 Mercer St, SoHo, New York, NY',
    logo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
    banner: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&auto=format&fit=crop&q=80',
  },
  {
    name: 'Lumina Tech Store',
    username: 'luminatech',
    description: 'Next-generation smart devices, display accessories, and ergonomics.',
    email: 'hello@luminastore.com',
    contact: '+1 (555) 345-6789',
    address: '400 Pine St, Seattle, WA',
    logo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
    banner: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=1200&auto=format&fit=crop&q=80',
  },
];

const PRODUCT_TEMPLATES = [
  {
    name: 'Spatial ANC Wireless Headphones',
    categorySlug: 'audio',
    mrp: 39900,
    price: 32900,
    images: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=800&auto=format&fit=crop&q=80',
    ],
    description: 'Custom titanium drivers, dynamic head tracking, and ultra-plush memory foam earcups with 40-hour battery life.',
  },
  {
    name: 'Precision Mechanical Keyboard 75%',
    categorySlug: 'workspace',
    mrp: 18900,
    price: 14900,
    images: [
      'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1595225476474-87563907a212?w=800&auto=format&fit=crop&q=80',
    ],
    description: 'CNC anodized aluminum body, pre-lubed tactile switches, gasket mounted acoustics, and hot-swappable PCB.',
  },
  {
    name: 'Titanium Minimalist Chronograph',
    categorySlug: 'wearables',
    mrp: 29900,
    price: 24900,
    images: [
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=800&auto=format&fit=crop&q=80',
    ],
    description: 'Aerospace-grade Grade 5 titanium, sapphire crystal with anti-reflective coating, and Italian vegetable-tanned leather strap.',
  },
  {
    name: 'Monochrome Runner Sneakers',
    categorySlug: 'footwear',
    mrp: 17500,
    price: 13500,
    images: [
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=800&auto=format&fit=crop&q=80',
    ],
    description: 'Breathable recycled knit upper, dual-density responsive foam midsole, and grippy rubber traction outsole.',
  },
  {
    name: 'Aerolite Waterproof Commuter Backpack 24L',
    categorySlug: 'travel-gear',
    mrp: 19900,
    price: 15900,
    images: [
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?w=800&auto=format&fit=crop&q=80',
    ],
    description: 'Weatherproof Cordura ballistic nylon, dedicated 16-inch fleece laptop compartment, and magnetic Fidlock buckles.',
  },
  {
    name: 'Solid Walnut Monitor Riser & Desk Shelf',
    categorySlug: 'workspace',
    mrp: 16000,
    price: 12500,
    images: [
      'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=800&auto=format&fit=crop&q=80',
    ],
    description: 'Hand-rubbed natural walnut timber, cork padded aluminum feet, and modular accessory trays.',
  },
  {
    name: 'Ceramic Pour-Over Coffee Brewer Set',
    categorySlug: 'kitchen',
    mrp: 8500,
    price: 6800,
    images: [
      'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=800&auto=format&fit=crop&q=80',
    ],
    description: 'Double-walled artisanal ceramic dripper, heat-resistant borosilicate glass server, and precision micro-mesh filter.',
  },
  {
    name: 'Studio Mirrorless 4K Camera Body',
    categorySlug: 'photography',
    mrp: 189900,
    price: 164900,
    images: [
      'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&auto=format&fit=crop&q=80',
    ],
    description: 'Full-frame 33MP BSI CMOS sensor, 5-axis in-body image stabilization, and dual native ISO recording.',
  },
];

export async function seedDatabase() {
  console.log('--- Starting GoCart Deterministic Seed (300+ Products) ---');

  // Seed Users
  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@gocart.com' },
    update: {},
    create: {
      name: 'GoCart Administrator',
      email: 'admin@gocart.com',
      role: Role.ADMIN,
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200',
    },
  });

  const sellerUser = await prisma.user.upsert({
    where: { email: 'seller@apexstudio.io' },
    update: {},
    create: {
      name: 'Apex Studio Lead',
      email: 'seller@apexstudio.io',
      role: Role.SELLER,
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200',
    },
  });

  const monochromeSeller = await prisma.user.upsert({
    where: { email: 'seller@monochrome.style' },
    update: {},
    create: {
      name: 'Atelier Monochrome Lead',
      email: 'seller@monochrome.style',
      role: Role.SELLER,
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200',
    },
  });

  const luminaSeller = await prisma.user.upsert({
    where: { email: 'seller@luminastore.com' },
    update: {},
    create: {
      name: 'Lumina Tech Lead',
      email: 'seller@luminastore.com',
      role: Role.SELLER,
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200',
    },
  });

  const buyerUser = await prisma.user.upsert({
    where: { email: 'buyer@example.com' },
    update: {},
    create: {
      name: 'Alex Rivera',
      email: 'buyer@example.com',
      role: Role.BUYER,
      image: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=200',
    },
  });

  // Seed Categories
  const categoryMap = new Map<string, string>();
  for (const cat of CATEGORIES) {
    const created = await prisma.category.upsert({
      where: { slug: cat.slug },
      update: { name: cat.name, image: cat.image },
      create: { name: cat.name, slug: cat.slug, image: cat.image },
    });
    categoryMap.set(cat.slug, created.id);
  }

  // Seed Brands
  const brandIds: string[] = [];
  for (const brand of BRANDS) {
    const created = await prisma.brand.upsert({
      where: { slug: brand.slug },
      update: { name: brand.name },
      create: { name: brand.name, slug: brand.slug },
    });
    brandIds.push(created.id);
  }

  // Seed Stores
  const createdStores: string[] = [];
  const storeOwners = [sellerUser, monochromeSeller, luminaSeller];
  for (let i = 0; i < STORES.length; i++) {
    const st = STORES[i];
    const u = storeOwners[i % storeOwners.length];
    const store = await prisma.store.upsert({
      where: { username: st.username },
      update: {
        name: st.name,
        description: st.description,
        status: StoreStatus.APPROVED,
        isActive: true,
      },
      create: {
        name: st.name,
        username: st.username,
        description: st.description,
        email: st.email,
        contact: st.contact,
        address: st.address,
        logo: st.logo,
        banner: st.banner,
        status: StoreStatus.APPROVED,
        isActive: true,
        userId: u.id,
      },
    });
    createdStores.push(store.id);
  }

  // Generate 300+ Products deterministically
  const totalProducts = 320;
  console.log(`Generating ${totalProducts} catalog products...`);

  for (let i = 1; i <= totalProducts; i++) {
    const template = PRODUCT_TEMPLATES[(i - 1) % PRODUCT_TEMPLATES.length];
    const catSlug = CATEGORIES[(i - 1) % CATEGORIES.length].slug;
    const categoryId = categoryMap.get(catSlug) || Array.from(categoryMap.values())[0];
    const storeId = createdStores[(i - 1) % createdStores.length];
    const brandId = brandIds[(i - 1) % brandIds.length];

    const variation = Math.floor((i - 1) / PRODUCT_TEMPLATES.length) + 1;
    const name = variation === 1 ? template.name : `${template.name} Series ${variation}`;
    const slug = `${template.categorySlug}-${name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${i}`;
    const price = Math.round(template.price * (0.8 + ((i * 7) % 50) / 100));
    const mrp = Math.round(price * 1.25);
    const inStock = i % 18 !== 0; // ~95% in stock

    await prisma.product.upsert({
      where: { slug },
      update: {
        price,
        mrp,
        inStock,
      },
      create: {
        name,
        slug,
        description: template.description,
        mrp,
        price,
        images: template.images,
        categoryId,
        brandId,
        storeId,
        inStock,
        stockCount: inStock ? 20 + (i % 60) : 0,
        soldCount: (i * 13) % 450,
        ratingAvg: Number((3.8 + ((i * 3) % 13) / 10).toFixed(1)),
        ratingCount: (i * 9) % 120 + 5,
        isFeatured: i <= 24,
      },
    });
  }

  // Seed Default Coupons
  const coupons = [
    { code: 'AURA10', description: '10% off storewide', discountPercent: 10, isPublic: true },
    { code: 'GOCART25', description: '25% off seasonal clearance', discountPercent: 25, isPublic: true },
    { code: 'WELCOME50', description: '$50 off on orders over $200', discountAmount: 5000, minCartAmount: 20000, forNewUser: true, isPublic: true },
  ];

  for (const c of coupons) {
    await prisma.coupon.upsert({
      where: { code: c.code },
      update: {},
      create: {
        code: c.code,
        description: c.description,
        discountPercent: c.discountPercent,
        discountAmount: c.discountAmount,
        minCartAmount: c.minCartAmount || 0,
        forNewUser: c.forNewUser || false,
        isPublic: c.isPublic,
        expiresAt: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
      },
    });
  }

  console.log('✅ Seed completed successfully: 320 products, categories, stores, users & coupons.');
}

if (require.main === module) {
  seedDatabase()
    .catch((e) => {
      console.error(e);
      process.exit(1);
    })
    .finally(async () => {
      await prisma.$disconnect();
    });
}

