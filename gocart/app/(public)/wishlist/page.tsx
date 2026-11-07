'use client';

import * as React from 'react';
import Link from 'next/link';
import { useWishlistStore } from '@/lib/stores/useWishlistStore';
import { ProductCard } from '@/components/catalog/ProductCard';
import { Heart, ShoppingBag, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function WishlistPage() {
  const { items, clearWishlist } = useWishlistStore();

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 text-center">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-[#EFECE6] text-[#D1495B] dark:bg-[#16363F]">
          <Heart className="h-10 w-10" />
        </div>
        <h1 className="mt-6 text-2xl font-bold font-serif text-[#0E4A57] dark:text-white">
          Your Wishlist is Empty
        </h1>
        <p className="mt-2 text-xs text-[#727B83] max-w-md mx-auto">
          Save your favorite products from consumer electronics, apparel, and furniture.
        </p>
        <Link href="/shop" className="mt-8 inline-block">
          <Button size="lg" className="bg-[#0E4A57] hover:bg-[#1E8C9B] text-white">
            Explore All Departments
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between border-b border-[#DFD9CE] pb-6 dark:border-[#224C57]">
        <div>
          <h1 className="text-3xl font-bold font-serif text-[#0E4A57] dark:text-white">
            Saved Wishlist ({items.length})
          </h1>
          <p className="mt-1 text-xs text-[#727B83]">
            Curated pieces saved for your private collection.
          </p>
        </div>
        <Button variant="ghost" size="sm" onClick={clearWishlist} className="text-[#D1495B] hover:text-[#D1495B]/80 font-bold">
          Clear All
        </Button>
      </div>

      <div className="mt-8 grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
        {items.map((prod) => (
          <ProductCard key={prod.id} product={prod} />
        ))}
      </div>
    </div>
  );
}
