import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/Button";

export function EditorialSection() {
  return (
    <section className="w-full py-16 sm:py-24 bg-white">
      <div className="max-w-[1700px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative min-h-[550px] sm:min-h-[680px] w-full overflow-hidden bg-neutral-900 flex items-center justify-center text-center p-8 sm:p-16">
          {/* Background Editorial Visual */}
          <Image
            src="https://images.unsplash.com/photo-1576995853123-5a10305d93c0?q=80&w=2000&auto=format&fit=crop"
            alt="The Denim Edit Campaign"
            fill
            sizes="100vw"
            className="object-cover object-[center_40%] brightness-75 scale-105 hover:scale-100 transition-transform duration-1000"
          />

          {/* Luxury Film Vignette Overlay */}
          <div className="absolute inset-0 bg-black/40 backdrop-contrast-[1.05]" />

          {/* Campaign Copy */}
          <div className="relative z-10 max-w-2xl mx-auto text-white space-y-6">
            <span className="text-xs uppercase tracking-luxury text-neutral-300 font-semibold inline-block border-b border-neutral-400 pb-1">
              CAMPAIGN 2026
            </span>

            <h2 className="font-serif text-4xl sm:text-6xl md:text-7xl font-normal tracking-tight leading-tight">
              THE DENIM EDIT
            </h2>

            <p className="text-sm sm:text-base md:text-lg text-neutral-200 font-light max-w-lg mx-auto leading-relaxed">
              Crafted for everyday movement. Designed for modern style. An
              uncompromising focus on raw texture, comfort, and architectural
              lines.
            </p>

            <div className="pt-4">
              <Button
                href="/shop?tab=collections"
                variant="secondary"
                size="lg"
                className="font-bold tracking-luxury"
              >
                EXPLORE COLLECTION
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
