'use client'
import { productDummyData } from '@/assets/assets'
import { ArrowRightIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

const PromotionalBanner = () => {
    return (
        <section className="relative bg-[#1C1C1A] text-white overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 py-20 lg:py-32">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div>
                        <div className="inline-flex items-center gap-2 text-xs text-[#D8C7B5] font-medium mb-4">
                            <div className="w-6 h-0.5 bg-[#D8C7B5]"></div>
                            LIMITED TIME OFFER
                        </div>
                        <h2 className="text-4xl md:text-5xl font-medium mb-6 leading-tight">
                            Elevate Your Style
                            <span className="block text-[#D8C7B5]">With Up To 30% Off</span>
                        </h2>
                        <p className="text-base text-[#DED6CC] mb-8">
                            Selected pieces from our premium collection. Limited stock available.
                        </p>
                        <Link href="/shop" className="inline-flex items-center justify-center bg-[#D8C7B5] hover:bg-[#B9A28C] text-black font-medium px-8 py-3 rounded-full text-sm transition-transform active:scale-95">
                            SHOP NOW
                            <ArrowRightIcon size={14} className="ml-2 inline-block" />
                        </Link>
                    </div>
                    <div className="relative">
                        <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-[#333333]">
                            <Image 
                                src={productDummyData[1]?.images[0] || productDummyData[0].images[0]}
                                alt="Promotional Product"
                                className="w-full aspect-[4/3] object-cover"
                                fill
                                priority
                                sizes="(min-width: 1024px) 450px"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default PromotionalBanner;