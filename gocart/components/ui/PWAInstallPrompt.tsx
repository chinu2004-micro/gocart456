'use client';

import * as React from 'react';
import Image from 'next/image';
import { Download, X } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export function PWAInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = React.useState<any>(null);
  const [isDismissed, setIsDismissed] = React.useState(false);
  const [isInstalled, setIsInstalled] = React.useState(false);

  React.useEffect(() => {
    // Register service worker
    if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js').catch((err) => {
          console.error('Service worker registration failed:', err);
        });
      });
    }

    // Check if already standalone
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsInstalled(true);
      return;
    }

    const handler = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    window.addEventListener('beforeinstallprompt', handler);
    window.addEventListener('appinstalled', () => {
      setIsInstalled(true);
      setDeferredPrompt(null);
    });

    return () => {
      window.removeEventListener('beforeinstallprompt', handler);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      setIsInstalled(true);
    }
    setDeferredPrompt(null);
  };

  if (!deferredPrompt || isDismissed || isInstalled) {
    return null;
  }

  return (
    <aside aria-label="Install App" className="no-print fixed bottom-4 right-4 z-50 max-w-sm rounded-2xl border border-[#D9B65F]/40 bg-[#0E4A57] p-4 text-white shadow-2xl backdrop-blur-lg">
      <div className="flex items-start gap-3">
        <div className="relative h-12 w-12 shrink-0 rounded-xl overflow-hidden bg-white/10 p-1 border border-white/20">
          <Image
            src="/brand/vellora-mark-exact.png"
            alt="Vellora App"
            width={48}
            height={48}
            className="object-contain"
          />
        </div>
        <div className="flex-1">
          <h4 className="text-xs font-bold text-white">Install Vellora App</h4>
          <p className="mt-0.5 text-[11px] text-white/80 leading-snug">
            Fast access, offline mode & instant order notifications right from your home screen.
          </p>
          <div className="mt-3 flex items-center gap-2">
            <Button
              size="sm"
              onClick={handleInstallClick}
              className="bg-[#D9B65F] hover:bg-[#F3E5BC] text-[#0E4A57] font-bold text-xs px-3 h-7 rounded-lg"
            >
              <Download className="mr-1.5 h-3.5 w-3.5" />
              Install
            </Button>
            <button
              onClick={() => setIsDismissed(true)}
              className="text-xs text-white/70 hover:text-white px-2 py-1"
            >
              Later
            </button>
          </div>
        </div>
        <button
          onClick={() => setIsDismissed(true)}
          className="text-white/60 hover:text-white"
          aria-label="Dismiss prompt"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </aside>
  );
}

