import { Product, CategoryNode, Coupon, Order, UserProfile } from '@/types/vellora';

export const CATEGORY_TREE: CategoryNode[] = [
  {
    name: 'Consumer Electronics',
    slug: 'consumer-electronics',
    description: 'Smartphones, laptops, high-fidelity audio and productivity accessories.',
    image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=800&auto=format&fit=crop&q=80',
    subCategories: [
      { name: 'Mobiles', slug: 'mobiles', items: ['Flagship Phones', 'Foldables', 'Budget Smartphones'] },
      { name: 'Laptops', slug: 'laptops', items: ['Ultrabooks', 'Gaming Rigs', 'Creator Workstations'] },
      { name: 'Accessories', slug: 'accessories', items: ['GaN Chargers', 'Docks', 'Keyboards', 'Mice'] },
      { name: 'Televisions', slug: 'televisions', items: ['OLED 4K', 'QLED', 'Mini-LED Displays'] },
      { name: 'Audio', slug: 'audio', items: ['ANC Headphones', 'True Wireless Earbuds', 'DACs & Amps'] },
    ],
  },
  {
    name: 'Clothing',
    slug: 'clothing',
    description: 'Curated menswear, womenswear and kids apparel tailored in premium natural textiles.',
    image: 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=800&auto=format&fit=crop&q=80',
    subCategories: [
      { name: 'Men', slug: 'men', items: ['Shirts', 'Trousers', 'Footwear', 'Outerwear', 'Accessories'] },
      { name: 'Women', slug: 'women', items: ['Dresses', 'Shirts & Tops', 'Trousers', 'Footwear', 'Accessories'] },
      { name: 'Kids', slug: 'kids', items: ['Casual Wear', 'Footwear', 'Everyday Essentials'] },
    ],
  },
  {
    name: 'Furniture',
    slug: 'furniture',
    description: 'Architectural minimalism for modern homes, ergonomic offices and outdoor patios.',
    image: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=800&auto=format&fit=crop&q=80',
    subCategories: [
      { name: 'Office', slug: 'office', items: ['Ergonomic Chairs', 'Standing Desks', 'Filing Credenzas'] },
      { name: 'Home', slug: 'home', items: ['Sofas & Lounges', 'Dining Tables', 'Platform Beds'] },
      { name: 'Outdoor', slug: 'outdoor', items: ['Teak Benches', 'Patio Dining Sets', 'Sun Loungers'] },
      { name: 'Storage', slug: 'storage', items: ['Modular Shelves', 'Wardrobes', 'Bookcases'] },
    ],
  },
  {
    name: 'Wellness & Hygiene',
    slug: 'wellness-hygiene',
    description: 'Dermatologist-formulated personal care, clinical health monitors, and daily wellness.',
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&auto=format&fit=crop&q=80',
    subCategories: [
      { name: 'Personal Care', slug: 'personal-care', items: ['Botanical Skincare', 'Hair Nutrition', 'Oral Care'] },
      { name: 'Fitness & Supplements', slug: 'fitness-supplements', items: ['Plant Protein', 'Vitamins & Minerals', 'Electrolytes'] },
      { name: 'Health Devices', slug: 'health-devices', items: ['Smart BP Monitors', 'Pulse Oximeters', 'Infrared Thermometers'] },
      { name: 'Hygiene Essentials', slug: 'hygiene-essentials', items: ['Organic Sanitizers', 'Air Purifier Filters', 'Eco Wipes'] },
    ],
  },
  {
    name: 'Others',
    slug: 'others',
    description: 'Artisanal kitchenware, design monographs, table games, and active sporting gear.',
    image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=800&auto=format&fit=crop&q=80',
    subCategories: [
      { name: 'Home Decor', slug: 'home-decor', items: ['Ceramic Vases', 'Linen Cushions', 'Ambient Lamps'] },
      { name: 'Kitchen & Dining', slug: 'kitchen-dining', items: ['Cast Iron Cookware', 'Chef Knives', 'Pour-Over Sets'] },
      { name: 'Books & Stationery', slug: 'books-stationery', items: ['Design Journals', 'Brass Pens', 'Hardcover Books'] },
      { name: 'Toys & Games', slug: 'toys-games', items: ['Wooden Puzzles', 'Mechanical Models', 'Board Games'] },
      { name: 'Sports & Outdoors', slug: 'sports-outdoors', items: ['Yoga Mats', 'Insulated Flasks', 'Trekking Packs'] },
    ],
  },
];

// Seed generator creating 260+ realistic products
export function generateSeedProducts(): Product[] {
  const baseTemplates = [
    // Consumer Electronics
    {
      name: 'Vellora Aura Spatial ANC Headphones',
      brand: 'Acoustics Studio',
      category: 'Consumer Electronics',
      subCategory: 'Audio',
      mrp: 3499000,
      price: 2799000,
      gstRate: 18,
      shortDescription: 'Custom 40mm titanium drivers, adaptive noise cancellation, 45h battery.',
      longDescription: 'Crafted with aerospace aluminum and plush memory foam earcups. Features dual custom-tuned 40mm titanium drivers and lossless LDAC transmission.',
      specifications: { Battery: '45 Hours', 'Driver Size': '40mm Titanium', Connectivity: 'Bluetooth 5.3 + 3.5mm Aux', Weight: '248g' },
      images: [
        'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=800&auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=800&auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1524678606370-a47ad25cb82a?w=800&auto=format&fit=crop&q=80',
      ],
      tags: ['audio', 'wireless', 'anc', 'flagship'],
    },
    {
      name: 'Vellora Horizon 15 OLED Creator Laptop',
      brand: 'Vertex Tech',
      category: 'Consumer Electronics',
      subCategory: 'Laptops',
      mrp: 14999000,
      price: 12999000,
      gstRate: 18,
      shortDescription: '15.6" 3.2K 120Hz OLED display, Core Ultra 9, 32GB LPDDR5X.',
      longDescription: 'Engineered for color-critical workflows. CNC unibody magnesium chassis, factory-calibrated 100% DCI-P3 OLED panel, and whisper-quiet vapor chamber cooling.',
      specifications: { Display: '15.6" 3.2K 120Hz OLED', RAM: '32GB LPDDR5X', Storage: '1TB Gen4 NVMe', Weight: '1.42 kg' },
      images: [
        'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=800&auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=800&auto=format&fit=crop&q=80',
      ],
      tags: ['laptop', 'oled', 'creator', 'ultrabook'],
    },
    {
      name: 'Vellora Tactile 75 Mechanical Keyboard',
      brand: 'Kanso Hardware',
      category: 'Consumer Electronics',
      subCategory: 'Accessories',
      mrp: 1899000,
      price: 1449000,
      gstRate: 18,
      shortDescription: 'Anodized CNC body, pre-lubed switches, hot-swappable gasket acoustics.',
      longDescription: 'A compact 75% layout offering full arrow cluster and function row without desk clutter. Poron acoustic foams and custom factory-lubricated switches.',
      specifications: { Layout: '75% Compact', Switch: 'Custom Pre-lubed Linear', Connectivity: 'Tri-mode (Type-C, 2.4GHz, BT 5.1)', Keycaps: 'Double-shot PBT Cherry' },
      images: [
        'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800&auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1595225476474-87563907a212?w=800&auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?w=800&auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?w=800&auto=format&fit=crop&q=80',
      ],
      tags: ['keyboard', 'mechanical', 'custom', 'desk'],
    },
    // Clothing
    {
      name: 'Organic Long-Staple Linen Overshirt',
      brand: 'Atelier Vellora',
      category: 'Clothing',
      subCategory: 'Men',
      clothingGender: 'Men' as const,
      itemType: 'Shirts',
      mrp: 599000,
      price: 449000,
      gstRate: 12,
      shortDescription: '100% French flax linen, relaxed silhouette, natural horn buttons.',
      longDescription: 'Breathable and garment-washed for a soft drape from day one. Perfect layered over a cotton crewneck during warm transitions.',
      specifications: { Material: '100% French Flax Linen', Fit: 'Relaxed Tailored', Wash: 'Enzyme Pre-washed', Care: 'Gentle Machine Wash' },
      images: [
        'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800&auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=800&auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1603252109303-2751441dd157?w=800&auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?w=800&auto=format&fit=crop&q=80',
      ],
      tags: ['linen', 'apparel', 'overshirt', 'summer'],
    },
    {
      name: 'Pleated Silk Blend Midi Dress',
      brand: 'Vellora Maison',
      category: 'Clothing',
      subCategory: 'Women',
      clothingGender: 'Women' as const,
      itemType: 'Dresses',
      mrp: 899000,
      price: 699000,
      gstRate: 12,
      shortDescription: 'Accordion pleats, tie-waist sash, breathable mulberry silk blend.',
      longDescription: 'A versatile midi dress featuring knife-pleated skirt flow and a refined boatneck cut. Transition from daytime studio to evening dinners effortlessly.',
      specifications: { Material: '65% Mulberry Silk, 35% Lyocell', Lining: '100% Organic Cotton', Length: 'Midi', Care: 'Dry Clean Recommended' },
      images: [
        'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=800&auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=800&auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=800&auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=800&auto=format&fit=crop&q=80',
      ],
      tags: ['dress', 'silk', 'women', 'evening'],
    },
    // Furniture
    {
      name: 'Vellora Aeroflow Ergonomic Executive Chair',
      brand: 'Nordic Workspaces',
      category: 'Furniture',
      subCategory: 'Office',
      mrp: 3299000,
      price: 2499000,
      gstRate: 18,
      shortDescription: 'Dynamic lumbar sync, breathable mesh, 4D magnetic armrests.',
      longDescription: 'Conforms to natural spine curvature. Features multi-angle synchronous tilt mechanism, pneumatic height adjustment and polished die-cast aluminum base.',
      specifications: { Mechanism: 'Synchro-Tilt 135°', Base: 'Die-cast Aluminum', WeightCapacity: '150 kg', Warranty: '10 Years' },
      images: [
        'https://images.unsplash.com/photo-1592078615290-033ee584e267?w=800&auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1505797149-43b0069ec26b?w=800&auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=800&auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&auto=format&fit=crop&q=80',
      ],
      tags: ['chair', 'ergonomic', 'office', 'furniture'],
    },
    {
      name: 'Solid Walnut Minimalist Dining Table (6-Seater)',
      brand: 'Kanso Living',
      category: 'Furniture',
      subCategory: 'Home',
      mrp: 6499000,
      price: 4999000,
      gstRate: 18,
      shortDescription: 'American black walnut, chamfered edge profile, natural hardwax oil finish.',
      longDescription: 'Crafted from sustainably sourced American Black Walnut with mortise-and-tenon joinery. Comfortably seats six with ample legroom.',
      specifications: { Wood: 'Solid American Black Walnut', Dimensions: '180 x 90 x 75 cm', Finish: 'Organic Zero-VOC Hardwax Oil', Capacity: '6 Seater' },
      images: [
        'https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?w=800&auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1530018607912-eff2daa1bac4?w=800&auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1577140917170-285929fb55b7?w=800&auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=800&auto=format&fit=crop&q=80',
      ],
      tags: ['dining', 'table', 'walnut', 'solid-wood'],
    },
    // Wellness & Hygiene
    {
      name: 'Botanical Ceramide Barrier Face Cream 50ml',
      brand: 'Botanica Lab',
      category: 'Wellness & Hygiene',
      subCategory: 'Personal Care',
      mrp: 249000,
      price: 189000,
      gstRate: 18,
      shortDescription: '5 essential bio-ceramides, centella asiatica, squalane lipid repair.',
      longDescription: 'Restores compromise moisture barriers within 48 hours. Fragrance-free, non-comedogenic formulation suitable for sensitive and post-treatment skin.',
      specifications: { Volume: '50ml / 1.7 fl oz', SkinType: 'All (Sensitive Safe)', KeyIngredients: 'Ceramides 1, 3, 6-II, Centella, Squalane', pH: '5.5 Balanced' },
      images: [
        'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=800&auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=800&auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=800&auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&auto=format&fit=crop&q=80',
      ],
      tags: ['skincare', 'ceramide', 'moisturizer', 'clean'],
    },
    {
      name: 'Clinical Precision Smart Blood Pressure Monitor',
      brand: 'Vitalis Health',
      category: 'Wellness & Hygiene',
      subCategory: 'Health Devices',
      mrp: 499000,
      price: 389000,
      gstRate: 12,
      shortDescription: 'FDA-cleared, one-touch reading, Bluetooth auto-sync to Apple Health.',
      longDescription: 'High-accuracy oscillometric measurement with irregular heartbeat detection. Backlit E-ink display with Bluetooth connectivity.',
      specifications: { Accuracy: '±3 mmHg', Memory: '2 Users x 100 Readings', Connectivity: 'Bluetooth 5.0 BLE', Battery: 'Rechargeable Type-C' },
      images: [
        'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=800&auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1584017911766-d451b3d0e843?w=800&auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&auto=format&fit=crop&q=80',
      ],
      tags: ['health', 'monitor', 'medical', 'smart'],
    },
    // Others
    {
      name: 'Artisanal Ceramic Pour-Over & Glass Server Set',
      brand: 'Kanso Living',
      category: 'Others',
      subCategory: 'Kitchen & Dining',
      mrp: 349000,
      price: 269000,
      gstRate: 18,
      shortDescription: 'Double-walled ceramic dripper, 600ml borosilicate carafe, wooden lid.',
      longDescription: 'Engineered for thermal stability and extraction clarity. Spiral internal ribs guide water flow for optimal brew saturation.',
      specifications: { Capacity: '600 ml', Carafe: 'Borosilicate Glass', Dripper: 'Matte Glazed Ceramic', FilterType: 'Standard 02 Cone' },
      images: [
        'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=800&auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1517256064527-09c73fc73e38?w=800&auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=800&auto=format&fit=crop&q=80',
      ],
      tags: ['coffee', 'ceramic', 'kitchen', 'artisanal'],
    },
    {
      name: 'Architectural Monograph Hardcover Journal Set',
      brand: 'Studio Vellora',
      category: 'Others',
      subCategory: 'Books & Stationery',
      mrp: 189000,
      price: 139000,
      gstRate: 12,
      shortDescription: '120gsm fountain-pen friendly paper, Smyth-sewn binding, linen spine.',
      longDescription: 'Designed for architects, writers, and sketch artists. Lays completely flat at 180 degrees with subtle 5mm dot grid and dual silk page markers.',
      specifications: { Pages: '192 Acid-Free Pages', PaperWeight: '120 gsm Munken Pure', Binding: 'Swiss Smyth Sewn', Extras: 'Expandable Inner Pocket' },
      images: [
        'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800&auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=800&auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?w=800&auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=800&auto=format&fit=crop&q=80',
      ],
      tags: ['stationery', 'journal', 'book', 'gift'],
    },
  ];

  const products: Product[] = [];
  const targetCount = 260;

  for (let i = 1; i <= targetCount; i++) {
    const templateIndex = (i - 1) % baseTemplates.length;
    const template = baseTemplates[templateIndex];
    const seriesNumber = Math.floor((i - 1) / baseTemplates.length) + 1;

    const name = seriesNumber === 1 ? template.name : `${template.name} Edition ${seriesNumber}`;
    const slug = `${name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${i}`;

    // Price variations (in paise)
    const priceVariance = ((i * 13) % 40) - 20; // -20% to +20%
    const basePrice = Math.round(template.price * (1 + priceVariance / 100));
    const baseMrp = Math.round(basePrice * 1.3);

    const stock = i % 19 === 0 ? 0 : 4 + ((i * 7) % 65);
    const rating = Number((4.1 + ((i * 7) % 9) / 10).toFixed(1));
    const ratingCount = 18 + ((i * 11) % 180);

    products.push({
      id: `vel-prod-${i}`,
      slug,
      name,
      brand: template.brand,
      shortDescription: template.shortDescription,
      longDescription: template.longDescription,
      specifications: { ...template.specifications } as unknown as Record<string, string>,
      images: template.images,
      mrp: baseMrp,
      price: basePrice,
      discountPercent: Math.round(((baseMrp - basePrice) / baseMrp) * 100),
      ratingAvg: rating,
      ratingCount,
      stockQuantity: stock,
      category: template.category,
      subCategory: template.subCategory,
      clothingGender: template.clothingGender,
      itemType: template.itemType,
      tags: template.tags,
      createdAt: new Date(Date.now() - i * 86400000).toISOString(),
      popularityScore: 1000 - i * 3,
      gstRate: template.gstRate,
      variants: [
        {
          id: `var-${i}-1`,
          title: 'Standard',
          sku: `VEL-${i}-STD`,
          attributes: { Edition: 'Standard' },
          price: basePrice,
          stock: Math.max(1, Math.floor(stock / 2)),
        },
        {
          id: `var-${i}-2`,
          title: 'Signature Gold Accent',
          sku: `VEL-${i}-GLD`,
          attributes: { Edition: 'Gold Accent' },
          price: Math.round(basePrice * 1.15),
          stock: Math.max(0, Math.floor(stock / 2)),
        },
      ],
    });
  }

  return products;
}

export const SEED_COUPONS: Coupon[] = [
  { code: 'VELLORA10', description: '10% off storewide on first purchase', discountPercent: 10, minCartAmount: 199900, forNewUserOnly: true, expiresAt: '2027-12-31' },
  { code: 'GOLDENFEST', description: '₹1,500 flat off on luxury orders above ₹9,999', discountAmount: 150000, minCartAmount: 999900, expiresAt: '2027-12-31' },
  { code: 'AURA15', description: '15% off audio & workspace hardware', discountPercent: 15, minCartAmount: 499900, expiresAt: '2027-12-31' },
  { code: 'HOMEREFRESH', description: '₹2,500 off on furniture orders above ₹19,999', discountAmount: 250000, minCartAmount: 1999900, expiresAt: '2027-12-31' },
  { code: 'FREESHIP', description: 'Complimentary expedited delivery on all orders', discountAmount: 25000, minCartAmount: 99900, expiresAt: '2027-12-31' },
];

export const DEMO_USERS: UserProfile[] = [
  {
    id: 'usr-1',
    userId: 'alex_vellora',
    name: 'Alex Rivera',
    email: 'alex.rivera@example.com',
    contact: '+91 98765 43210',
    savedTheme: 'system',
    addresses: [
      {
        id: 'addr-1',
        name: 'Alex Rivera (Home)',
        contact: '+91 98765 43210',
        street: '42, Lotus Boulevard, Indiranagar',
        city: 'Bengaluru',
        state: 'Karnataka',
        pincode: '560038',
        country: 'India',
        isDefault: true,
      },
      {
        id: 'addr-2',
        name: 'Alex Rivera (Studio)',
        contact: '+91 98765 43210',
        street: '7th Floor, Maker Chambers V, Nariman Point',
        city: 'Mumbai',
        state: 'Maharashtra',
        pincode: '400021',
        country: 'India',
        isDefault: false,
      },
    ],
  },
];
