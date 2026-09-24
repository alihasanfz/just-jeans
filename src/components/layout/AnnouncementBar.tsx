"use client";

import React, { useState } from "react";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

export function AnnouncementBar() {
  const [isVisible, setIsVisible] = useState(true);

  if (!siteConfig.announcement.enabled || !isVisible) {
    return null;
  }

  return (
    <AnimatePresence>
      <motion.aside
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: "auto", opacity: 1 }}
        exit={{ height: 0, opacity: 0 }}
        transition={{ duration: 0.3 }}
        aria-label="Announcement"
        className="bg-neutral-950 text-neutral-200 border-b border-neutral-800 text-xs py-2.5 px-4 relative z-50 overflow-hidden"
      >
        <div className="max-w-7xl mx-auto flex items-center justify-center text-center font-medium tracking-widest uppercase gap-3">
          <span>{siteConfig.announcement.text}</span>
          {siteConfig.announcement.linkText && siteConfig.announcement.href && (
            <Link
              href={siteConfig.announcement.href}
              className="underline hover:text-white transition-colors duration-200 font-semibold"
            >
              {siteConfig.announcement.linkText}
            </Link>
          )}
        </div>
        <button
          onClick={() => setIsVisible(false)}
          aria-label="Dismiss announcement"
          className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-white transition-colors p-1"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </motion.aside>
    </AnimatePresence>
  );
}
