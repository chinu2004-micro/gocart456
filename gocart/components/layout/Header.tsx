'use client';

import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import {
  Search,
  ShoppingBag,
  Heart,
  User,
  ChevronDown,
  Menu,
  X,
  Sun,
  Moon,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Truck,
  RotateCcw,
} from 'lucide-react';
import { useCartStore } from '@/lib/stores/useCartStore';
import { useWishlistStore } from '@/lib/stores/useWishlistStore';
import { useAuthStore } from '@/lib/stores/useAuthStore';
import { CATEGORY_TREE } from '@/services/seedData';
import { MiniCartDrawer } from '@/components/cart/MiniCartDrawer';
import { AuthModal } from '@/components/auth/AuthModal';

export function Header() {
  const router = useRouter();
  const { openCart, getItemCount } = useCartStore();
  const { items: wishlistItems } = useWishlistStore();
  const { user, isAuthenticated, openLoginModal } = useAuthStore();

  const [searchQuery, setSearchQuery] = React.useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [activeMegaCategory, setActiveMegaCategory] = React.useState<string | null>(null);
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [theme, setTheme] = React.useState<'light' | 'dark'>('light');
  const [mounted, setMounted] = React.useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = React.useState(false);

  const cartCount = mounted ? getItemCount() : 0;

  React.useEffect(() => {
    setMounted(true);
    try {
      const storedTheme = localStorage.getItem('vellora_theme');
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      const isDark = storedTheme === 'dark' || (!storedTheme && prefersDark);
      if (isDark) {
        document.documentElement.classList.add('dark');
        setTheme('dark');
      } else {
        document.documentElement.classList.remove('dark');
        setTheme('light');
      }
    } catch (e) {}
  }, []);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => {
    const next = theme === 'light' ? 'dark' : 'light';
    setTheme(next);
    if (next === 'dark') {
      document.documentElement.classList.add('dark');
      localStorage.setItem('vellora_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('vellora_theme', 'light');
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    router.push(`/shop?q=${encodeURIComponent(searchQuery.trim())}`);
  };

  const handleLogout = async () => {
    setShowLogoutConfirm(false);
    await useAuthStore.getState().logout();
    router.push('/');
  };

  return (
    <>
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${
          isScrolled
            ? 'border-b border-[#DFD9CE] bg-[#F8F6F1]/90 shadow-md backdrop-blur-md dark:border-[#224C57] dark:bg-[#0A1D22]/90'
            : 'border-b border-[#ECE8E0] bg-[#F8F6F1] dark:border-[#16363F] dark:bg-[#0A1D22]'
        }`}
      >
        {/* Top Announcement Bar */}
        <div className="bg-[#0E4A57] py-2 px-4 text-center text-xs font-medium text-[#F8F6F1] flex items-center justify-center gap-2">
          <Sparkles className="h-3.5 w-3.5 text-[#D9B65F]" />
          <span>Complimentary insured shipping on all orders over ₹1,999. Use promo code </span>
          <span className="font-bold text-[#D9B65F] tracking-wide">VELLORA10</span>
          <span> for 10% off.</span>
        </div>

        {/* Main Brand & Action Row */}
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8 gap-4">
          {/* Brand Logo with responsive Mark/Full */}
          <Link href="/" className="flex items-center shrink-0">
            {/* Full Logo for medium & larger screens */}
            <div className="relative h-11 w-48 hidden sm:block">
              <Image
                src="/brand/vellora-light-clean.png"
                alt="Vellora General Shopping"
                fill
                priority
                className="object-contain object-left dark:hidden drop-shadow-[0_1px_2px_rgba(14,74,87,0.08)]"
              />
              <Image
                src="/brand/vellora-dark-silver.png"
                alt="Vellora General Shopping"
                fill
                priority
                className="object-contain object-left hidden dark:block drop-shadow-[0_2px_12px_rgba(255,255,255,0.18)]"
              />
            </div>
            {/* Mark only for compact screens */}
            <div className="relative h-10 w-10 sm:hidden">
              <Image
                src="/brand/vellora-mark-exact.png"
                alt="Vellora"
                fill
                priority
                className="object-contain dark:hidden"
              />
              <Image
                src="/brand/vellora-mark-exact.png"
                alt="Vellora"
                fill
                priority
                className="object-contain hidden dark:block drop-shadow-[0_2px_8px_rgba(255,255,255,0.2)]"
              />
            </div>
          </Link>

          {/* Wide Central Search Box */}
          <div className="flex-1 max-w-xl mx-2">
            <form onSubmit={handleSearchSubmit} className="relative w-full">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#727B83] dark:text-[#A2AAB0]" />
              <input
                type="text"
                placeholder="Search premium electronics, linen shirts, solid wood furniture..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-11 w-full rounded-2xl border border-[#DFD9CE] bg-white/80 pl-10 pr-4 text-xs text-[#2B2F33] placeholder:text-[#A2AAB0] focus:border-[#1E8C9B] focus:bg-white focus:outline-none focus:ring-4 focus:ring-[#1E8C9B]/10 dark:border-[#224C57] dark:bg-[#0F282F] dark:text-[#F8F6F1]"
              />
            </form>
          </div>

          {/* Right Action Controls */}
          <div className="flex items-center gap-1.5 sm:gap-3">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              aria-label="Toggle dark mode"
              className="rounded-xl p-2.5 text-[#4B5259] hover:bg-[#EFECE6] dark:text-[#DFD9CE] dark:hover:bg-[#16363F] transition-colors"
            >
              {theme === 'dark' ? <Sun className="h-4 w-4 text-[#D9B65F]" /> : <Moon className="h-4 w-4" />}
            </button>

            {/* Profile / Account link */}
            {isAuthenticated ? (
              <div className="hidden sm:flex items-center gap-1.5">
                <Link
                  href="/profile"
                  className="flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-semibold text-[#2B2F33] hover:bg-[#EFECE6] dark:text-[#F8F6F1] dark:hover:bg-[#16363F] transition-colors"
                >
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#0E4A57] text-[#D9B65F] text-[11px] font-bold shadow-sm">
                    {user?.name?.charAt(0) || 'U'}
                  </div>
                  <span className="truncate max-w-[90px]">{user?.name?.split(' ')[0]}</span>
                </Link>
                <button
                  onClick={() => setShowLogoutConfirm(true)}
                  title="Sign Out"
                  className="rounded-xl px-2.5 py-1.5 text-[11px] font-semibold text-[#727B83] hover:text-[#D1495B] hover:bg-[#EFECE6] dark:hover:bg-[#16363F] transition-colors"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="hidden sm:flex items-center gap-2">
                <button
                  onClick={() => openLoginModal('login')}
                  className="flex items-center gap-1.5 rounded-xl border border-[#DFD9CE] px-3.5 py-2 text-xs font-bold text-[#0E4A57] hover:bg-[#EFECE6] dark:border-[#224C57] dark:text-[#D9B65F] dark:hover:bg-[#16363F] transition-colors"
                >
                  <User className="h-4 w-4" />
                  Sign In
                </button>
                <button
                  onClick={() => openLoginModal('register')}
                  className="rounded-xl bg-[#0E4A57] px-3.5 py-2 text-xs font-bold text-white shadow-sm hover:bg-[#1E8C9B] transition-all"
                >
                  Register
                </button>
              </div>
            )}

            {/* Wishlist Icon */}
            <Link
              href="/wishlist"
              className="relative rounded-xl p-2.5 text-[#4B5259] hover:bg-[#EFECE6] dark:text-[#DFD9CE] dark:hover:bg-[#16363F]"
            >
              <Heart className="h-5 w-5" />
              {wishlistItems.length > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#D1495B] text-[10px] font-bold text-white shadow-sm">
                  {wishlistItems.length}
                </span>
              )}
            </Link>

            {/* Cart Button */}
            <button
              onClick={openCart}
              aria-label="Open Cart"
              className="relative flex items-center gap-2 rounded-xl bg-[#0E4A57] px-3.5 py-2 text-white shadow-sm hover:bg-[#1E8C9B] transition-all"
            >
              <ShoppingBag className="h-4 w-4 text-[#D9B65F]" />
              <span className="text-xs font-bold">{cartCount}</span>
            </button>

            {/* Mobile Menu Trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="rounded-xl p-2 text-[#4B5259] hover:bg-[#EFECE6] lg:hidden dark:text-[#DFD9CE]"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Desktop Category Navigation Row with Mega-Menu */}
        <div className="hidden lg:block border-t border-[#ECE8E0] dark:border-[#16363F] bg-white/70 dark:bg-[#0F282F]/70">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-8">
            <nav className="flex items-center gap-8">
              <Link
                href="/shop"
                className="py-3 text-xs font-bold uppercase tracking-wider text-[#0E4A57] hover:text-[#1E8C9B] dark:text-[#D9B65F]"
              >
                All Departments
              </Link>
              {CATEGORY_TREE.map((category) => (
                <div
                  key={category.slug}
                  onMouseEnter={() => setActiveMegaCategory(category.slug)}
                  onMouseLeave={() => setActiveMegaCategory(null)}
                  className="relative"
                >
                  <Link
                    href={`/category/${category.slug}`}
                    className="flex items-center gap-1 py-3 text-xs font-semibold text-[#4B5259] hover:text-[#0E4A57] dark:text-[#DFD9CE] dark:hover:text-[#D9B65F] transition-colors"
                  >
                    <span>{category.name}</span>
                    <ChevronDown className="h-3 w-3 opacity-60" />
                  </Link>

                  {/* Mega Menu Dropdown */}
                  {activeMegaCategory === category.slug && (
                    <div className="absolute left-0 top-full w-[640px] rounded-2xl border border-[#DFD9CE] bg-white p-6 shadow-2xl dark:border-[#224C57] dark:bg-[#0A1D22] z-50 grid grid-cols-3 gap-6">
                      <div className="col-span-2 grid grid-cols-2 gap-4">
                        {category.subCategories?.map((sub) => (
                          <div key={sub.slug}>
                            <Link
                              href={`/category/${category.slug}/${sub.slug}`}
                              className="text-xs font-bold text-[#0E4A57] hover:text-[#1E8C9B] dark:text-[#D9B65F] block mb-1.5"
                            >
                              {sub.name}
                            </Link>
                            <ul className="space-y-1">
                              {sub.items?.map((item) => (
                                <li key={item}>
                                  <Link
                                    href={`/shop?q=${encodeURIComponent(item)}`}
                                    className="text-[11px] text-[#727B83] hover:text-[#2B2F33] dark:text-[#A2AAB0] dark:hover:text-[#F8F6F1]"
                                  >
                                    {item}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>

                      {/* Featured Category Card Preview */}
                      <div className="relative overflow-hidden rounded-xl bg-[#EFECE6] p-4 flex flex-col justify-end dark:bg-[#16363F]">
                        <div className="relative aspect-[4/3] w-full rounded-lg overflow-hidden mb-3">
                          <Image src={category.image || ''} alt={category.name} fill className="object-cover" />
                        </div>
                        <h4 className="text-xs font-bold text-[#2B2F33] dark:text-[#F8F6F1]">{category.name}</h4>
                        <p className="text-[10px] text-[#727B83] line-clamp-2 mt-0.5">{category.description}</p>
                        <Link
                          href={`/category/${category.slug}`}
                          className="mt-3 inline-flex items-center gap-1 text-[11px] font-bold text-[#1E8C9B] hover:text-[#0E4A57] dark:text-[#D9B65F]"
                        >
                          Explore Department
                          <ArrowRight className="h-3 w-3" />
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </nav>

            <div className="flex items-center gap-4 text-xs font-semibold text-[#727B83]">
              <Link href="/profile/orders" className="hover:text-[#0E4A57] dark:hover:text-[#D9B65F]">
                Track Orders
              </Link>
              <span>•</span>
              <span className="text-[#1F9D6B] font-bold">100% Genuine Certified</span>
            </div>
          </div>
        </div>

        {/* Mobile Slideout Nav Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-[#DFD9CE] bg-[#F8F6F1] px-4 py-4 dark:border-[#224C57] dark:bg-[#0A1D22]">
            <nav className="space-y-3">
              <Link
                href="/shop"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-sm font-bold text-[#0E4A57] dark:text-[#D9B65F]"
              >
                All Departments & Catalog
              </Link>
              {CATEGORY_TREE.map((c) => (
                <div key={c.slug} className="py-1">
                  <Link
                    href={`/category/${c.slug}`}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block text-xs font-semibold text-[#2B2F33] dark:text-[#F8F6F1]"
                  >
                    {c.name}
                  </Link>
                </div>
              ))}
              <div className="pt-4 border-t border-[#DFD9CE] dark:border-[#224C57] space-y-2">
                {isAuthenticated ? (
                  <>
                    <div className="flex items-center gap-2.5 pb-2">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#0E4A57] text-[#D9B65F] text-xs font-bold shadow-sm">
                        {user?.name?.charAt(0) || 'U'}
                      </div>
                      <div className="flex flex-col">
                        <span className="text-xs font-bold text-[#0E4A57] dark:text-[#D9B65F]">{user?.name}</span>
                        <span className="text-[10px] text-[#727B83]">@{user?.userId || 'member'}</span>
                      </div>
                    </div>
                    <Link
                      href="/profile"
                      onClick={() => setMobileMenuOpen(false)}
                      className="block text-xs font-semibold text-[#0E4A57] dark:text-[#D9B65F]"
                    >
                      My Profile & Saved Addresses
                    </Link>
                    <Link
                      href="/profile/orders"
                      onClick={() => setMobileMenuOpen(false)}
                      className="block text-xs font-semibold text-[#0E4A57] dark:text-[#D9B65F]"
                    >
                      My Orders & Invoices
                    </Link>
                    <button
                      onClick={() => {
                        setMobileMenuOpen(false);
                        setShowLogoutConfirm(true);
                      }}
                      className="block text-left text-xs font-bold text-[#D1495B] pt-1"
                    >
                      Sign Out
                    </button>
                  </>
                ) : (
                  <div className="flex items-center gap-2 pt-1">
                    <button
                      onClick={() => {
                        setMobileMenuOpen(false);
                        openLoginModal('login');
                      }}
                      className="flex-1 rounded-xl border border-[#DFD9CE] py-2 text-center text-xs font-bold text-[#0E4A57] dark:border-[#224C57] dark:text-[#D9B65F]"
                    >
                      Sign In
                    </button>
                    <button
                      onClick={() => {
                        setMobileMenuOpen(false);
                        openLoginModal('register');
                      }}
                      className="flex-1 rounded-xl bg-[#0E4A57] py-2 text-center text-xs font-bold text-white shadow-sm"
                    >
                      Register
                    </button>
                  </div>
                )}
              </div>
            </nav>
          </div>
        )}
      </header>

      {/* Slideout Cart & Auth Modals */}
      <MiniCartDrawer />
      <AuthModal />

      {/* Logout Confirmation Dialog */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in">
          <div className="w-full max-w-sm rounded-3xl border border-[#DFD9CE] bg-white p-6 shadow-2xl dark:border-[#224C57] dark:bg-[#0F282F]">
            <h3 className="text-lg font-bold font-serif text-[#0E4A57] dark:text-white">Confirm Sign Out</h3>
            <p className="mt-2 text-xs text-[#727B83]">
              Are you sure you want to log out of your Vellora account? You will be redirected to the home page.
            </p>
            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => setShowLogoutConfirm(false)}
                className="rounded-xl border border-[#DFD9CE] px-4 py-2 text-xs font-semibold text-[#4B5259] hover:bg-[#EFECE6] dark:border-[#224C57] dark:text-[#DFD9CE] dark:hover:bg-[#16363F]"
              >
                Cancel
              </button>
              <button
                onClick={handleLogout}
                className="rounded-xl bg-[#D1495B] px-4 py-2 text-xs font-bold text-white shadow-sm hover:bg-[#ba394a]"
              >
                Yes, Sign Out
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

