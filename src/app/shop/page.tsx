"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useStore } from "@/context/StoreContext";
import { Container } from "@/components/ui/Container";
import { ProductCard } from "@/components/shop/ProductCard";
import { DenimFit, GenderCategory } from "@/types";
import { Filter, SlidersHorizontal, Sparkles } from "lucide-react";

export default function ShopPage() {
  const { products } = useStore();
  const [selectedGender, setSelectedGender] = useState<string>("All");
  const [selectedFit, setSelectedFit] = useState<string>("All");
  const [sortBy, setSortBy] = useState<string>("featured");

  const fits: DenimFit[] = [
    "Slim",
    "Straight",
    "Relaxed",
    "Tapered",
    "Wide Leg",
    "Skinny",
    "Mom Fit",
  ];

  const filteredProducts = products.filter((p) => {
    if (selectedGender !== "All" && p.gender !== selectedGender) return false;
    if (selectedFit !== "All" && p.fit !== selectedFit) return false;
    return true;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === "price-asc") return a.price - b.price;
    if (sortBy === "price-desc") return b.price - a.price;
    return 0;
  });

  return (
    <div className="py-12 sm:py-20 bg-[#FBFBFA]">
      <Container size="default">
        {/* Breadcrumb */}
        <div className="text-xs uppercase tracking-luxury text-neutral-400 mb-6">
          <Link href="/" className="hover:text-black">
            Home
          </Link>
          <span className="mx-2">/</span>
          <span className="text-neutral-900 font-semibold">Catalog</span>
        </div>

        {/* Header */}
        <div className="border-b border-neutral-200 pb-8 mb-10">
          <span className="text-xs uppercase tracking-luxury text-denim-700 font-bold block mb-2">
            PREMIUM COLLECTION
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-normal text-neutral-950">
            All Denim & Silhouettes
          </h1>
          <p className="mt-3 text-sm text-neutral-600 max-w-2xl font-light leading-relaxed">
            Japanese shuttle-loom selvedge, high-rise sculpting curves, and everyday
            relaxed fits tailored with durable hardware.
          </p>
        </div>

        {/* Filters & Sorting Bar */}
        <div className="bg-white border border-neutral-200 p-4 mb-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          {/* Gender Filter Buttons */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-neutral-400 mr-1 flex items-center">
              <Filter className="w-3.5 h-3.5 mr-1" />
              Gender:
            </span>
            {["All", "Men", "Women"].map((gender) => (
              <button
                key={gender}
                onClick={() => setSelectedGender(gender)}
                className={`text-xs font-semibold px-3 py-1.5 transition-colors uppercase tracking-wider ${
                  selectedGender === gender
                    ? "bg-black text-white"
                    : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200"
                }`}
              >
                {gender}
              </button>
            ))}
          </div>

          {/* Fit Silhouette Filter */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-neutral-400 mr-1">
              Fit:
            </span>
            <select
              value={selectedFit}
              onChange={(e) => setSelectedFit(e.target.value)}
              className="text-xs font-semibold bg-neutral-100 border border-neutral-200 px-3 py-1.5 focus:outline-none uppercase"
            >
              <option value="All">All Fits</option>
              {fits.map((f) => (
                <option key={f} value={f}>
                  {f} Fit
                </option>
              ))}
            </select>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="text-xs font-semibold bg-neutral-100 border border-neutral-200 px-3 py-1.5 focus:outline-none uppercase ml-2"
            >
              <option value="featured">Featured First</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Products Grid */}
        {sortedProducts.length === 0 ? (
          <div className="bg-white border border-neutral-200 p-12 text-center space-y-3">
            <p className="font-serif text-lg text-neutral-800">
              No products match your current filters.
            </p>
            <button
              onClick={() => {
                setSelectedGender("All");
                setSelectedFit("All");
              }}
              className="text-xs font-bold uppercase tracking-wider text-denim-700 underline underline-offset-4"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
            {sortedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </Container>
    </div>
  );
}
