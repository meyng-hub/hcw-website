"use client";

import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import { useState } from "react";
import { Heart, CreditCard, Smartphone } from "lucide-react";
import { DONATION_PRESETS } from "@/lib/constants";

const IMPACT: Record<number, { fr: string; en: string }> = {
  20: {
    fr: "Fournit un kit scolaire complet à un enfant",
    en: "Provides a full school kit for one child",
  },
  50: {
    fr: "Finance les repas d'un élève pendant un mois",
    en: "Funds meals for one student for a month",
  },
  100: {
    fr: "Couvre un trimestre complet de scolarité",
    en: "Covers a full term of schooling",
  },
  500: {
    fr: "Équipe une salle de classe en outils numériques",
    en: "Equips a classroom with digital tools",
  },
};

export default function DonateSection() {
  const t = useTranslations("donate");
  const locale = useLocale();
  const [selected, setSelected] = useState(50);

  return (
    <section className="bg-cream-50 py-24" aria-labelledby="donate-heading">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
          {/* Left: copy */}
          <div>
            <h2
              id="donate-heading"
              className="font-serif text-3xl font-bold text-charcoal-900 sm:text-4xl"
            >
              {locale === "fr"
                ? "Chaque don, un impact réel"
                : "Every donation, real impact"}
            </h2>
            <p className="mt-4 text-gray-600 leading-relaxed">
              {t("subtitle")}
            </p>

            {/* Impact preview */}
            <div className="mt-8 space-y-3">
              {DONATION_PRESETS.map((amount) => (
                <button
                  key={amount}
                  onClick={() => setSelected(amount)}
                  className={`w-full flex items-center gap-4 rounded-xl px-5 py-4 text-left transition-all ${
                    selected === amount
                      ? "bg-teal-600 text-white shadow-md"
                      : "bg-white text-charcoal-900 ring-1 ring-gray-100 hover:ring-teal-200"
                  }`}
                  aria-pressed={selected === amount}
                >
                  <div
                    className={`shrink-0 font-serif text-2xl font-bold ${selected === amount ? "text-amber-300" : "text-teal-600"}`}
                  >
                    €{amount}
                  </div>
                  <div
                    className={`text-sm ${selected === amount ? "text-teal-100" : "text-gray-500"}`}
                  >
                    {IMPACT[amount as keyof typeof IMPACT]?.[
                      locale as "fr" | "en"
                    ] ?? ""}
                  </div>
                </button>
              ))}
            </div>

            {/* Tax note */}
            <p className="mt-6 text-xs text-gray-400">{t("tax_info")}</p>
          </div>

          {/* Right: payment methods */}
          <div className="rounded-2xl bg-white p-8 shadow-sm ring-1 ring-gray-100">
            <h3 className="font-serif text-xl font-semibold text-charcoal-900 mb-6">
              {t("payment_title")}
            </h3>

            {/* Amount selected */}
            <div className="mb-6 rounded-xl bg-teal-50 p-4">
              <span className="text-sm text-teal-700">
                {t("impact_label")}{" "}
                <strong className="text-teal-600">€{selected}</strong>{" "}
                {t("impact_suffix")}
              </span>
              <p className="mt-1 text-sm font-medium text-teal-800">
                {
                  IMPACT[selected as keyof typeof IMPACT]?.[
                    locale as "fr" | "en"
                  ]
                }
              </p>
            </div>

            {/* Primary CTA */}
            <Link
              href={`/${locale}/donate?amount=${selected}`}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-amber-500 py-4 text-base font-semibold text-white shadow-md hover:bg-amber-600 active:scale-95 transition-all mb-4"
            >
              <Heart className="h-5 w-5" aria-hidden="true" />
              {locale === "fr"
                ? `Donner €${selected} maintenant`
                : `Donate €${selected} now`}
            </Link>

            {/* Payment icons */}
            <div className="flex items-center gap-3 justify-center text-gray-400 mb-6">
              <div className="flex items-center gap-1.5 text-xs">
                <Smartphone className="h-4 w-4" aria-hidden="true" />
                Google Pay
              </div>
              <span aria-hidden="true">·</span>
              <div className="flex items-center gap-1.5 text-xs">
                <Smartphone className="h-4 w-4" aria-hidden="true" />
                Apple Pay
              </div>
              <span aria-hidden="true">·</span>
              <div className="flex items-center gap-1.5 text-xs">
                <CreditCard className="h-4 w-4" aria-hidden="true" />
                SEPA
              </div>
            </div>

            {/* HelloAsso option */}
            <div className="border-t border-gray-100 pt-5">
              <p className="text-xs text-gray-400 text-center mb-3">
                {t("helloasso_desc")}
              </p>
              <a
                href="https://www.helloasso.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-gray-50 py-3 text-sm font-medium text-gray-600 ring-1 ring-gray-100 hover:bg-gray-100 transition-colors"
              >
                {t("helloasso_title")}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
