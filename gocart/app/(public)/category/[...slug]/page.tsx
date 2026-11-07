import * as React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { productService, categoryService } from '@/services/velloraServices';
import { ProductCard } from '@/components/catalog/ProductCard';
import { ArrowLeft, ChevronRight, SlidersHorizontal } from 'lucide-react';

interface CategorySlugPageProps {
  params: Promise<{
    slug: string[];
  }>;
}

export default async function MultiLevelCategoryPage({ params }: CategorySlugPageProps) {
  const resolved = await params;
  const slugSegments = resolved.slug || [];

  const topSlug = slugSegments[0] || 'consumer-electronics';
  const subSlug = slugSegments[1];

  const categoryNode = categoryService.getBySlug(topSlug);
  const categoryName = categoryNode?.name || topSlug.replace(/-/g, ' ');

  const res = await productService.query({
    category: categoryName,
    subCategory: subSlug ? subSlug.replace(/-/g, ' ') : undefined,
    limit: 48,
  });

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Breadcrumb Path */}
      <div className="mb-6 flex items-center gap-2 text-xs text-[#727B83] dark:text-[#A2AAB0]">
        <Link href="/shop" className="hover:text-[#0E4A57] dark:hover:text-[#D9B65F]">
          Departments
        </Link>
        <span>/</span>
        <span className="font-bold text-[#0E4A57] dark:text-[#D9B65F]">{categoryName}</span>
        {subSlug && (
          <>
            <span>/</span>
            <span className="font-semibold text-[#1E8C9B]">{subSlug.replace(/-/g, ' ')}</span>
          </>
        )}
      </div>

      {/* Department Title */}
      <div className="border-b border-[#DFD9CE] pb-6 dark:border-[#224C57]">
        <h1 className="text-3xl font-bold font-serif text-[#0E4A57] dark:text-white capitalize">
          {subSlug ? `${subSlug.replace(/-/g, ' ')} in ${categoryName}` : categoryName}
        </h1>
        <p className="mt-1 text-xs text-[#727B83]">
          {categoryNode?.description || `Showing curated products in ${categoryName}`}
        </p>
      </div>

      {/* Subcategory Filter Pills */}
      {categoryNode?.subCategories && (
        <div className="my-6 flex items-center gap-2 overflow-x-auto pb-2">
          <Link
            href={`/category/${topSlug}`}
            className={`rounded-xl px-4 py-2 text-xs font-bold transition-all whitespace-nowrap ${
              !subSlug
                ? 'bg-[#0E4A57] text-white'
                : 'bg-white border border-[#DFD9CE] text-[#727B83] hover:text-[#2B2F33] dark:bg-[#0F282F] dark:border-[#224C57]'
            }`}
          >
            All {categoryName}
          </Link>
          {categoryNode.subCategories.map((sub) => (
            <Link
              key={sub.slug}
              href={`/category/${topSlug}/${sub.slug}`}
              className={`rounded-xl px-4 py-2 text-xs font-bold transition-all whitespace-nowrap ${
                subSlug === sub.slug
                  ? 'bg-[#0E4A57] text-white'
                  : 'bg-white border border-[#DFD9CE] text-[#727B83] hover:text-[#2B2F33] dark:bg-[#0F282F] dark:border-[#224C57]'
              }`}
            >
              {sub.name}
            </Link>
          ))}
        </div>
      )}

      {/* Products Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6 mt-6">
        {res.products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
}

