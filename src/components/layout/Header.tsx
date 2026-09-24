"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { useStore } from "@/context/StoreContext";
import { MegaMenu } from "./MegaMenu";
import { MobileMenu } from "./MobileMenu";
import { Search, Heart, ShoppingBag, Menu, Truck, Shield } from "lucide-react";
import { NavItem } from "@/types";

export function Header() {
  const { cartCount, wishlist, openCart } = useStore();
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeMegaMenu, setActiveMegaMenu] = useState<NavItem | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${
          isScrolled
            ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-neutral-200 text-neutral-900"
            : "bg-white/90 backdrop-blur-sm border-b border-neutral-100 text-neutral-900"
        }`}
        onMouseLeave={() => setActiveMegaMenu(null)}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Mobile Hamburger Button */}
            <div className="flex items-center lg:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                aria-label="Open menu"
                className="p-2 -ml-2 text-neutral-800 hover:text-black focus:outline-none"
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>

            {/* Brand Logo */}
            <div className="flex-shrink-0 flex items-center">
              <Link
                href="/"
                className="group flex flex-col items-center lg:items-start select-none"
              >
                <span className="font-serif text-2xl sm:text-3xl font-bold tracking-widest text-neutral-950 group-hover:text-denim-800 transition-colors">
                  {siteConfig.name}
                </span>
                <span className="hidden sm:block text-[9px] uppercase tracking-[0.25em] text-neutral-500 font-medium -mt-1">
                  EST. 2026
                </span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8 h-full">
              {siteConfig.navigation.map((item, idx) => {
                const isHovered = activeMegaMenu?.name === item.name;

                return (
                  <div
                    key={idx}
                    className="h-full flex items-center"
                    onMouseEnter={() => {
                      if (item.megaMenu) {
                        setActiveMegaMenu(item);
                      } else {
                        setActiveMegaMenu(null);
                      }
                    }}
                  >
                    <Link
                      href={item.href}
                      className={`text-xs font-semibold tracking-luxury uppercase transition-colors relative py-2 ${
                        isHovered
                          ? "text-black"
                          : item.name === "SALE"
                          ? "text-red-700 hover:text-red-800 font-bold"
                          : "text-neutral-700 hover:text-black"
                      }`}
                    >
                      {item.name}
                      {/* Active indicator bar */}
                      {isHovered && (
                        <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-black transition-all" />
                      )}
                    </Link>
                  </div>
                );
              })}
            </nav>

            {/* Right Header Actions */}
            <div className="flex items-center space-x-1.5 sm:space-x-3">
              <Link
                href="/track"
                title="Track Live Order"
                className="hidden lg:flex items-center space-x-1 px-3 py-1.5 text-xs font-semibold text-neutral-700 hover:text-black uppercase tracking-wider hover:bg-neutral-100 rounded transition-colors"
              >
                <Truck className="w-3.5 h-3.5 text-denim-700" />
                <span>Track Order</span>
              </Link>

              <Link
                href="/admin"
                aria-label="Admin Portal"
                title="Admin Control Center"
                className="hidden md:flex items-center space-x-1 p-1 px-2.5 bg-neutral-900 text-white rounded text-[10px] font-bold uppercase tracking-wider hover:bg-neutral-800 transition-colors"
              >
                <Shield className="w-3 h-3" />
                <span>Admin</span>
              </Link>

              <Link
                href="/shop"
                aria-label="Wishlist"
                className="p-2 text-neutral-700 hover:text-black transition-colors rounded-full hover:bg-neutral-100 relative"
              >
                <Heart className="w-5 h-5 stroke-[1.5]" />
                {wishlist.length > 0 && (
                  <span className="absolute top-1 right-1 bg-red-600 text-white text-[9px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                    {wishlist.length}
                  </span>
                )}
              </Link>

              {/* Shopping Bag Button (Triggers Slide-over CartDrawer) */}
              <button
                onClick={openCart}
                aria-label="Shopping Bag"
                className="p-2 text-neutral-700 hover:text-black transition-colors rounded-full hover:bg-neutral-100 relative focus:outline-none"
              >
                <ShoppingBag className="w-5 h-5 stroke-[1.5]" />
                {cartCount > 0 && (
                  <span className="absolute top-1 right-1 bg-black text-white text-[9px] font-bold rounded-full w-4 h-4 flex items-center justify-center animate-scale">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mega Menu Overlay */}
        {activeMegaMenu && (
          <MegaMenu
            item={activeMegaMenu}
            isOpen={!!activeMegaMenu}
            onClose={() => setActiveMegaMenu(null)}
          />
        )}
      </header>

      {/* Mobile Drawer */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
    </>
  );
}
