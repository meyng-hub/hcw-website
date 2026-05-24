"use client";

import { useState, useCallback } from "react";
import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";
import {
  Heart,
  CreditCard,
  ShieldCheck,
  Lock,
  RefreshCw,
  ExternalLink,
  CheckCircle2,
} from "lucide-react";

const PRESETS = [20, 50, 100, 500] as const;

type Preset = (typeof PRESETS)[number];

const IMPACT_FR: Record<Preset | "custom", string> = {
  20: "1 mois de fournitures scolaires pour un enfant",
  50: "Formation d'un enseignant aux méthodes modernes",
  100: "Équipement complet d'une classe",
  500: "Bourse scolaire pour 1 jeune fille pendant un an",
  custom: "Votre soutien fait la différence",
};

const IMPACT_EN: Record<Preset | "custom", string> = {
  20: "1 month of school supplies for one child",
  50: "Training one teacher in modern methods",
  100: "Equipping a full classroom",
  500: "Scholarship for 1 girl for an entire year",
  custom: "Your support makes a difference",
};

const RECURRING_TIERS_FR = [
  {
    amount: 10,
    label: "Soutien régulier",
    desc: "Fournitures trimestrielles pour un enfant",
  },
  {
    amount: 25,
    label: "Partenaire éducatif",
    desc: "Couvre les frais de scolarité mensuel d'un élève",
  },
  {
    amount: 50,
    label: "Ambassadeur HCW",
    desc: "Finance la formation d'un enseignant par trimestre",
  },
];

const RECURRING_TIERS_EN = [
  {
    amount: 10,
    label: "Regular supporter",
    desc: "Quarterly supplies for one child",
  },
  {
    amount: 25,
    label: "Education partner",
    desc: "Covers monthly school fees for one student",
  },
  {
    amount: 50,
    label: "HCW Ambassador",
    desc: "Funds teacher training every quarter",
  },
];

function getImpact(amount: number | null, locale: string): string {
  const map = locale === "fr" ? IMPACT_FR : IMPACT_EN;
  if (amount === 20) return map[20];
  if (amount === 50) return map[50];
  if (amount === 100) return map[100];
  if (amount === 500) return map[500];
  return map.custom;
}

export default function DonateClient() {
  const t = useTranslations("donate");
  const locale = useLocale();
  const isFr = locale === "fr";

  const [selectedPreset, setSelectedPreset] = useState<Preset | null>(50);
  const [customAmount, setCustomAmount] = useState("");
  const [isMonthly, setIsMonthly] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const effectiveAmount =
    selectedPreset !== null
      ? selectedPreset
      : customAmount
        ? parseFloat(customAmount)
        : null;

  const impactText = getImpact(effectiveAmount, locale);

  const handlePresetClick = useCallback((amount: Preset) => {
    setSelectedPreset(amount);
    setCustomAmount("");
    setError(null);
  }, []);

  const handleCustomChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSelectedPreset(null);
      setCustomAmount(e.target.value);
      setError(null);
    },
    [],
  );

  const handleCheckout = useCallback(async () => {
    if (!effectiveAmount || effectiveAmount < 5) {
      setError(isFr ? "Montant minimum : 5 €" : "Minimum amount: €5");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: effectiveAmount,
          currency: "eur",
          locale,
          recurring: isMonthly,
        }),
      });
      const data = (await res.json()) as { url?: string; error?: string };
      if (!res.ok || !data.url) {
        setError(
          data.error ??
            (isFr ? "Une erreur est survenue." : "Something went wrong."),
        );
        return;
      }
      window.location.href = data.url;
    } catch {
      setError(isFr ? "Une erreur est survenue." : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }, [effectiveAmount, locale, isMonthly, isFr]);

  const recurringTiers = isFr ? RECURRING_TIERS_FR : RECURRING_TIERS_EN;

  return (
    <div className="min-h-screen bg-cream-50">
      {/* ── Hero ─────────────────────────────────────────── */}
      <section
        className="relative overflow-hidden bg-teal-700 py-20"
        aria-label={isFr ? "En-tête don" : "Donation header"}
      >
        {/* subtle background pattern */}
        <div
          className="pointer-events-none absolute inset-0 opacity-10"
          aria-hidden="true"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 50%, #ffffff 1px, transparent 1px), radial-gradient(circle at 80% 20%, #ffffff 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
        <div className="relative mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-teal-600/60 px-4 py-1.5 text-sm font-medium text-teal-100 ring-1 ring-teal-400/40">
            <Heart
              className="h-4 w-4 fill-amber-400 text-amber-400"
              aria-hidden="true"
            />
            <span>HCW — Humanity, Culture &amp; Welfare</span>
          </div>
          <h1 className="font-serif text-4xl font-bold text-white sm:text-5xl">
            {isFr ? "Faites un don" : "Make a donation"}
          </h1>
          <p className="mt-4 text-lg text-teal-100">{t("subtitle")}</p>
        </div>
      </section>

      {/* ── Main content ─────────────────────────────────── */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1fr_400px] lg:items-start">
          {/* LEFT COLUMN */}
          <div className="space-y-10">
            {/* One-time / Monthly toggle */}
            <div>
              <h2 className="mb-4 font-serif text-xl font-semibold text-charcoal-900">
                {isFr ? "Fréquence du don" : "Donation frequency"}
              </h2>
              <div
                className="inline-flex rounded-xl bg-white p-1 shadow-sm ring-1 ring-gray-100"
                role="group"
                aria-label={isFr ? "Fréquence de don" : "Donation frequency"}
              >
                <button
                  type="button"
                  onClick={() => setIsMonthly(false)}
                  aria-pressed={!isMonthly}
                  className={`rounded-lg px-6 py-2.5 text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 ${
                    !isMonthly
                      ? "bg-teal-600 text-white shadow-sm"
                      : "text-gray-600 hover:text-charcoal-900"
                  }`}
                >
                  {t("once")}
                </button>
                <button
                  type="button"
                  onClick={() => setIsMonthly(true)}
                  aria-pressed={isMonthly}
                  className={`flex items-center gap-1.5 rounded-lg px-6 py-2.5 text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 ${
                    isMonthly
                      ? "bg-teal-600 text-white shadow-sm"
                      : "text-gray-600 hover:text-charcoal-900"
                  }`}
                >
                  <RefreshCw className="h-3.5 w-3.5" aria-hidden="true" />
                  {t("monthly")}
                </button>
              </div>
              {isMonthly && (
                <p className="mt-2 text-xs text-teal-700">
                  {isFr
                    ? "Les dons mensuels sont prélevés par carte ou SEPA. Annulable à tout moment."
                    : "Monthly gifts are collected by card or SEPA. Cancel anytime."}
                </p>
              )}
            </div>

            {/* Preset amounts */}
            <div>
              <h2 className="mb-4 font-serif text-xl font-semibold text-charcoal-900">
                {isFr ? "Choisissez votre montant" : "Choose your amount"}
              </h2>
              <div
                className="grid grid-cols-2 gap-3 sm:grid-cols-4"
                role="group"
                aria-label={isFr ? "Montants prédéfinis" : "Preset amounts"}
              >
                {PRESETS.map((amount) => (
                  <button
                    key={amount}
                    type="button"
                    onClick={() => handlePresetClick(amount)}
                    aria-pressed={selectedPreset === amount}
                    className={`flex flex-col items-center rounded-2xl px-4 py-5 text-center transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 ${
                      selectedPreset === amount
                        ? "bg-teal-600 text-white shadow-md ring-2 ring-teal-400"
                        : "bg-white text-charcoal-900 shadow-sm ring-1 ring-gray-100 hover:ring-teal-200"
                    }`}
                  >
                    <span
                      className={`font-serif text-2xl font-bold ${
                        selectedPreset === amount
                          ? "text-amber-300"
                          : "text-teal-600"
                      }`}
                    >
                      €{amount}
                    </span>
                    <span
                      className={`mt-1.5 text-xs leading-snug ${
                        selectedPreset === amount
                          ? "text-teal-100"
                          : "text-gray-500"
                      }`}
                    >
                      {isFr ? IMPACT_FR[amount] : IMPACT_EN[amount]}
                    </span>
                  </button>
                ))}
              </div>

              {/* Custom amount */}
              <div className="mt-4">
                <label
                  htmlFor="custom-amount"
                  className="mb-1.5 block text-sm font-medium text-gray-700"
                >
                  {t("custom")}
                </label>
                <div className="relative">
                  <span
                    className="pointer-events-none absolute inset-y-0 left-4 flex items-center text-gray-400 text-sm font-medium"
                    aria-hidden="true"
                  >
                    €
                  </span>
                  <input
                    id="custom-amount"
                    type="number"
                    min="5"
                    step="1"
                    value={customAmount}
                    onChange={handleCustomChange}
                    placeholder={t("custom_placeholder")}
                    className={`w-full rounded-xl border py-3 pl-8 pr-4 text-sm text-charcoal-900 placeholder-gray-400 transition-all focus:outline-none focus:ring-2 focus:ring-teal-500 ${
                      selectedPreset === null && customAmount
                        ? "border-teal-400 bg-teal-50"
                        : "border-gray-200 bg-white"
                    }`}
                  />
                </div>
              </div>
            </div>

            {/* Impact calculator */}
            {effectiveAmount && effectiveAmount >= 5 && (
              <div className="rounded-2xl border border-teal-100 bg-gradient-to-br from-teal-50 to-white p-6">
                <p className="text-xs font-semibold uppercase tracking-widest text-teal-500">
                  {isFr ? "Impact de votre don" : "Impact of your gift"}
                </p>
                <p className="mt-2 font-serif text-lg font-semibold text-charcoal-900">
                  {t("impact_label")}{" "}
                  <span className="text-teal-600">€{effectiveAmount}</span>{" "}
                  {t("impact_suffix")}
                </p>
                <p className="mt-1 text-sm text-gray-600">{impactText}</p>
              </div>
            )}

            {/* Recurring donors section */}
            <div>
              <h2 className="mb-1 font-serif text-xl font-semibold text-charcoal-900">
                {isFr ? "Donateurs réguliers" : "Monthly donors"}
              </h2>
              <p className="mb-5 text-sm text-gray-500">
                {isFr
                  ? "Rejoignez notre communauté de donateurs fidèles."
                  : "Join our community of committed supporters."}
              </p>
              <div className="space-y-3">
                {recurringTiers.map((tier) => (
                  <button
                    key={tier.amount}
                    type="button"
                    onClick={() => {
                      setIsMonthly(true);
                      handlePresetClick(tier.amount as Preset);
                    }}
                    className="flex w-full items-center gap-4 rounded-xl bg-white px-5 py-4 text-left shadow-sm ring-1 ring-gray-100 transition-all hover:ring-teal-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500"
                  >
                    <span className="shrink-0 font-serif text-xl font-bold text-teal-600">
                      €{tier.amount}
                      <span className="font-sans text-xs font-normal text-gray-400">
                        /{isFr ? "mois" : "mo"}
                      </span>
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-charcoal-900">
                        {tier.label}
                      </p>
                      <p className="text-xs text-gray-500">{tier.desc}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Trust signals */}
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              {[
                {
                  icon: (
                    <ShieldCheck
                      className="h-5 w-5 text-teal-500"
                      aria-hidden="true"
                    />
                  ),
                  label: isFr
                    ? "Association loi 1901"
                    : "Registered non-profit",
                  sub: isFr ? "Enregistrée en France" : "Registered in France",
                },
                {
                  icon: (
                    <CheckCircle2
                      className="h-5 w-5 text-teal-500"
                      aria-hidden="true"
                    />
                  ),
                  label: isFr ? "Reçu fiscal 66%" : "Tax receipt 66%",
                  sub: isFr
                    ? "Pour résidents français"
                    : "For French residents",
                },
                {
                  icon: (
                    <Lock
                      className="h-5 w-5 text-teal-500"
                      aria-hidden="true"
                    />
                  ),
                  label: "RGPD / GDPR",
                  sub: isFr ? "Données protégées" : "Data protected",
                },
              ].map((item) => (
                <div
                  key={item.label}
                  className="flex items-start gap-3 rounded-xl bg-white px-4 py-3 shadow-sm ring-1 ring-gray-100"
                >
                  <div className="mt-0.5 shrink-0">{item.icon}</div>
                  <div>
                    <p className="text-sm font-semibold text-charcoal-900">
                      {item.label}
                    </p>
                    <p className="text-xs text-gray-500">{item.sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT COLUMN — Payment card */}
          <div className="lg:sticky lg:top-8">
            <div className="rounded-2xl bg-white p-8 shadow-lg ring-1 ring-gray-100">
              <h2 className="mb-1 font-serif text-xl font-semibold text-charcoal-900">
                {t("payment_title")}
              </h2>
              <p className="mb-6 text-sm text-gray-500">
                {isFr
                  ? "Paiement crypté, traité par Stripe"
                  : "Encrypted payment processed by Stripe"}
              </p>

              {/* Amount summary */}
              {effectiveAmount && effectiveAmount >= 5 ? (
                <div className="mb-6 rounded-xl bg-teal-50 px-4 py-3.5">
                  <p className="text-sm text-teal-700">
                    {t("impact_label")}{" "}
                    <strong className="text-teal-800">
                      €{effectiveAmount}
                    </strong>
                    {isMonthly && (
                      <span className="ml-1 text-xs text-teal-500">
                        /{isFr ? "mois" : "month"}
                      </span>
                    )}
                  </p>
                  <p className="mt-0.5 text-xs text-teal-600">{impactText}</p>
                </div>
              ) : (
                <div className="mb-6 rounded-xl bg-gray-50 px-4 py-3.5 text-center text-sm text-gray-400">
                  {isFr
                    ? "Sélectionnez un montant ci-contre"
                    : "Select an amount on the left"}
                </div>
              )}

              {/* Error */}
              {error && (
                <div
                  role="alert"
                  className="mb-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700 ring-1 ring-red-200"
                >
                  {error}
                </div>
              )}

              {/* Primary CTA — Stripe */}
              <button
                type="button"
                onClick={handleCheckout}
                disabled={loading || !effectiveAmount || effectiveAmount < 5}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-teal-600 py-4 text-base font-semibold text-white shadow-md transition-all hover:bg-teal-700 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-400"
                aria-busy={loading}
              >
                <CreditCard className="h-5 w-5" aria-hidden="true" />
                {loading
                  ? isFr
                    ? "Redirection…"
                    : "Redirecting…"
                  : isFr
                    ? "Payer par carte"
                    : "Pay by card"}
              </button>

              {/* Payment method logos */}
              <div
                className="mt-4 flex flex-wrap items-center justify-center gap-2"
                aria-label={
                  isFr
                    ? "Moyens de paiement acceptés"
                    : "Accepted payment methods"
                }
              >
                {["Visa", "Mastercard", "Google Pay", "Apple Pay"].map(
                  (method) => (
                    <span
                      key={method}
                      className="rounded border border-gray-200 bg-gray-50 px-2.5 py-1 text-xs font-medium text-gray-500"
                    >
                      {method}
                    </span>
                  ),
                )}
              </div>

              {/* Security */}
              <div className="mt-4 flex items-center justify-center gap-2 text-xs text-gray-400">
                <Lock className="h-3.5 w-3.5" aria-hidden="true" />
                <span>
                  {isFr
                    ? "Paiement sécurisé SSL · Stripe"
                    : "SSL Secured · Stripe"}
                </span>
              </div>

              {/* Divider */}
              <div className="my-6 flex items-center gap-3">
                <div className="h-px flex-1 bg-gray-100" />
                <span className="text-xs text-gray-400">
                  {isFr ? "ou" : "or"}
                </span>
                <div className="h-px flex-1 bg-gray-100" />
              </div>

              {/* HelloAsso secondary CTA */}
              <a
                href="https://www.helloasso.com/associations/hcw"
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-gray-50 py-3.5 text-sm font-medium text-gray-700 ring-1 ring-gray-200 transition-colors hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-400"
              >
                <ExternalLink
                  className="h-4 w-4 text-gray-400"
                  aria-hidden="true"
                />
                {t("helloasso_title")}
              </a>
              <div className="mt-2 flex items-center justify-center gap-1.5">
                <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-700">
                  0%{" "}
                  {isFr
                    ? "frais pour les associations FR"
                    : "fees for French associations"}
                </span>
              </div>

              {/* Tax info */}
              <p className="mt-5 text-center text-xs text-gray-400">
                {t("tax_info")}
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
