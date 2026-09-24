import React from "react";
import Image from "next/image";
import Link from "next/link";
import { fitItems } from "@/config/site";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Container } from "@/components/ui/Container";
import { ArrowUpRight } from "lucide-react";

export function FitSection() {
  return (
    <section id="fits" className="w-full py-16 sm:py-24 bg-neutral-50/70 border-y border-neutral-200/60">
      <Container size="wide">
        <SectionHeading
          eyebrow="PRECISION SILHOUETTES"
          title="SHOP BY FIT"
          description="Find the silhouette that complements your style. Designed with signature proportions and premium stretch recovery."
          align="center"
        />

        {/* Fit Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {fitItems.map((fit) => (
            <Link
              key={fit.id}
              href={fit.href}
              className="group relative flex flex-col bg-white border border-neutral-200/80 overflow-hidden hover:border-black transition-all duration-300 shadow-sm hover:shadow-xl"
            >
              {/* Image Container */}
              <div className="relative w-full aspect-[4/5] bg-neutral-100 overflow-hidden">
                <Image
                  src={fit.image}
                  alt={fit.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <ArrowUpRight className="w-4 h-4 text-black" />
                </div>
              </div>

              {/* Fit Info */}
              <div className="p-6 flex flex-col flex-grow justify-between bg-white">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-serif text-2xl font-semibold tracking-tight text-neutral-900 group-hover:text-denim-800 transition-colors">
                      {fit.name}
                    </h3>
                  </div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-denim-600">
                    {fit.tagline}
                  </span>
                  <p className="mt-2 text-xs text-neutral-600 line-clamp-2 leading-relaxed">
                    {fit.description}
                  </p>
                </div>

                <div className="mt-4 pt-4 border-t border-neutral-100 flex items-center justify-between text-xs font-semibold uppercase tracking-luxury text-neutral-900 group-hover:text-black">
                  <span>DISCOVER {fit.name}</span>
                  <span className="transform group-hover:translate-x-1 transition-transform">
                    →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
