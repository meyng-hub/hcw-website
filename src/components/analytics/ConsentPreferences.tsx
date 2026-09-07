"use client";

import { useCallback } from "react";
import { useTranslations } from "next-intl";
import { clearConsent, isAnalyticsConfigured } from "@/lib/analytics";

/**
 * "Manage my cookies" control, rendered in the privacy policy.
 *
 * The CNIL requires withdrawing consent to be as easy as giving it, so this
 * resets the stored choice, immediately re-denies consent to the Google tag and
 * brings the banner back for a fresh decision.
 */
export default function ConsentPreferences() {
  const t = useTranslations("consent");

  const reopen = useCallback(() => {
    // clearConsent() notifies every subscriber, which brings the banner back.
    clearConsent();
  }, []);

  if (!isAnalyticsConfigured) return null;

  return (
    <button
      type="button"
      onClick={reopen}
      className="rounded-md border border-charcoal-900/20 px-4 py-2 text-sm font-medium text-charcoal-900 transition hover:bg-cream-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-600 focus-visible:ring-offset-2"
    >
      {t("manage")}
    </button>
  );
}
