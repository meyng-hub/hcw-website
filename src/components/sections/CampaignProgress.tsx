"use client";

import { useTranslations, useLocale } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { Heart, Share2, Users } from "lucide-react";
import { campaign as CAMPAIGN } from "@/lib/content";

export default function CampaignProgress() {
  const t = useTranslations("campaign");
  const locale = useLocale();

  const pct = Math.min(
    Math.round((CAMPAIGN.raisedAmount / CAMPAIGN.goalAmount) * 100),
    100,
  );

  const handleShare = async () => {
    try {
      await navigator.share?.({
        title: t("title"),
        url: `/${locale}/campaign`,
      });
    } catch {
      // Fallback: copy to clipboard
      await navigator.clipboard?.writeText(
        `${window.location.origin}/${locale}/campaign`,
      );
    }
  };

  return (
    <section
      className="bg-gradient-to-br from-teal-600 to-teal-800 py-24 text-white overflow-hidden"
      aria-labelledby="campaign-heading"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-16 lg:items-center">
          {/* LEFT: existing campaign content */}
          <div>
            {/* Header */}
            <div className="mb-12 text-center lg:text-left">
              <span className="mb-4 inline-block rounded-full bg-amber-500/20 px-4 py-1.5 text-sm font-medium text-amber-300">
                {t("annual_badge")}
              </span>
              <h2
                id="campaign-heading"
                className="font-serif text-3xl font-bold sm:text-4xl"
              >
                {t("title")}
              </h2>
              <p className="mt-4 text-teal-100">{t("subtitle")}</p>
            </div>

            {/* Thermometer */}
            <div className="mb-8">
              <div className="flex justify-between text-sm text-teal-200 mb-2">
                <span>
                  {t("raised")} :{" "}
                  <strong className="text-white">
                    €{CAMPAIGN.raisedAmount.toLocaleString()}
                  </strong>
                </span>
                <span>
                  {t("goal")} :{" "}
                  <strong className="text-white">
                    €{CAMPAIGN.goalAmount.toLocaleString()}
                  </strong>
                </span>
              </div>
              <div
                className="h-4 w-full overflow-hidden rounded-full bg-white/20"
                role="progressbar"
                aria-valuenow={CAMPAIGN.raisedAmount}
                aria-valuemin={0}
                aria-valuemax={CAMPAIGN.goalAmount}
              >
                <div
                  className="h-full rounded-full bg-amber-500 thermometer-fill transition-all duration-1000"
                  style={{
                    ["--fill-width" as string]: `${pct}%`,
                    width: `${pct}%`,
                  }}
                />
              </div>
              <div className="mt-2 flex items-center gap-4 text-sm text-teal-200">
                <span className="font-semibold text-amber-400">{pct}%</span>
                <span className="flex items-center gap-1">
                  <Users className="h-4 w-4" aria-hidden="true" />
                  {CAMPAIGN.donorCount} {t("donors")}
                </span>
              </div>
            </div>

            {/* Giving tiers */}
            <div className="mb-10 grid gap-4 sm:grid-cols-3">
              {[
                {
                  amount: t("tier1_amount"),
                  label: t("tier1_label"),
                  desc: t("tier1_desc"),
                },
                {
                  amount: t("tier2_amount"),
                  label: t("tier2_label"),
                  desc: t("tier2_desc"),
                },
                {
                  amount: t("tier3_amount"),
                  label: t("tier3_label"),
                  desc: t("tier3_desc"),
                },
              ].map(({ amount, label, desc }) => (
                <div
                  key={label}
                  className="rounded-xl bg-white/10 p-5 ring-1 ring-white/20 hover:bg-white/15 transition-colors"
                >
                  <div className="font-serif text-2xl font-bold text-amber-400">
                    {amount}
                  </div>
                  <div className="mt-1 font-semibold text-white">{label}</div>
                  <div className="mt-1 text-xs text-teal-200">{desc}</div>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-col items-center gap-3 sm:flex-row lg:justify-start sm:justify-center">
              <Link
                href={`/${locale}/donate`}
                className="flex items-center gap-2 rounded-full bg-amber-500 px-8 py-4 text-base font-semibold text-white shadow-lg hover:bg-amber-600 active:scale-95 transition-all"
              >
                <Heart className="h-5 w-5" aria-hidden="true" />
                {t("donate_cta")}
              </Link>
              <button
                onClick={handleShare}
                className="flex items-center gap-2 rounded-full bg-white/10 px-6 py-4 text-sm font-semibold text-white ring-1 ring-white/20 hover:bg-white/20 transition-all"
              >
                <Share2 className="h-4 w-4" aria-hidden="true" />
                {t("share")}
              </button>
            </div>
          </div>

          {/* RIGHT: photo (desktop only) */}
          <div className="hidden lg:block relative mt-0">
            <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="/images/project-kaikelem.jpg"
                alt={t("photo_alt")}
                fill
                className="object-cover"
                sizes="50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900/60 to-transparent" />
              {/* Floating quote card at bottom */}
              <div className="absolute bottom-6 left-6 right-6 bg-white/95 rounded-xl p-4 backdrop-blur-sm">
                <p className="text-sm font-medium text-charcoal-900 italic">
                  {t("quote")}
                </p>
                <p className="text-xs text-teal-600 mt-1 font-semibold">
                  {t("quote_author")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
