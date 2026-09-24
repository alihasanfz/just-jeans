"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { NavItem } from "@/types";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";

interface MegaMenuProps {
  item: NavItem;
  isOpen: boolean;
  onClose: () => void;
}

export function MegaMenu({ item, isOpen, onClose }: MegaMenuProps) {
  if (!item.megaMenu || !isOpen) return null;

  const { featured, categories } = item.megaMenu;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 8 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        className="absolute left-0 top-full w-full bg-white border-b border-neutral-200 shadow-2xl z-40"
        onMouseLeave={onClose}
      >
        <div className="max-w-7xl mx-auto px-6 py-10">
          <div className="grid grid-cols-12 gap-8">
            {/* Categories links */}
            <div
              className={`grid ${
                featured ? "col-span-8 grid-cols-3" : "col-span-12 grid-cols-4"
              } gap-8`}
            >
              {categories.map((category, idx) => (
                <div key={idx} className="space-y-4">
                  <h3 className="text-xs font-semibold uppercase tracking-widest text-neutral-400">
                    {category.title}
                  </h3>
                  <ul className="space-y-2.5">
                    {category.items.map((subItem, sIdx) => (
                      <li key={sIdx}>
                        <Link
                          href={subItem.href}
                          onClick={onClose}
                          className="group flex items-center justify-between text-sm text-neutral-700 hover:text-black hover:translate-x-1 transition-all duration-200"
                        >
                          <span className="font-normal">{subItem.name}</span>
                          {subItem.badge && (
                            <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 bg-denim-100 text-denim-800 rounded">
                              {subItem.badge}
                            </span>
                          )}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Featured Promo Card */}
            {featured && (
              <div className="col-span-4 pl-4 border-l border-neutral-100">
                <Link
                  href={featured.href}
                  onClick={onClose}
                  className="group block relative h-64 overflow-hidden rounded-sm bg-neutral-100"
                >
                  <Image
                    src={featured.image}
                    alt={featured.title}
                    fill
                    sizes="(max-width: 1200px) 33vw, 400px"
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex flex-col justify-end p-6 text-white">
                    <span className="text-[10px] uppercase tracking-luxury text-neutral-300 font-semibold mb-1">
                      THE DENIM EDIT
                    </span>
                    <h4 className="font-serif text-lg font-medium leading-tight mb-2">
                      {featured.title}
                    </h4>
                    <p className="text-xs text-neutral-300 line-clamp-2 mb-3 font-normal">
                      {featured.subtitle}
                    </p>
                    <span className="inline-flex items-center text-xs font-semibold tracking-wider uppercase underline underline-offset-4 group-hover:text-denim-200 transition-colors">
                      {featured.ctaText}
                      <ArrowRight className="w-3.5 h-3.5 ml-1.5 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </Link>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
