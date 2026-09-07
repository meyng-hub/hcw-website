"use client";

import { useCallback, useSyncExternalStore } from "react";
import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";
import {
  type ConsentChoice,
  getConsentSnapshot,
  getConsentServerSnapshot,
  isAnalyticsConfigured,
  setConsent,
  subscribeConsent,
} from "@/lib/analytics";

/**
 * Cookie consent banner (CNIL posture: refusing is exactly as easy as accepting,
 * and nothing is measured with cookies until the visitor accepts).
 *
 * Renders nothing at all when no GA measurement ID is configured, so the site
 * keeps its current cookie-free behaviour until the tag is actually switched on.
 */
export default function ConsentBanner() {
  const t = useTranslations("consent");
  const locale = useLocale();
  // The choice lives in localStorage, which is external state. Reading it
  // through useSyncExternalStore keeps the server render ("unknown" -> render
  // nothing) and the client render consistent, with no flash and no effect.
  const choice = useSyncExternalStore(
    subscribeConsent,
    getConsentSnapshot,
    getConsentServerSnapshot,
  );

  const choose = useCallback((next: ConsentChoice) => {
    setConsent(next);
  }, []);

  // Shown only once the client knows the visitor has not decided yet.
  if (!isAnalyticsConfigured || choice !== null) return null;

  const privacyHref = locale === "fr" ? "/fr/confidentialite" : "/en/privacy";

  return (
    <div
      role="dialog"
      aria-modal="false"
      aria-label={t("aria_label")}
      className="fixed inset-x-0 bottom-0 z-50 border-t border-charcoal-900/10 bg-white p-4 shadow-[0_-4px_24px_rgba(0,0,0,0.08)] sm:p-6"
    >
      <div className="mx-auto flex max-w-5xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-charcoal-900">
          {t("message")}{" "}
          <Link
            href={privacyHref}
            className="font-medium text-teal-700 underline underline-offset-2 hover:text-teal-800"
          >
            {t("learn_more")}
          </Link>
        </p>
        <div className="flex shrink-0 gap-3">
          <button
            type="button"
            onClick={() => choose("denied")}
            className="rounded-md border border-charcoal-900/20 px-4 py-2 text-sm font-medium text-charcoal-900 transition hover:bg-cream-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-600 focus-visible:ring-offset-2"
          >
            {t("refuse")}
          </button>
          <button
            type="button"
            onClick={() => choose("granted")}
            className="rounded-md bg-teal-700 px-4 py-2 text-sm font-medium text-white transition hover:bg-teal-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-600 focus-visible:ring-offset-2"
          >
            {t("accept")}
          </button>
        </div>
      </div>
    </div>
  );
}
