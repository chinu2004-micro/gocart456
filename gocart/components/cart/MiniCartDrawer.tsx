'use client';

import * as React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { X, Plus, Minus, Trash2, ArrowRight, ShoppingBag, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useCartStore } from '@/lib/stores/useCartStore';
import { formatINR } from '@/lib/utils';
import { Button } from '@/components/ui/Button';

export function MiniCartDrawer() {
  const {
    isOpen,
    closeCart,
    items,
    removeItem,
    updateQuantity,
    getSubtotalPaise,
    getItemCount,
  } = useCartStore();

  const subtotal = getSubtotalPaise();
  const itemCount = getItemCount();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
          />

          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 300 }}
            className="fixed inset-y-0 right-0 z-50 flex w-full max-w-md flex-col bg-[#F8F6F1] shadow-2xl dark:bg-[#0A1D22] border-l border-[#DFD9CE] dark:border-[#224C57]"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-[#DFD9CE] px-6 py-4 dark:border-[#224C57]">
              <div className="flex items-center gap-2">
                <ShoppingBag className="h-5 w-5 text-[#0E4A57] dark:text-[#D9B65F]" />
                <h2 className="text-base font-bold font-serif text-[#0E4A57] dark:text-white">
                  Shopping Bag
                </h2>
                <span className="rounded-full bg-[#EFECE6] px-2 py-0.5 text-xs font-bold text-[#0E4A57] dark:bg-[#16363F] dark:text-[#D9B65F]">
                  {itemCount}
                </span>
              </div>
              <button
                onClick={closeCart}
                className="rounded-full p-1.5 text-[#727B83] hover:bg-[#EFECE6] dark:hover:bg-[#16363F]"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-3">
              {items.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center text-center py-12">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#EFECE6] text-[#0E4A57] dark:bg-[#16363F] dark:text-[#D9B65F]">
                    <ShoppingBag className="h-8 w-8" />
                  </div>
                  <h3 className="mt-4 text-base font-bold text-[#2B2F33] dark:text-[#F8F6F1]">
                    Your shopping bag is empty
                  </h3>
                  <p className="mt-1 text-xs text-[#727B83] max-w-xs">
                    Explore curated departments across consumer electronics, fine apparel, and architectural furniture.
                  </p>
                  <Button onClick={closeCart} variant="outline" className="mt-6">
                    Explore Departments
                  </Button>
                </div>
              ) : (
                items.map((item) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="flex gap-4 rounded-2xl border border-[#DFD9CE] bg-white p-3 dark:border-[#224C57] dark:bg-[#0F282F]"
                  >
                    <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-[#F8F6F1] dark:bg-[#16363F]">
                      <Image
                        src={item.product.images[0]}
                        alt={item.product.name}
                        fill
                        className="object-cover"
                      />
                    </div>

                    <div className="flex flex-1 flex-col justify-between">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h4 className="text-xs font-bold text-[#2B2F33] line-clamp-1 dark:text-[#F8F6F1]">
                            {item.product.name}
                          </h4>
                          <p className="text-[10px] text-[#727B83] dark:text-[#A2AAB0]">
                            {item.product.brand}
                          </p>
                        </div>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-[#A2AAB0] hover:text-[#D1495B]"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>

                      <div className="mt-2 flex items-center justify-between">
                        <div className="flex items-center rounded-lg border border-[#DFD9CE] bg-[#F8F6F1] dark:border-[#224C57] dark:bg-[#16363F]">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-1 text-[#727B83] hover:text-[#2B2F33] dark:hover:text-white"
                          >
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className="w-6 text-center text-xs font-bold text-[#2B2F33] dark:text-[#F8F6F1]">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-1 text-[#727B83] hover:text-[#2B2F33] dark:hover:text-white"
                          >
                            <Plus className="h-3 w-3" />
                          </button>
                        </div>
                        <span className="text-xs font-bold text-[#0E4A57] dark:text-[#D9B65F]">
                          {formatINR(item.product.price * item.quantity)}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            {/* Footer Summary & Checkout CTA */}
            {items.length > 0 && (
              <div className="border-t border-[#DFD9CE] bg-white p-6 dark:border-[#224C57] dark:bg-[#0F282F]">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs text-[#727B83]">Subtotal</span>
                  <span className="text-lg font-bold text-[#0E4A57] dark:text-[#D9B65F]">
                    {formatINR(subtotal)}
                  </span>
                </div>
                <p className="mb-4 text-[11px] text-[#727B83]">
                  Taxes (GST) and shipping calculated at checkout.
                </p>
                <div className="space-y-2">
                  <Link
                    href="/checkout"
                    onClick={closeCart}
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#0E4A57] py-3.5 text-xs font-bold text-white shadow-lg shadow-[#0E4A57]/20 transition-all hover:bg-[#1E8C9B]"
                  >
                    Proceed to Checkout
                    <ArrowRight className="h-4 w-4 text-[#D9B65F]" />
                  </Link>
                  <Link
                    href="/cart"
                    onClick={closeCart}
                    className="flex w-full items-center justify-center rounded-xl border border-[#DFD9CE] py-3 text-xs font-semibold text-[#2B2F33] hover:bg-[#EFECE6] dark:border-[#224C57] dark:text-[#DFD9CE] dark:hover:bg-[#16363F]"
                  >
                    View Full Shopping Bag
                  </Link>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
