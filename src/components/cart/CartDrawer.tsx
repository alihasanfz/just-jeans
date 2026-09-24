"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useStore } from "@/context/StoreContext";
import { motion, AnimatePresence } from "framer-motion";
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, Truck } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function CartDrawer() {
  const {
    cart,
    isCartOpen,
    closeCart,
    removeFromCart,
    updateQuantity,
    cartSubtotal,
    cartCount,
  } = useStore();

  const freeShippingThreshold = 3000;
  const progressToFreeShipping = Math.min(
    100,
    (cartSubtotal / freeShippingThreshold) * 100
  );
  const remainingForFreeShipping = Math.max(
    0,
    freeShippingThreshold - cartSubtotal
  );

  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isCartOpen]);

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={closeCart}
            aria-hidden="true"
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          {/* Drawer */}
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            aria-label="Shopping Bag"
            className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-white z-50 flex flex-col shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-neutral-200">
              <div className="flex items-center space-x-2">
                <ShoppingBag className="w-5 h-5 text-neutral-900" />
                <h2 className="font-serif text-lg font-medium tracking-tight">
                  Shopping Bag ({cartCount})
                </h2>
              </div>
              <button
                onClick={closeCart}
                aria-label="Close cart"
                className="p-1.5 text-neutral-500 hover:text-black hover:bg-neutral-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Free Shipping Progress Indicator */}
            <div className="bg-neutral-50 px-6 py-3.5 border-b border-neutral-200 text-xs">
              <div className="flex items-center space-x-1.5 mb-1.5 font-medium text-neutral-800">
                <Truck className="w-4 h-4 text-denim-600" />
                <span>
                  {remainingForFreeShipping === 0 ? (
                    <strong className="text-emerald-700">
                      You unlocked FREE Delivery across Bangladesh!
                    </strong>
                  ) : (
                    <>
                      Add <strong>৳ {remainingForFreeShipping.toLocaleString()}</strong> more for FREE Delivery
                    </>
                  )}
                </span>
              </div>
              <div className="w-full h-1.5 bg-neutral-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-denim-700 transition-all duration-500 rounded-full"
                  style={{ width: `${progressToFreeShipping}%` }}
                />
              </div>
            </div>

            {/* Cart Items List */}
            <div className="flex-1 overflow-y-auto px-6 divide-y divide-neutral-100">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center py-16 space-y-4">
                  <div className="p-4 rounded-full bg-neutral-100 text-neutral-400">
                    <ShoppingBag className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="font-serif text-xl font-medium text-neutral-900">
                      Your bag is empty
                    </h3>
                    <p className="text-xs text-neutral-500 max-w-xs mt-1">
                      Explore our handcrafted denim cuts and find your signature fit.
                    </p>
                  </div>
                  <Button
                    onClick={closeCart}
                    href="/shop"
                    variant="primary"
                    size="md"
                    className="mt-4"
                  >
                    EXPLORE DENIM
                  </Button>
                </div>
              ) : (
                cart.map((item, idx) => (
                  <div key={`${item.product.id}-${item.selectedSize}`} className="py-5 flex gap-4">
                    {/* Product Image */}
                    <div className="relative w-20 h-24 flex-shrink-0 bg-neutral-100 rounded-none overflow-hidden border border-neutral-200">
                      <Image
                        src={item.product.images[0]}
                        alt={item.product.name}
                        fill
                        sizes="80px"
                        className="object-cover object-center"
                      />
                    </div>

                    {/* Details */}
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between">
                          <h4 className="font-serif text-sm font-semibold text-neutral-900 line-clamp-1">
                            {item.product.name}
                          </h4>
                          <button
                            onClick={() =>
                              removeFromCart(item.product.id, item.selectedSize)
                            }
                            aria-label={`Remove ${item.product.name}`}
                            className="text-neutral-400 hover:text-red-600 p-1 -mr-1"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                        <p className="text-xs text-denim-700 font-medium">
                          Fit: {item.product.fit} | Size: {item.selectedSize}
                        </p>
                        <p className="text-xs font-semibold text-neutral-900 mt-1">
                          ৳ {item.product.price.toLocaleString()}
                        </p>
                      </div>

                      {/* Quantity Modifier */}
                      <div className="flex items-center space-x-2.5 pt-2">
                        <div className="flex items-center border border-neutral-300">
                          <button
                            onClick={() =>
                              updateQuantity(
                                item.product.id,
                                item.selectedSize,
                                -1
                              )
                            }
                            aria-label="Decrease quantity"
                            className="p-1.5 text-neutral-600 hover:text-black hover:bg-neutral-100"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-8 text-center text-xs font-semibold">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(item.product.id, item.selectedSize, 1)
                            }
                            aria-label="Increase quantity"
                            className="p-1.5 text-neutral-600 hover:text-black hover:bg-neutral-100"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer Summary & Checkout */}
            {cart.length > 0 && (
              <div className="p-6 border-t border-neutral-200 bg-neutral-50/80 space-y-4">
                <div className="space-y-1.5 text-xs">
                  <div className="flex justify-between text-neutral-600">
                    <span>Bag Subtotal</span>
                    <span className="font-semibold text-neutral-900">
                      ৳ {cartSubtotal.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between text-neutral-600">
                    <span>Estimated Shipping</span>
                    <span className="font-semibold text-neutral-900">
                      {remainingForFreeShipping === 0 ? (
                        <span className="text-emerald-700 uppercase font-bold">
                          FREE
                        </span>
                      ) : (
                        "Calculated at checkout"
                      )}
                    </span>
                  </div>
                  <div className="pt-2 border-t border-neutral-200 flex justify-between text-sm font-bold text-neutral-900">
                    <span>Total</span>
                    <span>৳ {cartSubtotal.toLocaleString()}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <Link
                    href="/checkout"
                    onClick={closeCart}
                    className="w-full h-13 py-3.5 bg-neutral-950 text-white hover:bg-neutral-800 text-xs font-bold tracking-luxury uppercase flex items-center justify-center space-x-2 transition-all shadow-md"
                  >
                    <span>CHECKOUT NOW</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <p className="text-[11px] text-center text-neutral-500 font-light">
                    Accepts <strong>bKash</strong>, <strong>Nagad</strong>, Cards & Cash on Delivery.
                  </p>
                </div>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
