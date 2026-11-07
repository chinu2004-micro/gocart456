'use client';

import * as React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'motion/react';
import { ArrowRight, Sparkles, ChevronRight, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export function CinematicEditorialHero() {
  const containerRef = React.useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  // Stage 1: Headline collapses gracefully as user scrolls
  const headlineOpacity = useTransform(scrollYProgress, [0, 0.22], [1, 0]);
  const headlineY = useTransform(scrollYProgress, [0, 0.22], [0, -35]);

  // Stage 2: Central hero card expands smoothly
  const heroCardScale = useTransform(scrollYProgress, [0, 0.35, 0.7], [0.96, 1.02, 1.06]);
  const heroCardY = useTransform(scrollYProgress, [0, 0.35, 0.7], [0, -10, -25]);

  // Stage 3: Split sliding side gallery cards (glide in smoothly without sticking)
  const leftCardX = useTransform(scrollYProgress, [0.08, 0.36], [-80, 0]);
  const leftCardOpacity = useTransform(scrollYProgress, [0.08, 0.26], [0, 1]);
  const rightCardX = useTransform(scrollYProgress, [0.08, 0.36], [80, 0]);
  const rightCardOpacity = useTransform(scrollYProgress, [0.08, 0.26], [0, 1]);

  // Stage 4: Parallax background shopping imagery strip across the screen
  // Moves left as user scrolls down, bringing COLLECTION and imagery into view smoothly and fast enough to be enjoyed
  const bgImageX = useTransform(scrollYProgress, [0, 0.8], ['5%', '-45%']);
  const bgImageOpacity = useTransform(scrollYProgress, [0, 0.4, 0.85], [0.35, 0.35, 0.15]);

  return (
    <div ref={containerRef} className="relative min-h-[145vh] w-full bg-[#E5ECEE]/40 dark:bg-[#07161A]">
      {/* Sticky Cinematic Viewport: fill available height below navbar without clipping cards */}
      <div className="sticky top-[125px] h-[calc(100vh-125px)] min-h-[620px] w-full flex flex-col justify-between pt-4 pb-6 px-4 sm:px-6 lg:px-12 overflow-hidden">
        {/* Parallax Shopping Visual Strip */}
        <motion.div
          style={{ x: bgImageX, opacity: bgImageOpacity }}
          className="pointer-events-none absolute top-1/2 -translate-y-1/2 left-0 flex items-center gap-8 whitespace-nowrap z-0"
        >
          <div className="flex items-center gap-6 sm:gap-12">
            <span className="text-[14vw] sm:text-[11vw] font-serif font-black tracking-tight text-[#0E4A57]/30 dark:text-[#D9B65F]/45 uppercase drop-shadow-[0_2px_12px_rgba(217,182,95,0.3)]">
              VELLORA
            </span>
            <div className="relative h-28 w-44 sm:h-40 sm:w-64 rounded-3xl overflow-hidden shadow-2xl opacity-80 border border-[#D9B65F]/40 shrink-0">
              <Image
                src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&auto=format&fit=crop&q=80"
                alt="Shopping Visual"
                fill
                className="object-cover"
              />
            </div>
            <span className="text-[14vw] sm:text-[11vw] font-sans font-extrabold tracking-widest text-[#1E8C9B]/40 dark:text-[#22D3EE]/55 uppercase drop-shadow-[0_2px_12px_rgba(34,211,238,0.3)]">
              COLLECTION
            </span>
            <div className="relative h-28 w-44 sm:h-40 sm:w-64 rounded-3xl overflow-hidden shadow-2xl opacity-80 border border-[#1E8C9B]/40 shrink-0">
              <Image
                src="https://images.unsplash.com/photo-1498049794561-7780e7231661?w=800&auto=format&fit=crop&q=80"
                alt="Hardware Visual"
                fill
                className="object-cover"
              />
            </div>
            <span className="text-[14vw] sm:text-[11vw] font-serif font-black tracking-tight text-[#0E4A57]/30 dark:text-[#D9B65F]/45 uppercase drop-shadow-[0_2px_12px_rgba(217,182,95,0.3)]">
              2026
            </span>
          </div>
        </motion.div>

        {/* Top Header Floating Badge & Headline */}
        <motion.div
          style={{ opacity: headlineOpacity, y: headlineY }}
          className="relative z-20 flex flex-col items-center text-center max-w-4xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-[#D9B65F]/40 bg-white/80 dark:bg-[#0F282F]/80 backdrop-blur-md px-4 py-1 text-xs font-semibold text-[#0E4A57] dark:text-[#D9B65F] shadow-sm mb-2">
            <Sparkles className="h-3.5 w-3.5 text-[#D9B65F]" />
            <span>Curated Indian General Store • Spring 2026 Collection</span>
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold font-serif tracking-tight text-[#0E4A57] dark:text-white leading-[1.08]">
            GEAR UP EVERY SEASON.<br />
            <span className="font-sans font-light italic tracking-normal text-[#1E8C9B] dark:text-[#D9B65F]">
              ELEVATE EVERY MOMENT.
            </span>
          </h1>

          <p className="mt-2 text-xs sm:text-sm text-[#727B83] dark:text-[#A2AAB0] max-w-md font-medium">
            Certified electronics, natural tailored apparel, and timeless interior architecture.
          </p>

          <div className="mt-3 flex items-center gap-3">
            <Link href="/shop">
              <Button size="sm" className="rounded-full bg-[#0E4A57] text-white hover:bg-[#1E8C9B] px-5 py-1.5 h-8 text-xs shadow-md shadow-[#0E4A57]/20">
                Explore Catalog
                <ArrowRight className="ml-1.5 h-3.5 w-3.5 text-[#D9B65F]" />
              </Button>
            </Link>
            <Link href="/category/clothing">
              <Button size="sm" variant="outline" className="rounded-full bg-white/80 dark:bg-[#0F282F]/80 backdrop-blur-md border-[#DFD9CE] dark:border-[#224C57] px-5 py-1.5 h-8 text-xs">
                Apparel Lookbook
              </Button>
            </Link>
          </div>
        </motion.div>

        {/* Central Dynamic Stage with Triple Triptych Cards */}
        <div className="relative z-10 mx-auto w-full max-w-6xl flex-1 flex items-center justify-center py-2">
          {/* Left Supporting Card (Flies in from left on scroll) */}
          <motion.div
            style={{ x: leftCardX, opacity: leftCardOpacity }}
            className="hidden md:block w-56 lg:w-64 h-[300px] lg:h-[340px] rounded-3xl overflow-hidden border border-[#DFD9CE] dark:border-[#224C57] bg-white dark:bg-[#0F282F] shadow-xl relative group -mr-6 z-10 transform -rotate-2 hover:rotate-0 transition-transform duration-300 shrink-0"
          >
            <Image
              src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&auto=format&fit=crop&q=80"
              alt="Tailored Linen Look"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent flex flex-col justify-end p-4 text-white">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#D9B65F]">Atelier Apparel</span>
              <p className="text-xs font-semibold">Natural French Flax Linen</p>
              <p className="text-[10px] text-white/70">From ₹4,490</p>
            </div>
          </motion.div>

          {/* Center Main Hero Card */}
          <motion.div
            style={{ scale: heroCardScale, y: heroCardY }}
            className="relative w-72 sm:w-84 lg:w-96 h-[340px] sm:h-[370px] lg:h-[400px] rounded-3xl overflow-hidden border-2 border-white/90 dark:border-[#224C57] bg-white dark:bg-[#0F282F] shadow-2xl z-20 group shrink-0"
          >
            <Image
              src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=900&auto=format&fit=crop&q=80"
              alt="Vellora Aura Spatial ANC Headphones"
              fill
              priority
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />

            {/* Badges and overlay */}
            <div className="absolute top-3.5 left-3.5 z-20">
              <span className="rounded-full bg-[#0E4A57]/90 backdrop-blur-md px-3 py-1 text-[10px] font-bold text-[#D9B65F]">
                2026 Flagship Showcase
              </span>
            </div>

            <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-[#0E4A57] via-[#0E4A57]/70 to-transparent p-5 text-white z-20">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#D9B65F]">
                  Hi-Fi Spatial Audio
                </span>
                <span className="rounded-full bg-[#D9B65F] px-2 py-0.5 text-[9px] font-bold text-[#0E4A57]">
                  SAVE 20%
                </span>
              </div>
              <h3 className="text-sm sm:text-base font-bold font-serif line-clamp-1">Vellora Aura Spatial ANC Headphones</h3>
              <div className="mt-1.5 flex items-baseline justify-between">
                <div className="flex items-baseline gap-2">
                  <span className="text-lg font-bold font-mono text-[#D9B65F]">₹27,990</span>
                  <span className="text-xs text-white/60 line-through">₹34,990</span>
                </div>
                <Link href="/product/vellora-aura-spatial-anc-headphones-1" className="relative z-30">
                  <Button size="sm" className="bg-white text-[#0E4A57] hover:bg-[#F3E5BC] font-semibold text-xs px-3 py-1 h-7 rounded-xl shadow-md cursor-pointer">
                    View Product
                    <ChevronRight className="ml-1 h-3 w-3" />
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>

          {/* Right Supporting Card (Flies in from right on scroll) */}
          <motion.div
            style={{ x: rightCardX, opacity: rightCardOpacity }}
            className="hidden md:block w-56 lg:w-64 h-[300px] lg:h-[340px] rounded-3xl overflow-hidden border border-[#DFD9CE] dark:border-[#224C57] bg-white dark:bg-[#0F282F] shadow-xl relative group -ml-6 z-10 transform rotate-2 hover:rotate-0 transition-transform duration-300 shrink-0"
          >
            <Image
              src="https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=800&auto=format&fit=crop&q=80"
              alt="Architectural Ergonomic Living"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent flex flex-col justify-end p-4 text-white">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#D9B65F]">Architectural Living</span>
              <p className="text-xs font-semibold">AeroMesh Ergonomic Chair</p>
              <p className="text-[10px] text-white/70">From ₹18,490</p>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator Prompt */}
        <div className="relative z-20 flex items-center justify-between text-[11px] text-[#727B83] dark:text-[#A2AAB0] border-t border-[#DFD9CE]/60 dark:border-[#224C57]/60 pt-2.5 max-w-6xl mx-auto w-full">
          <div className="flex items-center gap-2">
            <span className="inline-block h-2 w-2 rounded-full bg-[#1F9D6B] animate-pulse" />
            <span>Scroll down to explore department collections & curated trends</span>
          </div>
          <div className="hidden sm:flex items-center gap-4">
            <span>Verified 100% Genuine</span>
            <span>•</span>
            <span>Insured Shipping Across India</span>
          </div>
        </div>
      </div>
    </div>
  );
}
