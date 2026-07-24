"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import { usePathname } from "next/navigation";
import { Menu, X, Globe, Heart } from "lucide-react";
import { routing } from "@/i18n/routing";
import HcwMark from "@/components/brand/HcwMark";

const NAV_LINKS = [
  { href: "/", key: "home" },
  { href: "/about", key: "about" },
  { href: "/projects", key: "projects" },
  { href: "/impact", key: "impact" },
  { href: "/news", key: "news" },
  { href: "/volunteer", key: "volunteer" },
  { href: "/contact", key: "contact" },
] as const;

export default function Navbar() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const otherLocale = locale === "fr" ? "en" : "fr";
  // Swap locale prefix in URL
  const localePath = (loc: string) => {
    const segments = pathname.split("/");
    segments[1] = loc;
    return segments.join("/") || "/";
  };

  return (
    <header
      role="banner"
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white/95 shadow-sm backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8"
        aria-label="Navigation principale"
      >
        {/* Logo */}
        <Link
          href={`/${locale}`}
          className="flex items-center gap-2 focus-visible:outline-teal-600"
          aria-label="HCW — retour à l'accueil"
        >
          <HcwMark reversed={!scrolled} className="h-10 w-10" />
          <span
            className={`font-serif text-xl font-semibold tracking-tight ${
              scrolled ? "text-charcoal-900" : "text-white"
            }`}
          >
            HCW
          </span>
        </Link>

        {/* Desktop nav */}
        <ul className="hidden lg:flex items-center gap-6" role="list">
          {NAV_LINKS.map(({ href, key }) => {
            const isActive =
              pathname === `/${locale}${href === "/" ? "" : href}`;
            return (
              <li key={key}>
                <Link
                  href={`/${locale}${href}`}
                  className={`text-sm font-medium transition-colors hover:text-amber-500 ${
                    isActive
                      ? "text-teal-600"
                      : scrolled
                        ? "text-charcoal-900"
                        : "text-white"
                  }`}
                >
                  {t(key as keyof typeof t)}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Right controls */}
        <div className="flex items-center gap-3">
          {/* Language switcher */}
          <Link
            href={localePath(otherLocale)}
            className={`flex items-center gap-1 rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
              scrolled
                ? "bg-gray-100 text-charcoal-900 hover:bg-teal-50 hover:text-teal-600"
                : "bg-white/20 text-white hover:bg-white/30"
            }`}
            aria-label={`Switch to ${otherLocale === "en" ? "English" : "Français"}`}
          >
            <Globe className="h-3 w-3" aria-hidden="true" />
            {otherLocale.toUpperCase()}
          </Link>

          {/* Donate CTA */}
          <Link
            href={`/${locale}/donate`}
            className="hidden sm:flex items-center gap-1.5 rounded-full bg-amber-500 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-all hover:bg-amber-600 hover:shadow-md active:scale-95"
            aria-label={t("donateButton")}
          >
            <Heart className="h-3.5 w-3.5" aria-hidden="true" />
            {t("donateButton")}
          </Link>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setOpen(!open)}
            className={`lg:hidden rounded-md p-2 transition-colors ${
              scrolled ? "text-charcoal-900" : "text-white"
            }`}
            aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div
          id="mobile-menu"
          className="lg:hidden border-t border-gray-100 bg-white px-4 pb-6 pt-4 shadow-lg"
        >
          <ul className="space-y-1" role="list">
            {NAV_LINKS.map(({ href, key }) => (
              <li key={key}>
                <Link
                  href={`/${locale}${href}`}
                  className="block rounded-lg px-4 py-3 text-sm font-medium text-charcoal-900 hover:bg-teal-50 hover:text-teal-600 transition-colors"
                  onClick={() => setOpen(false)}
                >
                  {t(key as keyof typeof t)}
                </Link>
              </li>
            ))}
            <li className="pt-2">
              <Link
                href={`/${locale}/donate`}
                className="flex items-center justify-center gap-2 w-full rounded-full bg-amber-500 px-4 py-3 text-sm font-semibold text-white"
                onClick={() => setOpen(false)}
              >
                <Heart className="h-4 w-4" />
                {t("donateButton")}
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
