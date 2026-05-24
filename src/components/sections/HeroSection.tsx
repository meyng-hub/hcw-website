"use client";

import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import { Heart, ArrowRight, Sparkles } from "lucide-react";

export default function HeroSection() {
  const t = useTranslations("hero");
  const locale = useLocale();

  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      aria-label="Hero"
    >
      {/* Background — gradient overlay simulating photo (replace with real Image) */}
      <div
        className="absolute inset-0 bg-gradient-to-br from-teal-800 via-teal-700 to-charcoal-900"
        aria-hidden="true"
      />

      {/* Decorative circles */}
      <div
        className="absolute top-1/4 right-1/4 h-96 w-96 rounded-full bg-amber-500/10 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-1/4 left-1/4 h-64 w-64 rounded-full bg-teal-400/10 blur-2xl"
        aria-hidden="true"
      />

      {/* Geometric pattern overlay */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `repeating-linear-gradient(
            45deg,
            transparent,
            transparent 40px,
            rgba(255,255,255,0.1) 40px,
            rgba(255,255,255,0.1) 41px
          )`,
        }}
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-4xl px-4 py-32 text-center sm:px-6 lg:px-8">
        {/* Live campaign badge */}
        <div className="mb-8 flex justify-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-amber-500/20 px-4 py-2 text-sm font-medium text-amber-300 ring-1 ring-amber-400/30">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-amber-500" />
            </span>
            {t("campaign_badge")}
          </span>
        </div>

        {/* Tagline */}
        <p className="mb-4 text-sm font-medium uppercase tracking-[0.3em] text-teal-300">
          {t("tagline")}
        </p>

        {/* Main headline */}
        <h1 className="mb-6 font-serif text-5xl font-bold leading-tight text-white sm:text-6xl lg:text-7xl">
          {t("headline")}
        </h1>

        {/* Sub-headline */}
        <p className="mb-10 mx-auto max-w-2xl text-lg leading-relaxed text-teal-100/90 sm:text-xl">
          {t("subheadline")}
        </p>

        {/* CTAs */}
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Link
            href={`/${locale}/donate`}
            className="group flex items-center gap-2 rounded-full bg-amber-500 px-8 py-4 text-base font-semibold text-white shadow-lg transition-all hover:bg-amber-600 hover:shadow-amber-500/25 hover:shadow-xl active:scale-95"
          >
            <Heart
              className="h-5 w-5 transition-transform group-hover:scale-110"
              aria-hidden="true"
            />
            {t("cta_donate")}
          </Link>
          <Link
            href={`/${locale}/projects`}
            className="group flex items-center gap-2 rounded-full bg-white/10 px-8 py-4 text-base font-semibold text-white ring-1 ring-white/20 backdrop-blur-sm transition-all hover:bg-white/20 hover:ring-white/30"
          >
            {t("cta_projects")}
            <ArrowRight
              className="h-4 w-4 transition-transform group-hover:translate-x-1"
              aria-hidden="true"
            />
          </Link>
        </div>

        {/* Trust indicators */}
        <div className="mt-16 flex flex-wrap justify-center gap-8 text-sm text-teal-200/70">
          {[
            {
              icon: "🎓",
              text: locale === "fr" ? "Fondée en 2009" : "Founded in 2009",
            },
            {
              icon: "✅",
              text:
                locale === "fr"
                  ? "Association loi 1901"
                  : "Registered non-profit",
            },
            {
              icon: "🌍",
              text: locale === "fr" ? "Afrique centrale" : "Central Africa",
            },
          ].map(({ icon, text }) => (
            <div key={text} className="flex items-center gap-1.5">
              <span aria-hidden="true">{icon}</span>
              <span>{text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce text-white/50"
        aria-hidden="true"
      >
        <svg
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>
    </section>
  );
}
