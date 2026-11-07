import * as React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { productService } from '@/services/velloraServices';
import { formatINR, calculateDiscount } from '@/lib/utils';
import { Star, ShieldCheck, Truck, RotateCcw, Heart, ArrowLeft, Sparkles } from 'lucide-react';
import { ProductBuyBox } from './ProductBuyBox';
import { ProductCard } from '@/components/catalog/ProductCard';

interface ProductDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
  const resolved = await params;
  const product = await productService.getBySlug(resolved.slug);

  if (!product) {
    notFound();
  }

  const discount = calculateDiscount(product.mrp, product.price);
  const allProducts = await productService.getAll();
  const related = allProducts.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Breadcrumb Path */}
      <div className="mb-6 flex items-center gap-2 text-xs text-[#727B83] dark:text-[#A2AAB0]">
        <Link href="/shop" className="hover:text-[#0E4A57] dark:hover:text-[#D9B65F] flex items-center gap-1">
          <ArrowLeft className="h-3.5 w-3.5" />
          Catalog
        </Link>
        <span>/</span>
        <Link href={`/category/${product.category.toLowerCase().replace(/\s+/g, '-')}`} className="hover:text-[#0E4A57] dark:hover:text-[#D9B65F]">
          {product.category}
        </Link>
        <span>/</span>
        <span className="font-semibold text-[#0E4A57] dark:text-[#D9B65F] truncate max-w-xs">{product.name}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left Column: Image Gallery */}
        <div className="lg:col-span-7 space-y-4">
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl border border-[#DFD9CE] bg-white dark:border-[#224C57] dark:bg-[#0F282F]">
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              priority
              className="object-cover"
            />
            {discount > 0 && (
              <div className="absolute top-4 left-4">
                <span className="rounded-full bg-[#0E4A57] px-3.5 py-1 text-xs font-bold text-[#D9B65F] shadow-md">
                  Save {discount}%
                </span>
              </div>
            )}
          </div>

          {/* Thumbnails */}
          {product.images.length > 1 && (
            <div className="grid grid-cols-4 gap-3">
              {product.images.map((img, idx) => (
                <div
                  key={idx}
                  className="relative aspect-square overflow-hidden rounded-xl border border-[#DFD9CE] bg-white dark:border-[#224C57] dark:bg-[#0F282F] hover:border-[#1E8C9B] cursor-pointer"
                >
                  <Image src={img} alt={`${product.name} ${idx}`} fill className="object-cover" />
                </div>
              ))}
            </div>
          )}

          {/* Specifications Table */}
          <div className="pt-8 border-t border-[#DFD9CE] dark:border-[#224C57]">
            <h3 className="text-base font-bold font-serif text-[#0E4A57] dark:text-white mb-4">
              Detailed Specifications
            </h3>
            <div className="overflow-hidden rounded-2xl border border-[#DFD9CE] dark:border-[#224C57]">
              <table className="w-full text-xs">
                <tbody className="divide-y divide-[#ECE8E0] dark:divide-[#16363F]">
                  {Object.entries(product.specifications).map(([key, val]) => (
                    <tr key={key} className="bg-white dark:bg-[#0F282F]">
                      <td className="py-3 px-4 font-semibold text-[#727B83] w-1/3">{key}</td>
                      <td className="py-3 px-4 font-bold text-[#2B2F33] dark:text-[#F8F6F1]">{val}</td>
                    </tr>
                  ))}
                  <tr className="bg-white dark:bg-[#0F282F]">
                    <td className="py-3 px-4 font-semibold text-[#727B83]">GST Category</td>
                    <td className="py-3 px-4 font-bold text-[#2B2F33] dark:text-[#F8F6F1]">{product.gstRate}% (Included in price)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right Column: Sticky Buy Box */}
        <div className="lg:col-span-5">
          <div className="sticky top-28 space-y-6 rounded-3xl border border-[#DFD9CE] bg-white p-6 shadow-sm dark:border-[#224C57] dark:bg-[#0F282F]">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-[#1E8C9B] dark:text-[#D9B65F]">
                {product.brand}
              </span>
              <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full ${
                product.stockQuantity > 0 ? 'bg-[#EAF8F1] text-[#1F9D6B]' : 'bg-[#FBECEE] text-[#D1495B]'
              }`}>
                {product.stockQuantity > 0 ? 'In Stock' : 'Out of Stock'}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-bold font-serif text-[#0E4A57] dark:text-white">
              {product.name}
            </h1>

            {/* Ratings */}
            <div className="flex items-center gap-2">
              <div className="flex items-center text-[#E0A526]">
                <Star className="h-4 w-4 fill-[#E0A526]" />
                <span className="ml-1 text-sm font-bold text-[#2B2F33] dark:text-[#F8F6F1]">
                  {product.ratingAvg}
                </span>
              </div>
              <span className="text-xs text-[#727B83]">({product.ratingCount} certified buyer ratings)</span>
            </div>

            {/* Price Box */}
            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-extrabold text-[#0E4A57] dark:text-[#D9B65F]">
                {formatINR(product.price)}
              </span>
              {product.mrp > product.price && (
                <span className="text-base text-[#A2AAB0] line-through">
                  {formatINR(product.mrp)}
                </span>
              )}
            </div>
            <p className="text-[11px] text-[#727B83]">Inclusive of all taxes ({product.gstRate}% GST included)</p>

            {/* Interactive Buy Box (Size/Variant selector + Add to bag) */}
            <ProductBuyBox product={product} />

            {/* Guaranteed Trust Badges */}
            <div className="space-y-3 pt-6 border-t border-[#ECE8E0] dark:border-[#16363F] text-xs text-[#4B5259] dark:text-[#DFD9CE]">
              <div className="flex items-center gap-2.5">
                <Truck className="h-4 w-4 text-[#1E8C9B]" />
                <span>Complimentary insured shipping on all orders over ₹1,999</span>
              </div>
              <div className="flex items-center gap-2.5">
                <ShieldCheck className="h-4 w-4 text-[#1E8C9B]" />
                <span>Certified authentic with official brand warranty</span>
              </div>
              <div className="flex items-center gap-2.5">
                <RotateCcw className="h-4 w-4 text-[#1E8C9B]" />
                <span>7-day easy return policy with doorstep pickup</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products Carousel */}
      <div className="mt-16 pt-12 border-t border-[#DFD9CE] dark:border-[#224C57]">
        <h2 className="text-xl font-bold font-serif text-[#0E4A57] dark:text-white mb-6">
          More from {product.category}
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
          {related.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </div>
  );
}
