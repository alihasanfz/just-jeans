"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useStore } from "@/context/StoreContext";
import { Container } from "@/components/ui/Container";
import { ProductCard } from "@/components/shop/ProductCard";
import { DenimFit } from "@/types";
import { Filter } from "lucide-react";

export default function WomenPage() {
  const { products } = useStore();
  const [selectedFit, setSelectedFit] = useState<string>("All");

  const womenProducts = products.filter((p) => p.gender === "Women");

  const filteredProducts = womenProducts.filter((p) => {
    if (selectedFit !== "All" && p.fit !== selectedFit) return false;
    return true;
  });

  const fits: DenimFit[] = ["Skinny", "Wide Leg", "Mom Fit", "Straight", "Flare"];

  return (
    <div className="py-12 sm:py-20 bg-[#FBFBFA]">
      <Container size="default">
        {/* Breadcrumb */}
        <div className="text-xs uppercase tracking-luxury text-neutral-400 mb-6">
          <Link href="/" className="hover:text-black">
            Home
          </Link>
          <span className="mx-2">/</span>
          <span className="text-neutral-900 font-semibold">Women</span>
        </div>

        {/* Header */}
        <div className="border-b border-neutral-200 pb-8 mb-10">
          <span className="text-xs uppercase tracking-luxury text-denim-700 font-bold block mb-2">
            SCULPTING HIGH RISES & EFFORTLESS SILHOUETTES
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-normal text-neutral-950">
            Women&apos;s Denim Collection
          </h1>
          <p className="mt-3 text-sm text-neutral-600 max-w-2xl font-light leading-relaxed">
            Architectural wide legs, sculpting high-rise skinnies, and relaxed mom jeans
            crafted with exceptional stretch recovery.
          </p>
        </div>

        {/* Fit Filter Bar */}
        <div className="bg-white border border-neutral-200 p-4 mb-8 flex items-center justify-between">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-neutral-400 mr-1 flex items-center">
              <Filter className="w-3.5 h-3.5 mr-1" />
              Filter Fit:
            </span>
            <button
              onClick={() => setSelectedFit("All")}
              className={`text-xs font-semibold px-3 py-1.5 transition-colors uppercase tracking-wider ${
                selectedFit === "All"
                  ? "bg-black text-white"
                  : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200"
              }`}
            >
              All Women&apos;s Fits
            </button>
            {fits.map((f) => (
              <button
                key={f}
                onClick={() => setSelectedFit(f)}
                className={`text-xs font-semibold px-3 py-1.5 transition-colors uppercase tracking-wider ${
                  selectedFit === f
                    ? "bg-black text-white"
                    : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </Container>
    </div>
  );
}
