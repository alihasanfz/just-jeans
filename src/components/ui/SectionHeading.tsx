import React from "react";
import { cn } from "@/lib/utils";

export interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center" | "right";
  className?: string;
  titleClassName?: string;
  dark?: boolean;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  className,
  titleClassName,
  dark = false,
}: SectionHeadingProps) {
  const alignmentClasses = {
    left: "text-left items-start",
    center: "text-center items-center mx-auto",
    right: "text-right items-end ml-auto",
  };

  return (
    <div
      className={cn(
        "flex flex-col mb-12 sm:mb-16 max-w-2xl",
        alignmentClasses[align],
        className
      )}
    >
      {eyebrow && (
        <span
          className={cn(
            "text-xs uppercase tracking-luxury font-semibold mb-3 transition-colors",
            dark ? "text-denim-300" : "text-denim-700"
          )}
        >
          {eyebrow}
        </span>
      )}
      <h2
        className={cn(
          "font-serif text-3xl sm:text-4xl md:text-5xl tracking-tight leading-tight",
          dark ? "text-white" : "text-neutral-900",
          titleClassName
        )}
      >
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            "mt-4 text-sm sm:text-base leading-relaxed max-w-xl",
            dark ? "text-neutral-300" : "text-neutral-600"
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}
