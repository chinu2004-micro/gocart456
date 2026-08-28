'use client'
import Hero from "@/components/Hero"
import FeaturedProducts from "@/components/FeaturedProducts"
import PromotionalBanner from "@/components/PromotionalBanner"
import Newsletter from "@/components/Newsletter"
import { Shield, RefreshCw, Truck } from "lucide-react"

const Home = () => {
    return (
        <div className="min-h-screen bg-[#F3EEE7]">
            <Hero />
            <FeaturedProducts />
            <PromotionalBanner />
            <TrustSection />
            <Newsletter />
        </div>
    );
}

const TrustSection = () => {
    const trustItems = [
        {
            icon: Shield,
            title: "Secure Payment",
            description: "100% secured checkout with encrypted payment processing"
        },
        {
            icon: RefreshCw,
            title: "Easy Returns",
            description: "30-day hassle-free returns on all orders"
        },
        {
            icon: Truck,
            title: "Fast Delivery",
            description: "Delivered to your doorstep within 3-5 business days"
        }
    ];

    return (
        <section className="py-20 bg-[#F3EEE7]">
            <div className="max-w-6xl mx-auto px-6">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-medium text-[#171717] mb-4">
                        Why Choose Us
                    </h2>
                    <p className="text-sm text-[#5F5A55] max-w-md mx-auto">
                        We ensure a seamless shopping experience with premium quality products and exceptional service.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {trustItems.map((item, index) => (
                        <div 
                            key={index} 
                            className="bg-white rounded-xl p-6 shadow-sm border border-[#DED6CC] text-center"
                        >
                            <div className="inline-flex items-center justify-center w-12 h-12 bg-[#F8F5F0] rounded-full mb-4">
                                <item.icon size={20} className="text-[#D8C7B5]" />
                            </div>
                            <h3 className="font-medium text-[#171717] mb-2">{item.title}</h3>
                            <p className="text-xs text-[#5F5A55]">{item.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Home;