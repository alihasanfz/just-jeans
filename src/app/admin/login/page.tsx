"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { siteConfig } from "@/config/site";
import { motion } from "framer-motion";
import {
  Lock,
  Mail,
  Eye,
  EyeOff,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  Loader2,
} from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("admin@justjeans.com");
  const [password, setPassword] = useState("admin123");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    setTimeout(() => {
      if (email === "admin@justjeans.com" && password === "admin123") {
        router.push("/admin");
      } else {
        setIsLoading(false);
        setError("Invalid credentials. Use demo: admin@justjeans.com / admin123");
      }
    }, 800);
  };

  const handleQuickDemo = () => {
    setEmail("admin@justjeans.com");
    setPassword("admin123");
    setError("");
  };

  return (
    <div className="min-h-screen w-full flex bg-[#0A0B0E] text-white relative overflow-hidden">
      {/* Background Animated Gradient Orbs */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-denim-700/20 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-denim-900/30 rounded-full blur-[160px] pointer-events-none" />

      {/* Left Column: Luxury Brand Visual Showcase */}
      <div className="hidden lg:flex lg:w-1/2 relative flex-col justify-between p-16 border-r border-white/10 overflow-hidden">
        {/* Background Overlay */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-40 brightness-75 scale-105 transition-transform duration-1000"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1541099649105-f69ad21f3246?q=80&w=1600&auto=format&fit=crop')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0B0E] via-[#0A0B0E]/60 to-transparent" />

        {/* Top Branding */}
        <div className="relative z-10">
          <Link href="/" className="inline-block">
            <span className="font-serif text-3xl font-bold tracking-widest text-white">
              {siteConfig.name}
            </span>
            <span className="block text-[10px] uppercase tracking-luxury text-neutral-400 mt-1">
              ADMIN CONTROL CENTER
            </span>
          </Link>
        </div>

        {/* Bottom Feature Card */}
        <div className="relative z-10 bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-sm max-w-lg space-y-4">
          <div className="flex items-center space-x-2 text-denim-300 text-xs font-semibold uppercase tracking-widest">
            <ShieldCheck className="w-4 h-4" />
            <span>ENTERPRISE BACKOFFICE</span>
          </div>
          <h3 className="font-serif text-2xl font-normal text-white leading-snug">
            Real-time catalog orchestration, fit management, and order fulfillment.
          </h3>
          <p className="text-xs text-neutral-400 leading-relaxed font-light">
            Monitor incoming denim orders, update campaign banners, and configure
            brand identity settings with zero deployment overhead.
          </p>
        </div>
      </div>

      {/* Right Column: Interactive Login Glass Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md bg-neutral-900/80 backdrop-blur-2xl border border-white/10 p-8 sm:p-10 rounded-sm shadow-2xl space-y-8"
        >
          {/* Header */}
          <div className="text-center space-y-2">
            <div className="inline-flex p-3 rounded-full bg-denim-950 border border-denim-800/60 text-denim-300 mb-2">
              <Lock className="w-5 h-5" />
            </div>
            <h2 className="font-serif text-3xl font-medium tracking-tight text-white">
              Admin Authentication
            </h2>
            <p className="text-xs text-neutral-400 tracking-wide">
              Please enter your credentials to access the backoffice
            </p>
          </div>

          {/* Quick Demo Credentials Autofill Banner */}
          <div className="p-3.5 bg-denim-950/60 border border-denim-700/40 rounded-sm flex items-center justify-between text-xs">
            <div className="flex items-center space-x-2 text-neutral-300">
              <Sparkles className="w-4 h-4 text-denim-400" />
              <span>Demo: <strong>admin@justjeans.com</strong></span>
            </div>
            <button
              type="button"
              onClick={handleQuickDemo}
              className="text-[11px] font-bold uppercase tracking-wider text-denim-300 hover:text-white underline underline-offset-2 transition-colors"
            >
              Fill Credentials
            </button>
          </div>

          {error && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="p-3 bg-red-950/80 border border-red-800 text-red-300 text-xs rounded-sm text-center"
            >
              {error}
            </motion.div>
          )}

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-5">
            {/* Email Input */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold uppercase tracking-widest text-neutral-300 block">
                Email Address
              </label>
              <div className="relative flex items-center">
                <Mail className="w-4 h-4 text-neutral-500 absolute left-3.5 pointer-events-none" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="admin@justjeans.com"
                  className="w-full h-12 bg-neutral-950/90 border border-neutral-700 focus:border-white text-white text-sm pl-10 pr-4 focus:outline-none transition-colors"
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold uppercase tracking-widest text-neutral-300 block">
                  Password
                </label>
              </div>
              <div className="relative flex items-center">
                <Lock className="w-4 h-4 text-neutral-500 absolute left-3.5 pointer-events-none" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="••••••••"
                  className="w-full h-12 bg-neutral-950/90 border border-neutral-700 focus:border-white text-white text-sm pl-10 pr-10 focus:outline-none transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label="Toggle password visibility"
                  className="absolute right-3.5 text-neutral-500 hover:text-white transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full h-12 mt-2 bg-white text-black hover:bg-neutral-200 font-semibold text-xs tracking-luxury uppercase flex items-center justify-center space-x-2 transition-all duration-300 disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>AUTHENTICATING...</span>
                </>
              ) : (
                <>
                  <span>LOGIN TO DASHBOARD</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Footer Back Link */}
          <div className="pt-4 border-t border-white/10 text-center">
            <Link
              href="/"
              className="text-xs text-neutral-400 hover:text-white transition-colors underline-offset-4 hover:underline uppercase tracking-wider font-medium"
            >
              ← Return to Main Storefront
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
