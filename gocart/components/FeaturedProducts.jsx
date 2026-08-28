'use client'
import { useState } from 'react'
import { StarIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useSelector } from 'react-redux'

const FeaturedProducts = () => {
    const products = useSelector(state => state.product.list);
    const displayQuantity = 8;
    const [showAll, setShowAll] = useState(false);

    const ArrowRight = () => (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="5 15 12 22 19 15" />
        </svg>
    );

    return (
        <section className="px-6 py-24 bg-[#F8F5F0]">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-medium text-[#171717] mb-2">
                        Shop The Edit
                    </h2>
                    <p className="text-sm text-[#5F5A55]">
                        Carefully curated selections for your wardrobe
                    </p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
                    {(showAll ? products : products.slice(0, displayQuantity)).map((product, index) => (
                        <Link key={product.id || index} href={`/product/${product.id}`} className="group block">
                            <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-[#DED6CC] hover:shadow-md transition-all duration-300">
                                <div className="relative aspect-[4/3] bg-[#F3EEE7] overflow-hidden">
                                    <Image 
                                        src={product.images[0]} 
                                        alt={product.name}
                                        className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                                        fill
                                        sizes="(min-width: 768px) 140px"
                                    />
                                    {product.mrp > product.price && (
                                        <span className="absolute top-3 left-3 bg-[#D8C7B5] text-white text-xs font-medium px-2.5 py-1 rounded-full z-10">
                                            {Math.round((product.mrp - product.price) / product.mrp * 100)}% OFF
                                        </span>
                                    )}
                                </div>
                                <div className="p-4">
                                    <h3 className="text-sm font-medium text-[#171717] mb-1 group-hover:text-[#D8C7B5] transition-colors">
                                        {product.name}
                                    </h3>
                                    <p className="text-xs text-[#5F5A55] mb-2">{product.category}</p>
                                    <div className="flex items-center gap-2">
                                        <div className="flex items-center">
                                            {[...Array(5)].map((_, i) => (
                                                <StarIcon 
                                                    key={i} 
                                                    size={12} 
                                                    className="text-[#171717]" 
                                                    fill={true}
                                                />
                                            ))}
                                        </div>
                                        <span className="text-sm font-medium text-[#171717]">
                                            ${product.price}
                                        </span>
                                        {product.mrp > product.price && (
                                            <span className="text-xs text-[#5F5A55] line-through">
                                                ${product.mrp}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                {!showAll && (
                    <div className="text-center mt-12">
                        <button onClick={() => setShowAll(true)} className="inline-flex items-center gap-2 border border-[#DED6CC] text-[#171717] px-8 py-2.5 rounded-full font-medium text-sm hover:bg-[#F8F5F0] transition">
                            VIEW ALL PRODUCTS
                            <ArrowRight />
                        </button>
                    </div>
                )}
            </div>
        </section>
    )
}

export default FeaturedProducts;