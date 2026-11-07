'use client';

import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Sparkles, ShieldCheck, Truck, RotateCcw, Star, ChevronRight } from 'lucide-react';
import { motion } from 'motion/react';
import { Button } from '@/components/ui/Button';
import { ProductCard } from '@/components/catalog/ProductCard';
import { CATEGORY_TREE } from '@/services/seedData';
import { productService } from '@/services/velloraServices';
import { Product } from '@/types/vellora';
import { useAuthStore } from '@/lib/stores/useAuthStore';

import { CinematicEditorialHero } from '@/components/layout/CinematicEditorialHero';
import { AnimatedSectionHeading } from '@/components/ui/AnimatedSectionHeading';

export default function VelloraHomePage() {
  const { user, isAuthenticated } = useAuthStore();
  const [featuredProducts, setFeaturedProducts] = React.useState<Product[]>([]);
  const [trendingElectronics, setTrendingElectronics] = React.useState<Product[]>([]);
  const [trendingApparel, setTrendingApparel] = React.useState<Product[]>([]);

  React.useEffect(() => {
    productService.getAll().then((prods) => {
      setFeaturedProducts(prods.slice(0, 8));
      setTrendingElectronics(prods.filter((p) => p.category === 'Consumer Electronics').slice(0, 8));
      setTrendingApparel(prods.filter((p) => p.category === 'Clothing').slice(0, 8));
    });
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Smooth Cinematic Editorial Scroll Showcase */}
      <CinematicEditorialHero />

      {/* Department Grid Tiles */}
      <section className="py-16 bg-white dark:bg-[#0A1D22]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSectionHeading
            subtitle="Curated Collections"
            title="Shop by Department"
            description="Explore our handpicked catalog across certified technology, natural textiles, and interiors"
            action={
              <Link href="/shop" className="text-xs font-bold text-[#1E8C9B] hover:text-[#0E4A57] dark:text-[#D9B65F] flex items-center gap-1 group">
                <span>Browse all departments</span>
                <ChevronRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
              </Link>
            }
          />

          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {CATEGORY_TREE.map((cat, idx) => (
              <motion.div
                key={cat.slug}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.06 }}
              >
                <Link
                  href={`/category/${cat.slug}`}
                  className="group relative flex flex-col overflow-hidden rounded-2xl border border-[#DFD9CE] bg-[#F8F6F1] p-4 transition-all hover:border-[#1E8C9B] hover:shadow-lg dark:border-[#224C57] dark:bg-[#0F282F] h-full"
                >
                  <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-white mb-3 dark:bg-[#16363F]">
                    <Image
                      src={cat.image || ''}
                      alt={cat.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-108"
                    />
                  </div>
                  <h3 className="text-xs font-bold text-[#2B2F33] dark:text-[#F8F6F1] line-clamp-1">
                    {cat.name}
                  </h3>
                  <p className="text-[11px] text-[#727B83] line-clamp-1 mt-0.5">
                    {cat.subCategories?.length} sub-departments
                  </p>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-[#F8F6F1] dark:bg-[#0F282F]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSectionHeading
            subtitle="Top Certified"
            title="Featured Essentials"
            description="Verified for authentic manufacturer warranty, durability and mindful living"
            action={
              <Link href="/shop" className="text-xs font-bold text-[#1E8C9B] hover:text-[#0E4A57] dark:text-[#D9B65F] flex items-center gap-1 group">
                <span>View all products</span>
                <ChevronRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
              </Link>
            }
          />

          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
            {featuredProducts.map((p, idx) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.45, delay: (idx % 4) * 0.07 }}
              >
                <ProductCard product={p} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Trending Electronics */}
      <section className="py-16 bg-white dark:bg-[#0A1D22]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSectionHeading
            subtitle="High Precision Hardware"
            title="Trending in Consumer Electronics"
            description="Hi-Fi spatial audio, ultrabooks, mechanical inputs and premium productivity tools"
            action={
              <Link href="/category/consumer-electronics" className="text-xs font-bold text-[#1E8C9B] hover:text-[#0E4A57] dark:text-[#D9B65F] flex items-center gap-1 group">
                <span>Explore Electronics</span>
                <ChevronRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
              </Link>
            }
          />

          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
            {trendingElectronics.map((p, idx) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.45, delay: (idx % 4) * 0.07 }}
              >
                <ProductCard product={p} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Apparel Collection */}
      <section className="py-16 bg-[#F8F6F1] dark:bg-[#0F282F]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSectionHeading
            subtitle="Textile Excellence"
            title="Refined Apparel & Clothing"
            description="French flax linen, Supima cotton, and breathable tailoring crafted for comfort"
            action={
              <Link href="/category/clothing" className="text-xs font-bold text-[#1E8C9B] hover:text-[#0E4A57] dark:text-[#D9B65F] flex items-center gap-1 group">
                <span>Explore Clothing</span>
                <ChevronRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
              </Link>
            }
          />

          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
            {trendingApparel.map((p, idx) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.45, delay: (idx % 4) * 0.07 }}
              >
                <ProductCard product={p} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
