"use client";

import React from "react";
import Link from "next/link";
import { useStore } from "@/context/StoreContext";
import { Container } from "@/components/ui/Container";
import { ProductCard } from "@/components/shop/ProductCard";
import { Tag } from "lucide-react";

export default function SalePage() {
  const { products } = useStore();
  const saleProducts = products.filter((p) => p.onSale || p.originalPrice);

  return (
    <div className="py-12 sm:py-20 bg-[#FBFBFA]">
      <Container size="default">
        {/* Breadcrumb */}
        <div className="text-xs uppercase tracking-luxury text-neutral-400 mb-6">
          <Link href="/" className="hover:text-black">
            Home
          </Link>
          <span className="mx-2">/</span>
          <span className="text-neutral-900 font-semibold">Sale & Archive</span>
        </div>

        {/* Header */}
        <div className="border-b border-neutral-200 pb-8 mb-10">
          <span className="text-xs uppercase tracking-luxury text-red-700 font-bold block mb-2">
            LIMITED ARCHIVE EDITIONS
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-normal text-neutral-950">
            Special Archive & Offers
          </h1>
          <p className="mt-3 text-sm text-neutral-600 max-w-2xl font-light leading-relaxed">
            Exclusive archive cuts, end-of-run selvage editions, and seasonal reductions.
            Limited stock available with immediate delivery.
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
          {saleProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </Container>
    </div>
  );
}
