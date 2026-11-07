'use client';

import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { orderService } from '@/services/velloraServices';
import { formatINR } from '@/lib/utils';
import { Order } from '@/types/vellora';
import { useAuthStore } from '@/lib/stores/useAuthStore';
import { Package, Truck, CheckCircle2, RotateCcw, XCircle, ArrowRight, Printer, X, Lock } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { ProfessionalInvoice } from '@/components/catalog/ProfessionalInvoice';
import { toast } from 'react-hot-toast';

export default function ProfileOrdersPage() {
  const { isAuthenticated, openLoginModal } = useAuthStore();
  const [orders, setOrders] = React.useState<Order[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [statusFilter, setStatusFilter] = React.useState<string>('ALL');
  const [selectedInvoiceOrder, setSelectedInvoiceOrder] = React.useState<Order | null>(null);

  const fetchOrders = React.useCallback(async () => {
    if (!isAuthenticated) {
      setOrders([]);
      setIsLoading(false);
      return;
    }
    setIsLoading(true);
    try {
      const res = await fetch('/api/orders');
      if (res.ok) {
        const data = await res.json();
        setOrders(data.orders || []);
      } else {
        setOrders([]);
      }
    } catch (e) {
      setOrders([]);
    } finally {
      setIsLoading(false);
    }
  }, [isAuthenticated]);

  React.useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  const handleCancel = (id: string) => {
    const success = orderService.cancelOrder(id);
    if (success) {
      toast.success('Order cancelled. Refund initiated.');
      setOrders([...orderService.getOrders()]);
    } else {
      toast.error('Order can only be cancelled before dispatch.');
    }
  };

  const handleReturn = (id: string) => {
    const success = orderService.requestReturn(id);
    if (success) {
      toast.success('Return requested. Doorstep inspection scheduled.');
      setOrders([...orderService.getOrders()]);
    } else {
      toast.error('Returns are available only after delivery.');
    }
  };

  const filteredOrders = statusFilter === 'ALL' ? orders : orders.filter((o) => o.status === statusFilter);

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="orders-page-content">
        {/* Title */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-[#DFD9CE] pb-6 dark:border-[#224C57] gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#1E8C9B] dark:text-[#D9B65F]">
            Order Management & Timeline
          </span>
          <h1 className="mt-1 text-3xl font-bold font-serif text-[#0E4A57] dark:text-white">
            My Orders
          </h1>
          <p className="mt-1 text-xs text-[#727B83]">
            Track delivery progress, download GST invoices, and request hassle-free returns.
          </p>
        </div>

        {/* Status Filter */}
        <div className="flex items-center gap-2">
          {['ALL', 'SHIPPED', 'DELIVERED', 'PLACED'].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                statusFilter === st
                  ? 'bg-[#0E4A57] text-white shadow-sm'
                  : 'bg-white border border-[#DFD9CE] text-[#727B83] hover:text-[#2B2F33] dark:bg-[#0F282F] dark:border-[#224C57]'
              }`}
            >
              {st === 'ALL' ? 'All Orders' : st}
            </button>
          ))}
        </div>
      </div>

      {/* Orders List */}
      <div className="mt-8 space-y-6">
        {!isAuthenticated ? (
          <div className="text-center py-16 rounded-3xl border border-dashed border-[#DFD9CE] p-10 bg-white dark:bg-[#0F282F] dark:border-[#224C57]">
            <Lock className="h-10 w-10 text-[#0E4A57] dark:text-[#D9B65F] mx-auto" />
            <h3 className="mt-3 text-base font-bold text-[#2B2F33] dark:text-[#F8F6F1]">Sign in to view orders</h3>
            <p className="text-xs text-[#727B83] mt-1 max-w-sm mx-auto">
              You must be logged in to access your private order history, track shipments, or download invoices.
            </p>
            <Button
              onClick={() => openLoginModal('login')}
              className="mt-5 bg-[#0E4A57] text-white hover:bg-[#1E8C9B]"
            >
              Sign In to Your Account
            </Button>
          </div>
        ) : isLoading ? (
          <div className="text-center py-16 rounded-3xl border border-dashed border-[#DFD9CE] p-10">
            <Package className="h-10 w-10 text-[#A2AAB0] mx-auto animate-pulse" />
            <h3 className="mt-3 text-base font-bold text-[#2B2F33] dark:text-[#F8F6F1]">Loading your orders...</h3>
          </div>
        ) : filteredOrders.length === 0 ? (
          <div className="text-center py-16 rounded-3xl border border-dashed border-[#DFD9CE] p-10">
            <Package className="h-10 w-10 text-[#A2AAB0] mx-auto" />
            <h3 className="mt-3 text-base font-bold text-[#2B2F33] dark:text-[#F8F6F1]">No orders found</h3>
            <p className="text-xs text-[#727B83] mt-1">You have no orders matching this filter status.</p>
          </div>
        ) : (
          filteredOrders.map((order) => (
            <div
              key={order.id}
              className="overflow-hidden rounded-3xl border border-[#DFD9CE] bg-white shadow-sm dark:border-[#224C57] dark:bg-[#0F282F]"
            >
              {/* Order Card Header */}
              <div className="flex flex-wrap items-center justify-between border-b border-[#ECE8E0] bg-[#F8F6F1]/70 px-6 py-4 dark:border-[#16363F] dark:bg-[#16363F]/50 text-xs gap-4">
                <div className="flex items-center gap-6">
                  <div>
                    <span className="block text-[10px] font-bold uppercase tracking-wider text-[#727B83]">Order Reference</span>
                    <span className="font-mono font-bold text-[#0E4A57] dark:text-[#D9B65F]">#{order.id}</span>
                  </div>
                  <div>
                    <span className="block text-[10px] font-bold uppercase tracking-wider text-[#727B83]">Grand Total</span>
                    <span className="font-extrabold text-[#2B2F33] dark:text-[#F8F6F1]">{formatINR(order.grandTotal)}</span>
                  </div>
                  <div>
                    <span className="block text-[10px] font-bold uppercase tracking-wider text-[#727B83]">Delivery Option</span>
                    <span className="font-semibold text-[#1E8C9B]">{order.deliveryOption}</span>
                  </div>
                </div>

                <div>
                  <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold ${
                    order.status === 'DELIVERED'
                      ? 'bg-[#EAF8F1] text-[#1F9D6B]'
                      : order.status === 'CANCELLED'
                      ? 'bg-[#FBECEE] text-[#D1495B]'
                      : 'bg-[#FDF7EA] text-[#E0A526]'
                  }`}>
                    {order.status}
                  </span>
                </div>
              </div>

              {/* Items in this order */}
              <div className="p-6 divide-y divide-[#ECE8E0] dark:divide-[#16363F]">
                {order.items.map((it, idx) => (
                  <div key={idx} className="flex items-center justify-between py-4 first:pt-0 last:pb-0 gap-4">
                    <div className="flex items-center gap-4">
                      <div className="relative h-16 w-16 overflow-hidden rounded-xl bg-[#F8F6F1] dark:bg-[#16363F] shrink-0">
                        <Image src={it.productImage} alt={it.productName} fill className="object-cover" />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-[#2B2F33] dark:text-[#F8F6F1]">{it.productName}</h4>
                        {it.variantName && <p className="text-[11px] text-[#727B83]">Edition: {it.variantName}</p>}
                        <p className="mt-1 text-xs font-extrabold text-[#0E4A57] dark:text-[#D9B65F]">
                          {it.quantity}x {formatINR(it.unitPrice)}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      {order.status === 'PLACED' && (
                        <Button onClick={() => handleCancel(order.id)} variant="outline" size="sm" className="text-[#D1495B] border-[#D1495B]/30 hover:bg-[#FBECEE]">
                          Cancel Order
                        </Button>
                      )}
                      {order.status === 'DELIVERED' && (
                        <Button onClick={() => handleReturn(order.id)} variant="outline" size="sm">
                          <RotateCcw className="mr-1.5 h-3.5 w-3.5" />
                          Request Return
                        </Button>
                      )}
                      <Button onClick={() => setSelectedInvoiceOrder(order)} variant="secondary" size="sm">
                        <Printer className="mr-1.5 h-3.5 w-3.5" />
                        Tax Invoice
                      </Button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Tracking Event Timeline */}
              <div className="bg-[#F8F6F1]/50 p-6 border-t border-[#ECE8E0] dark:border-[#16363F] dark:bg-[#16363F]/30">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#0E4A57] dark:text-[#D9B65F] mb-3">
                  Live Dispatch Timeline
                </h4>
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
                  {order.trackingEvents?.map((ev, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <div className={`flex h-6 w-6 items-center justify-center rounded-full text-[10px] font-bold ${
                        ev.completed ? 'bg-[#1F9D6B] text-white' : 'bg-[#DFD9CE] text-[#727B83]'
                      }`}>
                        {i + 1}
                      </div>
                      <div>
                        <span className={`block font-bold ${ev.completed ? 'text-[#2B2F33] dark:text-[#F8F6F1]' : 'text-[#A2AAB0]'}`}>
                          {ev.title}
                        </span>
                        <span className="text-[10px] text-[#727B83]">{ev.timestamp}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      </div>

      {/* Invoice Modal Overlay */}
      {selectedInvoiceOrder && (
        <div id="print-tax-invoice-modal" className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto print:p-0 print:bg-transparent print:static print:inset-auto print:overflow-visible">
          <div className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto rounded-3xl bg-transparent print:max-h-none print:overflow-visible print:max-w-none print:w-full">
            <button
              onClick={() => setSelectedInvoiceOrder(null)}
              className="no-print absolute top-3 right-3 z-10 rounded-full bg-[#0E4A57] p-2 text-white shadow-md hover:bg-[#1E8C9B] transition-colors"
              aria-label="Close invoice"
            >
              <X className="h-5 w-5" />
            </button>
            <ProfessionalInvoice order={selectedInvoiceOrder} showPrintButton={true} />
          </div>
        </div>
      )}
    </div>
  );
}

