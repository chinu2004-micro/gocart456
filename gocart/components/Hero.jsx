'use client'
import { productDummyData } from '@/assets/assets'
import Image from 'next/image'
import Link from 'next/link'

const Hero = () => {
    return (
        <section className="relative bg-[#F3EEE7] overflow-hidden min-h-[80vh]">
            <div className="mx-6 pt-32 pb-24">
                <div className="max-w-7xl mx-auto grid grid-cols-1 xl:grid-cols-2 gap-12 items-center">
                    <div className="space-y-8">
                        <div className="inline-flex items-center gap-3 text-xs text-[#5F5A55] font-medium tracking-wider animate-fadeInDown">
                            <div className="w-8 h-0.5 bg-[#D8C7B5]"></div>
                            NEW COLLECTION
                        </div>
                        
                        <h1 className="text-5xl sm:text-6xl md:text-7xl font-medium text-[#171717] leading-[1.1] tracking-tight animate-fadeInUp" style={{ animationDelay: '0.1s' }}>
                            Define Your
                            <span className="block text-[#D8C7B5]">Everyday</span>
                        </h1>
                        
                        <p className="text-base text-[#5F5A55] max-w-md leading-relaxed animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
                            Curated essentials for the modern lifestyle. From versatile pieces to statement items, discover what defines your style.
                        </p>
                        
                        <div className="flex flex-col sm:flex-row gap-3 animate-fadeInUp" style={{ animationDelay: '0.3s' }}>
                            <Link href="/shop" className="inline-flex items-center justify-center bg-[#171717] text-white px-8 py-3 rounded-full font-medium text-sm hover:bg-[#2D2D2B] transition active:scale-95 shadow-sm">
                                SHOP COLLECTION
                            </Link>
                            <Link href="/collections" className="inline-flex items-center justify-center border border-[#DED6CC] text-[#171717] px-8 py-3 rounded-full font-medium text-sm hover:bg-[#F8F5F0] transition active:scale-95">
                                EXPLORE LOOKS
                            </Link>
                        </div>
                    </div>

                    <div className="relative animate-scaleIn" style={{ animationDelay: '0.2s' }}>
                        <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border border-[#DED6CC]">
                            <Image 
                                src={productDummyData[0].images[0]} 
                                alt="Product Hero" 
                                className="object-cover"
                                fill
                                priority
                                sizes="(min-width: 1024px) 500px"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Hero