'use client';

import * as React from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { orderService } from '@/services/velloraServices';
import { CheckCircle2, Package, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { ProfessionalInvoice } from '@/components/catalog/ProfessionalInvoice';

export default function OrderSuccessPage() {
  const params = useParams();
  const orderId = (params?.id as string) || 'VEL-2611-000123';
  const order = orderService.getOrderById(orderId);

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 text-center sm:px-6 lg:px-8">
      {/* Sparkle Badge */}
      <div className="no-print">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-[#EAF8F1] text-[#1F9D6B] shadow-xl shadow-[#1F9D6B]/10">
          <CheckCircle2 className="h-10 w-10" />
        </div>

        <div className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold text-[#D9B65F]">
          <Sparkles className="h-4 w-4" />
          <span>Vellora Verified Purchase</span>
        </div>

        <h1 className="mt-2 text-3xl font-bold font-serif text-[#0E4A57] dark:text-white sm:text-4xl">
          Order Confirmed
        </h1>
        <p className="mt-2 text-xs text-[#727B83] max-w-md mx-auto">
          Your order has been authorized and dispatched to our regional distribution hub in Indiranagar, Bengaluru.
        </p>
      </div>

      {/* Professional Tax Invoice Component */}
      <div className="mt-8">
        {order ? (
          <ProfessionalInvoice order={order} showPrintButton={true} />
        ) : (
          <div className="p-8 text-center text-sm text-[#727B83]">Order details unavailable.</div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="no-print mt-10 flex flex-wrap items-center justify-center gap-4">
        <Link href="/profile/orders">
          <Button size="lg" className="bg-[#0E4A57] hover:bg-[#1E8C9B] text-white">
            <Package className="mr-2 h-4 w-4 text-[#D9B65F]" />
            Track Real-time Delivery
          </Button>
        </Link>
        <Link href="/shop">
          <Button variant="outline" size="lg">
            Continue Shopping
          </Button>
        </Link>
      </div>
    </div>
  );
}
