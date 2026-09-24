"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { motion } from "framer-motion";
import { Sparkles, Play, Pause, Volume2, VolumeX, ShieldCheck, ArrowRight } from "lucide-react";

export function HeroSection() {
  const [isPlaying, setIsPlaying] = useState(true);

  return (
    <section className="relative w-full min-h-[92vh] lg:min-h-screen flex items-center justify-center overflow-hidden bg-[#0A0B0E]">
      {/* Background Cinematic Video / High-Resolution Motion Layer */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {/* Cinematic Ambient Backdrop */}
        <Image
          src="https://images.unsplash.com/photo-1541099649105-f69ad21f3246?q=80&w=2200&auto=format&fit=crop"
          alt="Premium Denim Campaign"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[center_35%] filter brightness-[0.82] contrast-[1.08] scale-105 animate-pulse duration-[10000ms]"
        />

        {/* Ambient Dark Luxury Gradients & Cinematic Vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/45 to-black/35" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/60" />
      </div>

      {/* Floating Glassmorphic Badge — Top Right */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="hidden xl:flex absolute top-28 right-12 z-20 items-center space-x-3 bg-black/40 backdrop-blur-xl border border-white/15 px-4 py-2.5 rounded-full text-white shadow-2xl"
      >
        <div className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
        <span className="text-[11px] font-semibold uppercase tracking-luxury text-neutral-200">
          AUTUMN / WINTER 2026 EDITION
        </span>
      </motion.div>

      {/* Floating Glassmorphic Badge — Bottom Left */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.8 }}
        className="hidden xl:flex absolute bottom-14 left-12 z-20 items-center space-x-3 bg-black/40 backdrop-blur-xl border border-white/15 px-5 py-3 rounded-sm text-white shadow-2xl"
      >
        <div className="p-2 rounded bg-white/10 text-denim-300">
          <Sparkles className="w-4 h-4" />
        </div>
        <div>
          <p className="text-xs font-semibold tracking-wider text-white">
            14oz Raw Japanese Selvedge
          </p>
          <p className="text-[10px] text-neutral-400 uppercase tracking-widest">
            Custom Shuttle Loom Weave
          </p>
        </div>
      </motion.div>

      {/* Content Container */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center text-white">
        {/* Eyebrow Pill */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="inline-block"
        >
          <span className="text-xs font-semibold tracking-luxury uppercase bg-white/10 backdrop-blur-md px-5 py-2 rounded-full border border-white/20 text-neutral-200 shadow-inner">
            FIND YOUR PERFECT FIT
          </span>
        </motion.div>

        {/* Main Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-6 font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-normal tracking-tight text-white leading-[1.06] text-balance drop-shadow-lg"
        >
          Premium Denim.
          <br />
          <span className="italic font-light text-denim-100">
            Designed for Everyday.
          </span>
        </motion.h1>

        {/* Supporting description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.45 }}
          className="mt-6 text-sm sm:text-base md:text-lg text-neutral-300 max-w-2xl mx-auto font-light leading-relaxed drop-shadow"
        >
          Engineered for exceptional movement, durability, and timeless structure.
          Crafted from pure organic indigo and sustainable stretch recovery yarns.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6"
        >
          <Button
            href="/men"
            variant="secondary"
            size="lg"
            className="w-full sm:w-56 font-bold tracking-luxury text-black shadow-2xl hover:scale-105 transition-transform"
          >
            SHOP MEN
          </Button>
          <Button
            href="/women"
            variant="outline"
            size="lg"
            className="w-full sm:w-56 text-white border-white/80 hover:bg-white hover:text-black font-bold tracking-luxury backdrop-blur-md hover:scale-105 transition-transform"
          >
            SHOP WOMEN
          </Button>
        </motion.div>

        {/* Quick Admin Portal Direct Access Link */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="mt-10 inline-block"
        >
          <Link
            href="/admin"
            className="inline-flex items-center space-x-1.5 text-[11px] font-semibold uppercase tracking-luxury text-neutral-400 hover:text-white bg-white/5 hover:bg-white/10 px-3.5 py-1.5 rounded-full border border-white/10 transition-colors"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-denim-400" />
            <span>Open Admin Dashboard</span>
            <ArrowRight className="w-3 h-3 ml-1" />
          </Link>
        </motion.div>
      </div>

      {/* Subtle bottom scroll indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center opacity-70 hover:opacity-100 transition-opacity">
        <span className="text-[9px] tracking-luxury uppercase text-white/70 mb-1">
          SCROLL TO EXPLORE
        </span>
        <div className="w-[1px] h-7 bg-gradient-to-b from-white to-transparent animate-bounce" />
      </div>
    </section>
  );
}
