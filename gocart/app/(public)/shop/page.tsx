'use client';

import * as React from 'react';
import { Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { productService, categoryService } from '@/services/velloraServices';
import { Product, CategoryNode } from '@/types/vellora';
import { ProductCard } from '@/components/catalog/ProductCard';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { ArrowUpDown, SlidersHorizontal, Search, X } from 'lucide-react';
import { formatINR } from '@/lib/utils';

function CatalogContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('category') || '';
  const initialQuery = searchParams.get('q') || '';

  const [products, setProducts] = React.useState<Product[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [totalCount, setTotalCount] = React.useState(0);

  // Filter States
  const [search, setSearch] = React.useState(initialQuery);
  const [selectedCategory, setSelectedCategory] = React.useState(initialCategory);
  const [selectedBrand, setSelectedBrand] = React.useState('');
  const [inStockOnly, setInStockOnly] = React.useState(false);
  const [sort, setSort] = React.useState<'popularity' | 'price-asc' | 'price-desc' | 'rating' | 'newest'>('popularity');
  const [priceMax, setPriceMax] = React.useState<number>(15000000);

  const categories = categoryService.getTree();

  const fetchFilteredProducts = React.useCallback(async () => {
    setLoading(true);
    const res = await productService.query({
      search: search || undefined,
      category: selectedCategory || undefined,
      brand: selectedBrand || undefined,
      inStockOnly: inStockOnly || undefined,
      maxPrice: priceMax || undefined,
      sort,
      limit: 48,
    });
    setProducts(res.products);
    setTotalCount(res.total);
    setLoading(false);
  }, [search, selectedCategory, selectedBrand, inStockOnly, priceMax, sort]);

  React.useEffect(() => {
    fetchFilteredProducts();
  }, [fetchFilteredProducts]);

  const clearAllFilters = () => {
    setSearch('');
    setSelectedCategory('');
    setSelectedBrand('');
    setInStockOnly(false);
    setPriceMax(15000000);
    setSort('popularity');
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Title & Stats */}
      <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-[#DFD9CE] pb-6 dark:border-[#224C57] gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#1E8C9B] dark:text-[#D9B65F]">
            Vellora General Catalog
          </span>
          <h1 className="mt-1 text-3xl font-bold font-serif text-[#0E4A57] dark:text-white">
            {selectedCategory ? `${selectedCategory.replace(/-/g, ' ')}` : 'All Departments'}
          </h1>
          <p className="mt-1 text-xs text-[#727B83]">
            Showing {products.length} of {totalCount} certified products in stock.
          </p>
        </div>

        {/* Sort Trigger */}
        <div className="flex items-center gap-3">
          <label className="text-xs font-semibold text-[#727B83]">Sort by:</label>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as any)}
            className="rounded-xl border border-[#DFD9CE] bg-white px-3 py-2 text-xs font-semibold text-[#2B2F33] focus:border-[#1E8C9B] focus:outline-none dark:border-[#224C57] dark:bg-[#0F282F] dark:text-[#F8F6F1]"
          >
            <option value="popularity">Most Popular</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="rating">Highest Customer Rating</option>
            <option value="newest">Newest Arrivals</option>
          </select>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sticky Sidebar Filter */}
        <div className="space-y-6 rounded-2xl border border-[#DFD9CE] bg-white p-5 dark:border-[#224C57] dark:bg-[#0F282F] h-fit">
          <div className="flex items-center justify-between pb-3 border-b border-[#ECE8E0] dark:border-[#16363F]">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#0E4A57] dark:text-[#D9B65F] flex items-center gap-2">
              <SlidersHorizontal className="h-4 w-4" />
              Faceted Filters
            </h3>
            <button onClick={clearAllFilters} className="text-[11px] text-[#D1495B] hover:underline font-bold">
              Reset
            </button>
          </div>

          {/* Department filter */}
          <div>
            <h4 className="text-xs font-bold text-[#2B2F33] dark:text-[#F8F6F1] mb-2">Department</h4>
            <div className="space-y-1">
              <button
                onClick={() => setSelectedCategory('')}
                className={`block w-full text-left text-xs py-1 px-2 rounded-lg ${
                  selectedCategory === '' ? 'bg-[#EFECE6] font-bold text-[#0E4A57] dark:bg-[#16363F] dark:text-[#D9B65F]' : 'text-[#727B83] hover:text-[#2B2F33]'
                }`}
              >
                All Departments
              </button>
              {categories.map((c) => (
                <button
                  key={c.slug}
                  onClick={() => setSelectedCategory(c.name)}
                  className={`block w-full text-left text-xs py-1 px-2 rounded-lg ${
                    selectedCategory.toLowerCase() === c.name.toLowerCase()
                      ? 'bg-[#EFECE6] font-bold text-[#0E4A57] dark:bg-[#16363F] dark:text-[#D9B65F]'
                      : 'text-[#727B83] hover:text-[#2B2F33] dark:text-[#A2AAB0]'
                  }`}
                >
                  {c.name}
                </button>
              ))}
            </div>
          </div>

          {/* Max Price Range Slider */}
          <div className="pt-4 border-t border-[#ECE8E0] dark:border-[#16363F]">
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-xs font-bold text-[#2B2F33] dark:text-[#F8F6F1]">Max Price</h4>
              <span className="text-xs font-bold text-[#0E4A57] dark:text-[#D9B65F]">{formatINR(priceMax)}</span>
            </div>
            <input
              type="range"
              min={100000}
              max={15000000}
              step={200000}
              value={priceMax}
              onChange={(e) => setPriceMax(Number(e.target.value))}
              className="w-full accent-[#0E4A57]"
            />
          </div>

          {/* In Stock Toggle */}
          <div className="pt-4 border-t border-[#ECE8E0] dark:border-[#16363F] flex items-center justify-between">
            <span className="text-xs font-bold text-[#2B2F33] dark:text-[#F8F6F1]">In Stock Only</span>
            <input
              type="checkbox"
              checked={inStockOnly}
              onChange={(e) => setInStockOnly(e.target.checked)}
              className="h-4 w-4 rounded accent-[#0E4A57]"
            />
          </div>
        </div>

        {/* Product Cards Grid */}
        <div className="lg:col-span-3">
          {loading ? (
            <div className="py-24 text-center">
              <p className="text-xs font-bold text-[#727B83] animate-pulse">Filtering Vellora catalog...</p>
            </div>
          ) : products.length === 0 ? (
            <div className="py-24 text-center rounded-2xl border border-dashed border-[#DFD9CE] p-12">
              <h3 className="text-base font-bold text-[#2B2F33] dark:text-[#F8F6F1]">No products matched your criteria</h3>
              <p className="mt-1 text-xs text-[#727B83]">Try expanding your price range or clearing category filters.</p>
              <Button onClick={clearAllFilters} variant="outline" className="mt-4">
                Clear Filters
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
              {products.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function ShopCatalogPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-xs text-[#727B83]">Loading Vellora Catalog...</div>}>
      <CatalogContent />
    </Suspense>
  );
}
