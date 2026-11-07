'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { useCartStore } from '@/lib/stores/useCartStore';
import { useAuthStore } from '@/lib/stores/useAuthStore';
import { orderService } from '@/services/velloraServices';
import { formatINR, validateLuhn, detectCardBrand } from '@/lib/utils';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { ShieldCheck, CreditCard, Banknote, QrCode, Lock, CheckCircle2, ArrowRight, Tag, Sparkles } from 'lucide-react';
import { toast } from 'react-hot-toast';
import confetti from 'canvas-confetti';

export default function CheckoutPage() {
  const router = useRouter();
  const { items, appliedCoupon, applyCouponCode, removeCoupon, getSubtotalPaise, getDiscountPaise, getGstPaise, getShippingPaise, getGrandTotalPaise, clearCart } = useCartStore();
  const { user, isAuthenticated, openLoginModal } = useAuthStore();

  const [couponCodeInput, setCouponCodeInput] = React.useState('');

  const [currentStep, setCurrentStep] = React.useState<1 | 2 | 3 | 4>(1);
  const [deliveryOption, setDeliveryOption] = React.useState<'Standard' | 'Express' | 'Scheduled'>('Standard');
  const [paymentMethod, setPaymentMethod] = React.useState<'Card' | 'UPI' | 'NetBanking' | 'COD'>('Card');
  const [isProcessing, setIsProcessing] = React.useState(false);
  const [simulateFailure, setSimulateFailure] = React.useState(false);

  // Address - defaults empty so user inputs their own details manually
  const [address, setAddress] = React.useState({
    name: user?.name || '',
    contact: user?.contact || '',
    street: user?.addresses?.[0]?.street || '',
    city: user?.addresses?.[0]?.city || '',
    state: user?.addresses?.[0]?.state || '',
    pincode: user?.addresses?.[0]?.pincode || '',
    country: user?.addresses?.[0]?.country || 'India',
    isDefault: true,
  });

  // Sync address only if authenticated user loads addresses
  React.useEffect(() => {
    if (user && user.addresses && user.addresses.length > 0) {
      setAddress((prev) => ({
        ...prev,
        name: user.name || prev.name,
        contact: user.contact || prev.contact,
        street: user.addresses?.[0]?.street || prev.street,
        city: user.addresses?.[0]?.city || prev.city,
        state: user.addresses?.[0]?.state || prev.state,
        pincode: user.addresses?.[0]?.pincode || prev.pincode,
        country: user.addresses?.[0]?.country || prev.country,
      }));
    }
  }, [user]);

  // Card details - empty by default for manual user entry
  const [card, setCard] = React.useState({
    number: '',
    name: '',
    expiry: '',
    cvv: '',
  });

  // UPI - empty by default for manual user entry
  const [upiId, setUpiId] = React.useState('');

  const subtotal = getSubtotalPaise();
  const discount = getDiscountPaise();
  const gst = getGstPaise();
  const shipping = getShippingPaise();
  const grandTotal = getGrandTotalPaise();

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAuthenticated || !user) {
      toast.error('Please sign in or create an account to complete your order.');
      openLoginModal('login');
      return;
    }

    if (items.length === 0) {
      toast.error('Your cart is empty');
      return;
    }

    if (paymentMethod === 'Card') {
      const cleanNum = card.number.replace(/\s+/g, '');
      if (!validateLuhn(cleanNum)) {
        toast.error('Card number failed Luhn validation algorithm.');
        return;
      }
    }

    setIsProcessing(true);

    // Simulate payment gateway delay
    await new Promise((r) => setTimeout(r, 1800));

    if (simulateFailure) {
      setIsProcessing(false);
      toast.error('Simulated Gateway Failure: Bank declined transaction. Please retry or choose another method.');
      return;
    }

    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: items.map((it) => ({
            productId: it.product.id,
            productName: it.product.name,
            quantity: it.quantity,
            unitPrice: it.product.price,
            variantName: it.selectedVariant,
          })),
          subtotal,
          discount,
          gstAmount: gst,
          shippingFee: shipping,
          grandTotal,
          deliveryAddress: address,
          deliveryOption,
          paymentMethod,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        setIsProcessing(false);
        toast.error(data.error || 'Failed to place order in database');
        return;
      }

      try {
        confetti({ particleCount: 90, spread: 70, origin: { y: 0.6 } });
      } catch (e) {}

      clearCart();
      toast.success('Order placed and saved to your account!');
      router.push(`/order-success/${data.order.id}`);
    } catch (err) {
      setIsProcessing(false);
      toast.error('Network error while processing order.');
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Title & Progress Bar */}
      <div className="mb-10">
        {!isAuthenticated && (
          <div className="mb-6 rounded-2xl border border-[#D9B65F]/40 bg-[#D9B65F]/10 p-4 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-[#0E4A57] dark:text-[#F8F6F1]">
            <div className="flex items-center gap-3">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#0E4A57] text-[#D9B65F] font-bold">
                !
              </span>
              <div>
                <p className="font-bold text-sm">Account Required for Checkout</p>
                <p className="text-[11px] opacity-90">Please sign in or create a membership account to save your order, warranty, and delivery addresses.</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button type="button" size="sm" variant="outline" onClick={() => openLoginModal('login')}>
                Sign In
              </Button>
              <Button type="button" size="sm" className="bg-[#0E4A57] text-white hover:bg-[#1E8C9B]" onClick={() => openLoginModal('register')}>
                Register Account
              </Button>
            </div>
          </div>
        )}
        <div className="flex items-center gap-2 mb-2">
          <Lock className="h-4 w-4 text-[#0E4A57] dark:text-[#D9B65F]" />
          <span className="text-xs font-bold uppercase tracking-wider text-[#0E4A57] dark:text-[#D9B65F]">
            256-Bit Encrypted Multi-Step Checkout
          </span>
        </div>
        <h1 className="text-3xl font-bold font-serif text-[#0E4A57] dark:text-white">
          Complete Your Purchase
        </h1>

        {/* Animated Progress Steps */}
        <div className="mt-6 flex items-center justify-between max-w-2xl text-xs font-bold">
          <div className="flex items-center gap-2 text-[#0E4A57] dark:text-[#D9B65F]">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#0E4A57] text-white text-[11px]">1</span>
            <span>Delivery Address</span>
          </div>
          <div className="h-0.5 flex-1 mx-4 bg-[#DFD9CE] dark:bg-[#224C57]" />
          <div className="flex items-center gap-2 text-[#0E4A57] dark:text-[#D9B65F]">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#0E4A57] text-white text-[11px]">2</span>
            <span>Shipping Option</span>
          </div>
          <div className="h-0.5 flex-1 mx-4 bg-[#DFD9CE] dark:bg-[#224C57]" />
          <div className="flex items-center gap-2 text-[#0E4A57] dark:text-[#D9B65F]">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#0E4A57] text-white text-[11px]">3</span>
            <span>Payment</span>
          </div>
        </div>
      </div>

      <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-8 space-y-8">
          {/* Step 1: Address */}
          <div className="rounded-3xl border border-[#DFD9CE] bg-white p-6 shadow-sm dark:border-[#224C57] dark:bg-[#0F282F] space-y-4">
            <h2 className="text-base font-bold font-serif text-[#0E4A57] dark:text-white">
              1. Delivery Address (India)
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-bold text-[#2B2F33] dark:text-[#DFD9CE] mb-1">Full Name</label>
                <Input value={address.name} onChange={(e) => setAddress({ ...address, name: e.target.value })} required />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-[#2B2F33] dark:text-[#DFD9CE] mb-1">Phone (+91)</label>
                <Input value={address.contact} onChange={(e) => setAddress({ ...address, contact: e.target.value })} required />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-[11px] font-bold text-[#2B2F33] dark:text-[#DFD9CE] mb-1">Street Address</label>
                <Input value={address.street} onChange={(e) => setAddress({ ...address, street: e.target.value })} required />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-[#2B2F33] dark:text-[#DFD9CE] mb-1">City</label>
                <Input value={address.city} onChange={(e) => setAddress({ ...address, city: e.target.value })} required />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-[#2B2F33] dark:text-[#DFD9CE] mb-1">State</label>
                <Input value={address.state} onChange={(e) => setAddress({ ...address, state: e.target.value })} required />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-[#2B2F33] dark:text-[#DFD9CE] mb-1">Pincode (6-Digits)</label>
                <Input value={address.pincode} onChange={(e) => setAddress({ ...address, pincode: e.target.value })} required />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-[#2B2F33] dark:text-[#DFD9CE] mb-1">Country</label>
                <Input value={address.country} disabled />
              </div>
            </div>
          </div>

          {/* Step 2: Delivery Option */}
          <div className="rounded-3xl border border-[#DFD9CE] bg-white p-6 shadow-sm dark:border-[#224C57] dark:bg-[#0F282F] space-y-4">
            <h2 className="text-base font-bold font-serif text-[#0E4A57] dark:text-white">
              2. Shipping Speed
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { title: 'Standard Delivery', time: '3-4 Business Days', fee: 'Free above ₹1,999', key: 'Standard' },
                { title: 'Vellora Express Air', time: '1-2 Days Guaranteed', fee: 'Priority Cargo', key: 'Express' },
                { title: 'Scheduled Concierge', time: 'Select Weekend Slot', fee: 'White-glove Service', key: 'Scheduled' },
              ].map((opt) => (
                <div
                  key={opt.key}
                  onClick={() => setDeliveryOption(opt.key as any)}
                  className={`cursor-pointer rounded-2xl border p-4 transition-all ${
                    deliveryOption === opt.key
                      ? 'border-[#0E4A57] bg-[#EFECE6]/50 dark:border-[#D9B65F] dark:bg-[#16363F]'
                      : 'border-[#DFD9CE] dark:border-[#224C57]'
                  }`}
                >
                  <h4 className="text-xs font-bold text-[#2B2F33] dark:text-[#F8F6F1]">{opt.title}</h4>
                  <p className="text-[11px] text-[#1E8C9B] font-semibold mt-1">{opt.time}</p>
                  <p className="text-[10px] text-[#727B83] mt-0.5">{opt.fee}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Step 3: Payment Method */}
          <div className="rounded-3xl border border-[#DFD9CE] bg-white p-6 shadow-sm dark:border-[#224C57] dark:bg-[#0F282F] space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold font-serif text-[#0E4A57] dark:text-white">
                3. Payment Details
              </h2>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="sim-fail"
                  checked={simulateFailure}
                  onChange={(e) => setSimulateFailure(e.target.checked)}
                  className="rounded accent-[#D1495B]"
                />
                <label htmlFor="sim-fail" className="text-[11px] text-[#D1495B] font-bold cursor-pointer">
                  Dev: Simulate Failure
                </label>
              </div>
            </div>

            {/* Methods */}
            <div className="flex gap-2 border-b border-[#ECE8E0] dark:border-[#16363F] pb-3">
              {(['Card', 'UPI', 'NetBanking', 'COD'] as const).map((m) => (
                <button
                  key={m}
                  type="button"
                  onClick={() => setPaymentMethod(m)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                    paymentMethod === m
                      ? 'bg-[#0E4A57] text-white shadow-sm'
                      : 'bg-[#F8F6F1] text-[#727B83] hover:text-[#2B2F33] dark:bg-[#16363F]'
                  }`}
                >
                  {m === 'Card' ? 'Credit/Debit Card' : m === 'UPI' ? 'UPI / QR' : m === 'NetBanking' ? 'Net Banking' : 'Cash on Delivery'}
                </button>
              ))}
            </div>

            {paymentMethod === 'Card' ? (
              <div className="space-y-3 pt-2">
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="text-[11px] font-bold text-[#2B2F33] dark:text-[#DFD9CE]">Card Number (Luhn Validated)</label>
                    <span className="text-[10px] font-bold text-[#0E4A57] dark:text-[#D9B65F]">{detectCardBrand(card.number)}</span>
                  </div>
                  <Input
                    icon={<CreditCard className="h-4 w-4" />}
                    placeholder="e.g. 4532 0158 9234 4242"
                    value={card.number}
                    onChange={(e) => setCard({ ...card, number: e.target.value })}
                    required
                  />
                </div>
                <div className="grid grid-cols-3 gap-3">
                  <div className="col-span-2">
                    <label className="block text-[11px] font-bold text-[#2B2F33] dark:text-[#DFD9CE] mb-1">Cardholder Name</label>
                    <Input
                      placeholder="e.g. John Doe"
                      value={card.name}
                      onChange={(e) => setCard({ ...card, name: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-[#2B2F33] dark:text-[#DFD9CE] mb-1">Expiry (MM/YY)</label>
                    <Input
                      placeholder="MM/YY"
                      value={card.expiry}
                      onChange={(e) => setCard({ ...card, expiry: e.target.value })}
                      required
                    />
                  </div>
                </div>
              </div>
            ) : paymentMethod === 'UPI' ? (
              <div className="space-y-3 pt-2">
                <label className="block text-[11px] font-bold text-[#2B2F33] dark:text-[#DFD9CE]">Virtual Payment Address (VPA)</label>
                <Input
                  icon={<QrCode className="h-4 w-4" />}
                  placeholder="e.g. yourname@okaxis"
                  value={upiId}
                  onChange={(e) => setUpiId(e.target.value)}
                  required
                />
                <p className="text-[10px] text-[#727B83]">Scan & Pay via Google Pay, PhonePe, Paytm, or BHIM.</p>
              </div>
            ) : (
              <div className="p-4 rounded-xl bg-[#F8F6F1] dark:bg-[#16363F] text-xs text-[#727B83]">
                {paymentMethod === 'COD' ? 'Pay directly via Cash or UPI at your doorstep upon delivery verification.' : 'Select your authorized banking portal upon order dispatch.'}
              </div>
            )}
          </div>
        </div>

        {/* Order Summary Column */}
        <div className="lg:col-span-4">
          <div className="rounded-3xl border border-[#DFD9CE] bg-white p-6 shadow-sm dark:border-[#224C57] dark:bg-[#0F282F] space-y-6">
            <h2 className="text-base font-bold font-serif text-[#0E4A57] dark:text-white">
              Order Summary ({items.length} items)
            </h2>

            <div className="space-y-3 max-h-56 overflow-y-auto pr-1">
              {items.map((it) => (
                <div key={it.id} className="flex justify-between items-center text-xs">
                  <span className="truncate max-w-[170px] font-medium text-[#2B2F33] dark:text-[#DFD9CE]">
                    {it.quantity}x {it.product.name}
                  </span>
                  <span className="font-bold text-[#0E4A57] dark:text-[#D9B65F]">
                    {formatINR(it.product.price * it.quantity)}
                  </span>
                </div>
              ))}
            </div>

            {/* Promo Code Input & Auto-Applied Badge */}
            <div className="space-y-2 pt-2 border-t border-[#ECE8E0] dark:border-[#16363F]">
              <label className="block text-[11px] font-bold text-[#2B2F33] dark:text-[#DFD9CE]">
                Promotional Code
              </label>
              <div className="flex gap-2">
                <Input
                  placeholder="e.g. VELLORA10"
                  value={couponCodeInput}
                  onChange={(e) => setCouponCodeInput(e.target.value)}
                  className="h-9 text-xs"
                />
                <Button
                  type="button"
                  variant="secondary"
                  size="sm"
                  className="h-9 px-3 text-xs font-bold"
                  onClick={() => {
                    if (!couponCodeInput.trim()) return;
                    const res = applyCouponCode(couponCodeInput.trim());
                    if (res.success) {
                      toast.success(res.message);
                      setCouponCodeInput('');
                    } else {
                      toast.error(res.message);
                    }
                  }}
                >
                  Apply
                </Button>
              </div>

              {appliedCoupon ? (
                <div className="flex items-center justify-between rounded-xl bg-[#EAF8F1] p-2.5 text-xs text-[#1F9D6B] font-semibold">
                  <div className="flex items-center gap-1.5">
                    <Tag className="h-3.5 w-3.5" />
                    <span>{appliedCoupon.code} applied (-{formatINR(appliedCoupon.discountAmount)})</span>
                  </div>
                  <button
                    type="button"
                    onClick={removeCoupon}
                    className="font-bold underline hover:text-[#0E4A57]"
                  >
                    Remove
                  </button>
                </div>
              ) : subtotal >= 199900 ? (
                <button
                  type="button"
                  onClick={() => {
                    const res = applyCouponCode('VELLORA10');
                    if (res.success) toast.success('VELLORA10 applied: 10% off!');
                  }}
                  className="flex items-center gap-1.5 text-[11px] text-[#1E8C9B] dark:text-[#D9B65F] font-semibold hover:underline"
                >
                  <Sparkles className="h-3 w-3" />
                  <span>Eligible for 10% off! Click to apply VELLORA10</span>
                </button>
              ) : null}
            </div>

            <div className="space-y-2 border-t border-[#ECE8E0] dark:border-[#16363F] pt-4 text-xs">
              <div className="flex justify-between text-[#727B83]">
                <span>Items Subtotal</span>
                <span>{formatINR(subtotal)}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-[#1F9D6B] font-bold">
                  <span>Coupon Discount</span>
                  <span>-{formatINR(discount)}</span>
                </div>
              )}
              <div className="flex justify-between text-[#727B83]">
                <span>Taxes (GST Included)</span>
                <span>{formatINR(gst)}</span>
              </div>
              <div className="flex justify-between text-[#727B83]">
                <span>Shipping</span>
                <span className={shipping === 0 ? 'text-[#1F9D6B] font-bold' : ''}>
                  {shipping === 0 ? 'Free' : formatINR(shipping)}
                </span>
              </div>
              <div className="flex justify-between border-t border-[#ECE8E0] pt-4 text-base font-extrabold text-[#0E4A57] dark:border-[#16363F] dark:text-[#D9B65F]">
                <span>Grand Total</span>
                <span>{formatINR(grandTotal)}</span>
              </div>
            </div>

            <Button
              type="submit"
              size="lg"
              isLoading={isProcessing}
              className="w-full bg-[#0E4A57] hover:bg-[#1E8C9B] text-white shadow-xl shadow-[#0E4A57]/25 py-3.5"
            >
              {!isAuthenticated
                ? 'Sign In to Authorize Payment'
                : `Authorize Payment & Order (${formatINR(grandTotal)})`}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
