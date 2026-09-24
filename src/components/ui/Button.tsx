import React, { forwardRef } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "link";
  size?: "sm" | "md" | "lg";
  href?: string;
  isLoading?: boolean;
  fullWidth?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      href,
      isLoading = false,
      fullWidth = false,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "inline-flex items-center justify-center font-medium uppercase text-xs tracking-luxury transition-all duration-300 select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none active:scale-[0.98]";

    const variantStyles = {
      primary:
        "bg-luxury-black text-white hover:bg-neutral-800 shadow-sm hover:shadow-md border border-luxury-black",
      secondary:
        "bg-white text-luxury-black hover:bg-neutral-100 border border-transparent shadow-sm",
      outline:
        "border border-luxury-black text-luxury-black bg-transparent hover:bg-luxury-black hover:text-white",
      ghost:
        "text-luxury-black hover:bg-neutral-100 hover:text-luxury-black",
      link: "text-luxury-black underline-offset-4 hover:underline p-0 h-auto tracking-normal lowercase first-letter:uppercase",
    };

    const sizeStyles = {
      sm: "h-9 px-4 py-2",
      md: "h-12 px-7 py-3",
      lg: "h-14 px-10 py-4 text-sm",
    };

    const combinedClasses = cn(
      baseStyles,
      variantStyles[variant],
      variant !== "link" && sizeStyles[size],
      fullWidth && "w-full",
      className
    );

    if (href) {
      return (
        <Link href={href} className={combinedClasses}>
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {children}
        </Link>
      );
    }

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={combinedClasses}
        {...props}
      >
        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
