'use client';

import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCartStore } from '@/lib/stores/useCartStore';
import { formatINR } from '@/lib/utils';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag, Tag, Sparkles } from 'lucide-react';
import { toast } from 'react-hot-toast';

export default function CartPage() {
  const {
    items,
    removeItem,
    updateQuantity,
    getSubtotalPaise,
    getDiscountPaise,
    getGstPaise,
    getShippingPaise,
    getGrandTotalPaise,
    appliedCoupon,
    applyCouponCode,
    removeCoupon,
  } = useCartStore();

  const [couponInput, setCouponInput] = React.useState('');

  const subtotal = getSubtotalPaise();
  const discount = getDiscountPaise();
  const gst = getGstPaise();
  const shipping = getShippingPaise();
  const grandTotal = getGrandTotalPaise();

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput.trim()) return;
    const res = applyCouponCode(couponInput.trim());
    if (res.success) {
      toast.success(res.message);
      setCouponInput('');
    } else {
      toast.error(res.message);
    }
  };

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 text-center">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-[#EFECE6] text-[#0E4A57] dark:bg-[#16363F] dark:text-[#D9B65F]">
          <ShoppingBag className="h-10 w-10" />
        </div>
        <h1 className="mt-6 text-2xl font-bold font-serif text-[#0E4A57] dark:text-white">
          Your Shopping Bag is Empty
        </h1>
        <p className="mt-2 text-xs text-[#727B83] max-w-md mx-auto">
          Explore our certified catalog of consumer electronics, apparel, and furniture.
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
      <h1 className="text-3xl font-bold font-serif text-[#0E4A57] dark:text-white mb-8">
        Shopping Bag ({items.length} {items.length === 1 ? 'item' : 'items'})
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Cart Item Rows */}
        <div className="lg:col-span-8 space-y-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 rounded-2xl border border-[#DFD9CE] bg-white p-5 dark:border-[#224C57] dark:bg-[#0F282F] shadow-sm"
            >
              <div className="flex items-center gap-4">
                <div className="relative h-20 w-20 sm:h-24 sm:w-24 shrink-0 overflow-hidden rounded-xl bg-[#F8F6F1] dark:bg-[#16363F]">
                  <Image
                    src={item.product.images[0]}
                    alt={item.product.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#1E8C9B] dark:text-[#D9B65F]">
                    {item.product.brand}
                  </span>
                  <h3 className="font-bold text-[#2B2F33] dark:text-[#F8F6F1] line-clamp-1">
                    {item.product.name}
                  </h3>
                  {item.selectedVariant && (
                    <p className="text-xs text-[#727B83]">Edition: {item.selectedVariant}</p>
                  )}
                  <p className="mt-1 text-sm font-extrabold text-[#0E4A57] dark:text-[#D9B65F]">
                    {formatINR(item.product.price)}
                  </p>
                </div>
              </div>

              {/* Counter & Subtotal */}
              <div className="flex w-full sm:w-auto items-center justify-between sm:justify-end gap-6 pt-3 sm:pt-0 border-t sm:border-t-0 border-[#ECE8E0] dark:border-[#16363F]">
                <div className="flex items-center rounded-xl border border-[#DFD9CE] bg-[#F8F6F1] dark:border-[#224C57] dark:bg-[#16363F]">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="p-1.5 text-[#727B83] hover:text-[#2B2F33] dark:hover:text-white"
                  >
                    <Minus className="h-3.5 w-3.5" />
                  </button>
                  <span className="w-8 text-center text-xs font-bold text-[#2B2F33] dark:text-[#F8F6F1]">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="p-1.5 text-[#727B83] hover:text-[#2B2F33] dark:hover:text-white"
                  >
                    <Plus className="h-3.5 w-3.5" />
                  </button>
                </div>

                <span className="text-sm font-extrabold text-[#0E4A57] dark:text-[#D9B65F] min-w-[80px] text-right">
                  {formatINR(item.product.price * item.quantity)}
                </span>

                <button
                  onClick={() => removeItem(item.id)}
                  className="rounded-lg p-2 text-[#A2AAB0] hover:bg-[#EFECE6] hover:text-[#D1495B] dark:hover:bg-[#16363F]"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary & Taxes */}
        <div className="lg:col-span-4">
          <div className="rounded-3xl border border-[#DFD9CE] bg-white p-6 shadow-sm dark:border-[#224C57] dark:bg-[#0F282F] space-y-6">
            <h2 className="text-base font-bold font-serif text-[#0E4A57] dark:text-white">
              Price Details & Taxes
            </h2>

            {/* Coupon Code Input */}
            <form onSubmit={handleApplyCoupon} className="flex gap-2">
              <Input
                placeholder="Promo Code (e.g. VELLORA10)"
                value={couponInput}
                onChange={(e) => setCouponInput(e.target.value)}
                className="h-10 text-xs"
              />
              <Button type="submit" variant="secondary" className="h-10 text-xs font-bold">
                Apply
              </Button>
            </form>

            {appliedCoupon && (
              <div className="flex items-center justify-between rounded-xl bg-[#EAF8F1] p-3 text-xs text-[#1F9D6B] font-semibold">
                <div className="flex items-center gap-1.5">
                  <Tag className="h-3.5 w-3.5" />
                  <span>{appliedCoupon.code} applied (-{formatINR(appliedCoupon.discountAmount)})</span>
                </div>
                <button onClick={removeCoupon} className="font-bold underline hover:text-[#0E4A57]">
                  Remove
                </button>
              </div>
            )}

            {/* Price Calculations */}
            <div className="space-y-3 pt-4 border-t border-[#ECE8E0] dark:border-[#16363F] text-xs">
              <div className="flex justify-between text-[#727B83]">
                <span>Items Subtotal</span>
                <span>{formatINR(subtotal)}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-[#1F9D6B] font-bold">
                  <span>Coupon Discount</span>
                  <span>-{formatINR(discount)}</span>
                </div>
              )}
              <div className="flex justify-between text-[#727B83]">
                <span>Applicable GST (Category-wise)</span>
                <span>{formatINR(gst)}</span>
              </div>
              <div className="flex justify-between text-[#727B83]">
                <span>Delivery Charge</span>
                <span className={shipping === 0 ? 'text-[#1F9D6B] font-bold' : ''}>
                  {shipping === 0 ? 'Free' : formatINR(shipping)}
                </span>
              </div>

              <div className="flex justify-between border-t border-[#ECE8E0] pt-4 text-base font-extrabold text-[#0E4A57] dark:border-[#16363F] dark:text-[#D9B65F]">
                <span>Grand Total</span>
                <span>{formatINR(grandTotal)}</span>
              </div>
            </div>

            <Link href="/checkout" className="block w-full">
              <Button size="lg" className="w-full bg-[#0E4A57] hover:bg-[#1E8C9B] text-white shadow-xl shadow-[#0E4A57]/25">
                Proceed to Checkout ({formatINR(grandTotal)})
                <ArrowRight className="ml-2 h-4 w-4 text-[#D9B65F]" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
