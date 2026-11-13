# GoCart456 / Vellora

This repository hosts **Vellora** (formerly GoCart), a modern full-stack e-commerce storefront for premium shopping across electronics, apparel, furniture, and wellness essentials.

The Next.js application lives in the [`gocart/`](./gocart) directory and is deployed to Netlify from that folder.

## 🛍️ About Vellora

Vellora is a multi-vendor marketplace where sellers can register, list products, and manage orders on a single platform, with dedicated dashboards for vendors and platform administrators.

Built with Next.js 16, React 19, Tailwind CSS 4, TypeScript, Prisma, PostgreSQL (Neon), and Stripe / Razorpay payments.

## 📁 Repository Layout

| Path | Purpose |
|------|---------|
| `gocart/` | Next.js application (Netlify build base) |
| `gocart/README.md` | Detailed app README (setup, tech stack, API, env vars) |
| `gocart/API_CONTRACT.md` | Vellora REST API contract specification |
| `gocart/CONTRIBUTING.md` | Contribution guidelines |
| `gocart/LICENSE.md` | MIT License |
| `netlify.toml` | Netlify build config (`base = "gocart"`) |

## 🚀 Quick Start

```bash
# Clone the repo
git clone https://github.com/chinu2004-micro/gocart456.git
cd gocart456/gocart

# Install dependencies
npm install

# Copy env vars and configure
cp .env.example .env
# edit .env with your DATABASE_URL, AUTH_SECRET, and payment keys

# Generate Prisma client and run dev server
npx prisma generate
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## 🤝 Contributing

See [`gocart/CONTRIBUTING.md`](./gocart/CONTRIBUTING.md) for the contribution workflow.

## 📜 License

MIT License — see [`gocart/LICENSE.md`](./gocart/LICENSE.md).

---

Built with ❤️ by [chinu2004-micro](https://github.com/chinu2004-micro).