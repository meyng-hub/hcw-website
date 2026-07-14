"use client";

import Link from "next/link";
import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import { useState } from "react";
import { Heart, CreditCard, Smartphone } from "lucide-react";
import { DONATION_PRESETS } from "@/lib/constants";
import { stats } from "@/lib/content";

export default function DonateSection() {
  const t = useTranslations("donate");
  const calc = useTranslations("impact_calculator");
  const locale = useLocale();
  const [selected, setSelected] = useState(50);

  const impactFor = (amount: number) =>
    DONATION_PRESETS.includes(amount)
      ? calc(`impact_${amount}` as Parameters<typeof calc>[0])
      : "";

  return (
    <section className="bg-cream-50 py-24" aria-labelledby="donate-heading">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-16 lg:items-stretch">
          {/* Photo column — left on desktop */}
          <div className="hidden lg:block relative">
            <div className="relative h-full min-h-[500px] rounded-2xl overflow-hidden">
              <Image
                src="/images/project-girls.jpg"
                alt={t("photo_alt")}
                fill
                className="object-cover"
                sizes="50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-teal-900/70 to-transparent" />
              {/* Floating impact badges */}
              <div className="absolute bottom-6 left-6 right-6 space-y-3">
                <div className="bg-white rounded-xl p-4 shadow-lg">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-100 shrink-0">
                      <span className="text-lg" aria-hidden="true">
                        📚
                      </span>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">{t("your_impact")}</p>
                      <p className="text-sm font-bold text-charcoal-900">
                        {t("one_child")}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="bg-teal-600/90 backdrop-blur-sm rounded-xl p-4 text-white">
                  <p className="text-sm font-semibold">
                    {stats.students.toLocaleString(locale)}+{" "}
                    {t("students_helped")}
                  </p>
                  <p className="text-xs text-teal-200 mt-1">{t("since")}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: existing donation form content */}
          <div className="grid gap-16 lg:gap-0 lg:block">
            <div>
              <h2
                id="donate-heading"
                className="font-serif text-3xl font-bold text-charcoal-900 sm:text-4xl"
              >
                {t("impact_title")}
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
                      {impactFor(amount)}
                    </div>
                  </button>
                ))}
              </div>

              {/* Tax note */}
              <p className="mt-6 text-xs text-gray-400">{t("tax_info")}</p>
            </div>

            {/* Payment methods card */}
            <div className="mt-10 rounded-2xl bg-white p-8 shadow-sm ring-1 ring-gray-100">
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
                  {impactFor(selected)}
                </p>
              </div>

              {/* Primary CTA */}
              <Link
                href={`/${locale}/donate?amount=${selected}`}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-amber-500 py-4 text-base font-semibold text-white shadow-md hover:bg-amber-600 active:scale-95 transition-all mb-4"
              >
                <Heart className="h-5 w-5" aria-hidden="true" />
                {t("donate_amount_cta", { amount: selected })}
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
      </div>
    </section>
  );
}
