"use client";

import React, { useState, useEffect, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useStore } from "@/context/StoreContext";
import { Container } from "@/components/ui/Container";
import { Order, DeliveryStatus } from "@/types";
import {
  Search,
  Truck,
  CheckCircle2,
  Package,
  MapPin,
  Clock,
  Phone,
  ShieldCheck,
  ArrowRight,
  ExternalLink,
  ShoppingBag,
  Loader2,
} from "lucide-react";

function TrackOrderContent() {
  const searchParams = useSearchParams();
  const initialOrderId = searchParams.get("orderId") || "";
  const { orders } = useStore();

  const [searchQuery, setSearchQuery] = useState(initialOrderId);
  const [activeOrder, setActiveOrder] = useState<Order | null>(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (initialOrderId) {
      const match = orders.find(
        (o) =>
          o.id.toLowerCase() === initialOrderId.toLowerCase() ||
          o.customer.phoneNumber === initialOrderId
      );
      if (match) {
        setActiveOrder(match);
        setNotFound(false);
      } else {
        setActiveOrder(orders[0] || null);
      }
    } else if (orders.length > 0) {
      setActiveOrder(orders[0]);
    }
  }, [initialOrderId, orders]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    const match = orders.find(
      (o) =>
        o.id.toLowerCase() === searchQuery.trim().toLowerCase() ||
        o.customer.phoneNumber === searchQuery.trim() ||
        o.courierTrackingCode?.toLowerCase() === searchQuery.trim().toLowerCase()
    );

    if (match) {
      setActiveOrder(match);
      setNotFound(false);
    } else {
      setNotFound(true);
    }
  };

  const statusSteps: DeliveryStatus[] = [
    "Order Placed",
    "Quality Checked",
    "Handed to Courier",
    "Out for Delivery",
    "Delivered",
  ];

  const getStepIndex = (status: DeliveryStatus) => {
    const idx = statusSteps.indexOf(status);
    return idx >= 0 ? idx : 0;
  };

  const currentStep = activeOrder ? getStepIndex(activeOrder.deliveryStatus) : 0;

  return (
    <div className="py-12 sm:py-20 bg-[#FBFBFA] min-h-screen">
      <Container size="default">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-4 mb-12">
          <span className="text-xs uppercase tracking-luxury text-denim-700 font-bold block">
            REAL-TIME FULFILLMENT & LOGISTICS
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-normal text-neutral-950">
            Track Your Denim Delivery
          </h1>
          <p className="text-sm text-neutral-600 font-light leading-relaxed">
            Enter your Order ID (e.g. <strong>JJ-BD-8921</strong>) or registered phone
            number to inspect live courier movement and delivery status.
          </p>

          {/* Search Form */}
          <form
            onSubmit={handleSearch}
            className="mt-6 flex flex-col sm:flex-row gap-2 max-w-lg mx-auto"
          >
            <div className="relative flex-grow">
              <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Enter Order ID (e.g. JJ-BD-8921) or Phone..."
                className="w-full h-12 bg-white border border-neutral-300 focus:border-black text-sm pl-10 pr-4 focus:outline-none transition-colors"
              />
            </div>
            <button
              type="submit"
              className="h-12 px-7 bg-neutral-950 text-white hover:bg-neutral-800 text-xs font-bold uppercase tracking-luxury transition-colors whitespace-nowrap"
            >
              TRACK NOW
            </button>
          </form>

          {notFound && (
            <p className="text-xs text-red-600 font-medium pt-2">
              No order found matching &quot;{searchQuery}&quot;. Please check your ID and try again.
            </p>
          )}
        </div>

        {/* Active Order Showcase Card */}
        {activeOrder && (
          <div className="bg-white border border-neutral-200 shadow-sm overflow-hidden space-y-8 p-6 sm:p-10">
            {/* Top Order Meta Summary */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-neutral-100">
              <div>
                <div className="flex items-center space-x-2">
                  <span className="text-xs font-mono uppercase tracking-wider text-neutral-500 font-semibold">
                    Order ID:
                  </span>
                  <span className="text-sm font-mono font-bold text-denim-800 bg-denim-50 px-2.5 py-1 rounded">
                    {activeOrder.id}
                  </span>
                </div>
                <p className="text-xs text-neutral-500 mt-1">
                  Placed on {new Date(activeOrder.createdAt).toLocaleString("en-US", {
                    dateStyle: "medium",
                    timeStyle: "short",
                  })}
                </p>
              </div>

              <div className="flex items-center space-x-3">
                <div className="text-right">
                  <span className="text-[10px] uppercase tracking-wider text-neutral-400 block font-semibold">
                    Courier Partner
                  </span>
                  <span className="text-xs font-bold text-neutral-900">
                    {activeOrder.courierPartner} ({activeOrder.courierTrackingCode || "Processing"})
                  </span>
                </div>
              </div>
            </div>

            {/* Interactive Step-by-Step Delivery Progress Timeline */}
            <div className="py-4">
              <h3 className="text-xs font-bold uppercase tracking-widest text-neutral-400 mb-8 text-center sm:text-left">
                Live Delivery Milestones
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-5 gap-4 relative">
                {statusSteps.map((step, idx) => {
                  const isDone = idx <= currentStep;
                  const isCurrent = idx === currentStep;

                  return (
                    <div
                      key={idx}
                      className="flex sm:flex-col items-center sm:items-start text-left space-x-4 sm:space-x-0 sm:space-y-3"
                    >
                      {/* Step Indicator Circle */}
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs transition-colors relative z-10 ${
                          isCurrent
                            ? "bg-denim-700 text-white ring-4 ring-denim-100"
                            : isDone
                            ? "bg-emerald-600 text-white"
                            : "bg-neutral-100 text-neutral-400 border border-neutral-200"
                        }`}
                      >
                        {isDone ? <CheckCircle2 className="w-5 h-5" /> : idx + 1}
                      </div>

                      {/* Step Text Info */}
                      <div>
                        <p
                          className={`text-xs font-bold uppercase tracking-wider ${
                            isCurrent
                              ? "text-denim-800"
                              : isDone
                              ? "text-neutral-900"
                              : "text-neutral-400"
                          }`}
                        >
                          {step}
                        </p>
                        <p className="text-[11px] text-neutral-500 font-light mt-0.5">
                          {idx === 0 && "Verified in system"}
                          {idx === 1 && "Denim QA passed"}
                          {idx === 2 && activeOrder.courierPartner}
                          {idx === 3 && "Rider in transit"}
                          {idx === 4 && "Delivered to buyer"}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Two-Column Breakdown: Destination & Purchased Products */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-6 border-t border-neutral-100">
              {/* Left 6 Cols: Delivery Destination Address Box */}
              <div className="lg:col-span-6 space-y-4 p-6 bg-neutral-50 border border-neutral-200">
                <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-neutral-900">
                  <MapPin className="w-4 h-4 text-denim-700" />
                  <span>Delivery Destination</span>
                </div>

                <div className="space-y-1.5 text-xs">
                  <p className="font-semibold text-neutral-900 text-sm">
                    {activeOrder.customer.fullName}
                  </p>
                  <p className="text-neutral-600 font-medium">
                    Phone: {activeOrder.customer.phoneNumber}
                  </p>
                  <p className="text-neutral-600">
                    Address: {activeOrder.customer.address}
                  </p>
                  <p className="text-neutral-600 font-semibold">
                    City/District: {activeOrder.customer.city}
                  </p>
                  {activeOrder.customer.notes && (
                    <p className="text-neutral-500 italic pt-1">
                      Note: &quot;{activeOrder.customer.notes}&quot;
                    </p>
                  )}
                </div>

                {/* Estimated Delivery Window */}
                <div className="pt-3 border-t border-neutral-200 flex items-center justify-between text-xs">
                  <div className="flex items-center space-x-1.5 text-neutral-700">
                    <Clock className="w-4 h-4 text-denim-600" />
                    <span>Estimated Arrival:</span>
                  </div>
                  <strong className="text-neutral-950">
                    {activeOrder.estimatedDelivery}
                  </strong>
                </div>
              </div>

              {/* Right 6 Cols: Payment & Ordered Items */}
              <div className="lg:col-span-6 space-y-4 p-6 bg-neutral-50 border border-neutral-200">
                <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-neutral-900">
                  <span>Payment & Invoice</span>
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      activeOrder.paymentStatus === "Paid"
                        ? "bg-emerald-100 text-emerald-800"
                        : "bg-amber-100 text-amber-800"
                    }`}
                  >
                    {activeOrder.paymentStatus} via {activeOrder.paymentMethod}
                  </span>
                </div>

                {activeOrder.transactionId && (
                  <p className="text-xs text-neutral-600 font-mono">
                    TrxID: <strong>{activeOrder.transactionId}</strong>
                  </p>
                )}

                {/* Items */}
                <div className="divide-y divide-neutral-200/80 pt-2">
                  {activeOrder.items.map((item, idx) => (
                    <div
                      key={idx}
                      className="py-2.5 first:pt-0 flex items-center justify-between text-xs"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="relative w-10 h-12 bg-white flex-shrink-0 border border-neutral-200">
                          <Image
                            src={item.product.images[0]}
                            alt={item.product.name}
                            fill
                            sizes="40px"
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <p className="font-serif font-semibold text-neutral-900">
                            {item.product.name}
                          </p>
                          <p className="text-[11px] text-neutral-500">
                            Size: {item.selectedSize} | Qty: {item.quantity}
                          </p>
                        </div>
                      </div>
                      <span className="font-semibold text-neutral-900">
                        ৳ {(item.product.price * item.quantity).toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="pt-3 border-t border-neutral-200 flex items-center justify-between text-sm font-bold text-neutral-900">
                  <span>Grand Total Paid</span>
                  <span>৳ {activeOrder.total.toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* Footer Support Action */}
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
              <div className="flex items-center space-x-1 text-emerald-700 font-semibold">
                <ShieldCheck className="w-4 h-4" />
                <span>Express Courier Insured Delivery</span>
              </div>
              <Link
                href="/shop"
                className="text-neutral-900 hover:text-black font-semibold uppercase tracking-luxury flex items-center space-x-1"
              >
                <span>Continue Shopping</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        )}
      </Container>
    </div>
  );
}

export default function TrackOrderPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-[60vh] flex items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-neutral-400" />
        </div>
      }
    >
      <TrackOrderContent />
    </Suspense>
  );
}
