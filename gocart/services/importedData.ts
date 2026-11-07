import { Product } from '@/types/vellora';
import importedRaw from './importedProducts.json';

export const IMPORTED_PRODUCTS: Product[] = (importedRaw as unknown as Product[]).map((p, idx) => ({
  ...p,
  variants: [
    {
      id: `var-imp-${idx}-1`,
      title: 'Standard',
      sku: `IMP-${p.id}-STD`,
      attributes: { Edition: 'Standard' },
      price: p.price,
      stock: Math.max(1, Math.floor(p.stockQuantity / 2)),
    },
    {
      id: `var-imp-${idx}-2`,
      title: 'Vellora Care Package',
      sku: `IMP-${p.id}-PRM`,
      attributes: { Edition: 'Care Package' },
      price: Math.round(p.price * 1.08),
      stock: Math.max(1, Math.floor(p.stockQuantity / 2)),
    },
  ],
}));

