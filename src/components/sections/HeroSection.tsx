"use client";

import Image from "next/image";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import { Heart, ArrowRight, Sparkles } from "lucide-react";
import { campaign, stats } from "@/lib/content";

export default function HeroSection() {
  const t = useTranslations("hero");
  const locale = useLocale();

  return (
    <section
      className="relative flex min-h-screen items-center justify-center overflow-hidden"
      aria-label="Hero"
    >
      {/* Full-bleed background photo */}
      <Image
        src="/images/endara-students.png"
        alt="Élèves en classe dans la République Centrafricaine — programme eNdara HCW"
        fill
        className="object-cover object-center"
        priority
        quality={85}
      />

      {/* Layered gradient overlay — dark on left for text readability, lighter on right */}
      <div
        className="absolute inset-0 bg-gradient-to-r from-teal-900/90 via-teal-800/75 to-teal-700/50"
        aria-hidden="true"
      />
      {/* Secondary bottom overlay for bottom text */}
      <div
        className="absolute inset-0 bg-gradient-to-t from-charcoal-900/60 via-transparent to-transparent"
        aria-hidden="true"
      />

      {/* Decorative amber accent */}
      <div
        className="absolute right-1/4 top-1/3 h-64 w-64 rounded-full bg-amber-500/10 blur-3xl"
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 py-32 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          {/* Live campaign badge — only when a campaign is running */}
          {campaign.active && (
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-500/20 px-4 py-1.5 text-sm font-medium text-amber-300 backdrop-blur-sm">
              <span
                className="h-2 w-2 animate-pulse rounded-full bg-amber-400"
                aria-hidden="true"
              />
              <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
              {t("campaign_badge")}
            </div>
          )}

          {/* Main headline */}
          <h1 className="mb-6 font-serif text-5xl font-bold leading-tight text-white drop-shadow-lg sm:text-6xl lg:text-7xl">
            {t("headline")}
          </h1>

          {/* Subtitle */}
          <p className="mb-8 max-w-2xl text-lg leading-relaxed text-teal-100 sm:text-xl">
            {t("subheadline")}
          </p>

          {/* Amber accent line */}
          <div className="mb-8 h-1 w-20 rounded bg-amber-400" aria-hidden="true" />

          {/* CTAs */}
          <div className="mb-12 flex flex-col gap-4 sm:flex-row">
            <Link
              href={`/${locale}/donate`}
              className="group inline-flex items-center justify-center gap-2 rounded-xl bg-amber-500 px-8 py-4 text-base font-semibold text-white shadow-lg shadow-amber-500/30 transition-all hover:scale-105 hover:bg-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2 focus:ring-offset-teal-900"
            >
              <Heart className="h-5 w-5" aria-hidden="true" />
              {t("cta_donate")}
            </Link>
            <Link
              href={`/${locale}/projects`}
              className="group inline-flex items-center justify-center gap-2 rounded-xl border-2 border-white/40 bg-white/10 px-8 py-4 text-base font-semibold text-white backdrop-blur-sm transition-all hover:border-white/60 hover:bg-white/20"
            >
              {t("cta_projects")}
              <ArrowRight
                className="h-5 w-5 transition-transform group-hover:translate-x-1"
                aria-hidden="true"
              />
            </Link>
          </div>

          {/* Trust indicators */}
          <div className="flex flex-wrap gap-6 text-sm text-teal-200">
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold text-amber-400">
                {stats.prizes.toLocaleString(locale)}+
              </span>
              <span>{t("stat_laureates")}</span>
            </div>
            <div className="w-px bg-teal-600" aria-hidden="true" />
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold text-amber-400">
                {stats.students.toLocaleString(locale)}+
              </span>
              <span>{t("stat_students")}</span>
            </div>
            <div className="w-px bg-teal-600" aria-hidden="true" />
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold text-amber-400">
                {stats.projects.toLocaleString(locale)}
              </span>
              <span>{t("stat_projects")}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-1 text-teal-300"
        aria-hidden="true"
      >
        <span className="text-xs uppercase tracking-widest opacity-70">
          {t("scroll")}
        </span>
        <div className="h-8 w-px animate-bounce bg-gradient-to-b from-teal-300/70 to-transparent" />
      </div>
    </section>
  );
}
