'use client';

import * as React from 'react';
import Image from 'next/image';
import { Order } from '@/types/vellora';
import { formatINR } from '@/lib/utils';
import { Printer, ShieldCheck, Download, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface ProfessionalInvoiceProps {
  order: Order;
  showPrintButton?: boolean;
}

export function ProfessionalInvoice({ order, showPrintButton = true }: ProfessionalInvoiceProps) {
  const handlePrint = () => {
    // Collect all stylesheet links and style tags from current document
    const styles = Array.from(document.querySelectorAll('link[rel="stylesheet"], style'))
      .map((el) => el.outerHTML)
      .join('\n');

    const invoiceElement = document.querySelector('.invoice-container');
    if (!invoiceElement) {
      window.print();
      return;
    }

    const printWindow = window.open('', '_blank', 'width=900,height=1000');
    if (!printWindow) {
      window.print();
      return;
    }

    printWindow.document.open();
    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>GST Tax Invoice - ${order.id}</title>
          ${styles}
          <style>
            @page {
              size: A4 portrait;
              margin: 10mm 14mm 14mm 14mm;
            }
            body {
              background: #ffffff !important;
              color: #111827 !important;
              padding: 0 !important;
              margin: 0 !important;
              font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif !important;
              -webkit-print-color-adjust: exact !important;
              print-color-adjust: exact !important;
            }
            .invoice-container {
              border: none !important;
              box-shadow: none !important;
              padding: 0 !important;
              max-width: 100% !important;
              background: transparent !important;
              color: #111827 !important;
            }
            .invoice-container * {
              -webkit-print-color-adjust: exact !important;
              print-color-adjust: exact !important;
            }
            .no-print {
              display: none !important;
            }
          </style>
        </head>
        <body>
          <div class="invoice-container">
            ${invoiceElement.innerHTML}
          </div>
          <script>
            window.onload = function() {
              setTimeout(function() {
                window.focus();
                window.print();
                window.close();
              }, 300);
            };
          </script>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  // Indian GST breakdown: usually CGST + SGST (half and half) or IGST
  const subtotal = order.subtotal;
  const couponDiscount = order.discount;
  const shippingFee = order.shippingFee;
  const grandTotal = order.grandTotal;

  // Approximate 18% GST calculation (embedded in subtotal or added)
  const gstAmount = Math.round((grandTotal * 18) / 118);
  const taxableValue = grandTotal - gstAmount;
  const cgstAmount = Math.round(gstAmount / 2);
  const sgstAmount = gstAmount - cgstAmount;

  const invoiceDate = new Date(order.createdAt).toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });

  return (
    <div className="invoice-root mx-auto max-w-4xl text-left">
      {/* Action Bar (hidden in print) */}
      {showPrintButton && (
        <div className="no-print mb-6 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-[#DFD9CE] bg-white p-4 shadow-sm dark:border-[#224C57] dark:bg-[#0F282F]">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#0E4A57] dark:text-[#D9B65F]">
            <ShieldCheck className="h-4 w-4" />
            <span>Official Computer-Generated GST Tax Invoice</span>
          </div>
          <div className="flex items-center gap-2">
            <Button onClick={handlePrint} size="sm" className="bg-[#0E4A57] hover:bg-[#1E8C9B] text-white">
              <Printer className="mr-1.5 h-4 w-4 text-[#D9B65F]" />
              Print / Save as PDF
            </Button>
          </div>
        </div>
      )}

      {/* Invoice Document Box */}
      <div className="invoice-container rounded-3xl border border-[#DFD9CE] bg-white p-6 sm:p-8 md:p-10 shadow-xl dark:border-[#224C57] dark:bg-[#0A1D22] text-[#2B2F33] dark:text-[#F8F6F1] print:p-2 print:border-none">
        {/* Header Ribbon */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center pb-6 print:pb-3 border-b-2 border-[#0E4A57] dark:border-[#D9B65F] print:border-[#111827] gap-4">
          <div>
            <div className="relative h-12 w-48 mb-2">
              <Image
                src="/brand/vellora-light-clean.png"
                alt="Vellora General Shopping"
                fill
                priority
                className="object-contain object-left dark:hidden"
              />
              <Image
                src="/brand/vellora-dark-silver.png"
                alt="Vellora General Shopping"
                fill
                priority
                className="object-contain object-left hidden dark:block"
              />
            </div>
            <p className="text-[11px] text-[#727B83] dark:text-[#A2AAB0]">
              Vellora Retail India Pvt. Ltd. • CIN: U52100KA2024PTC189211
            </p>
            <p className="text-[11px] text-[#727B83] dark:text-[#A2AAB0]">
              GSTIN: 29AABCV8942K1ZK • State Code: 29 (Karnataka)
            </p>
          </div>

          <div className="text-left md:text-right">
            <span className="inline-block rounded-full bg-[#EAF8F1] px-3 py-1 text-xs font-bold text-[#1F9D6B] dark:bg-[#16363F] dark:text-[#D9B65F]">
              TAX INVOICE (ORIGINAL FOR RECIPIENT)
            </span>
            <h2 className="mt-2 text-xl font-mono font-bold text-[#0E4A57] dark:text-white">
              INV-{order.id.replace('VEL-', '')}
            </h2>
            <p className="text-xs text-[#727B83] dark:text-[#A2AAB0]">Date of Issue: {invoiceDate}</p>
            <p className="text-xs text-[#727B83] dark:text-[#A2AAB0]">Order ID: #{order.id}</p>
          </div>
        </div>

        {/* Addresses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 print:gap-4 py-6 print:py-3 border-b border-[#ECE8E0] dark:border-[#16363F] print:border-[#D1D5DB] text-xs">
          <div>
            <h3 className="font-bold uppercase tracking-wider text-[11px] text-[#0E4A57] dark:text-[#D9B65F] mb-2">
              Sold By (Fulfillment Center)
            </h3>
            <p className="font-semibold text-sm">Vellora Distribution Center 04</p>
            <p className="text-[#4B5259] dark:text-[#DFD9CE] mt-1">Plot 42, EPIP Industrial Zone, Whitefield</p>
            <p className="text-[#4B5259] dark:text-[#DFD9CE]">Bengaluru, Karnataka — 560066</p>
            <p className="text-[#727B83] mt-1">Support: concierge@vellora.store | 1800-202-6000</p>
          </div>

          <div>
            <h3 className="font-bold uppercase tracking-wider text-[11px] text-[#0E4A57] dark:text-[#D9B65F] mb-2">
              Billing & Delivery Address
            </h3>
            <p className="font-semibold text-sm">{order.deliveryAddress.name}</p>
            <p className="text-[#4B5259] dark:text-[#DFD9CE] mt-1">{order.deliveryAddress.street}</p>
            <p className="text-[#4B5259] dark:text-[#DFD9CE]">
              {order.deliveryAddress.city}, {order.deliveryAddress.state} — {order.deliveryAddress.pincode}
            </p>
            <p className="text-[#727B83] mt-1">Phone: {order.deliveryAddress.contact} | {order.deliveryAddress.country}</p>
          </div>
        </div>

        {/* Line Items Table */}
        <div className="py-4 print:py-2 overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-[#DFD9CE] dark:border-[#224C57] text-[#727B83] dark:text-[#A2AAB0] uppercase text-[10px] tracking-wider">
                <th className="py-3 px-2 font-bold">#</th>
                <th className="py-3 px-2 font-bold">Description of Goods</th>
                <th className="py-3 px-2 font-bold text-center">HSN/SAC</th>
                <th className="py-3 px-2 font-bold text-center">Qty</th>
                <th className="py-3 px-2 font-bold text-right">Unit Rate</th>
                <th className="py-3 px-2 font-bold text-center">GST %</th>
                <th className="py-3 px-2 font-bold text-right">Total Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#ECE8E0] dark:divide-[#16363F]">
              {order.items.map((item, idx) => (
                <tr key={idx} className="hover:bg-[#F8F6F1]/50 dark:hover:bg-[#16363F]/20">
                  <td className="py-3.5 px-2 font-mono text-[#727B83]">{idx + 1}</td>
                  <td className="py-3.5 px-2">
                    <p className="font-bold text-[#2B2F33] dark:text-[#F8F6F1]">{item.productName}</p>
                    {item.variantName && (
                      <p className="text-[11px] text-[#727B83] dark:text-[#A2AAB0]">Edition: {item.variantName}</p>
                    )}
                  </td>
                  <td className="py-3.5 px-2 text-center font-mono text-[11px] text-[#727B83]">851830</td>
                  <td className="py-3.5 px-2 text-center font-semibold">{item.quantity}</td>
                  <td className="py-3.5 px-2 text-right font-mono">{formatINR(item.unitPrice)}</td>
                  <td className="py-3.5 px-2 text-center font-mono text-[11px]">18%</td>
                  <td className="py-3.5 px-2 text-right font-mono font-bold text-[#0E4A57] dark:text-[#D9B65F]">
                    {formatINR(item.unitPrice * item.quantity)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Calculation Summary Grid */}
        <div className="py-4 print:py-2 border-t-2 border-[#0E4A57] dark:border-[#224C57] print:border-[#111827] grid grid-cols-1 md:grid-cols-2 gap-6 print:gap-4 items-start">
          {/* Tax Breakdown & QR Seal */}
          <div className="rounded-2xl border border-[#ECE8E0] p-4 print:p-2 dark:border-[#16363F] dark:bg-[#0F282F]/40 space-y-2 text-[11px] print:border-[#9CA3AF]">
            <p className="font-bold text-[#0E4A57] dark:text-[#D9B65F] print:!text-black uppercase tracking-wide">
              Statutory Tax Breakup (CGST + SGST)
            </p>
            <div className="flex justify-between text-[#727B83] dark:text-[#A2AAB0] print:!text-[#374151]">
              <span>Taxable Supply Value</span>
              <span className="font-mono">{formatINR(taxableValue)}</span>
            </div>
            <div className="flex justify-between text-[#727B83] dark:text-[#A2AAB0] print:!text-[#374151]">
              <span>Central GST (CGST @ 9%)</span>
              <span className="font-mono">{formatINR(cgstAmount)}</span>
            </div>
            <div className="flex justify-between text-[#727B83] dark:text-[#A2AAB0] print:!text-[#374151]">
              <span>State GST (SGST @ 9%)</span>
              <span className="font-mono">{formatINR(sgstAmount)}</span>
            </div>
            <div className="pt-2 border-t border-[#ECE8E0] dark:border-[#16363F] print:border-[#9CA3AF] flex items-center justify-between text-[#1F9D6B] print:!text-black font-semibold">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="h-3.5 w-3.5" />
                Payment Mode: {order.paymentMethod.toUpperCase()} (PAID IN FULL)
              </span>
            </div>
          </div>

          {/* Subtotals & Grand Total */}
          <div className="space-y-2 text-xs">
            <div className="flex justify-between text-[#4B5259] dark:text-[#DFD9CE] print:!text-[#374151]">
              <span>Item Subtotal</span>
              <span className="font-mono">{formatINR(subtotal)}</span>
            </div>
            {couponDiscount > 0 && (
              <div className="flex justify-between text-[#1F9D6B] print:!text-black font-medium">
                <span>Promotional Voucher Discount</span>
                <span className="font-mono">-{formatINR(couponDiscount)}</span>
              </div>
            )}
            <div className="flex justify-between text-[#4B5259] dark:text-[#DFD9CE] print:!text-[#374151]">
              <span>Insured Shipping & Packaging</span>
              <span className="font-mono">
                {shippingFee === 0 ? <span className="text-[#1F9D6B] print:!text-black font-bold">FREE</span> : formatINR(shippingFee)}
              </span>
            </div>
            <div className="pt-3 border-t-2 border-[#0E4A57] dark:border-[#D9B65F] print:border-black flex justify-between items-center text-base font-extrabold text-[#0E4A57] dark:text-[#D9B65F]">
              <span className="text-[#0E4A57] dark:text-[#D9B65F] print:!text-black font-bold">Total Payable (Final Amount)</span>
              <span className="font-mono text-xl text-[#0E4A57] dark:text-[#D9B65F] print:!text-black print:!font-black">{formatINR(grandTotal)}</span>
            </div>
          </div>
        </div>

        {/* Invoice Footer / Signoff */}
        <div className="mt-6 print:mt-3 pt-4 print:pt-2 border-t border-[#ECE8E0] dark:border-[#16363F] print:border-[#D1D5DB] flex flex-col md:flex-row items-start md:items-end justify-between gap-4 text-[11px] text-[#727B83] dark:text-[#A2AAB0] print:!text-[#374151]">
          <div className="max-w-md space-y-1">
            <p className="font-semibold text-[#2B2F33] dark:text-[#F8F6F1]">Terms & Conditions:</p>
            <p>1. Goods once delivered are covered under brand warranty and our 7-day hassle-free return guarantee.</p>
            <p>2. This is a computer-generated invoice and requires no physical signature under the IT Act, 2000.</p>
          </div>

          <div className="text-right">
            <div className="inline-block border-b border-[#727B83] pb-1 mb-1 font-serif italic text-sm text-[#0E4A57] dark:text-[#D9B65F]">
              Vellora Authorized Signatory
            </div>
            <p className="text-[10px] uppercase tracking-wider">For Vellora Retail India Pvt. Ltd.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

