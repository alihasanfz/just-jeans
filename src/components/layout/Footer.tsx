import React from "react";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { Container } from "@/components/ui/Container";
import { MapPin, Clock, Phone, Mail, ExternalLink } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-neutral-950 text-neutral-400 border-t border-neutral-900 pt-16 pb-12">
      <Container size="default">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-14 border-b border-neutral-800">
          {/* Brand & Manifesto (4 Cols) */}
          <div className="lg:col-span-4 space-y-4">
            <Link
              href="/"
              className="inline-block font-serif text-2xl tracking-widest text-white font-bold"
            >
              {siteConfig.name}
            </Link>
            <p className="text-xs text-neutral-400 max-w-sm leading-relaxed font-light">
              {siteConfig.description}
            </p>
            <div className="pt-2 text-[11px] uppercase tracking-luxury text-neutral-500">
              <span>EST. 2026</span>
              <span className="mx-2">•</span>
              <span>AUTHENTIC CRAFTSMANSHIP</span>
            </div>
          </div>

          {/* Flagship Store & Location (3 Cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-semibold uppercase tracking-widest text-white flex items-center space-x-1.5">
              <MapPin className="w-3.5 h-3.5 text-denim-400" />
              <span>Flagship Location</span>
            </h4>
            <div className="space-y-3 text-xs leading-relaxed">
              <div>
                <p className="text-white font-medium">{siteConfig.location.title}</p>
                <p className="text-neutral-400 mt-1">
                  {siteConfig.location.fullAddress}
                </p>
              </div>

              {/* Google Maps Live Direction Link */}
              <div className="pt-1">
                <a
                  href={siteConfig.location.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-1.5 px-3 py-1.5 bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 hover:border-neutral-500 text-neutral-200 text-[11px] font-semibold uppercase tracking-wider rounded transition-colors"
                >
                  <MapPin className="w-3 h-3 text-rose-500" />
                  <span>View on Google Maps</span>
                  <ExternalLink className="w-3 h-3 text-neutral-400" />
                </a>
              </div>

              <div className="pt-1 flex items-start space-x-2 text-[11px] text-neutral-400">
                <Clock className="w-3.5 h-3.5 text-neutral-500 flex-shrink-0 mt-0.5" />
                <span>{siteConfig.location.hours}</span>
              </div>
              <div className="flex items-center space-x-2 text-[11px] text-neutral-400">
                <Phone className="w-3.5 h-3.5 text-neutral-500 flex-shrink-0" />
                <span>{siteConfig.location.phone}</span>
              </div>
            </div>
          </div>

          {/* Shop (2 Cols) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-xs font-semibold uppercase tracking-widest text-white">
              Shop
            </h4>
            <ul className="space-y-2.5 text-xs">
              {siteConfig.footerNavigation.shop.map((item, idx) => (
                <li key={idx}>
                  <Link
                    href={item.href}
                    className="hover:text-white transition-colors duration-200"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Help (1.5 Cols) */}
          <div className="lg:col-span-1.5 space-y-4">
            <h4 className="text-xs font-semibold uppercase tracking-widest text-white">
              Help
            </h4>
            <ul className="space-y-2.5 text-xs">
              {siteConfig.footerNavigation.help.map((item, idx) => (
                <li key={idx}>
                  <Link
                    href={item.href}
                    className="hover:text-white transition-colors duration-200"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company (1.5 Cols) */}
          <div className="lg:col-span-1.5 space-y-4">
            <h4 className="text-xs font-semibold uppercase tracking-widest text-white">
              Company
            </h4>
            <ul className="space-y-2.5 text-xs">
              {siteConfig.footerNavigation.company.map((item, idx) => (
                <li key={idx}>
                  <Link
                    href={item.href}
                    className="hover:text-white transition-colors duration-200"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Social & Bottom Legal */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
          <div className="flex items-center space-x-6 uppercase tracking-wider text-[11px]">
            <a
              href={siteConfig.socialLinks.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              Instagram
            </a>
            <a
              href={siteConfig.socialLinks.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              Facebook
            </a>
            <a
              href={siteConfig.socialLinks.tiktok}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              TikTok
            </a>
            <a
              href={siteConfig.socialLinks.youtube}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              YouTube
            </a>
          </div>

          <p className="tracking-wide">
            © {currentYear} {siteConfig.name}. All rights reserved.
          </p>
        </div>
      </Container>
    </footer>
  );
}
