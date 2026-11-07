'use client';

import * as React from 'react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Input } from '@/components/ui/Input';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/Tabs';
import { Modal, ModalTrigger, ModalContent, ModalHeader, ModalTitle, ModalDescription } from '@/components/ui/Modal';
import { ProductCard } from '@/components/catalog/ProductCard';
import { generateSeedProducts } from '@/services/seedData';
import { Search, ShoppingBag, Sparkles } from 'lucide-react';
import { toast } from 'react-hot-toast';

export default function DesignSystemPage() {
  const sampleProducts = generateSeedProducts().slice(0, 4);

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="border-b border-[#DFD9CE] pb-8 dark:border-[#224C57]">
        <div className="flex items-center gap-2 mb-2">
          <Sparkles className="h-4 w-4 text-[#D9B65F]" />
          <span className="text-xs font-bold uppercase tracking-wider text-[#0E4A57] dark:text-[#D9B65F]">
            Vellora Aura Design System
          </span>
        </div>
        <h1 className="text-3xl font-bold font-serif text-[#0E4A57] dark:text-white sm:text-4xl">
          Living Component Showcase
        </h1>
        <p className="mt-2 text-xs text-[#727B83] max-w-2xl">
          Tokens, buttons, badges, forms, and product listing cards built for the Vellora General Shopping customer experience.
        </p>
      </div>

      <div className="mt-10 space-y-16">
        {/* Section: Buttons */}
        <section>
          <h2 className="text-lg font-bold font-serif text-[#0E4A57] dark:text-white mb-4">
            Buttons & Brand Actions
          </h2>
          <div className="flex flex-wrap items-center gap-4 p-6 rounded-2xl border border-[#DFD9CE] bg-white dark:border-[#224C57] dark:bg-[#0F282F]">
            <Button className="bg-[#0E4A57] hover:bg-[#1E8C9B] text-white" onClick={() => toast.success('Vellora button clicked')}>
              Primary Deep Teal
            </Button>
            <Button variant="secondary" className="bg-[#D9B65F] hover:bg-[#c29f4c] text-[#0A1D22] font-bold">
              Gold Accent CTA
            </Button>
            <Button variant="outline" className="border-[#DFD9CE] dark:border-[#224C57]">
              Outline Button
            </Button>
            <Button variant="ghost">Ghost Button</Button>
            <Button variant="danger">Danger</Button>
            <Button className="bg-[#0E4A57] text-white" isLoading>
              Authorizing
            </Button>
          </div>
        </section>

        {/* Section: Product Cards */}
        <section>
          <h2 className="text-lg font-bold font-serif text-[#0E4A57] dark:text-white mb-4">
            Catalog Product Cards
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
            {sampleProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
