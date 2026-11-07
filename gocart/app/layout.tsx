import type { Metadata } from 'next';
import { Playfair_Display, Inter } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { LenisProvider } from '@/components/layout/LenisProvider';
import { Toaster } from 'react-hot-toast';
import { PWAInstallPrompt } from '@/components/ui/PWAInstallPrompt';

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '600', '700', '800'],
  variable: '--font-playfair',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'Vellora — General Shopping',
  description: 'Premium customer shopping destination featuring consumer electronics, fine apparel, furniture, and wellness essentials.',
  manifest: '/manifest.json',
  themeColor: '#0E4A57',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Vellora',
  },
  icons: {
    icon: '/icon-192.png',
    apple: '/icon-192.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${playfair.variable} ${inter.variable} font-sans antialiased min-h-screen flex flex-col bg-[#F8F6F1] text-[#2B2F33] dark:bg-[#0A1D22] dark:text-[#F8F6F1]`}>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                var storedTheme = localStorage.getItem('vellora_theme');
                var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                if (storedTheme === 'dark' || (!storedTheme && prefersDark)) {
                  document.documentElement.classList.add('dark');
                } else {
                  document.documentElement.classList.remove('dark');
                }
              } catch (e) {}
            `,
          }}
        />
        <LenisProvider>
          <Toaster position="bottom-right" />
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <PWAInstallPrompt />
        </LenisProvider>
      </body>
    </html>
  );
}
