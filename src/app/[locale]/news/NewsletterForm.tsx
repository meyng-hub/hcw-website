"use client";

import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";

export default function NewsletterForm() {
  const t = useTranslations("news");
  const locale = useLocale();
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "error">(
    "idle",
  );
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!consent) {
      setError(t("newsletter_consent_required"));
      return;
    }
    setStatus("loading");
    setError(null);
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, consent }),
      });
      if (!res.ok) {
        setStatus("error");
        setError(t("newsletter_error"));
        return;
      }
      setStatus("ok");
      setEmail("");
      setConsent(false);
    } catch {
      setStatus("error");
      setError(t("newsletter_error"));
    }
  };

  if (status === "ok") {
    return (
      <p className="mt-8 text-center text-sm font-medium text-teal-700">
        {t("newsletter_success")}
      </p>
    );
  }

  return (
    <form
      className="mt-8 mx-auto max-w-md space-y-3"
      onSubmit={handleSubmit}
      aria-label={t("newsletter_title")}
    >
      <div className="flex flex-col sm:flex-row gap-3">
        <label htmlFor="newsletter-email" className="sr-only">
          {t("newsletter_placeholder")}
        </label>
        <input
          id="newsletter-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={t("newsletter_placeholder")}
          className="flex-1 rounded-full px-5 py-3 text-sm text-charcoal-900 bg-white outline-none focus:ring-2 focus:ring-amber-400"
          required
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="rounded-full bg-amber-500 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-amber-600 disabled:opacity-60"
          aria-busy={status === "loading"}
        >
          {t("newsletter_submit")}
        </button>
      </div>
      <label className="flex items-start gap-2 text-left text-xs text-gray-500">
        <input
          type="checkbox"
          checked={consent}
          onChange={(e) => setConsent(e.target.checked)}
          className="mt-0.5 shrink-0"
        />
        <span>
          {t("newsletter_consent")}{" "}
          <Link
            href={`/${locale}/privacy`}
            className="text-teal-600 hover:underline"
          >
            {t("newsletter_privacy_link")}
          </Link>
          .
        </span>
      </label>
      {error && (
        <p role="alert" className="text-xs text-red-600">
          {error}
        </p>
      )}
    </form>
  );
}
