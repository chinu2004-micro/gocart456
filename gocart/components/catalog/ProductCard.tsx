'use client';

import * as React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Heart, ShoppingBag, Eye, Star, Layers } from 'lucide-react';
import { motion } from 'motion/react';
import { cn, formatINR, calculateDiscount } from '@/lib/utils';
import { useCartStore } from '@/lib/stores/useCartStore';
import { useWishlistStore } from '@/lib/stores/useWishlistStore';
import { useCompareStore } from '@/lib/stores/useCompareStore';
import { Badge } from '@/components/ui/Badge';
import { Product } from '@/types/vellora';
import { toast } from 'react-hot-toast';

export interface ProductCardProps {
  product: Product;
  className?: string;
}

export function ProductCard({ product, className }: ProductCardProps) {
  const { addItem } = useCartStore();
  const { isInWishlist, toggleItem } = useWishlistStore();
  const { addToCompare, isInCompare } = useCompareStore();
  const [isHovered, setIsHovered] = React.useState(false);

  const isFavorited = isInWishlist(product.id);
  const inCompare = isInCompare(product.id);
  const discount = calculateDiscount(product.mrp, product.price);
  const primaryImage = product.images?.[0] || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800';
  const secondaryImage = product.images?.[1] || primaryImage;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product, 1);
    toast.success(`${product.name} added to your bag`);
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const added = toggleItem(product);
    if (added) {
      toast.success('Saved to wishlist');
    } else {
      toast('Removed from wishlist');
    }
  };

  const handleCompareClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const res = addToCompare(product);
    if (res.success) {
      toast.success(res.message);
    } else {
      toast.error(res.message);
    }
  };

  const productUrl = `/product/${product.slug}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.22 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cn(
        'group relative flex flex-col overflow-hidden rounded-2xl border border-[#DFD9CE] bg-white transition-all duration-300 hover:border-[#1E8C9B] hover:shadow-xl hover:shadow-[#0E4A57]/10 dark:border-[#224C57] dark:bg-[#0F282F] dark:hover:border-[#D9B65F]',
        className
      )}
    >
      {/* Product Image Area */}
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#F8F6F1] dark:bg-[#16363F]">
        <Link href={productUrl} className="relative block h-full w-full">
          <Image
            src={isHovered ? secondaryImage : primaryImage}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-cover object-center transition-all duration-500 ease-out group-hover:scale-105"
          />
        </Link>

        {/* Badges */}
        <div className="absolute left-3 top-3 flex flex-col gap-1.5 z-10">
          {discount > 0 && (
            <span className="rounded-full bg-[#0E4A57] px-2.5 py-0.5 text-[10px] font-bold text-[#D9B65F] shadow-sm">
              {discount}% OFF
            </span>
          )}
          {product.stockQuantity === 0 ? (
            <span className="rounded-full bg-[#D1495B] px-2.5 py-0.5 text-[10px] font-bold text-white shadow-sm">
              Out of Stock
            </span>
          ) : product.stockQuantity < 5 ? (
            <span className="rounded-full bg-[#E0A526] px-2.5 py-0.5 text-[10px] font-bold text-white shadow-sm">
              Only {product.stockQuantity} left
            </span>
          ) : null}
        </div>

        {/* Wishlist & Compare Buttons */}
        <div className="absolute right-3 top-3 z-10 flex flex-col gap-1.5">
          <button
            onClick={handleToggleWishlist}
            aria-label="Wishlist"
            className={cn(
              'flex h-8 w-8 items-center justify-center rounded-full bg-white/90 shadow-md backdrop-blur-sm transition-transform duration-200 hover:scale-110 active:scale-95 dark:bg-[#0A1D22]/90',
              isFavorited ? 'text-[#D1495B]' : 'text-[#727B83] hover:text-[#D1495B] dark:text-[#DFD9CE]'
            )}
          >
            <Heart className={cn('h-3.5 w-3.5 transition-colors', isFavorited && 'fill-[#D1495B]')} />
          </button>

          <button
            onClick={handleCompareClick}
            aria-label="Compare"
            title="Add to Compare"
            className={cn(
              'flex h-8 w-8 items-center justify-center rounded-full bg-white/90 shadow-md backdrop-blur-sm transition-transform duration-200 hover:scale-110 active:scale-95 dark:bg-[#0A1D22]/90',
              inCompare ? 'text-[#0E4A57] font-bold' : 'text-[#727B83] hover:text-[#0E4A57] dark:text-[#DFD9CE]'
            )}
          >
            <Layers className="h-3.5 w-3.5" />
          </button>
        </div>

        {/* Floating Quick Action Overlay */}
        <div className="absolute inset-x-3 bottom-3 z-10 hidden items-center gap-2 transition-all duration-300 md:flex translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100">
          <button
            onClick={handleAddToCart}
            disabled={product.stockQuantity === 0}
            className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#0E4A57] py-2.5 text-xs font-semibold text-white shadow-md backdrop-blur-md transition-all hover:bg-[#1E8C9B] disabled:opacity-50"
          >
            <ShoppingBag className="h-3.5 w-3.5 text-[#D9B65F]" />
            Add to Bag
          </button>
        </div>
      </div>

      {/* Product Details */}
      <div className="flex flex-1 flex-col p-2.5 sm:p-4">
        <div className="flex items-center justify-between text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider text-[#727B83] dark:text-[#A2AAB0]">
          <span className="truncate max-w-[50%]">{product.brand}</span>
          <span className="truncate max-w-[45%] text-right">{product.subCategory}</span>
        </div>

        <Link
          href={productUrl}
          className="mt-1 text-xs sm:text-sm font-bold text-[#2B2F33] hover:text-[#0E4A57] transition-colors line-clamp-1 dark:text-[#F8F6F1] dark:hover:text-[#D9B65F]"
        >
          {product.name}
        </Link>

        {/* Rating and Reviews */}
        <div className="mt-1 flex items-center gap-1">
          <div className="flex items-center text-[#E0A526]">
            <Star className="h-3 w-3 sm:h-3.5 sm:w-3.5 fill-[#E0A526]" />
            <span className="ml-1 text-[11px] sm:text-xs font-bold text-[#2B2F33] dark:text-[#F8F6F1]">
              {product.ratingAvg}
            </span>
          </div>
          <span className="text-[10px] sm:text-xs text-[#727B83] dark:text-[#A2AAB0]">
            ({product.ratingCount})
          </span>
        </div>

        {/* Pricing in INR */}
        <div className="mt-2 flex flex-wrap items-baseline gap-1.5 sm:gap-2">
          <span className="text-sm sm:text-base font-extrabold text-[#0E4A57] dark:text-[#D9B65F]">
            {formatINR(product.price)}
          </span>
          {product.mrp > product.price && (
            <span className="text-[10px] sm:text-xs text-[#A2AAB0] line-through">
              {formatINR(product.mrp)}
            </span>
          )}
        </div>

        {/* Mobile Quick Add */}
        <div className="mt-2.5 block md:hidden">
          <button
            onClick={handleAddToCart}
            disabled={product.stockQuantity === 0}
            className="flex w-full items-center justify-center gap-1.5 rounded-xl bg-[#0E4A57] py-1.5 sm:py-2 text-[11px] sm:text-xs font-semibold text-white transition-all disabled:opacity-50"
          >
            <ShoppingBag className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-[#D9B65F]" />
            Add to Bag
          </button>
        </div>
      </div>
    </motion.div>
  );
}
