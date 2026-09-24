import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        denim: {
          50: "#f0f5fa",
          100: "#e0ebf5",
          200: "#c7dbee",
          300: "#9fc3e3",
          400: "#6fa4d4",
          500: "#4b85c4",
          600: "#366aa9",
          700: "#2d5489",
          800: "#274771",
          900: "#1e3a5f",
          950: "#14263f",
        },
        charcoal: {
          50: "#f6f6f7",
          100: "#e1e2e4",
          200: "#c3c5c9",
          300: "#9ea1a7",
          400: "#7b7e87",
          500: "#61646d",
          600: "#4c4e56",
          700: "#3b3d43",
          800: "#2b2d33",
          900: "#1a1b1e",
          950: "#0e0f11",
        },
        luxury: {
          black: "#0b0c0e",
          offwhite: "#faf9f6",
          cream: "#f5f4f0",
          gold: "#c5a880",
          border: "#e7e5e0",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
        serif: ["var(--font-playfair)", "serif"],
      },
      letterSpacing: {
        luxury: "0.2em",
        widest: "0.15em",
        wider: "0.08em",
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-in-out",
        "slide-down": "slideDown 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideDown: {
          "0%": { transform: "translateY(-10px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
