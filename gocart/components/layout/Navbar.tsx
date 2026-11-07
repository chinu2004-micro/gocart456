'use client';

import * as React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  ShoppingBag,
  Heart,
  Search,
  User,
  Menu,
  X,
  Sun,
  Moon,
  Store,
  ShieldAlert,
  ChevronDown,
} from 'lucide-react';
import { useCartStore } from '@/lib/stores/useCartStore';
import { useWishlistStore } from '@/lib/stores/useWishlistStore';
import { useUIStore } from '@/lib/stores/useUIStore';
import { MiniCartDrawer } from '@/components/cart/MiniCartDrawer';

const NAV_LINKS = [
  { name: 'Home', href: '/' },
  { name: 'Shop All', href: '/shop' },
  { name: 'Audio', href: '/category/audio' },
  { name: 'Workspace', href: '/category/workspace' },
  { name: 'Footwear', href: '/category/footwear' },
  { name: 'Design System', href: '/design-system' },
];

export function Navbar() {
  const router = useRouter();
  const { openCart, getItemCount } = useCartStore();
  const { items: wishlistItems } = useWishlistStore();
  const { theme, setTheme } = useUIStore();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [isScrolled, setIsScrolled] = React.useState(false);

  const cartCount = getItemCount();
  const wishlistCount = wishlistItems.length;

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    if (nextTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    router.push(`/shop?q=${encodeURIComponent(searchQuery.trim())}`);
  };

  return (
    <>
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${
          isScrolled
            ? 'border-b border-slate-200/80 bg-white/85 shadow-sm backdrop-blur-md dark:border-zinc-800/80 dark:bg-zinc-900/85'
            : 'border-b border-transparent bg-white dark:bg-zinc-900'
        }`}
      >
        {/* Top Announcement Bar */}
        <div className="bg-slate-900 py-1.5 px-4 text-center text-xs font-medium text-slate-200 dark:bg-zinc-950 dark:text-zinc-400">
          <span>Complimentary insured shipping on all orders over $150. Use code </span>
          <span className="font-bold text-emerald-400">AURA10</span>
          <span> for 10% off.</span>
        </div>

        {/* Main Navigation Bar */}
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Brand Logo */}
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 text-white shadow-md shadow-emerald-500/20">
                <ShoppingBag className="h-5 w-5" />
              </div>
              <span className="text-xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                Go<span className="text-emerald-600 dark:text-emerald-400">Cart</span>
              </span>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-6">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-sm font-medium text-slate-600 transition-colors hover:text-emerald-600 dark:text-zinc-300 dark:hover:text-emerald-400"
                >
                  {link.name}
                </Link>
              ))}
            </nav>
          </div>

          {/* Search Box */}
          <div className="hidden md:flex flex-1 max-w-sm mx-6">
            <form onSubmit={handleSearchSubmit} className="relative w-full">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 dark:text-zinc-500" />
              <input
                type="text"
                placeholder="Search products, brands, stores..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-10 w-full rounded-xl border border-slate-200 bg-slate-50/70 pl-10 pr-4 text-xs text-slate-900 placeholder:text-slate-400 focus:border-emerald-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-emerald-500/10 dark:border-zinc-800 dark:bg-zinc-800/60 dark:text-zinc-100 dark:focus:border-emerald-400"
              />
            </form>
          </div>

          {/* Right Action Icons */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="rounded-xl p-2 text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-100"
            >
              {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>

            {/* Seller Portal Link */}
            <Link
              href="/store"
              className="hidden sm:flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-100 dark:text-zinc-300 dark:hover:bg-zinc-800"
            >
              <Store className="h-4 w-4 text-emerald-600" />
              Seller
            </Link>

            {/* Admin Portal Link */}
            <Link
              href="/admin"
              className="hidden sm:flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-100 dark:text-zinc-300 dark:hover:bg-zinc-800"
            >
              <ShieldAlert className="h-4 w-4 text-amber-600" />
              Admin
            </Link>

            {/* Wishlist Icon */}
            <Link
              href="/wishlist"
              className="relative rounded-xl p-2 text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-100"
            >
              <Heart className="h-5 w-5" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-rose-500 text-[10px] font-bold text-white">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Cart Icon & Trigger */}
            <button
              onClick={openCart}
              aria-label="Open cart"
              className="relative flex items-center gap-2 rounded-xl bg-slate-100 px-3 py-2 text-slate-900 transition-colors hover:bg-slate-200 dark:bg-zinc-800 dark:text-zinc-100 dark:hover:bg-zinc-700"
            >
              <ShoppingBag className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
              <span className="text-xs font-bold">{cartCount}</span>
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="rounded-xl p-2 text-slate-600 hover:bg-slate-100 lg:hidden dark:text-zinc-400 dark:hover:bg-zinc-800"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="border-b border-slate-200 bg-white px-4 py-4 lg:hidden dark:border-zinc-800 dark:bg-zinc-900">
            <form onSubmit={handleSearchSubmit} className="mb-4">
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-10 w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 text-sm dark:border-zinc-800 dark:bg-zinc-800"
              />
            </form>
            <div className="flex flex-col space-y-2">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="rounded-lg px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 dark:text-zinc-300 dark:hover:bg-zinc-800"
                >
                  {link.name}
                </Link>
              ))}
              <div className="pt-2 border-t border-slate-100 dark:border-zinc-800 flex flex-col space-y-1">
                <Link
                  href="/store"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-emerald-600 dark:text-emerald-400"
                >
                  <Store className="h-4 w-4" />
                  Seller Dashboard
                </Link>
                <Link
                  href="/admin"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-amber-600 dark:text-amber-400"
                >
                  <ShieldAlert className="h-4 w-4" />
                  Admin Portal
                </Link>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Mini Cart Slideover */}
      <MiniCartDrawer />
    </>
  );
}

