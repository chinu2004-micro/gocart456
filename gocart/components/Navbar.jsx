'use client'
import { Search, ShoppingCart, Menu, Heart } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

const Navbar = () => {
    const router = useRouter();
    const [search, setSearch] = useState('');
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const cartCount = useSelector(state => state.cart.total);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleSearch = (e) => {
        e.preventDefault();
        if (search.trim()) {
            router.push(`/shop?search=${encodeURIComponent(search)}`);
        }
    };

    const navigation = [
        { name: 'New Arrivals', href: '/new-arrivals' },
        { name: 'Men', href: '/men' },
        { name: 'Women', href: '/women' },
        { name: 'Collections', href: '/collections' },
        { name: 'Sale', href: '/sale' },
    ];

    return (
        <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
            scrolled ? 'bg-[#F3EEE7]/95 backdrop-blur-md border-b border-[#DED6CC]' : 'bg-transparent'
        }`}>
            <div className="mx-6">
                <div className="flex items-center justify-between max-w-7xl mx-auto py-4">
                    <Link href="/" className="text-2xl font-semibold text-[#171717]">
                        <span className="text-[#D8C7B5]">go</span>cart<span className="text-[#D8C7B5] text-3xl leading-0">.</span>
                    </Link>

                    <div className="hidden xl:flex items-center gap-12 text-[#5F5A55]">
                        <div className="flex items-center gap-8">
                            {navigation.map((item) => (
                                <Link 
                                    key={item.name} 
                                    href={item.href} 
                                    className="text-sm font-medium hover:text-[#171717] transition-colors relative group"
                                >
                                    {item.name}
                                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#D8C7B5] transition-all duration-300 group-hover:w-full"></span>
                                </Link>
                            ))}
                        </div>

                        <form onSubmit={handleSearch} className="flex items-center gap-3 bg-[#F8F5F0] px-4 py-2.5 rounded-full text-sm">
                            <Search size={16} className="text-[#5F5A55]" />
                            <input 
                                className="w-40 bg-transparent outline-none placeholder-[#5F5A55] text-sm" 
                                type="text" 
                                placeholder="Search..." 
                                value={search} 
                                onChange={(e) => setSearch(e.target.value)} 
                            />
                        </form>

                        <Link href="/wishlist" className="text-[#5F5A55] hover:text-[#171717] transition-colors">
                            <Heart size={18} />
                        </Link>

                        <Link href="/cart" className="relative text-[#5F5A55] hover:text-[#171717] transition-colors">
                            <ShoppingCart size={18} />
                            {cartCount > 0 && (
                                <span className="absolute -top-2 -right-2 bg-[#D8C7B5] text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">
                                    {cartCount}
                                </span>
                            )}
                        </Link>

                        <button className="px-6 py-2 bg-[#D8C7B5] hover:bg-[#B9A28C] transition text-sm font-medium text-white rounded-full">
                            Login
                        </button>
                    </div>

                    <div className="xl:hidden">
                        <button 
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="p-2 rounded-full hover:bg-[#F8F5F0] transition"
                        >
                            <Menu size={24} className="text-[#171717]" />
                        </button>
                    </div>
                </div>
            </div>

            {mobileMenuOpen && (
                <div className="xl:hidden animate-fadeInDown bg-[#F3EEE7]/95 backdrop-blur-md border-t border-[#DED6CC]">
                    <div className="px-6 py-4">
                        <div className="flex flex-col gap-4">
                            {navigation.map((item) => (
                                <Link 
                                    key={item.name} 
                                    href={item.href} 
                                    className="text-[#171717] font-medium text-lg"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    {item.name}
                                </Link>
                            ))}
                            <form onSubmit={handleSearch} className="flex items-center gap-3 bg-[#F8F5F0] px-4 py-2.5 rounded-full text-sm">
                                <Search size={16} className="text-[#5F5A55]" />
                                <input 
                                    className="w-full bg-transparent outline-none placeholder-[#5F5A55]" 
                                    type="text" 
                                    placeholder="Search..." 
                                    value={search} 
                                    onChange={(e) => setSearch(e.target.value)} 
                                />
                            </form>
                            <div className="flex items-center gap-6">
                                <Link href="/wishlist" className="text-[#171717] hover:text-[#D8C7B5] transition">
                                    Wishlist
                                </Link>
                                <Link href="/cart" className="text-[#171717] hover:text-[#D8C7B5] transition">
                                    Cart ({cartCount})
                                </Link>
                            </div>
                            <button className="px-6 py-2.5 w-full bg-[#D8C7B5] hover:bg-[#B9A28C] transition text-sm font-medium text-white rounded-full">
                                Login
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;