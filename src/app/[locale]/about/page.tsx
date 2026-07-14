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
  {
    year: 2009,
    fr: "Fondation de l'association HCW en mémoire d'Hervé-Charles Wenezoui",
    en: "HCW association founded in memory of Hervé-Charles Wenezoui",
  },
  {
    year: 2013,
    fr: "Lancement des premiers programmes éducatifs en République Centrafricaine",
    en: "Launch of first educational programmes in the Central African Republic",
  },
  {
    year: 2015,
    fr: "Premier programme d'alphabétisation — 2 000 élèves bénéficiaires",
    en: "First literacy programme — 2,000 students reached",
  },
  {
    year: 2018,
    fr: "Création du concours eNdara Challenge pour l'innovation jeunesse",
    en: "Creation of the eNdara Challenge competition for youth innovation",
  },
  {
    year: 2020,
    fr: "Réponse COVID-19 : kits scolaires distribués malgré la crise",
    en: "COVID-19 response: school kits distributed despite the crisis",
  },
  {
    year: 2025,
    fr: "9 000 élèves touchés depuis la fondation",
    en: "9,000 students reached since foundation",
  },
];

const VALUES = [
  {
    icon: BookOpen,
    keyFr: "Éducation",
    keyEn: "Education",
    descFr:
      "Garantir un accès équitable au savoir pour chaque enfant, quelles que soient ses origines.",
    descEn:
      "Ensuring equitable access to knowledge for every child, regardless of their background.",
    color: "text-teal-600",
    bg: "bg-teal-50",
  },
  {
    icon: Heart,
    keyFr: "Solidarité",
    keyEn: "Solidarity",
    descFr:
      "Agir ensemble, avec empathie, pour les communautés vulnérables d'Afrique centrale.",
    descEn:
      "Acting together, with empathy, for vulnerable communities in Central Africa.",
    color: "text-amber-500",
    bg: "bg-amber-50",
  },
  {
    icon: Globe,
    keyFr: "Culture",
    keyEn: "Culture",
    descFr:
      "Valoriser les identités culturelles centrafricaines comme levier de développement.",
    descEn:
      "Valuing Central African cultural identities as a driver of development.",
    color: "text-teal-600",
    bg: "bg-teal-50",
  },
  {
    icon: Lightbulb,
    keyFr: "Innovation",
    keyEn: "Innovation",
    descFr:
      "Concevoir des solutions créatives et adaptées aux réalités du terrain.",
    descEn: "Designing creative solutions adapted to on-the-ground realities.",
    color: "text-amber-500",
    bg: "bg-amber-50",
  },
];

const TEAM = [
  {
    name: "Dr. Ulrich Guene",
    roleFr: "Président",
    roleEn: "President",
    initials: "UG",
  },
  {
    name: "Marie-Claire Wenezoui",
    roleFr: "Directrice de programme",
    roleEn: "Programme Director",
    initials: "MW",
  },
  {
    name: "Jean-Baptiste Koyara",
    roleFr: "Coordinateur RCA",
    roleEn: "CAR Coordinator",
    initials: "JK",
  },
  {
    name: "Aminata Ndongo",
    roleFr: "Chargée de partenariats",
    roleEn: "Partnerships Officer",
    initials: "AN",
  },
];

const PARTNERS = [
  {
    name: "WEIRAM",
    descFr: "Réseau international pour l'autonomisation des femmes",
    descEn: "International network for women's empowerment",
  },
  {
    name: "KAIKELEM",
    descFr: "Programme solidarité — veuves et orphelins RCA",
    descEn: "Solidarity programme — widows and orphans CAR",
  },
  {
    name: "eNdara",
    descFr: "Plateforme d'apprentissage numérique",
    descEn: "Digital learning platform",
  },
];

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "about" });
  const isFr = locale === "fr";

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
            {isFr
              ? "Fondée en 2009 · Association loi 1901"
              : "Founded 2009 · Non-profit association"}
          </p>
          <h1
            id="about-hero-heading"
            className="font-serif text-5xl font-bold leading-tight tracking-tight md:text-6xl"
          >
            {isFr ? "Notre histoire" : "Our story"}
          </h1>
          <p className="mt-6 text-lg text-teal-100 max-w-2xl mx-auto leading-relaxed">
            {isFr
              ? "Depuis 2009, HCW œuvre au cœur de l'Afrique centrale pour offrir à chaque enfant la chance d'apprendre, de grandir et de s'épanouir."
              : "Since 2009, HCW has worked at the heart of Central Africa to give every child the chance to learn, grow, and flourish."}
          </p>
          <p className="mt-4 text-base font-semibold tracking-widest text-amber-400 uppercase">
            Humanity · Culture · Welfare
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
                  {isFr ? "Association loi 1901" : "Non-profit (loi 1901)"}
                </span>
                <span className="rounded-full bg-amber-100 px-4 py-1.5 text-sm font-medium text-amber-700">
                  {isFr ? "Fondée en 2009" : "Founded 2009"}
                </span>
                <span className="rounded-full bg-teal-100 px-4 py-1.5 text-sm font-medium text-teal-700">
                  {isFr
                    ? "République Centrafricaine"
                    : "Central African Republic"}
                </span>
              </div>
            </div>

            <div>
              <div className="mb-4 h-1 w-12 rounded bg-amber-500" />
              <h2 className="font-serif text-4xl font-bold text-charcoal-900">
                {isFr ? "Notre vision" : "Our vision"}
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-gray-600">
                {isFr
                  ? "Un monde où chaque enfant centrafricain a accès à une éducation de qualité, où la culture est vecteur de paix, et où la solidarité construit des ponts entre les peuples."
                  : "A world where every Central African child has access to quality education, where culture is a vehicle for peace, and where solidarity builds bridges between peoples."}
              </p>
              <div className="mt-8 grid grid-cols-3 gap-4">
                <div className="text-center">
                  <p className="font-serif text-3xl font-bold text-teal-600">
                    90K+
                  </p>
                  <p className="mt-1 text-xs text-gray-500">
                    {isFr ? "élèves touchés" : "students reached"}
                  </p>
                </div>
                <div className="text-center">
                  <p className="font-serif text-3xl font-bold text-teal-600">
                    6
                  </p>
                  <p className="mt-1 text-xs text-gray-500">
                    {isFr ? "programmes actifs" : "active programmes"}
                  </p>
                </div>
                <div className="text-center">
                  <p className="font-serif text-3xl font-bold text-teal-600">
                    16
                  </p>
                  <p className="mt-1 text-xs text-gray-500">
                    {isFr ? "années d'action" : "years of action"}
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
              {isFr ? "Notre parcours" : "Our journey"}
            </h2>
          </div>

          <ol
            className="relative border-l-2 border-teal-200 pl-8 space-y-10"
            aria-label={isFr ? "Chronologie HCW" : "HCW timeline"}
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
                        {isFr ? item.fr : item.en}
                      </p>
                    </div>
                  ) : (
                    <p className="text-base text-charcoal-900">
                      {isFr ? item.fr : item.en}
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
              {isFr ? "Notre équipe" : "Our team"}
            </h2>
            <p className="mt-4 text-gray-500 max-w-xl mx-auto">
              {isFr
                ? "Des personnes engagées, portées par la conviction que l'éducation change le monde."
                : "Dedicated people driven by the conviction that education changes the world."}
            </p>
          </div>

          {/* Team community photo */}
          <div className="mb-12 overflow-hidden rounded-2xl shadow-md">
            <figure>
              <Image
                src="/images/team-community.jpg"
                alt={
                  isFr
                    ? "L'équipe HCW et partenaires communautaires à Bangui"
                    : "HCW team and community partners in Bangui"
                }
                width={1200}
                height={600}
                className="w-full object-cover"
                priority
              />
              <figcaption className="bg-charcoal-900 px-6 py-3 text-center text-sm text-gray-300">
                {isFr
                  ? "Notre équipe à Bangui, République Centrafricaine"
                  : "Our team in Bangui, Central African Republic"}
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
                    {isFr ? member.roleFr : member.roleEn}
                  </span>
                </span>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <p className="text-sm text-gray-400 flex items-center justify-center gap-2">
              <Users className="h-4 w-4" aria-hidden="true" />
              {isFr
                ? "Et de nombreux bénévoles engagés en France et en RCA"
                : "And many committed volunteers in France and CAR"}
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
              {isFr ? "Nos partenaires" : "Our partners"}
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
                  {isFr ? partner.descFr : partner.descEn}
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
              {isFr ? "Nos valeurs" : "Our values"}
            </h2>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {VALUES.map(
              ({ icon: Icon, keyFr, keyEn, descFr, descEn, color, bg }) => (
                <div
                  key={keyFr}
                  className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-100 hover:shadow-md transition-shadow"
                >
                  <div
                    className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl ${bg}`}
                  >
                    <Icon className={`h-6 w-6 ${color}`} aria-hidden="true" />
                  </div>
                  <h3 className="font-serif text-lg font-semibold text-charcoal-900 mb-2">
                    {isFr ? keyFr : keyEn}
                  </h3>
                  <p className="text-sm text-gray-500 leading-relaxed">
                    {isFr ? descFr : descEn}
                  </p>
                </div>
              ),
            )}
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
            {isFr ? "Rejoindre notre mission" : "Join our mission"}
          </h2>
          <p className="mt-6 text-lg text-teal-100">
            {isFr
              ? "Bénévole, partenaire ou donateur — chaque engagement compte."
              : "Volunteer, partner or donor — every commitment counts."}
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href={`/${locale}/donate`}
              className="flex items-center gap-2 rounded-full bg-amber-500 px-8 py-3 text-sm font-semibold text-white shadow-lg transition-all hover:bg-amber-600 hover:shadow-xl active:scale-95"
            >
              <Heart className="h-4 w-4" aria-hidden="true" />
              {isFr ? "Faire un don" : "Donate"}
            </Link>
            <Link
              href={`/${locale}/contact`}
              className="flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-8 py-3 text-sm font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/20"
            >
              {isFr ? "Nous contacter" : "Contact us"}
              <ChevronRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
