"use client";

import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";
import { CheckCircle2, Share2, Home, ArrowRight } from "lucide-react";
import { useCallback } from "react";
import { SOCIAL } from "@/lib/constants";

export default function MerciPage() {
  const t = useTranslations("donate");
  const tCommon = useTranslations("common");
  const locale = useLocale();

  const handleShare = useCallback(async () => {
    const shareData: ShareData = {
      title: t("merci_share_title"),
      text: t("merci_share_text"),
      url:
        typeof window !== "undefined"
          ? window.location.origin + "/" + locale + "/donate"
          : "https://www.h-cw.org",
    };
    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        // Fallback: open Facebook share
        window.open(
          `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareData.url ?? "")}`,
          "_blank",
          "noopener,noreferrer",
        );
      }
    } catch {
      // User cancelled share — no action needed
    }
  }, [t, locale]);

  return (
    <div className="min-h-screen bg-cream-50">
      {/* Hero */}
      <section className="relative overflow-hidden bg-teal-700 py-24 text-center">
        <div
          className="pointer-events-none absolute inset-0 opacity-10"
          aria-hidden="true"
          style={{
            backgroundImage:
              "radial-gradient(circle at 30% 60%, #ffffff 1px, transparent 1px)",
            backgroundSize: "50px 50px",
          }}
        />
        <div className="relative mx-auto max-w-2xl px-4 sm:px-6">
          {/* Animated checkmark */}
          <div className="mb-6 flex justify-center">
            <span className="flex h-20 w-20 items-center justify-center rounded-full bg-white/20 ring-4 ring-white/30">
              <CheckCircle2
                className="h-10 w-10 text-white"
                aria-hidden="true"
              />
            </span>
          </div>

          <h1 className="font-serif text-4xl font-bold text-white sm:text-5xl">
            {t("success_title")}
          </h1>
          <p className="mt-5 text-lg text-teal-100">{t("success_message")}</p>

          {/* Receipt note */}
          <p className="mt-3 text-sm text-teal-200">{t("merci_receipt_note")}</p>
        </div>
      </section>

      {/* Content */}
      <section className="mx-auto max-w-2xl px-4 py-16 sm:px-6">
        <div className="space-y-8 text-center">
          {/* Impact reminder */}
          <div className="rounded-2xl bg-white p-8 shadow-sm ring-1 ring-gray-100">
            <p className="font-serif text-lg font-semibold text-charcoal-900">
              {t("merci_impact")}
            </p>
            <p className="mt-2 text-sm text-gray-500">{t("merci_impact_sub")}</p>
          </div>

          {/* Share */}
          <div>
            <p className="mb-4 text-sm font-medium text-gray-600">
              {t("merci_share_prompt")}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <button
                type="button"
                onClick={handleShare}
                className="flex items-center gap-2 rounded-xl bg-teal-600 px-6 py-3 text-sm font-semibold text-white shadow-md transition-all hover:bg-teal-700 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-400"
              >
                <Share2 className="h-4 w-4" aria-hidden="true" />
                {tCommon("share")}
              </button>

              {/* Facebook fallback */}
              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent("https://www.h-cw.org/" + locale + "/donate")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-xl bg-[#1877F2] px-6 py-3 text-sm font-semibold text-white shadow-md transition-all hover:bg-[#1565d8] active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
                aria-label="Facebook"
              >
                Facebook
              </a>

              <a
                href={SOCIAL.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-xl bg-black px-6 py-3 text-sm font-semibold text-white shadow-md transition-all hover:bg-gray-900 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400"
                aria-label="X / Twitter"
              >
                X
              </a>
            </div>
          </div>

          {/* Navigation links */}
          <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Link
              href={`/${locale}`}
              className="flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-medium text-charcoal-900 shadow-sm ring-1 ring-gray-200 transition-colors hover:bg-gray-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-400"
            >
              <Home className="h-4 w-4 text-gray-500" aria-hidden="true" />
              {t("merci_back_home")}
            </Link>
            <Link
              href={`/${locale}/projects`}
              className="flex items-center gap-2 rounded-xl bg-teal-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-teal-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-400"
            >
              {t("merci_see_projects")}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>

          {/* Tax info footnote */}
          <p className="text-xs text-gray-500">{t("tax_info")}</p>
        </div>
      </section>
    </div>
  );
}
