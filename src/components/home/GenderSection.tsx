import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export function GenderSection() {
  const cards = [
    {
      gender: "MEN",
      subheading: "Explore Men's Denim",
      description: "From Japanese raw selvedge to everyday relaxed fits.",
      cta: "SHOP MEN",
      href: "/men",
      image:
        "https://images.unsplash.com/photo-1516257984-b1b4d707412e?q=80&w=1200&auto=format&fit=crop",
    },
    {
      gender: "WOMEN",
      subheading: "Explore Women's Denim",
      description: "Sculpting high rises, wide legs, and effortless mom jeans.",
      cta: "SHOP WOMEN",
      href: "/women",
      image:
        "https://images.unsplash.com/photo-1582533561751-ef6f6ab93a2e?q=80&w=1200&auto=format&fit=crop",
    },
  ];

  return (
    <section className="w-full bg-white py-12 sm:py-20">
      <div className="max-w-[1700px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          {cards.map((card, index) => (
            <div
              key={index}
              className="group relative h-[480px] sm:h-[600px] lg:h-[720px] overflow-hidden rounded-none bg-neutral-900 flex flex-col justify-end p-8 sm:p-12 text-white"
            >
              {/* Background Image */}
              <Image
                src={card.image}
                alt={card.gender}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-center group-hover:scale-105 transition-transform duration-1000 ease-out brightness-90"
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent transition-opacity duration-500" />

              {/* Card Content */}
              <div className="relative z-10 space-y-3">
                <span className="text-xs uppercase tracking-luxury text-neutral-300 font-medium">
                  {card.subheading}
                </span>
                <h3 className="font-serif text-3xl sm:text-5xl font-medium tracking-tight">
                  {card.gender}
                </h3>
                <p className="text-sm text-neutral-300 max-w-md font-light pb-2">
                  {card.description}
                </p>
                <div>
                  <Button
                    href={card.href}
                    variant="secondary"
                    size="md"
                    className="mt-2 w-full sm:w-auto font-semibold group-hover:bg-white transition-colors"
                  >
                    {card.cta}
                  </Button>
                </div>
              </div>

              {/* Direct Clickable Overlay */}
              <Link
                href={card.href}
                className="absolute inset-0 z-0"
                aria-label={`Go to ${card.gender} section`}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
