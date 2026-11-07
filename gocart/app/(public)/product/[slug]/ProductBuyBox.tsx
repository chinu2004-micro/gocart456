'use client';

import * as React from 'react';
import { ShoppingBag, Heart, Plus, Minus, Check, Zap } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { useCartStore } from '@/lib/stores/useCartStore';
import { useWishlistStore } from '@/lib/stores/useWishlistStore';
import { Product } from '@/types/vellora';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';

export function ProductBuyBox({ product }: { product: Product }) {
  const router = useRouter();
  const [quantity, setQuantity] = React.useState(1);
  const [selectedVariant, setSelectedVariant] = React.useState<string>(
    product.variants?.[0]?.title || 'Standard'
  );

  const { addItem } = useCartStore();
  const { isInWishlist, toggleItem } = useWishlistStore();

  const isFavorited = isInWishlist(product.id);

  const handleAddToCart = () => {
    addItem(product, quantity, selectedVariant);
    toast.success(`${quantity}x ${product.name} added to your bag!`);
  };

  const handleBuyNow = () => {
    addItem(product, quantity, selectedVariant);
    router.push('/checkout');
  };

  const handleToggleWishlist = () => {
    const added = toggleItem(product);
    if (added) {
      toast.success('Saved to wishlist');
    } else {
      toast('Removed from wishlist');
    }
  };

  return (
    <div className="space-y-4 pt-2">
      {/* Variant Selector */}
      {product.variants && product.variants.length > 1 && (
        <div>
          <label className="block text-xs font-bold text-[#2B2F33] dark:text-[#F8F6F1] mb-2">
            Select Edition
          </label>
          <div className="flex flex-wrap gap-2">
            {product.variants.map((v) => (
              <button
                key={v.id}
                onClick={() => setSelectedVariant(v.title)}
                className={`rounded-xl border px-3 py-1.5 text-xs font-semibold transition-all ${
                  selectedVariant === v.title
                    ? 'border-[#0E4A57] bg-[#0E4A57] text-white dark:border-[#D9B65F] dark:bg-[#D9B65F] dark:text-[#0A1D22]'
                    : 'border-[#DFD9CE] bg-white text-[#2B2F33] hover:border-[#1E8C9B] dark:border-[#224C57] dark:bg-[#0F282F] dark:text-[#DFD9CE]'
                }`}
              >
                {v.title}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Quantity Selector */}
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold text-[#2B2F33] dark:text-[#DFD9CE]">Quantity</span>
        <div className="flex items-center rounded-xl border border-[#DFD9CE] bg-[#F8F6F1] dark:border-[#224C57] dark:bg-[#16363F]">
          <button
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            className="p-2 text-[#727B83] hover:text-[#2B2F33] dark:hover:text-white"
          >
            <Minus className="h-3.5 w-3.5" />
          </button>
          <span className="w-8 text-center text-xs font-bold text-[#2B2F33] dark:text-[#F8F6F1]">
            {quantity}
          </span>
          <button
            onClick={() => setQuantity((q) => q + 1)}
            className="p-2 text-[#727B83] hover:text-[#2B2F33] dark:hover:text-white"
          >
            <Plus className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3 pt-2">
        <Button
          size="lg"
          onClick={handleAddToCart}
          disabled={product.stockQuantity === 0}
          className="flex-1 bg-[#0E4A57] hover:bg-[#1E8C9B] text-white shadow-lg shadow-[#0E4A57]/20"
        >
          <ShoppingBag className="mr-2 h-4 w-4 text-[#D9B65F]" />
          {product.stockQuantity > 0 ? 'Add to Bag' : 'Out of Stock'}
        </Button>

        <Button
          size="lg"
          variant="secondary"
          onClick={handleBuyNow}
          disabled={product.stockQuantity === 0}
          className="bg-[#D9B65F] hover:bg-[#c29f4c] text-[#0A1D22] font-bold"
        >
          <Zap className="mr-1.5 h-4 w-4" />
          Buy Now
        </Button>

        <button
          onClick={handleToggleWishlist}
          aria-label="Wishlist"
          className={`flex h-12 w-12 items-center justify-center rounded-xl border border-[#DFD9CE] bg-white transition-all hover:bg-[#EFECE6] dark:border-[#224C57] dark:bg-[#0F282F] ${
            isFavorited ? 'text-[#D1495B] border-[#D1495B]/30' : 'text-[#727B83]'
          }`}
        >
          <Heart className={`h-5 w-5 ${isFavorited ? 'fill-[#D1495B]' : ''}`} />
        </button>
      </div>
    </div>
  );
}
