"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useStore } from "@/context/StoreContext";
import { Container } from "@/components/ui/Container";
import { PaymentMethod, CourierPartner } from "@/types";
import {
  ShieldCheck,
  Truck,
  ArrowRight,
  CheckCircle2,
  Lock,
  Phone,
  MapPin,
  User,
  ShoppingBag,
  CreditCard,
  Building2,
  Sparkles,
} from "lucide-react";

import { analytics } from "@/lib/analytics";

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, cartSubtotal, placeOrder } = useStore();

  // Form State
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("Dhaka");
  const [division, setDivision] = useState("Dhaka");
  const [notes, setNotes] = useState("");

  // Payment State
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("bKash");
  const [transactionId, setTransactionId] = useState("");
  const [courierPartner, setCourierPartner] = useState<CourierPartner>("Pathao Courier");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState("");

  // Shipping calculation
  const isDhaka = city.toLowerCase().includes("dhaka");
  const baseShipping = isDhaka ? 60 : 120;
  const shippingFee = cartSubtotal >= 3000 ? 0 : baseShipping;
  const finalTotal = cartSubtotal + shippingFee;

  // Track InitiateCheckout on page load
  useEffect(() => {
    if (cart.length > 0) {
      analytics.initiateCheckout(cart, finalTotal);
    }
  }, []);

  const handleOrderSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");

    if (cart.length === 0) {
      setFormError("Your shopping bag is empty. Please add denim items first.");
      return;
    }

    if (!fullName || !phoneNumber || !address) {
      setFormError("Please fill in your name, phone number, and delivery address.");
      return;
    }

    if ((paymentMethod === "bKash" || paymentMethod === "Nagad") && !transactionId) {
      setFormError(`Please enter your ${paymentMethod} Transaction ID (TrxID).`);
      return;
    }

    setIsSubmitting(true);

    setTimeout(async () => {
      const estimatedDelivery = isDhaka
        ? "Within 24-48 Hours (Dhaka Metro Express)"
        : "Within 48-72 Hours (Nationwide Delivery)";

      const createdOrder = await placeOrder({
        customer: {
          fullName,
          phoneNumber,
          email,
          address,
          city,
          division,
          notes,
        },
        items: cart,
        subtotal: cartSubtotal,
        shippingFee,
        total: finalTotal,
        paymentMethod,
        transactionId: transactionId ? transactionId.toUpperCase() : undefined,
        paymentStatus:
          paymentMethod === "COD" ? "Cash on Delivery" : "Paid",
        deliveryStatus: "Order Placed",
        courierPartner,
        courierTrackingCode: "",
        estimatedDelivery,
      });

      setIsSubmitting(false);
      router.push(`/track?orderId=${createdOrder.id}`);
    }, 1200);
  };

  if (cart.length === 0) {
    return (
      <div className="py-20 bg-neutral-50/50 min-h-[70vh] flex items-center justify-center">
        <Container size="narrow">
          <div className="bg-white border border-neutral-200 p-10 text-center space-y-4">
            <div className="inline-flex p-4 rounded-full bg-neutral-100 text-neutral-400">
              <ShoppingBag className="w-8 h-8" />
            </div>
            <h2 className="font-serif text-2xl font-medium text-neutral-900">
              Your bag is currently empty
            </h2>
            <p className="text-xs text-neutral-600 max-w-sm mx-auto">
              Choose your preferred denim silhouette and size before checking out.
            </p>
            <Link
              href="/shop"
              className="inline-block mt-4 px-8 py-3 bg-black text-white hover:bg-neutral-800 text-xs font-bold uppercase tracking-luxury transition-colors"
            >
              SHOP DENIM COLLECTION
            </Link>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="py-12 sm:py-20 bg-[#F9F9F8]">
      <Container size="wide">
        {/* Breadcrumb */}
        <div className="text-xs uppercase tracking-luxury text-neutral-400 mb-8">
          <Link href="/" className="hover:text-black">
            Home
          </Link>
          <span className="mx-2">/</span>
          <Link href="/shop" className="hover:text-black">
            Shop
          </Link>
          <span className="mx-2">/</span>
          <span className="text-neutral-900 font-semibold">Secure Checkout</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left 7 Cols: Customer Shipping & Payment Forms */}
          <div className="lg:col-span-7 space-y-8">
            <form onSubmit={handleOrderSubmit} id="checkout-form" className="space-y-8">
              {formError && (
                <div className="p-4 bg-red-50 border border-red-200 text-red-700 text-xs rounded font-medium">
                  {formError}
                </div>
              )}

              {/* 1. Customer Information & Delivery Address */}
              <div className="bg-white border border-neutral-200 p-6 sm:p-8 space-y-6">
                <div className="flex items-center space-x-2.5 pb-4 border-b border-neutral-100">
                  <div className="w-6 h-6 rounded-full bg-black text-white text-xs font-bold flex items-center justify-center">
                    1
                  </div>
                  <h3 className="font-serif text-xl font-medium text-neutral-900">
                    Delivery & Customer Information
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1 sm:col-span-2">
                    <label className="text-xs font-semibold uppercase tracking-wider text-neutral-700 block">
                      Full Name *
                    </label>
                    <div className="relative flex items-center">
                      <User className="w-4 h-4 text-neutral-400 absolute left-3 pointer-events-none" />
                      <input
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="e.g. Tanvir Ahmed"
                        required
                        className="w-full h-11 bg-neutral-50 border border-neutral-300 focus:border-black focus:bg-white text-sm pl-9 pr-3 focus:outline-none transition-colors"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold uppercase tracking-wider text-neutral-700 block">
                      Phone Number (BD Mobile) *
                    </label>
                    <div className="relative flex items-center">
                      <Phone className="w-4 h-4 text-neutral-400 absolute left-3 pointer-events-none" />
                      <input
                        type="tel"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        placeholder="017xxxxxxxx"
                        required
                        className="w-full h-11 bg-neutral-50 border border-neutral-300 focus:border-black focus:bg-white text-sm pl-9 pr-3 focus:outline-none transition-colors"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold uppercase tracking-wider text-neutral-700 block">
                      Email Address (Optional)
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="yourname@gmail.com"
                      className="w-full h-11 bg-neutral-50 border border-neutral-300 focus:border-black focus:bg-white text-sm px-3 focus:outline-none transition-colors"
                    />
                  </div>

                  <div className="space-y-1 sm:col-span-2">
                    <label className="text-xs font-semibold uppercase tracking-wider text-neutral-700 block">
                      Street Address / House / Road / Area *
                    </label>
                    <div className="relative flex items-start">
                      <MapPin className="w-4 h-4 text-neutral-400 absolute left-3 top-3 pointer-events-none" />
                      <textarea
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        rows={2}
                        placeholder="e.g. House 42, Road 11, Block D, Banani"
                        required
                        className="w-full bg-neutral-50 border border-neutral-300 focus:border-black focus:bg-white text-sm pl-9 pr-3 py-2.5 focus:outline-none transition-colors"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold uppercase tracking-wider text-neutral-700 block">
                      City / District *
                    </label>
                    <select
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full h-11 bg-neutral-50 border border-neutral-300 focus:border-black focus:bg-white text-sm px-3 focus:outline-none transition-colors"
                    >
                      <option value="Dhaka">Dhaka (Inside City)</option>
                      <option value="Chittagong">Chittagong</option>
                      <option value="Sylhet">Sylhet</option>
                      <option value="Rajshahi">Rajshahi</option>
                      <option value="Khulna">Khulna</option>
                      <option value="Barisal">Barisal</option>
                      <option value="Rangpur">Rangpur</option>
                      <option value="Mymensingh">Mymensingh</option>
                      <option value="Gazipur">Gazipur</option>
                      <option value="Narayanganj">Narayanganj</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold uppercase tracking-wider text-neutral-700 block">
                      Courier Preference
                    </label>
                    <select
                      value={courierPartner}
                      onChange={(e) => setCourierPartner(e.target.value as CourierPartner)}
                      className="w-full h-11 bg-neutral-50 border border-neutral-300 focus:border-black focus:bg-white text-sm px-3 focus:outline-none transition-colors"
                    >
                      <option value="Pathao Courier">Pathao Courier (Fastest in Dhaka)</option>
                      <option value="Steadfast">Steadfast Courier (Nationwide)</option>
                      <option value="RedX">RedX Logistics</option>
                      <option value="Paperfly">Paperfly Doorstep</option>
                    </select>
                  </div>

                  <div className="space-y-1 sm:col-span-2">
                    <label className="text-xs font-semibold uppercase tracking-wider text-neutral-700 block">
                      Delivery Instructions (Optional)
                    </label>
                    <input
                      type="text"
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="e.g. Call before delivery or leave with security"
                      className="w-full h-10 bg-neutral-50 border border-neutral-300 focus:border-black focus:bg-white text-xs px-3 focus:outline-none transition-colors"
                    />
                  </div>
                </div>
              </div>

              {/* 2. Payment Gateway Selection */}
              <div className="bg-white border border-neutral-200 p-6 sm:p-8 space-y-6">
                <div className="flex items-center space-x-2.5 pb-4 border-b border-neutral-100">
                  <div className="w-6 h-6 rounded-full bg-black text-white text-xs font-bold flex items-center justify-center">
                    2
                  </div>
                  <h3 className="font-serif text-xl font-medium text-neutral-900">
                    Payment Gateway (bKash / Nagad / Card / COD)
                  </h3>
                </div>

                {/* Payment Option Tabs */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {/* bKash */}
                  <button
                    type="button"
                    onClick={() => setPaymentMethod("bKash")}
                    className={`p-3.5 border rounded-none text-left flex flex-col justify-between transition-all ${
                      paymentMethod === "bKash"
                        ? "border-[#E2136E] bg-[#E2136E]/5 ring-1 ring-[#E2136E]"
                        : "border-neutral-200 hover:border-neutral-400 bg-white"
                    }`}
                  >
                    <div className="flex items-center justify-between w-full mb-2">
                      <span className="font-bold text-xs text-[#E2136E]">bKash</span>
                      {paymentMethod === "bKash" && (
                        <CheckCircle2 className="w-4 h-4 text-[#E2136E]" />
                      )}
                    </div>
                    <span className="text-[10px] text-neutral-500 uppercase font-semibold">
                      Instant Mobile
                    </span>
                  </button>

                  {/* Nagad */}
                  <button
                    type="button"
                    onClick={() => setPaymentMethod("Nagad")}
                    className={`p-3.5 border rounded-none text-left flex flex-col justify-between transition-all ${
                      paymentMethod === "Nagad"
                        ? "border-[#F7921E] bg-[#F7921E]/5 ring-1 ring-[#F7921E]"
                        : "border-neutral-200 hover:border-neutral-400 bg-white"
                    }`}
                  >
                    <div className="flex items-center justify-between w-full mb-2">
                      <span className="font-bold text-xs text-[#F7921E]">Nagad</span>
                      {paymentMethod === "Nagad" && (
                        <CheckCircle2 className="w-4 h-4 text-[#F7921E]" />
                      )}
                    </div>
                    <span className="text-[10px] text-neutral-500 uppercase font-semibold">
                      Instant Mobile
                    </span>
                  </button>

                  {/* Cash on Delivery */}
                  <button
                    type="button"
                    onClick={() => setPaymentMethod("COD")}
                    className={`p-3.5 border rounded-none text-left flex flex-col justify-between transition-all ${
                      paymentMethod === "COD"
                        ? "border-black bg-neutral-50 ring-1 ring-black"
                        : "border-neutral-200 hover:border-neutral-400 bg-white"
                    }`}
                  >
                    <div className="flex items-center justify-between w-full mb-2">
                      <span className="font-bold text-xs text-neutral-900">COD</span>
                      {paymentMethod === "COD" && (
                        <CheckCircle2 className="w-4 h-4 text-black" />
                      )}
                    </div>
                    <span className="text-[10px] text-neutral-500 uppercase font-semibold">
                      Cash on Delivery
                    </span>
                  </button>

                  {/* Card */}
                  <button
                    type="button"
                    onClick={() => setPaymentMethod("Card")}
                    className={`p-3.5 border rounded-none text-left flex flex-col justify-between transition-all ${
                      paymentMethod === "Card"
                        ? "border-black bg-neutral-50 ring-1 ring-black"
                        : "border-neutral-200 hover:border-neutral-400 bg-white"
                    }`}
                  >
                    <div className="flex items-center justify-between w-full mb-2">
                      <span className="font-bold text-xs text-neutral-900">Card</span>
                      {paymentMethod === "Card" && (
                        <CheckCircle2 className="w-4 h-4 text-black" />
                      )}
                    </div>
                    <span className="text-[10px] text-neutral-500 uppercase font-semibold">
                      Visa / Master
                    </span>
                  </button>
                </div>

                {/* Interactive bKash Instructions Box */}
                {paymentMethod === "bKash" && (
                  <div className="p-5 bg-[#E2136E]/5 border border-[#E2136E]/20 space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold uppercase tracking-wider text-[#E2136E]">
                        bKash Merchant Payment Guide
                      </span>
                      <span className="text-xs font-mono font-bold bg-[#E2136E] text-white px-2 py-0.5 rounded">
                        01711-000000
                      </span>
                    </div>

                    <ol className="text-xs text-neutral-700 space-y-1.5 list-decimal list-inside leading-relaxed">
                      <li>Open your <strong>bKash App</strong> or dial <strong>*247#</strong></li>
                      <li>Select <strong>Make Payment</strong> / <strong>Send Money</strong> to merchant: <strong>01711-000000</strong></li>
                      <li>Enter amount: <strong>৳ {finalTotal.toLocaleString()}</strong></li>
                      <li>Enter Reference: <strong>JUSTJEANS</strong></li>
                      <li>Copy the <strong>Transaction ID (TrxID)</strong> and paste it below:</li>
                    </ol>

                    <div className="space-y-1 pt-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-neutral-900 block">
                        Enter bKash Transaction ID (TrxID) *
                      </label>
                      <input
                        type="text"
                        value={transactionId}
                        onChange={(e) => setTransactionId(e.target.value)}
                        placeholder="e.g. BK9X84A291"
                        required
                        className="w-full h-11 bg-white border border-[#E2136E]/40 focus:border-[#E2136E] text-sm px-3 uppercase font-mono font-semibold focus:outline-none"
                      />
                    </div>
                  </div>
                )}

                {/* Interactive Nagad Instructions Box */}
                {paymentMethod === "Nagad" && (
                  <div className="p-5 bg-[#F7921E]/5 border border-[#F7921E]/20 space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold uppercase tracking-wider text-[#F7921E]">
                        Nagad Merchant Payment Guide
                      </span>
                      <span className="text-xs font-mono font-bold bg-[#F7921E] text-white px-2 py-0.5 rounded">
                        01811-000000
                      </span>
                    </div>

                    <ol className="text-xs text-neutral-700 space-y-1.5 list-decimal list-inside leading-relaxed">
                      <li>Open your <strong>Nagad App</strong> or dial <strong>*167#</strong></li>
                      <li>Select <strong>Merchant Pay</strong> / <strong>Send Money</strong> to: <strong>01811-000000</strong></li>
                      <li>Enter amount: <strong>৳ {finalTotal.toLocaleString()}</strong></li>
                      <li>Copy the <strong>Transaction ID (TrxID)</strong> and paste it below:</li>
                    </ol>

                    <div className="space-y-1 pt-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-neutral-900 block">
                        Enter Nagad Transaction ID (TrxID) *
                      </label>
                      <input
                        type="text"
                        value={transactionId}
                        onChange={(e) => setTransactionId(e.target.value)}
                        placeholder="e.g. NGD73B9014"
                        required
                        className="w-full h-11 bg-white border border-[#F7921E]/40 focus:border-[#F7921E] text-sm px-3 uppercase font-mono font-semibold focus:outline-none"
                      />
                    </div>
                  </div>
                )}

                {/* Cash on Delivery Notice */}
                {paymentMethod === "COD" && (
                  <div className="p-4 bg-neutral-100 border border-neutral-200 text-xs text-neutral-700 space-y-1">
                    <p className="font-semibold text-neutral-900">
                      ✓ Cash on Delivery (COD) Selected
                    </p>
                    <p>
                      You will pay <strong>৳ {finalTotal.toLocaleString()}</strong> to the {courierPartner} delivery rider upon receiving your package at your doorstep.
                    </p>
                  </div>
                )}

                {/* Card Payment Simulation */}
                {paymentMethod === "Card" && (
                  <div className="p-4 bg-neutral-50 border border-neutral-200 text-xs text-neutral-700 space-y-3">
                    <div className="flex items-center space-x-2 text-neutral-900 font-semibold">
                      <CreditCard className="w-4 h-4" />
                      <span>Secured Online Card Payment Simulation</span>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <input
                        type="text"
                        placeholder="Card Number (4000 1234 5678 9010)"
                        className="col-span-2 h-10 border border-neutral-300 px-3 text-xs bg-white"
                      />
                      <input
                        type="text"
                        placeholder="MM/YY"
                        className="h-10 border border-neutral-300 px-3 text-xs bg-white"
                      />
                      <input
                        type="text"
                        placeholder="CVC / CVV"
                        className="h-10 border border-neutral-300 px-3 text-xs bg-white"
                      />
                    </div>
                  </div>
                )}
              </div>
            </form>
          </div>

          {/* Right 5 Cols: Order Summary & Placement */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white border border-neutral-200 p-6 sm:p-8 space-y-6 sticky top-28 shadow-sm">
              <h3 className="font-serif text-xl font-medium text-neutral-900 pb-4 border-b border-neutral-100">
                Order Summary ({cart.length} items)
              </h3>

              {/* Items List */}
              <div className="divide-y divide-neutral-100 max-h-72 overflow-y-auto pr-1 space-y-3">
                {cart.map((item, idx) => (
                  <div key={idx} className="pt-3 first:pt-0 flex items-center justify-between text-xs">
                    <div className="flex items-center space-x-3">
                      <div className="relative w-12 h-16 bg-neutral-100 flex-shrink-0 border border-neutral-200">
                        <Image
                          src={item.product.images[0]}
                          alt={item.product.name}
                          fill
                          sizes="48px"
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-serif font-semibold text-neutral-900 line-clamp-1">
                          {item.product.name}
                        </p>
                        <p className="text-neutral-500">
                          Fit: {item.product.fit} | Size: {item.selectedSize}
                        </p>
                        <p className="text-neutral-500">Qty: {item.quantity}</p>
                      </div>
                    </div>
                    <span className="font-bold text-neutral-900">
                      ৳ {(item.product.price * item.quantity).toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>

              {/* Cost Calculations */}
              <div className="pt-4 border-t border-neutral-100 space-y-2 text-xs">
                <div className="flex justify-between text-neutral-600">
                  <span>Bag Subtotal</span>
                  <span className="font-semibold text-neutral-900">
                    ৳ {cartSubtotal.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between text-neutral-600">
                  <span>
                    Delivery ({isDhaka ? "Inside Dhaka" : "Outside Dhaka"})
                  </span>
                  <span className="font-semibold">
                    {shippingFee === 0 ? (
                      <span className="text-emerald-700 font-bold uppercase">
                        FREE (Over ৳3000)
                      </span>
                    ) : (
                      `৳ ${shippingFee}`
                    )}
                  </span>
                </div>
                <div className="flex justify-between text-neutral-600">
                  <span>Courier Partner</span>
                  <span className="font-medium text-neutral-800">
                    {courierPartner}
                  </span>
                </div>
                <div className="pt-3 border-t border-neutral-200 flex justify-between text-base font-bold text-neutral-950">
                  <span>Total Amount</span>
                  <span>৳ {finalTotal.toLocaleString()}</span>
                </div>
              </div>

              {/* Submit CTA Button */}
              <button
                type="submit"
                form="checkout-form"
                disabled={isSubmitting}
                className="w-full h-14 bg-neutral-950 text-white hover:bg-neutral-800 text-xs font-bold tracking-luxury uppercase flex items-center justify-center space-x-2 transition-all shadow-md disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span>CONFIRMING ORDER & GENERATING TRACKING...</span>
                ) : (
                  <>
                    <span>CONFIRM ORDER (৳ {finalTotal.toLocaleString()})</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              <div className="pt-2 text-[11px] text-neutral-500 space-y-1 text-center">
                <div className="flex items-center justify-center space-x-1 text-emerald-700 font-semibold">
                  <ShieldCheck className="w-4 h-4" />
                  <span>100% Authentic Denim Guarantee & 7-Day Exchange</span>
                </div>
                <p>Tracking number generated immediately upon confirmation.</p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
