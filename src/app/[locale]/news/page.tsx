import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import NewsClient from "./NewsClient";
import NewsletterForm from "./NewsletterForm";
import { news } from "@/lib/content";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "news" });
  return {
    title: t("meta_title"),
    description: t("meta_description"),
    openGraph: {
      title: t("meta_title"),
      description: t("meta_description"),
    },
  };
}

export default async function NewsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "news" });
  const articles = [...news].sort((a, b) => b.date.localeCompare(a.date));

  return (
    <>
      {/* ── Hero ── */}
      <section className="relative overflow-hidden bg-teal-600 pt-28 pb-20">
        <div
          aria-hidden="true"
          className="absolute -top-16 -right-16 h-64 w-64 rounded-full bg-teal-500/40"
        />
        <div
          aria-hidden="true"
          className="absolute bottom-0 left-1/4 h-40 w-40 rounded-full bg-amber-500/20"
        />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-amber-400 mb-3">
            HCW · {new Date().getFullYear()}
          </p>
          <h1 className="font-serif text-4xl font-bold text-white sm:text-5xl lg:text-6xl">
            {t("title")}
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-teal-100">
            {t("hero_subtitle")}
          </p>
        </div>
      </section>

      {/* ── News grid + search (client) ── */}
      <NewsClient articles={articles} locale={locale} />

      {/* ── Newsletter CTA ── */}
      <section
        className="bg-teal-600 py-16"
        aria-labelledby="newsletter-heading"
      >
        <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 text-center">
          <h2
            id="newsletter-heading"
            className="font-serif text-3xl font-bold text-white"
          >
            {t("newsletter_title")}
          </h2>
          <p className="mt-3 text-teal-100">{t("newsletter_subtitle")}</p>
          <NewsletterForm />
          <p className="mt-4 text-xs text-teal-200">
            {t("newsletter_disclaimer")}
          </p>
        </div>
      </section>
    </>
  );
}
