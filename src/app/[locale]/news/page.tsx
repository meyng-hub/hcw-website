import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import NewsClient from "./NewsClient";

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

export interface NewsArticle {
  id: string;
  titleFr: string;
  titleEn: string;
  excerptFr: string;
  excerptEn: string;
  date: string; // ISO date string
  tag: "impact" | "education" | "partnership" | "report" | "campaign" | "award";
  accentColor: "teal" | "amber";
}

export const NEWS_ARTICLES: NewsArticle[] = [
  {
    id: "hcw-90000-eleves",
    titleFr: "HCW atteint 90 000 élèves en RCA",
    titleEn: "HCW reaches 90,000 students in CAR",
    excerptFr:
      "Grâce à l'engagement de nos bénévoles et partenaires, HCW a désormais touché plus de 90 000 élèves à travers ses programmes éducatifs en République Centrafricaine.",
    excerptEn:
      "Thanks to the commitment of our volunteers and partners, HCW has now reached more than 90,000 students through its educational programmes in the Central African Republic.",
    date: "2026-05-10",
    tag: "impact",
    accentColor: "teal",
  },
  {
    id: "endara-challenge-2025",
    titleFr: "eNdara Challenge 2025 : 800 lauréats récompensés",
    titleEn: "eNdara Challenge 2025: 800 prize-winners rewarded",
    excerptFr:
      "La 4ᵉ édition du concours eNdara Challenge a sacré 800 jeunes talents de Bangui pour leurs projets innovants en numérique et sciences.",
    excerptEn:
      "The 4th edition of the eNdara Challenge competition honoured 800 young talents from Bangui for their innovative projects in digital technology and science.",
    date: "2026-04-18",
    tag: "education",
    accentColor: "amber",
  },
  {
    id: "partenariat-weiram",
    titleFr: "Nouveau partenariat avec WEIRAM",
    titleEn: "New partnership with WEIRAM",
    excerptFr:
      "HCW signe un accord de coopération avec WEIRAM pour renforcer les programmes d'autonomisation des jeunes filles en milieu rural centrafricain.",
    excerptEn:
      "HCW signs a cooperation agreement with WEIRAM to strengthen empowerment programmes for young girls in rural Central Africa.",
    date: "2026-03-05",
    tag: "partnership",
    accentColor: "teal",
  },
  {
    id: "rapport-annuel-2024",
    titleFr: "Rapport annuel 2024 disponible",
    titleEn: "Annual report 2024 now available",
    excerptFr:
      "Notre rapport annuel 2024 est désormais disponible en téléchargement. Découvrez le bilan complet de nos actions et l'impact de vos dons.",
    excerptEn:
      "Our 2024 annual report is now available for download. Discover the full review of our activities and the impact of your donations.",
    date: "2026-02-14",
    tag: "report",
    accentColor: "amber",
  },
  {
    id: "campagne-dons-objectif",
    titleFr: "Campagne de dons : objectif atteint !",
    titleEn: "Donation campaign: goal reached!",
    excerptFr:
      "Grâce à votre générosité, notre campagne « L'éducation est une liberté » a atteint son objectif de 70 000 € et financera 200 élèves supplémentaires.",
    excerptEn:
      "Thanks to your generosity, our campaign 'Education is Freedom' has reached its €70,000 goal and will fund 200 additional students.",
    date: "2026-01-22",
    tag: "campaign",
    accentColor: "teal",
  },
  {
    id: "prix-iaap-accessibilite",
    titleFr: "HCW reçoit le prix IAAP Accessibilité",
    titleEn: "HCW receives the IAAP Accessibility Award",
    excerptFr:
      "L'Association internationale pour l'accessibilité professionnelle a décerné à HCW son prix pour l'inclusion numérique dans les zones à faible connectivité.",
    excerptEn:
      "The International Association of Accessibility Professionals has awarded HCW its prize for digital inclusion in low-connectivity areas.",
    date: "2024-04-30",
    tag: "award",
    accentColor: "amber",
  },
];

export default async function NewsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "news" });

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
      <NewsClient articles={NEWS_ARTICLES} locale={locale} />

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
          <p className="mt-4 text-xs text-teal-200">
            {t("newsletter_disclaimer")}
          </p>
        </div>
      </section>
    </>
  );
}
