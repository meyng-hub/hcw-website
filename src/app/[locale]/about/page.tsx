import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import Link from "next/link";
import {
  BookOpen,
  Heart,
  Globe,
  Lightbulb,
  Award,
  Users,
  ChevronRight,
} from "lucide-react";
import { SITE_NAME } from "@/lib/constants";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "about" });
  return {
    title: t("page_title"),
    description: t("meta_description"),
    alternates: {
      canonical: `/${locale}/about`,
      languages: {
        fr: "/fr/about",
        en: "/en/about",
      },
    },
    openGraph: {
      title: `${t("page_title")} | ${SITE_NAME}`,
      description: t("meta_description"),
      type: "website",
    },
  };
}

const TIMELINE = [
  { year: 2009, key: "timeline_2009" },
  { year: 2013, key: "timeline_2013" },
  { year: 2015, key: "timeline_2015" },
  { year: 2018, key: "timeline_2018" },
  { year: 2020, key: "timeline_2020" },
  { year: 2025, key: "timeline_2025" },
];

const VALUES = [
  {
    icon: BookOpen,
    titleKey: "values_education_title",
    descKey: "values_education_desc",
    color: "text-teal-600",
    bg: "bg-teal-50",
  },
  {
    icon: Heart,
    titleKey: "values_solidarity_title",
    descKey: "values_solidarity_desc",
    color: "text-amber-500",
    bg: "bg-amber-50",
  },
  {
    icon: Globe,
    titleKey: "values_culture_title",
    descKey: "values_culture_desc",
    color: "text-teal-600",
    bg: "bg-teal-50",
  },
  {
    icon: Lightbulb,
    titleKey: "values_innovation_title",
    descKey: "values_innovation_desc",
    color: "text-amber-500",
    bg: "bg-amber-50",
  },
];

const TEAM = [
  {
    name: "Michel Wenezoui",
    roleKey: "team_role_president",
    initials: "MW",
  },
  {
    name: "Jean Mba",
    roleKey: "team_role_programme_director",
    initials: "JM",
  },
  {
    name: "Suzy Ouenezoui",
    roleKey: "team_role_car_coordinator",
    initials: "SO",
  },
  {
    name: "Philomène Etoa",
    roleKey: "team_role_partnerships_officer",
    initials: "PE",
  },
];

const PARTNERS = [
  {
    name: "WEIRAM",
    descKey: "partners_weiram_desc",
  },
  {
    name: "KAIKELEM",
    descKey: "partners_kaikelem_desc",
  },
  {
    name: "eNdara",
    descKey: "partners_endara_desc",
  },
];

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "about" });

  return (
    <>
      {/* ── Hero ── */}
      <section
        aria-labelledby="about-hero-heading"
        className="relative overflow-hidden bg-gradient-to-br from-teal-700 via-teal-600 to-charcoal-900 pt-32 pb-20 text-white"
      >
        {/* decorative rings */}
        <div className="pointer-events-none absolute -top-24 -right-24 h-96 w-96 rounded-full border border-white/10" />
        <div className="pointer-events-none absolute -bottom-12 -left-12 h-64 w-64 rounded-full border border-white/10" />
        <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full border border-white/5" />

        <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-sm font-medium backdrop-blur-sm">
            <Award className="h-4 w-4 text-amber-400" aria-hidden="true" />
            {t("hero_badge")}
          </p>
          <h1
            id="about-hero-heading"
            className="font-serif text-5xl font-bold leading-tight tracking-tight md:text-6xl"
          >
            {t("hero_title")}
          </h1>
          <p className="mt-6 text-lg text-teal-100 max-w-2xl mx-auto leading-relaxed">
            {t("hero_subtitle")}
          </p>
          <p className="mt-4 text-base font-semibold tracking-widest text-amber-400 uppercase">
            Hervé-Charles Wenezoui
          </p>
        </div>
      </section>

      {/* ── Mission & Vision ── */}
      <section aria-labelledby="mission-heading" className="bg-cream-50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <div className="mb-4 h-1 w-12 rounded bg-teal-600" />
              <h2
                id="mission-heading"
                className="font-serif text-4xl font-bold text-charcoal-900"
              >
                {t("mission_title")}
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-gray-600">
                {t("mission_text")}
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <span className="rounded-full bg-teal-100 px-4 py-1.5 text-sm font-medium text-teal-700">
                  {t("mission_badge_law")}
                </span>
                <span className="rounded-full bg-amber-100 px-4 py-1.5 text-sm font-medium text-amber-700">
                  {t("mission_badge_founded")}
                </span>
                <span className="rounded-full bg-teal-100 px-4 py-1.5 text-sm font-medium text-teal-700">
                  {t("mission_badge_country")}
                </span>
              </div>
            </div>

            <div>
              <div className="mb-4 h-1 w-12 rounded bg-amber-500" />
              <h2 className="font-serif text-4xl font-bold text-charcoal-900">
                {t("vision_title")}
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-gray-600">
                {t("vision_text")}
              </p>
              <div className="mt-8 grid grid-cols-3 gap-4">
                <div className="text-center">
                  <p className="font-serif text-3xl font-bold text-teal-600">
                    9K+
                  </p>
                  <p className="mt-1 text-xs text-gray-500">
                    {t("stats_students_label")}
                  </p>
                </div>
                <div className="text-center">
                  <p className="font-serif text-3xl font-bold text-teal-600">
                    6
                  </p>
                  <p className="mt-1 text-xs text-gray-500">
                    {t("stats_programmes_label")}
                  </p>
                </div>
                <div className="text-center">
                  <p className="font-serif text-3xl font-bold text-teal-600">
                    16
                  </p>
                  <p className="mt-1 text-xs text-gray-500">
                    {t("stats_years_label")}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Timeline ── */}
      <section aria-labelledby="timeline-heading" className="bg-white py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <div className="mx-auto mb-4 h-1 w-12 rounded bg-teal-600" />
            <h2
              id="timeline-heading"
              className="font-serif text-4xl font-bold text-charcoal-900"
            >
              {t("timeline_title")}
            </h2>
          </div>

          <ol
            className="relative border-l-2 border-teal-200 pl-8 space-y-10"
            aria-label={t("timeline_aria")}
          >
            {TIMELINE.map((item, idx) => {
              const isAward = item.year === 2024;
              const isLast = idx === TIMELINE.length - 1;
              return (
                <li key={item.year} className="relative">
                  {/* dot */}
                  <span
                    className={`absolute -left-[41px] flex h-6 w-6 items-center justify-center rounded-full border-2 bg-white ${isAward ? "border-amber-500" : "border-teal-600"}`}
                    aria-hidden="true"
                  >
                    <span
                      className={`h-2.5 w-2.5 rounded-full ${isLast ? "bg-amber-500" : isAward ? "bg-amber-500" : "bg-teal-600"}`}
                    />
                  </span>
                  <time
                    dateTime={String(item.year)}
                    className={`mb-1 block text-xs font-bold uppercase tracking-wider ${isAward ? "text-amber-600" : "text-teal-600"}`}
                  >
                    {item.year}
                  </time>
                  {isAward ? (
                    <div className="rounded-xl bg-amber-50 border border-amber-200 px-4 py-3 flex items-start gap-3">
                      <Award
                        className="mt-0.5 h-5 w-5 flex-shrink-0 text-amber-500"
                        aria-hidden="true"
                      />
                      <p className="text-base font-semibold text-amber-900">
                        {t(item.key as Parameters<typeof t>[0])}
                      </p>
                    </div>
                  ) : (
                    <p className="text-base text-charcoal-900">
                      {t(item.key as Parameters<typeof t>[0])}
                    </p>
                  )}
                </li>
              );
            })}
          </ol>
        </div>
      </section>

      {/* ── Team ── */}
      <section aria-labelledby="team-heading" className="bg-cream-50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <div className="mx-auto mb-4 h-1 w-12 rounded bg-teal-600" />
            <h2
              id="team-heading"
              className="font-serif text-4xl font-bold text-charcoal-900"
            >
              {t("team_title")}
            </h2>
            <p className="mt-4 text-gray-500 max-w-xl mx-auto">
              {t("team_subtitle")}
            </p>
          </div>

          {/* Team community photo */}
          <div className="mb-12 overflow-hidden rounded-2xl shadow-md">
            <figure>
              <Image
                src="/images/team-community.jpg"
                alt={t("team_photo_alt")}
                width={1200}
                height={600}
                className="w-full object-cover"
                priority
              />
              <figcaption className="bg-charcoal-900 px-6 py-3 text-center text-sm text-gray-300">
                {t("team_photo_caption")}
              </figcaption>
            </figure>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {TEAM.map((member) => (
              <div
                key={member.name}
                className="group rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-100 transition-shadow hover:shadow-md"
              >
                {/* avatar */}
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-teal-600 to-teal-700 text-xl font-bold text-white font-serif">
                  {member.initials}
                </div>
                <h3 className="text-center font-semibold text-charcoal-900">
                  {member.name}
                </h3>
                <span className="mt-2 block text-center">
                  <span className="rounded-full bg-teal-100 px-3 py-0.5 text-xs font-medium text-teal-700">
                    {t(member.roleKey as Parameters<typeof t>[0])}
                  </span>
                </span>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <p className="text-sm text-gray-400 flex items-center justify-center gap-2">
              <Users className="h-4 w-4" aria-hidden="true" />
              {t("team_volunteers")}
            </p>
          </div>
        </div>
      </section>

      {/* ── Partners ── */}
      <section aria-labelledby="partners-heading" className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <div className="mx-auto mb-4 h-1 w-12 rounded bg-amber-500" />
            <h2
              id="partners-heading"
              className="font-serif text-4xl font-bold text-charcoal-900"
            >
              {t("partners_title")}
            </h2>
          </div>

          <div className="grid gap-6 sm:grid-cols-3">
            {PARTNERS.map((partner) => (
              <div
                key={partner.name}
                className="rounded-2xl border border-gray-100 p-8 text-center shadow-sm hover:border-teal-200 hover:shadow-md transition-all"
              >
                <p className="font-serif text-2xl font-bold text-teal-700 mb-3">
                  {partner.name}
                </p>
                <p className="text-sm text-gray-500">
                  {t(partner.descKey as Parameters<typeof t>[0])}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Values ── */}
      <section aria-labelledby="values-heading" className="bg-cream-50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <div className="mx-auto mb-4 h-1 w-12 rounded bg-teal-600" />
            <h2
              id="values-heading"
              className="font-serif text-4xl font-bold text-charcoal-900"
            >
              {t("values_title")}
            </h2>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {VALUES.map(({ icon: Icon, titleKey, descKey, color, bg }) => (
              <div
                key={titleKey}
                className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-100 hover:shadow-md transition-shadow"
              >
                <div
                  className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl ${bg}`}
                >
                  <Icon className={`h-6 w-6 ${color}`} aria-hidden="true" />
                </div>
                <h3 className="font-serif text-lg font-semibold text-charcoal-900 mb-2">
                  {t(titleKey as Parameters<typeof t>[0])}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  {t(descKey as Parameters<typeof t>[0])}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section
        aria-labelledby="about-cta-heading"
        className="bg-gradient-to-br from-teal-700 to-charcoal-900 py-20 text-white"
      >
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <h2 id="about-cta-heading" className="font-serif text-4xl font-bold">
            {t("cta_title")}
          </h2>
          <p className="mt-6 text-lg text-teal-100">{t("cta_text")}</p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href={`/${locale}/donate`}
              className="flex items-center gap-2 rounded-full bg-amber-500 px-8 py-3 text-sm font-semibold text-white shadow-lg transition-all hover:bg-amber-600 hover:shadow-xl active:scale-95"
            >
              <Heart className="h-4 w-4" aria-hidden="true" />
              {t("cta_donate")}
            </Link>
            <Link
              href={`/${locale}/contact`}
              className="flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-8 py-3 text-sm font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/20"
            >
              {t("cta_contact")}
              <ChevronRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
