'use client';

import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCompareStore } from '@/lib/stores/useCompareStore';
import { formatINR } from '@/lib/utils';
import { Layers, X, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export function CompareTrayFloating() {
  const { items, removeFromCompare, clearCompare } = useCompareStore();

  if (items.length === 0) return null;

  return (
    <div className="fixed bottom-4 right-4 z-40 max-w-md w-full rounded-2xl border border-[#DFD9CE] bg-white p-4 shadow-2xl dark:border-[#224C57] dark:bg-[#0A1D22]">
      <div className="flex items-center justify-between pb-2 border-b border-[#ECE8E0] dark:border-[#16363F]">
        <div className="flex items-center gap-2">
          <Layers className="h-4 w-4 text-[#0E4A57] dark:text-[#D9B65F]" />
          <span className="text-xs font-bold text-[#0E4A57] dark:text-white">
            Compare Tray ({items.length}/4)
          </span>
        </div>
        <button onClick={clearCompare} className="text-[11px] text-[#727B83] hover:text-[#D1495B]">
          Clear
        </button>
      </div>

      <div className="flex items-center gap-3 py-3 overflow-x-auto">
        {items.map((prod) => (
          <div key={prod.id} className="relative h-14 w-14 shrink-0 rounded-lg overflow-hidden border border-[#DFD9CE] bg-[#F8F6F1]">
            <Image src={prod.images[0]} alt={prod.name} fill className="object-cover" />
            <button
              onClick={() => removeFromCompare(prod.id)}
              className="absolute top-0.5 right-0.5 bg-black/70 text-white rounded-full p-0.5"
            >
              <X className="h-2.5 w-2.5" />
            </button>
          </div>
        ))}
      </div>

      <Link href="/compare">
        <Button size="sm" className="w-full bg-[#0E4A57] hover:bg-[#1E8C9B] text-white text-xs">
          Compare Specifications ({items.length})
          <ArrowRight className="ml-1.5 h-3.5 w-3.5 text-[#D9B65F]" />
        </Button>
      </Link>
    </div>
  );
}

