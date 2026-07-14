import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import Link from "next/link";
import {
  Trophy,
  Users,
  Heart,
  Layers,
  Globe,
  Download,
  Quote,
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
  titleFr: string;
  titleEn: string;
  beneficiariesFr: string;
  beneficiariesEn: string;
  categoryEmoji: string;
}

const PROJECT_IMPACTS: ProjectImpact[] = [
  {
    id: "endara-challenge",
    titleFr: "eNdara Challenge",
    titleEn: "eNdara Challenge",
    beneficiariesFr: "2 000+ jeunes participants",
    beneficiariesEn: "2,000+ young participants",
    categoryEmoji: "💻",
  },
  {
    id: "empowering-girls",
    titleFr: "Équiper nos jeunes filles",
    titleEn: "Empowering Young Girls",
    beneficiariesFr: "500+ jeunes filles accompagnées",
    beneficiariesEn: "500+ young girls supported",
    categoryEmoji: "👩‍🎓",
  },
  {
    id: "fighting-illiteracy",
    titleFr: "Lutter contre l'illettrisme",
    titleEn: "Fighting Illiteracy",
    beneficiariesFr: "10 000+ personnes alphabétisées",
    beneficiariesEn: "10,000+ people made literate",
    categoryEmoji: "📚",
  },
  {
    id: "tolerance-fair-play",
    titleFr: "Tolérance et fair-play",
    titleEn: "Tolerance and Fair Play",
    beneficiariesFr: "3 000+ jeunes sportifs",
    beneficiariesEn: "3,000+ young athletes",
    categoryEmoji: "🤝",
  },
  {
    id: "kaikelem",
    titleFr: "KAIKELEM",
    titleEn: "KAIKELEM",
    beneficiariesFr: "200+ veuves et orphelins",
    beneficiariesEn: "200+ widows and orphans",
    categoryEmoji: "❤️",
  },
  {
    id: "digital-inclusion",
    titleFr: "Inclusion numérique",
    titleEn: "Digital Inclusion",
    beneficiariesFr: "5 000+ élèves connectés",
    beneficiariesEn: "5,000+ students connected",
    categoryEmoji: "🌐",
  },
];

interface SDG {
  number: number;
  labelFr: string;
  labelEn: string;
  color: string;
  bg: string;
}

const SDGS: SDG[] = [
  {
    number: 4,
    labelFr: "Éducation de qualité",
    labelEn: "Quality Education",
    color: "text-red-700",
    bg: "bg-red-100",
  },
  {
    number: 5,
    labelFr: "Égalité entre les sexes",
    labelEn: "Gender Equality",
    color: "text-orange-700",
    bg: "bg-orange-100",
  },
  {
    number: 10,
    labelFr: "Inégalités réduites",
    labelEn: "Reduced Inequalities",
    color: "text-pink-700",
    bg: "bg-pink-100",
  },
  {
    number: 17,
    labelFr: "Partenariats",
    labelEn: "Partnerships",
    color: "text-blue-700",
    bg: "bg-blue-100",
  },
];

interface AnnualReport {
  year: number;
  pagesFr: string;
  pagesEn: string;
}

const ANNUAL_REPORTS: AnnualReport[] = [
  {
    year: 2024,
    pagesFr: "Rapport d'activité 2024",
    pagesEn: "2024 Activity Report",
  },
  {
    year: 2023,
    pagesFr: "Rapport d'activité 2023",
    pagesEn: "2023 Activity Report",
  },
  {
    year: 2022,
    pagesFr: "Rapport d'activité 2022",
    pagesEn: "2022 Activity Report",
  },
];

interface Testimonial {
  quoteFr: string;
  quoteEn: string;
  nameFr: string;
  nameEn: string;
  roleFr: string;
  roleEn: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    quoteFr:
      "Grâce à HCW, j'ai pu obtenir mes fournitures scolaires et terminer mon année avec succès. Je rêve de devenir médecin pour aider ma communauté.",
    quoteEn:
      "Thanks to HCW, I was able to get my school supplies and finish the year successfully. I dream of becoming a doctor to help my community.",
    nameFr: "Adama K.",
    nameEn: "Adama K.",
    roleFr: "Lauréat·e HCW, Bangui",
    roleEn: "HCW laureate, Bangui",
  },
  {
    quoteFr:
      "Le programme eNdara Challenge a transformé la façon dont mes élèves pensent. Ils posent des questions, ils cherchent des solutions — c'est exactement ce dont la RCA a besoin.",
    quoteEn:
      "The eNdara Challenge programme has transformed the way my students think. They ask questions, they look for solutions — that's exactly what CAR needs.",
    nameFr: "Marie-Claire N.",
    nameEn: "Marie-Claire N.",
    roleFr: "Enseignante, École Publique de Sica 1, Bangui",
    roleEn: "Teacher, Public School of Sica 1, Bangui",
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
  const isFr = locale === "fr";

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
            {isFr ? "Transparence & impact" : "Transparency & impact"}
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
            <p className="mt-3 text-sm text-gray-400">{t("counters_note")}</p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5" role="list">
            <ImpactCounterAnimated
              value={stats.prizes}
              suffix="+"
              label={isFr ? "lauréat·e·s" : "laureates"}
              icon={<Trophy className="h-7 w-7" aria-hidden="true" />}
            />
            <ImpactCounterAnimated
              value={stats.students}
              suffix="+"
              label={isFr ? "élèves touchés" : "students reached"}
              icon={<Users className="h-7 w-7" aria-hidden="true" />}
            />
            <ImpactCounterAnimated
              value={stats.donations}
              suffix="€+"
              label={isFr ? "collectés" : "raised"}
              icon={<Heart className="h-7 w-7" aria-hidden="true" />}
            />
            <ImpactCounterAnimated
              value={stats.projects}
              label={isFr ? "projets actifs" : "active projects"}
              icon={<Layers className="h-7 w-7" aria-hidden="true" />}
            />
            <ImpactCounterAnimated
              value={5}
              label={isFr ? "pays d'impact" : "countries of impact"}
              icon={<Globe className="h-7 w-7" aria-hidden="true" />}
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
            <table
              className="w-full text-sm"
              aria-label={isFr ? "Impact par projet" : "Impact by project"}
            >
              <thead className="bg-teal-600 text-white">
                <tr>
                  <th scope="col" className="px-6 py-4 text-left font-semibold">
                    {isFr ? "Projet" : "Project"}
                  </th>
                  <th scope="col" className="px-6 py-4 text-left font-semibold">
                    {isFr ? "Bénéficiaires estimés" : "Estimated beneficiaries"}
                  </th>
                  <th
                    scope="col"
                    className="hidden px-6 py-4 text-left font-semibold sm:table-cell"
                  >
                    {isFr ? "Statut" : "Status"}
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
                          {isFr ? p.titleFr : p.titleEn}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-600">
                      {isFr ? p.beneficiariesFr : p.beneficiariesEn}
                    </td>
                    <td className="hidden px-6 py-4 sm:table-cell">
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-teal-50 px-3 py-1 text-xs font-medium text-teal-700">
                        <span
                          className="h-1.5 w-1.5 rounded-full bg-teal-500"
                          aria-hidden="true"
                        />
                        {isFr ? "Actif" : "Active"}
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
                    {isFr ? sdg.labelFr : sdg.labelEn}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section
        className="bg-white py-20"
        aria-labelledby="testimonials-heading"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 text-center">
            <h2
              id="testimonials-heading"
              className="font-serif text-3xl font-bold text-charcoal-900 sm:text-4xl"
            >
              {t("testimonials_title")}
            </h2>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            {TESTIMONIALS.map((testimonial, i) => (
              <figure
                key={i}
                className="rounded-2xl bg-cream-50 p-8 ring-1 ring-teal-100"
              >
                <Quote
                  className="mb-4 h-8 w-8 text-teal-200"
                  aria-hidden="true"
                />
                <blockquote className="text-gray-700 leading-relaxed italic">
                  &ldquo;{isFr ? testimonial.quoteFr : testimonial.quoteEn}
                  &rdquo;
                </blockquote>
                <figcaption className="mt-6 flex items-center gap-3">
                  <div
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-teal-600 text-sm font-bold text-white"
                    aria-hidden="true"
                  >
                    {(isFr ? testimonial.nameFr : testimonial.nameEn)
                      .charAt(0)
                      .toUpperCase()}
                  </div>
                  <div>
                    <div className="font-semibold text-charcoal-900 text-sm">
                      {isFr ? testimonial.nameFr : testimonial.nameEn}
                    </div>
                    <div className="text-xs text-gray-500">
                      {isFr ? testimonial.roleFr : testimonial.roleEn}
                    </div>
                  </div>
                </figcaption>
              </figure>
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

          <div className="grid gap-6 sm:grid-cols-3">
            {(
              [
                {
                  pct: "80%",
                  labelFr: "Programmes",
                  labelEn: "Programmes",
                  descFr: "Financement direct des activités terrain",
                  descEn: "Direct funding of field activities",
                  color: "bg-teal-600",
                  bar: "w-4/5",
                },
                {
                  pct: "15%",
                  labelFr: "Administration",
                  labelEn: "Administration",
                  descFr: "Gestion associative et ressources humaines",
                  descEn: "Association management and human resources",
                  color: "bg-amber-500",
                  bar: "w-3/20",
                },
                {
                  pct: "5%",
                  labelFr: "Communication",
                  labelEn: "Communication",
                  descFr: "Sensibilisation et collecte de fonds",
                  descEn: "Awareness raising and fundraising",
                  color: "bg-teal-300",
                  bar: "w-1/20",
                },
              ] as const
            ).map((item) => (
              <div
                key={item.pct}
                className="rounded-xl bg-white/5 p-6 ring-1 ring-white/10"
              >
                <div className="mb-3 flex items-baseline gap-2">
                  <span className="font-serif text-4xl font-bold text-white">
                    {item.pct}
                  </span>
                  <span className="font-semibold text-white/70">
                    {isFr ? item.labelFr : item.labelEn}
                  </span>
                </div>
                {/* Bar */}
                <div className="mb-4 h-2 overflow-hidden rounded-full bg-white/10">
                  <div
                    className={`h-full ${item.color} ${item.bar} rounded-full`}
                    role="presentation"
                  />
                </div>
                <p className="text-sm text-white/50">
                  {isFr ? item.descFr : item.descEn}
                </p>
              </div>
            ))}
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

          <div className="grid gap-6 sm:grid-cols-3">
            {ANNUAL_REPORTS.map((report) => (
              <div
                key={report.year}
                className="flex flex-col items-center rounded-2xl bg-white p-8 text-center shadow-sm ring-1 ring-gray-100 transition-all hover:shadow-md hover:ring-teal-200"
              >
                <div
                  className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-teal-50 text-teal-600"
                  aria-hidden="true"
                >
                  <Download className="h-8 w-8" />
                </div>
                <h3 className="font-serif text-lg font-semibold text-charcoal-900">
                  {isFr ? report.pagesFr : report.pagesEn}
                </h3>
                <p className="mt-1 text-sm text-gray-400">{report.year}</p>
                <Link
                  href={`mailto:contact@h-cw.org?subject=${encodeURIComponent(
                    isFr
                      ? `Demande rapport ${report.year}`
                      : `Report request ${report.year}`,
                  )}`}
                  className="mt-5 inline-flex items-center gap-2 rounded-full border border-teal-200 px-5 py-2 text-sm font-medium text-teal-700 transition-colors hover:bg-teal-50"
                >
                  <Download className="h-3.5 w-3.5" aria-hidden="true" />
                  {isFr ? "Demander le rapport" : "Request report"}
                </Link>
              </div>
            ))}
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
            {isFr ? "Contribuez à notre impact" : "Contribute to our impact"}
          </h2>
          <p className="mt-4 text-white/85">
            {isFr
              ? "Chaque euro compte. Votre don finance directement l'éducation des enfants en RCA."
              : "Every euro counts. Your donation directly funds children's education in CAR."}
          </p>
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
