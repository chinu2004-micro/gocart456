import Link from 'next/link';
import Image from 'next/image';
import { ShieldCheck, Truck, RotateCcw, Headphones, Sparkles } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t border-[#DFD9CE] bg-[#0E4A57] text-[#F8F6F1] dark:border-[#224C57] dark:bg-[#061418]">
      {/* Trust Badges Ribbon */}
      <div className="border-b border-white/10">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#1E8C9B]/20 text-[#D9B65F]">
                <Truck className="h-5 w-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white">Express Delivery</h4>
                <p className="text-[11px] text-[#A2AAB0]">Complimentary over ₹1,999</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#1E8C9B]/20 text-[#D9B65F]">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white">100% Genuine Certified</h4>
                <p className="text-[11px] text-[#A2AAB0]">Direct brand manufacturer warranty</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#1E8C9B]/20 text-[#D9B65F]">
                <RotateCcw className="h-5 w-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white">7-Day Easy Returns</h4>
                <p className="text-[11px] text-[#A2AAB0]">Hassle-free doorstep pickup</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#1E8C9B]/20 text-[#D9B65F]">
                <Headphones className="h-5 w-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white">Vellora Concierge</h4>
                <p className="text-[11px] text-[#A2AAB0]">Dedicated customer support</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-5">
          {/* Brand Col */}
          <div className="col-span-2 space-y-4">
            <div className="relative h-11 w-48">
              <Image
                src="/brand/vellora-dark-silver.png"
                alt="Vellora"
                fill
                className="object-contain object-left drop-shadow-[0_2px_12px_rgba(255,255,255,0.2)]"
              />
            </div>
            <p className="max-w-sm text-xs leading-relaxed text-[#DFD9CE]/80">
              Vellora is India’s premium general shopping destination. Thoughtfully curating certified consumer electronics, refined apparel, architectural furniture, and everyday wellness.
            </p>
            <div className="flex items-center gap-2 pt-2 text-xs font-semibold text-[#D9B65F]">
              <Sparkles className="h-4 w-4" />
              <span>General Shopping, Elevated.</span>
            </div>
          </div>

          {/* Departments */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#D9B65F]">Departments</h4>
            <ul className="mt-4 space-y-2.5 text-xs text-[#DFD9CE]">
              <li><Link href="/category/consumer-electronics" className="hover:text-white">Consumer Electronics</Link></li>
              <li><Link href="/category/clothing" className="hover:text-white">Clothing & Apparel</Link></li>
              <li><Link href="/category/furniture" className="hover:text-white">Furniture & Living</Link></li>
              <li><Link href="/category/wellness-hygiene" className="hover:text-white">Wellness & Hygiene</Link></li>
              <li><Link href="/category/others" className="hover:text-white">Home, Kitchen & Books</Link></li>
            </ul>
          </div>

          {/* Customer Care */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#D9B65F]">Customer Care</h4>
            <ul className="mt-4 space-y-2.5 text-xs text-[#DFD9CE]">
              <li><Link href="/profile/orders" className="hover:text-white">Track Order</Link></li>
              <li><Link href="/profile" className="hover:text-white">My Account</Link></li>
              <li><Link href="/wishlist" className="hover:text-white">Saved Wishlist</Link></li>
              <li><Link href="/cart" className="hover:text-white">Shopping Bag</Link></li>
            </ul>
          </div>

          {/* Company & Legal */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#D9B65F]">Vellora India</h4>
            <ul className="mt-4 space-y-2.5 text-xs text-[#DFD9CE]">
              <li><Link href="/shop" className="hover:text-white">Catalog Directory</Link></li>
              <li><Link href="/design-system" className="hover:text-white">Design System</Link></li>
              <li><span className="text-white/60">Registered Office: Indiranagar, Bengaluru</span></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-14 flex flex-col items-center justify-between border-t border-white/10 pt-6 sm:flex-row text-xs text-[#A2AAB0] gap-4">
          <p>© {new Date().getFullYear()} Vellora General Shopping Pvt Ltd. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span>Visa • MasterCard • RuPay • UPI • NetBanking</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
