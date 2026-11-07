'use client';

import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCompareStore } from '@/lib/stores/useCompareStore';
import { useCartStore } from '@/lib/stores/useCartStore';
import { formatINR } from '@/lib/utils';
import { X, ArrowRight, ShoppingBag, Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function ComparePage() {
  const { items, removeFromCompare, clearCompare } = useCompareStore();
  const { addItem } = useCartStore();

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 text-center">
        <h1 className="text-3xl font-bold font-serif text-[#0E4A57] dark:text-white">
          Product Comparison Tray is Empty
        </h1>
        <p className="mt-2 text-xs text-[#727B83] max-w-md mx-auto">
          Add up to 4 products from any department to compare specifications, ratings, and pricing side-by-side.
        </p>
        <Link href="/shop" className="mt-8 inline-block">
          <Button size="lg" className="bg-[#0E4A57] hover:bg-[#1E8C9B] text-white">
            Explore All Departments
          </Button>
        </Link>
      </div>
    );
  }

  // Collect all unique specification keys across selected items
  const allSpecKeys = Array.from(
    new Set(items.flatMap((item) => Object.keys(item.specifications || {})))
  );

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-[#DFD9CE] pb-6 dark:border-[#224C57] gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#1E8C9B] dark:text-[#D9B65F]">
            Side-by-Side Analysis
          </span>
          <h1 className="mt-1 text-3xl font-bold font-serif text-[#0E4A57] dark:text-white">
            Compare Products ({items.length}/4)
          </h1>
          <p className="mt-1 text-xs text-[#727B83]">
            Evaluate specifications, warranty coverage, and certified buyer ratings.
          </p>
        </div>
        <Button variant="ghost" size="sm" onClick={clearCompare} className="text-[#D1495B] font-bold">
          Clear Comparison
        </Button>
      </div>

      <div className="mt-8 overflow-x-auto">
        <table className="w-full min-w-[700px] border-collapse text-xs">
          <thead>
            <tr>
              <th className="p-4 w-48 text-left font-bold text-[#727B83] bg-[#F8F6F1] dark:bg-[#16363F] rounded-tl-2xl">
                Attribute
              </th>
              {items.map((prod) => (
                <th key={prod.id} className="p-4 text-left font-normal bg-white dark:bg-[#0F282F] border-l border-[#ECE8E0] dark:border-[#16363F]">
                  <div className="relative aspect-square w-full max-w-[140px] rounded-xl overflow-hidden bg-[#F8F6F1] mb-3">
                    <Image src={prod.images[0]} alt={prod.name} fill className="object-cover" />
                    <button
                      onClick={() => removeFromCompare(prod.id)}
                      className="absolute top-1 right-1 p-1 rounded-full bg-white/90 shadow text-[#727B83] hover:text-[#D1495B]"
                    >
                      <X className="h-3.5 w-3.5" />
                    </button>
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#1E8C9B] block">
                    {prod.brand}
                  </span>
                  <Link href={`/product/${prod.slug}`} className="font-bold text-xs text-[#2B2F33] dark:text-[#F8F6F1] hover:text-[#0E4A57] line-clamp-2 mt-0.5">
                    {prod.name}
                  </Link>
                  <p className="text-sm font-extrabold text-[#0E4A57] dark:text-[#D9B65F] mt-2">
                    {formatINR(prod.price)}
                  </p>
                  <Button
                    size="sm"
                    onClick={() => addItem(prod, 1)}
                    className="w-full mt-3 bg-[#0E4A57] hover:bg-[#1E8C9B] text-white text-[11px]"
                  >
                    <ShoppingBag className="mr-1.5 h-3.5 w-3.5 text-[#D9B65F]" />
                    Add to Bag
                  </Button>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-[#ECE8E0] dark:divide-[#16363F]">
            <tr>
              <td className="p-4 font-bold text-[#727B83] bg-[#F8F6F1] dark:bg-[#16363F]">Department</td>
              {items.map((prod) => (
                <td key={prod.id} className="p-4 bg-white dark:bg-[#0F282F] border-l border-[#ECE8E0] dark:border-[#16363F] font-semibold text-[#2B2F33] dark:text-[#DFD9CE]">
                  {prod.category} ({prod.subCategory})
                </td>
              ))}
            </tr>
            <tr>
              <td className="p-4 font-bold text-[#727B83] bg-[#F8F6F1] dark:bg-[#16363F]">Rating & Reviews</td>
              {items.map((prod) => (
                <td key={prod.id} className="p-4 bg-white dark:bg-[#0F282F] border-l border-[#ECE8E0] dark:border-[#16363F] text-[#2B2F33] dark:text-[#DFD9CE]">
                  ★ {prod.ratingAvg} / 5.0 ({prod.ratingCount} reviews)
                </td>
              ))}
            </tr>
            <tr>
              <td className="p-4 font-bold text-[#727B83] bg-[#F8F6F1] dark:bg-[#16363F]">Stock Status</td>
              {items.map((prod) => (
                <td key={prod.id} className="p-4 bg-white dark:bg-[#0F282F] border-l border-[#ECE8E0] dark:border-[#16363F]">
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                    prod.stockQuantity > 0 ? 'bg-[#EAF8F1] text-[#1F9D6B]' : 'bg-[#FBECEE] text-[#D1495B]'
                  }`}>
                    {prod.stockQuantity > 0 ? 'In Stock' : 'Out of Stock'}
                  </span>
                </td>
              ))}
            </tr>
            <tr>
              <td className="p-4 font-bold text-[#727B83] bg-[#F8F6F1] dark:bg-[#16363F]">GST Rate</td>
              {items.map((prod) => (
                <td key={prod.id} className="p-4 bg-white dark:bg-[#0F282F] border-l border-[#ECE8E0] dark:border-[#16363F] text-[#2B2F33] dark:text-[#DFD9CE]">
                  {prod.gstRate}% (Included in price)
                </td>
              ))}
            </tr>
            {allSpecKeys.map((key) => (
              <tr key={key}>
                <td className="p-4 font-bold text-[#727B83] bg-[#F8F6F1] dark:bg-[#16363F]">{key}</td>
                {items.map((prod) => (
                  <td key={prod.id} className="p-4 bg-white dark:bg-[#0F282F] border-l border-[#ECE8E0] dark:border-[#16363F] text-[#2B2F33] dark:text-[#DFD9CE]">
                    {prod.specifications?.[key] || '—'}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

