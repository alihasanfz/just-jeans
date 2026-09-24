import { SiteConfig, FitItem } from "@/types";

export const siteConfig: SiteConfig = {
  name: "JUST JEANS",
  legalName: "Just Jeans Ltd.",
  tagline: "Premium Denim. Designed for Everyday.",
  description:
    "Premium denim and handcrafted jeans tailored for modern everyday movement and luxury style.",
  url: "https://justjeans.com",
  announcement: {
    enabled: true,
    text: "FREE DELIVERY ON ORDERS OVER ৳3000",
    linkText: "SHOP NOW",
    href: "/shop",
  },
  navigation: [
    {
      name: "NEW ARRIVALS",
      href: "/shop?sort=new",
      megaMenu: {
        featured: {
          title: "AUTUMN / WINTER 2026",
          subtitle: "Discover the newest cuts and raw indigo washes.",
          image:
            "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?q=80&w=1000&auto=format&fit=crop",
          href: "/shop?filter=new-arrivals",
          ctaText: "EXPLORE NEW IN",
        },
        categories: [
          {
            title: "MEN'S NEW",
            items: [
              { name: "Raw Selvage Denim", href: "/men?category=selvage" },
              { name: "Japanese Indigo Straight", href: "/men?fit=straight" },
              { name: "Oversized Trucker Jackets", href: "/men?category=jackets" },
              { name: "Vintage Wash Tapered", href: "/men?fit=tapered" },
            ],
          },
          {
            title: "WOMEN'S NEW",
            items: [
              { name: "High-Rise Wide Leg", href: "/women?fit=wide-leg" },
              { name: "Sculpt Straight Jeans", href: "/women?fit=straight" },
              { name: "90s Relaxed Flare", href: "/women?fit=flare" },
              { name: "Cropped Denim Overshirts", href: "/women?category=jackets" },
            ],
          },
          {
            title: "EDITORIAL SPOTLIGHT",
            items: [
              { name: "The Raw Denim Guide", href: "/shop?editorial=raw-guide" },
              { name: "Sustainable Hemp Blends", href: "/shop?editorial=eco" },
              { name: "All-Day Stretch Comfort", href: "/shop?editorial=comfort" },
            ],
          },
        ],
      },
    },
    {
      name: "MEN",
      href: "/men",
      megaMenu: {
        featured: {
          title: "THE MEN'S FIT GUIDE",
          subtitle: "Precision tailored fits from Slim to Relaxed Japanese Selvedge.",
          image:
            "https://images.unsplash.com/photo-1516257984-b1b4d707412e?q=80&w=1000&auto=format&fit=crop",
          href: "/men",
          ctaText: "SHOP MEN'S DENIM",
        },
        categories: [
          {
            title: "SHOP BY FIT",
            items: [
              { name: "Slim Fit", href: "/men?fit=slim" },
              { name: "Skinny Fit", href: "/men?fit=skinny" },
              { name: "Straight Fit", href: "/men?fit=straight" },
              { name: "Regular Fit", href: "/men?fit=regular" },
              { name: "Relaxed Fit", href: "/men?fit=relaxed" },
              { name: "Tapered Fit", href: "/men?fit=tapered" },
              { name: "Bootcut", href: "/men?fit=bootcut" },
            ],
          },
          {
            title: "WASHES & FINISHES",
            items: [
              { name: "Raw & Dry Indigo", href: "/men?wash=raw" },
              { name: "Vintage Light Wash", href: "/men?wash=light" },
              { name: "Classic Mid Indigo", href: "/men?wash=mid" },
              { name: "Pitch Black & Charcoal", href: "/men?wash=black" },
              { name: "Distressed & Ripped", href: "/men?wash=distressed" },
            ],
          },
          {
            title: "MORE DENIM",
            items: [
              { name: "Denim Jackets & Truckers", href: "/men?category=jackets" },
              { name: "Chambray & Denim Shirts", href: "/men?category=shirts" },
              { name: "Denim Shorts", href: "/men?category=shorts" },
              { name: "Leather Belts & Accessories", href: "/men?category=accessories" },
            ],
          },
        ],
      },
    },
    {
      name: "WOMEN",
      href: "/women",
      megaMenu: {
        featured: {
          title: "SCULPT & TIMELESS",
          subtitle: "Signature high-rises and effortless silhouettes for every silhouette.",
          image:
            "https://images.unsplash.com/photo-1582533561751-ef6f6ab93a2e?q=80&w=1000&auto=format&fit=crop",
          href: "/women",
          ctaText: "SHOP WOMEN'S DENIM",
        },
        categories: [
          {
            title: "SHOP BY FIT",
            items: [
              { name: "Skinny", href: "/women?fit=skinny" },
              { name: "Straight", href: "/women?fit=straight" },
              { name: "Mom Fit", href: "/women?fit=mom" },
              { name: "Wide Leg", href: "/women?fit=wide-leg" },
              { name: "Boyfriend", href: "/women?fit=boyfriend" },
              { name: "Flare", href: "/women?fit=flare" },
              { name: "Relaxed", href: "/women?fit=relaxed" },
            ],
          },
          {
            title: "RISE & SHAPE",
            items: [
              { name: "Ultra High Rise", href: "/women?rise=ultra-high" },
              { name: "Classic High Rise", href: "/women?rise=high" },
              { name: "Mid Rise Essentials", href: "/women?rise=mid" },
              { name: "Low Slung 90s", href: "/women?rise=low" },
              { name: "Curvy Contour Fit", href: "/women?fit=curvy" },
            ],
          },
          {
            title: "MORE DENIM",
            items: [
              { name: "Denim Jackets & Blazers", href: "/women?category=jackets" },
              { name: "Denim Maxi Skirts", href: "/women?category=skirts" },
              { name: "Denim Overalls & Jumpsuits", href: "/women?category=jumpsuits" },
              { name: "Denim Tops & Corsets", href: "/women?category=tops" },
            ],
          },
        ],
      },
    },
    {
      name: "SHOP BY FIT",
      href: "/shop#fits",
      megaMenu: {
        featured: {
          title: "THE SILHOUETTE MATRIX",
          subtitle: "Compare cuts, leg openings, and rises side by side.",
          image:
            "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?q=80&w=1000&auto=format&fit=crop",
          href: "/shop#fits",
          ctaText: "VIEW FIT GUIDE",
        },
        categories: [
          {
            title: "CORE FITS",
            items: [
              { name: "Slim", href: "/shop?fit=slim" },
              { name: "Skinny", href: "/shop?fit=skinny" },
              { name: "Straight", href: "/shop?fit=straight" },
              { name: "Regular", href: "/shop?fit=regular" },
            ],
          },
          {
            title: "CONTEMPORARY FITS",
            items: [
              { name: "Relaxed", href: "/shop?fit=relaxed" },
              { name: "Tapered", href: "/shop?fit=tapered" },
              { name: "Wide Leg", href: "/shop?fit=wide-leg" },
              { name: "Flare", href: "/shop?fit=flare" },
            ],
          },
        ],
      },
    },
    {
      name: "COLLECTIONS",
      href: "/shop?tab=collections",
    },
    {
      name: "SALE",
      href: "/sale",
    },
  ],
  footerNavigation: {
    shop: [
      { name: "Men's Denim", href: "/men" },
      { name: "Women's Denim", href: "/women" },
      { name: "New Arrivals", href: "/shop?sort=new" },
      { name: "Best Sellers", href: "/shop?sort=bestsellers" },
      { name: "Sale & Offers", href: "/sale" },
      { name: "Shop By Fit", href: "/shop#fits" },
    ],
    help: [
      { name: "Contact Us", href: "/shop?page=contact" },
      { name: "Fit & Sizing Guide", href: "/shop#fits" },
      { name: "Frequently Asked Questions", href: "/shop?page=faq" },
      { name: "Shipping & Delivery", href: "/shop?page=shipping" },
      { name: "Returns & Exchanges", href: "/shop?page=returns" },
      { name: "Track My Order", href: "/shop?page=track" },
    ],
    company: [
      { name: "About Just Jeans", href: "/shop?page=about" },
      { name: "Sustainable Denim Craft", href: "/shop?page=sustainability" },
      { name: "Store Locator", href: "/shop?page=stores" },
      { name: "Careers", href: "/shop?page=careers" },
      { name: "Privacy Policy", href: "/shop?page=privacy" },
      { name: "Terms & Conditions", href: "/shop?page=terms" },
    ],
  },
  location: {
    title: "JUST JEANS Flagship Atelier & Studio",
    address: "13-14 Zoo Road, Mollik Tower",
    area: "Mirpur-01",
    city: "Dhaka - 1216",
    country: "Bangladesh",
    fullAddress: "13-14 Zoo Road, Mollik Tower, Mirpur- 01, Dhaka -1216. Bangladesh.",
    mapUrl: "https://share.google/u2vM7JtZNOWKO1eHE",
    hours: "Saturday – Thursday: 10:00 AM – 9:00 PM | Friday: 3:00 PM – 9:00 PM",
    phone: "+880 1712-345678",
    email: "support@justjeans.com",
  },
  socialLinks: {
    facebook: "https://facebook.com",
    instagram: "https://instagram.com",
    youtube: "https://youtube.com",
    tiktok: "https://tiktok.com",
  },
};

export const fitItems: FitItem[] = [
  {
    id: "slim",
    name: "SLIM",
    tagline: "Tailored & Streamlined",
    description: "Fitted through hip and thigh with a refined narrow leg opening.",
    image:
      "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?q=80&w=900&auto=format&fit=crop",
    href: "/shop?fit=slim",
  },
  {
    id: "straight",
    name: "STRAIGHT",
    tagline: "The Timeless Classic",
    description: "Balanced authentic silhouette straight from knee to ankle.",
    image:
      "https://images.unsplash.com/photo-1604176354204-9268737828e4?q=80&w=900&auto=format&fit=crop",
    href: "/shop?fit=straight",
  },
  {
    id: "relaxed",
    name: "RELAXED",
    tagline: "Effortless Comfort",
    description: "Generous room through the seat and leg for all-day ease.",
    image:
      "https://images.unsplash.com/photo-1582533561751-ef6f6ab93a2e?q=80&w=900&auto=format&fit=crop",
    href: "/shop?fit=relaxed",
  },
  {
    id: "tapered",
    name: "TAPERED",
    tagline: "Modern Dynamic Shape",
    description: "Relaxed thigh graduating down to a clean tapered ankle.",
    image:
      "https://images.unsplash.com/photo-1555689502-c4b22d76c56f?q=80&w=900&auto=format&fit=crop",
    href: "/shop?fit=tapered",
  },
  {
    id: "wide-leg",
    name: "WIDE LEG",
    tagline: "Bold & Editorial",
    description: "High-fashion volume that creates dramatic length and movement.",
    image:
      "https://images.unsplash.com/photo-1565084888279-aca607ecce0c?q=80&w=900&auto=format&fit=crop",
    href: "/shop?fit=wide-leg",
  },
  {
    id: "skinny",
    name: "SKINNY",
    tagline: "Form-Flattering Precision",
    description: "Ultra-stretch premium fabric that hugs your natural curves.",
    image:
      "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?q=80&w=900&auto=format&fit=crop",
    href: "/shop?fit=skinny",
  },
];
