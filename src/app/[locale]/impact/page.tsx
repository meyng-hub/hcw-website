import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import Link from "next/link";
import {
  Trophy,
  Users,
  Heart,
  Layers,
  Download,
  TrendingUp,
} from "lucide-react";
import ImpactCounterAnimated from "@/components/sections/ImpactCounterAnimated";
import { stats } from "@/lib/content";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "impactPage" });
  return {
    title: t("page_title"),
    description: t("page_description"),
    openGraph: {
      title: t("page_title"),
      description: t("page_description"),
    },
  };
}

interface ProjectImpact {
  id: string;
  titleKey: string;
  beneficiariesKey: string;
  categoryEmoji: string;
}

const PROJECT_IMPACTS: ProjectImpact[] = [
  {
    id: "endara-challenge",
    titleKey: "project_endara_title",
    beneficiariesKey: "project_endara_beneficiaries",
    categoryEmoji: "💻",
  },
  {
    id: "empowering-girls",
    titleKey: "project_girls_title",
    beneficiariesKey: "project_girls_beneficiaries",
    categoryEmoji: "👩‍🎓",
  },
  {
    id: "fighting-illiteracy",
    titleKey: "project_illiteracy_title",
    beneficiariesKey: "project_illiteracy_beneficiaries",
    categoryEmoji: "📚",
  },
  {
    id: "tolerance-fair-play",
    titleKey: "project_tolerance_title",
    beneficiariesKey: "project_tolerance_beneficiaries",
    categoryEmoji: "🤝",
  },
  {
    id: "kaikelem",
    titleKey: "project_kaikelem_title",
    beneficiariesKey: "project_kaikelem_beneficiaries",
    categoryEmoji: "❤️",
  },
  {
    id: "digital-inclusion",
    titleKey: "project_digital_title",
    beneficiariesKey: "project_digital_beneficiaries",
    categoryEmoji: "🌐",
  },
];

interface SDG {
  number: number;
  labelKey: string;
  color: string;
  bg: string;
}

const SDGS: SDG[] = [
  {
    number: 4,
    labelKey: "sdg_4_label",
    color: "text-red-700",
    bg: "bg-red-100",
  },
  {
    number: 5,
    labelKey: "sdg_5_label",
    color: "text-orange-700",
    bg: "bg-orange-100",
  },
  {
    number: 10,
    labelKey: "sdg_10_label",
    color: "text-pink-700",
    bg: "bg-pink-100",
  },
  {
    number: 17,
    labelKey: "sdg_17_label",
    color: "text-blue-700",
    bg: "bg-blue-100",
  },
];


export default async function ImpactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "impactPage" });
  const common = await getTranslations({ locale, namespace: "common" });
  type TKey = Parameters<typeof t>[0];

  return (
    <>
      {/* Hero */}
      <section
        className="relative overflow-hidden py-28"
        aria-labelledby="impact-page-heading"
        style={{
          background:
            "linear-gradient(135deg, #0d6e6e 0%, #0a5555 60%, #1c1c2e 100%)",
        }}
      >
        <div
          className="pointer-events-none absolute -right-32 top-0 h-96 w-96 rounded-full bg-amber-400/10"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute -bottom-16 left-0 h-64 w-64 rounded-full bg-teal-300/10"
          aria-hidden="true"
        />

        <div className="relative mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-1.5 text-sm font-medium text-white/90 backdrop-blur-sm">
            <TrendingUp className="h-4 w-4" aria-hidden="true" />
            {t("hero_badge")}
          </div>
          <h1
            id="impact-page-heading"
            className="font-serif text-5xl font-bold text-white sm:text-6xl"
          >
            {t("hero_headline")}
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-xl text-white/80">
            {t("hero_tagline")}
          </p>
        </div>
      </section>

      {/* Live counters */}
      <section className="bg-cream-50 py-20" aria-labelledby="counters-heading">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2
              id="counters-heading"
              className="font-serif text-3xl font-bold text-charcoal-900 sm:text-4xl"
            >
              {t("counters_title")}
            </h2>
            <p className="mt-3 text-sm text-gray-500">{t("counters_note")}</p>
          </div>

          <div className="grid gap-6 sm:grid-cols-3" role="list">
            <ImpactCounterAnimated
              value={stats.prizes}
              suffix="+"
              label={t("counter_laureates")}
              icon={<Trophy className="h-7 w-7" aria-hidden="true" />}
            />
            <ImpactCounterAnimated
              value={stats.students}
              suffix="+"
              label={t("counter_students")}
              icon={<Users className="h-7 w-7" aria-hidden="true" />}
            />
            <ImpactCounterAnimated
              value={stats.projects}
              label={t("counter_projects")}
              icon={<Layers className="h-7 w-7" aria-hidden="true" />}
            />
          </div>
        </div>
      </section>

      {/* Impact by project */}
      <section
        className="bg-white py-20"
        aria-labelledby="projects-impact-heading"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 text-center">
            <h2
              id="projects-impact-heading"
              className="font-serif text-3xl font-bold text-charcoal-900 sm:text-4xl"
            >
              {t("projects_title")}
            </h2>
          </div>

          <div className="overflow-hidden rounded-2xl ring-1 ring-gray-100 shadow-sm">
            <table className="w-full text-sm" aria-label={t("projects_table_aria")}>
              <thead className="bg-teal-600 text-white">
                <tr>
                  <th scope="col" className="px-6 py-4 text-left font-semibold">
                    {t("projects_col_project")}
                  </th>
                  <th scope="col" className="px-6 py-4 text-left font-semibold">
                    {t("projects_col_beneficiaries")}
                  </th>
                  <th
                    scope="col"
                    className="hidden px-6 py-4 text-left font-semibold sm:table-cell"
                  >
                    {t("projects_col_status")}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {PROJECT_IMPACTS.map((p, i) => (
                  <tr
                    key={p.id}
                    className={i % 2 === 0 ? "bg-white" : "bg-cream-50"}
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <span
                          className="text-2xl"
                          role="img"
                          aria-hidden="true"
                        >
                          {p.categoryEmoji}
                        </span>
                        <span className="font-medium text-charcoal-900">
                          {t(p.titleKey as TKey)}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-600">
                      {t(p.beneficiariesKey as TKey)}
                    </td>
                    <td className="hidden px-6 py-4 sm:table-cell">
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-teal-50 px-3 py-1 text-xs font-medium text-teal-700">
                        <span
                          className="h-1.5 w-1.5 rounded-full bg-teal-500"
                          aria-hidden="true"
                        />
                        {t("projects_status_active")}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* SDG alignment */}
      <section className="bg-cream-50 py-20" aria-labelledby="sdg-heading">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 text-center">
            <h2
              id="sdg-heading"
              className="font-serif text-3xl font-bold text-charcoal-900 sm:text-4xl"
            >
              {t("sdg_title")}
            </h2>
            <p className="mt-3 text-gray-500">{t("sdg_subtitle")}</p>
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            {SDGS.map((sdg) => (
              <div
                key={sdg.number}
                className={`flex items-center gap-3 rounded-2xl ${sdg.bg} px-6 py-4 shadow-sm ring-1 ring-black/5`}
              >
                <span
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white font-bold ${sdg.color} shadow-sm text-sm`}
                >
                  {sdg.number}
                </span>
                <div>
                  <div className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                    ODD {sdg.number}
                  </div>
                  <div className={`font-semibold ${sdg.color}`}>
                    {t(sdg.labelKey as TKey)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Financial transparency */}
      <section
        className="bg-charcoal-900 py-20"
        aria-labelledby="finance-heading"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 text-center">
            <h2
              id="finance-heading"
              className="font-serif text-3xl font-bold text-white sm:text-4xl"
            >
              {t("finance_title")}
            </h2>
            <p className="mt-3 text-white/60">{t("finance_subtitle")}</p>
          </div>

          <div className="mx-auto max-w-3xl rounded-xl bg-white/5 p-8 ring-1 ring-white/10">
            <p className="text-lg leading-relaxed text-white/80">
              {t("finance_mechanism")}
            </p>
            <p className="mt-4 text-sm text-white/50">
              {t("finance_commitment")}
            </p>
          </div>
        </div>
      </section>

      {/* Annual reports */}
      <section className="bg-cream-50 py-20" aria-labelledby="reports-heading">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 text-center">
            <h2
              id="reports-heading"
              className="font-serif text-3xl font-bold text-charcoal-900 sm:text-4xl"
            >
              {t("reports_title")}
            </h2>
          </div>

          <div className="mx-auto flex max-w-2xl flex-col items-center rounded-2xl bg-white p-8 text-center shadow-sm ring-1 ring-gray-100">
            <div
              className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-teal-50 text-teal-600"
              aria-hidden="true"
            >
              <Download className="h-8 w-8" />
            </div>
            <h3 className="font-serif text-lg font-semibold text-charcoal-900">
              {t("reports_coming_title")}
            </h3>
            <p className="mt-3 max-w-md text-sm text-gray-500">
              {t("reports_coming_text")}
            </p>
          </div>
        </div>
      </section>

      {/* Donate CTA */}
      <section className="bg-amber-500 py-16">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <Heart
            className="mx-auto mb-4 h-10 w-10 text-white/80"
            aria-hidden="true"
          />
          <h2 className="font-serif text-3xl font-bold text-white">
            {t("cta_title")}
          </h2>
          <p className="mt-4 text-white/85">{t("cta_text")}</p>
          <Link
            href={`/${locale}/donate`}
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-8 py-3 text-sm font-semibold text-amber-600 shadow-md transition-colors hover:bg-amber-50"
          >
            <Heart className="h-4 w-4" aria-hidden="true" />
            {common("donate_now")}
          </Link>
        </div>
      </section>
    </>
  );
}
