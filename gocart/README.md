<div align="center">

<h1>
  <img src="https://gocart-gs.vercel.app/favicon.ico" width="26" height="26" alt="Vellora Favicon" />
  Vellora
</h1>
<p><b>Premium customer shopping destination — electronics, apparel, furniture and wellness.</b></p>

<p>
  <a href="https://github.com/chinu2004-micro/gocart456/blob/main/gocart/LICENSE.md"><img src="https://img.shields.io/github/license/chinu2004-micro/gocart456?style=for-the-badge" alt="License"/></a>
  <a href="https://github.com/chinu2004-micro/gocart456/pulls"><img src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=for-the-badge" alt="PRs Welcome"/></a>
  <a href="https://github.com/chinu2004-micro/gocart456/issues"><img src="https://img.shields.io/github/issues/chinu2004-micro/gocart456?style=for-the-badge" alt="GitHub issues"/></a>
  <a href="https://github.com/chinu2004-micro/gocart456/stargazers"><img src="https://img.shields.io/github/stars/chinu2004-micro/gocart456?style=for-the-badge" alt="Stars"/></a>
  <a href="https://github.com/chinu2004-micro/gocart456/network/members"><img src="https://img.shields.io/github/forks/chinu2004-micro/gocart456?style=for-the-badge" alt="Forks"/></a>
</p>

</div>

---

## 📖 Table of Contents

- [🛍️ About Vellora](#-about-vellora)
- [✨ Features](#-features)
- [🛠️ Tech Stack](#-tech-stack)
- [📁 Project Structure](#-project-structure)
- [🗄️ Database Schema](#-database-schema)
- [🔌 API Contract](#-api-contract)
- [🚀 Getting Started](#-getting-started)
- [⚙️ Environment Variables](#-environment-variables)
- [☁️ Deployment](#-deployment)
- [🤝 Contributing](#-contributing)
- [📜 License](#-license)

---

## 🛍️ About Vellora

**Vellora** is a modern, full-stack e-commerce storefront built for premium shopping across consumer electronics, fine apparel, furniture, and wellness essentials. It supports a multi-vendor marketplace model where multiple sellers can register, list products, and manage orders on a single platform, with dedicated dashboards for vendors and platform administrators.

Built with Next.js 16, React 19, Tailwind CSS 4, TypeScript, Prisma, PostgreSQL (Neon), and integrated Stripe / Razorpay payments.

---

## ✨ Features

- **Multi-Vendor Marketplace** — Vendors register, manage their own products, inventory, and orders; admins oversee vendors, commissions, and payouts.
- **Customer Storefront** — Responsive UI with cinematic hero, department tiles, featured and trending products, search, filters, and product details.
- **Shopping Cart and Checkout** — Cart with multi-vendor items, coupon validation, tax and shipping calculation, guest and authenticated checkout.
- **Payments** — Stripe, Razorpay, and Cash on Delivery (COD); webhook handling; order tracking timeline.
- **Orders and Tracking** — Order placement, status flow (placed to processing to shipped to delivered), cancellation and returns, itemized invoices (PDF via jspdf).
- **Reviews and Ratings** — Product reviews, seller replies, ratings histogram, wishlist.
- **Vendor Dashboard** — Store profile, product management, sales analytics, payouts, follower management.
- **Admin Panel** — Vendor and store approval, product and order oversight, audit logs.
- **PWA Ready** — Web app manifest, service worker, install prompt, offline icons.
- **Dark Mode** — System-preference-aware theme with manual override.
- **Performance** — Smooth scroll (Lenis), motion animations (Motion.js), optimistic UI, Next.js Image optimization.

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | Next.js 16.3 (App Router, Turbopack) |
| UI Library | React 19.2 |
| Styling | Tailwind CSS 4 |
| Language | TypeScript |
| ORM / Database | Prisma 6.4 + PostgreSQL (Neon) |
| Auth | NextAuth / Auth.js (JWT) |
| Payments | Stripe, Razorpay, COD |
| State Management | Redux Toolkit, Zustand |
| Server State | TanStack React Query v5 |
| Forms | React Hook Form + Zod |
| Animations | Motion.js, Lenis |
| Icons | Lucide React |
| Charts | Recharts |
| PDF | jspdf |
| Linting | Next.js ESLint |
| Deployment | Netlify |

---

## 📁 Project Structure

```
gocart/                      # Next.js application (deployed by Netlify)
├── app/                     # Next.js App Router pages & API routes
│   ├── (public)/            # Customer storefront routes
│   ├── api/                 # Serverless API routes (auth, cart, orders, products, user)
│   └── design-system/       # Design-system showcase page
├── components/              # React components (ui, layout, catalog, cart, auth)
├── lib/                     # Prisma client, auth, validations, stores, utils
├── prisma/                  # Prisma schema & migrations
├── public/                  # Static assets (icons, images, manifest, sw.js)
├── services/                # Seed data, Vellora services, public-data fetchers
├── schemas/                 # Vellora schema definitions
├── styles/                  # Design tokens (CSS)
├── types/                   # TypeScript type definitions
├── .env.example             # Example environment variables
├── next.config.mjs          # Next.js configuration
├── package.json             # Dependencies & scripts
├── tailwind.config.ts       # Tailwind configuration
└── tsconfig.json            # TypeScript configuration
```

---

## 🗄️ Database Schema

The app uses **Prisma ORM** with **PostgreSQL (Neon)**. Core models include `User`, `Store`, `Product`, `Category`, `Brand`, `Order`, `OrderItem`, `CartItem`, `Coupon`, `Review`, `Rating`, `Payment`, `Payout`, `Banner`, `Follow`, `Address`, `WishlistItem`, and `AuditLog`.

Enums: `Role` (BUYER / SELLER / ADMIN), `OrderStatus`, `PaymentMethod` (COD / STRIPE / RAZORPAY), `StoreStatus`.

Money is stored strictly as 64-bit integer **minor units** (INR paise: ₹1.00 = 100 paise). See `prisma/schema.prisma` for the full schema.

---

## 🔌 API Contract

The full REST API contract is documented in [`API_CONTRACT.md`](./API_CONTRACT.md). Key areas:

- **Auth & Profile** — register, login, forgot-password, profile CRUD, addresses
- **Catalog** — category tree, products (list/detail/autocomplete), search with filters
- **Cart & Coupons** — coupon validation
- **Orders** — checkout, list orders, order detail/tracking, cancel, return

The contract is backend-agnostic and ready for Node.js / Java Spring / Go services.

---

## 🚀 Getting Started

### Prerequisites
- Node.js 20+
- npm / yarn / pnpm / bun
- PostgreSQL database (Neon recommended) — set `DATABASE_URL`

### Installation

```bash
# Clone the repo
git clone https://github.com/chinu2004-micro/gocart456.git
cd gocart456/gocart

# Install dependencies
npm install

# Generate Prisma client
npx prisma generate

# Copy env vars and configure
cp .env.example .env
# Edit .env with your DATABASE_URL, AUTH_SECRET, NEXTAUTH_URL, and Stripe/Razorpay keys
```

### Run the dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Other scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start dev server with Turbopack |
| `npm run build` | Generate Prisma client + build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run Next.js ESLint |

---

## ⚙️ Environment Variables

Copy `.env.example` to `.env` and fill in the values:

| Variable | Description | Example |
|----------|-------------|---------|
| `DATABASE_URL` | PostgreSQL connection string (Neon / Supabase / local) | `postgresql://...` |
| `AUTH_SECRET` | NextAuth JWT secret (32+ chars) | `gocart_...` |
| `NEXTAUTH_URL` | Auth callback URL | `http://localhost:3000` |
| `NEXT_PUBLIC_CURRENCY_SYMBOL` | Currency symbol | `₹` |
| `NEXT_PUBLIC_APP_NAME` | App name | `GoCart` |
| `NEXT_PUBLIC_APP_URL` | App base URL | `http://localhost:3000` |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Stripe publishable key | `pk_test_...` |
| `STRIPE_SECRET_KEY` | Stripe secret key | `sk_test_...` |
| `STRIPE_WEBHOOK_SECRET` | Stripe webhook secret | `whsec_...` |
| `NEXT_PUBLIC_RAZORPAY_KEY_ID` | Razorpay key ID | `rzp_test_...` |
| `RAZORPAY_KEY_SECRET` | Razorpay secret key | `rzp_secret_...` |

Never commit `.env`. See `.env.example` for the full template.

---

## ☁️ Deployment

The app is deployed on **Netlify** from the `gocart/` directory.

Build settings (`netlify.toml`):
- Base directory: `gocart`
- Build command: `npm run build` (runs `prisma generate && next build`)
- Publish directory: `.next`

Add all environment variables in Netlify site settings before deploying.

---

## 🤝 Contributing

We welcome contributions! See [`CONTRIBUTING.md](./CONTRIBUTING.md)` for the full workflow.

1. Fork the repo
2. Create a branch (`git checkout -b feature/your-feature`)
3. Make your changes
4. Commit and push
5. Open a Pull Request

Please follow the [Code of Conduct](./CODE_OF_CONDUCT.md).

---

## 📜 License

This project is licensed under the MIT License. See [`LICENSE.md](./LICENSE.md)` for details.
