"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Product } from "@/types";
import { useStore } from "@/context/StoreContext";
import { Heart, ShoppingBag, Check } from "lucide-react";

export interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart, toggleWishlist, isInWishlist } = useStore();
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const [showSizePicker, setShowSizePicker] = useState(false);
  const [justAdded, setJustAdded] = useState(false);

  const isFavorite = isInWishlist(product.id);

  const handleQuickAdd = () => {
    addToCart(product, selectedSize, 1);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 2000);
  };

  return (
    <div className="group relative flex flex-col bg-white border border-neutral-200/80 hover:border-black transition-all duration-300 shadow-sm hover:shadow-xl">
      {/* Product Image Container */}
      <div className="relative aspect-[3/4] w-full bg-neutral-100 overflow-hidden">
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1 z-10">
          {product.isNewArrival && (
            <span className="text-[9px] uppercase font-bold tracking-widest px-2 py-1 bg-black text-white">
              NEW
            </span>
          )}
          {product.isBestSeller && (
            <span className="text-[9px] uppercase font-bold tracking-widest px-2 py-1 bg-denim-800 text-white">
              BESTSELLER
            </span>
          )}
          {product.onSale && product.originalPrice && (
            <span className="text-[9px] uppercase font-bold tracking-widest px-2 py-1 bg-red-700 text-white">
              SALE
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={() => toggleWishlist(product.id)}
          aria-label={isFavorite ? "Remove from wishlist" : "Add to wishlist"}
          className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-colors z-10 ${
            isFavorite
              ? "bg-red-50 text-red-600"
              : "bg-white/80 text-neutral-700 hover:bg-white hover:text-black"
          }`}
        >
          <Heart
            className={`w-4 h-4 ${isFavorite ? "fill-red-600" : ""}`}
          />
        </button>

        {/* Quick Size Selection Layer Overlay */}
        <div className="absolute inset-x-0 bottom-0 p-3 bg-white/95 backdrop-blur-md translate-y-full group-hover:translate-y-0 transition-transform duration-300 flex flex-col gap-2 z-20 border-t border-neutral-200">
          <div className="flex items-center justify-between text-[11px] font-semibold text-neutral-600 uppercase tracking-wider">
            <span>Select Waist/Length:</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {product.sizes.map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`text-[10px] font-bold px-2 py-1 border transition-colors ${
                  selectedSize === size
                    ? "bg-black text-white border-black"
                    : "bg-white text-neutral-700 border-neutral-300 hover:border-black"
                }`}
              >
                {size}
              </button>
            ))}
          </div>
          <button
            onClick={handleQuickAdd}
            className="w-full py-2 bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-bold uppercase tracking-luxury flex items-center justify-center space-x-1.5 transition-colors"
          >
            {justAdded ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span>ADDED TO BAG</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>ADD TO BAG ({selectedSize})</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Product Content Details */}
      <div className="p-4 sm:p-5 flex flex-col flex-grow justify-between bg-white">
        <div>
          <div className="flex items-center justify-between text-xs text-neutral-500 uppercase tracking-wider mb-1 font-medium">
            <span>{product.gender}&apos;s Denim</span>
            <span className="font-semibold text-denim-700">{product.fit} Fit</span>
          </div>
          <h3 className="font-serif text-base sm:text-lg font-semibold text-neutral-900 group-hover:text-denim-800 transition-colors line-clamp-1">
            {product.name}
          </h3>
          <p className="text-xs text-neutral-500 line-clamp-1 mt-0.5 font-light">
            {product.subtitle}
          </p>
        </div>

        <div className="mt-3 pt-3 border-t border-neutral-100 flex items-center justify-between">
          <div className="flex items-baseline space-x-2">
            <span className="text-sm sm:text-base font-bold text-neutral-900">
              ৳ {product.price.toLocaleString()}
            </span>
            {product.originalPrice && (
              <span className="text-xs text-neutral-400 line-through">
                ৳ {product.originalPrice.toLocaleString()}
              </span>
            )}
          </div>
          <span className="text-[10px] uppercase tracking-luxury text-neutral-500 font-semibold">
            {product.wash}
          </span>
        </div>
      </div>
    </div>
  );
}
