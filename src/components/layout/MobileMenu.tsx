"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { X, ChevronRight, ChevronDown, ShoppingBag, Heart, User, Search } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  // Prevent background scrolling when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
      setExpandedIndex(null);
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const toggleAccordion = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            aria-hidden="true"
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 lg:hidden"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "tween", duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-0 left-0 bottom-0 w-full max-w-sm bg-white z-50 flex flex-col shadow-2xl lg:hidden overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-neutral-100">
              <Link
                href="/"
                onClick={onClose}
                className="font-serif text-xl tracking-wider font-semibold text-neutral-900"
              >
                {siteConfig.name}
              </Link>
              <button
                onClick={onClose}
                aria-label="Close menu"
                className="p-2 -mr-2 text-neutral-600 hover:text-black rounded-full hover:bg-neutral-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Quick Search Bar */}
            <div className="px-6 py-4 border-b border-neutral-100">
              <div className="relative flex items-center">
                <Search className="w-4 h-4 text-neutral-400 absolute left-3" />
                <input
                  type="text"
                  placeholder="Search denim, fits, styles..."
                  className="w-full bg-neutral-100 text-xs py-2.5 pl-9 pr-3 rounded-none border border-transparent focus:border-neutral-900 focus:bg-white focus:outline-none transition-colors"
                />
              </div>
            </div>

            {/* Navigation List */}
            <div className="flex-1 overflow-y-auto px-6 py-4 divide-y divide-neutral-100">
              {siteConfig.navigation.map((item, idx) => {
                const hasSub = !!item.megaMenu;
                const isExpanded = expandedIndex === idx;

                return (
                  <div key={idx} className="py-2">
                    <div className="flex items-center justify-between">
                      <Link
                        href={item.href}
                        onClick={hasSub ? undefined : onClose}
                        className="text-sm font-semibold tracking-wider uppercase text-neutral-800 hover:text-black py-2"
                      >
                        {item.name}
                      </Link>
                      {hasSub && (
                        <button
                          onClick={() => toggleAccordion(idx)}
                          aria-label={`Toggle ${item.name} submenu`}
                          className="p-2 text-neutral-500 hover:text-black"
                        >
                          {isExpanded ? (
                            <ChevronDown className="w-4 h-4" />
                          ) : (
                            <ChevronRight className="w-4 h-4" />
                          )}
                        </button>
                      )}
                    </div>

                    {hasSub && isExpanded && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="pl-3 pb-3 pt-1 space-y-3"
                      >
                        {item.megaMenu?.categories.map((cat, cIdx) => (
                          <div key={cIdx} className="space-y-1.5">
                            <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">
                              {cat.title}
                            </span>
                            <ul className="space-y-1 pl-2 border-l border-neutral-200">
                              {cat.items.map((sub, sIdx) => (
                                <li key={sIdx}>
                                  <Link
                                    href={sub.href}
                                    onClick={onClose}
                                    className="text-xs text-neutral-600 hover:text-black block py-1 font-medium"
                                  >
                                    {sub.name}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </motion.div>
                    )}
                  </div>
                );
              })}

              {/* Auxiliary links */}
              <div className="py-4 space-y-2 text-xs uppercase tracking-wider text-neutral-500 font-medium">
                <Link
                  href="/shop?page=about"
                  onClick={onClose}
                  className="block py-1 hover:text-black"
                >
                  About Just Jeans
                </Link>
                <Link
                  href="/shop?page=contact"
                  onClick={onClose}
                  className="block py-1 hover:text-black"
                >
                  Customer Care & Stores
                </Link>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="p-6 border-t border-neutral-100 bg-neutral-50 space-y-3">
              <div className="grid grid-cols-3 gap-2 text-center">
                <Link
                  href="/shop?action=account"
                  onClick={onClose}
                  className="flex flex-col items-center justify-center p-2 rounded bg-white border border-neutral-200 text-xs font-medium text-neutral-700 hover:text-black"
                >
                  <User className="w-4 h-4 mb-1" />
                  Account
                </Link>
                <Link
                  href="/shop?action=wishlist"
                  onClick={onClose}
                  className="flex flex-col items-center justify-center p-2 rounded bg-white border border-neutral-200 text-xs font-medium text-neutral-700 hover:text-black"
                >
                  <Heart className="w-4 h-4 mb-1" />
                  Wishlist
                </Link>
                <Link
                  href="/shop?action=cart"
                  onClick={onClose}
                  className="flex flex-col items-center justify-center p-2 rounded bg-white border border-neutral-200 text-xs font-medium text-neutral-700 hover:text-black"
                >
                  <ShoppingBag className="w-4 h-4 mb-1" />
                  Cart
                </Link>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
