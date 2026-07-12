"use client";

import { useTranslations } from "next-intl";

export default function NewsletterForm() {
  const t = useTranslations("news");

  return (
    <form
      className="mt-8 flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
      onSubmit={(e) => e.preventDefault()}
      aria-label={t("newsletter_title")}
    >
      <label htmlFor="newsletter-email" className="sr-only">
        {t("newsletter_placeholder")}
      </label>
      <input
        id="newsletter-email"
        type="email"
        placeholder={t("newsletter_placeholder")}
        className="flex-1 rounded-full px-5 py-3 text-sm text-charcoal-900 bg-white outline-none focus:ring-2 focus:ring-amber-400"
        required
      />
      <button
        type="submit"
        className="rounded-full bg-amber-500 px-6 py-3 text-sm font-semibold text-white hover:bg-amber-600 transition-colors"
      >
        {t("newsletter_submit")}
      </button>
    </form>
  );
}
