import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import Link from "next/link";
import {
  Handshake,
  Globe,
  BarChart3,
  Palette,
  Building2,
  Mail,
} from "lucide-react";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "partners" });
  return {
    title: t("page_title"),
    description: t("page_description"),
    openGraph: {
      title: t("page_title"),
      description: t("page_description"),
    },
  };
}

interface Partner {
  id: string;
  initials: string;
  name: string;
  descKey: string;
  website: string;
  color: string;
}

const PARTNERS: Partner[] = [
  {
    id: "meyng",
    initials: "MY",
    name: "MEYNG",
    descKey: "partner_meyng_desc",
    website: "https://meyng.com",
    color: "bg-teal-600",
  },
  {
    id: "weiram",
    initials: "WR",
    name: "WEIRAM",
    descKey: "partner_weiram_desc",
    website: "#",
    color: "bg-amber-500",
  },
  {
    id: "kaikelem",
    initials: "KK",
    name: "KAIKELEM",
    descKey: "partner_kaikelem_desc",
    website: "#",
    color: "bg-charcoal-800",
  },
];

interface PartnershipType {
  id: string;
  icon: React.ElementType;
  titleKey: string;
  descKey: string;
}

const PARTNERSHIP_TYPES: PartnershipType[] = [
  {
    id: "financial",
    icon: BarChart3,
    titleKey: "type_financial_title",
    descKey: "type_financial_desc",
  },
  {
    id: "inkind",
    icon: Palette,
    titleKey: "type_inkind_title",
    descKey: "type_inkind_desc",
  },
  {
    id: "technical",
    icon: Globe,
    titleKey: "type_technical_title",
    descKey: "type_technical_desc",
  },
  {
    id: "institutional",
    icon: Building2,
    titleKey: "type_institutional_title",
    descKey: "type_institutional_desc",
  },
];

const WHAT_WE_OFFER_KEYS = [
  "offer_visibility",
  "offer_reports",
  "offer_cobranding",
  "offer_events",
  "offer_certificate",
];

const INSTITUTIONAL_SUPPORTERS = [
  { name: "UN ECOSOC", descKey: "inst_ecosoc_desc" },
  { name: "OIF", descKey: "inst_oif_desc" },
  { name: "Union Africaine", descKey: "inst_au_desc" },
];

export default async function PartnersPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "partners" });
  const common = await getTranslations({ locale, namespace: "common" });

  return (
    <>
      {/* Hero */}
      <section
        className="relative overflow-hidden bg-charcoal-900 py-28"
        aria-labelledby="partners-heading"
      >
        {/* Decorative circles */}
        <div
          className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-teal-600/10"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-amber-500/10"
          aria-hidden="true"
        />

        <div className="relative mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-sm font-medium text-white/80 backdrop-blur-sm">
            <Handshake className="h-4 w-4" aria-hidden="true" />
            {t("hero_badge")}
          </div>
          <h1
            id="partners-heading"
            className="font-serif text-5xl font-bold text-white sm:text-6xl"
          >
            {t("hero_headline")}
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-xl text-white/70">
            {t("hero_subtitle")}
          </p>
        </div>
      </section>

      {/* Current partners */}
      <section
        className="bg-cream-50 py-20"
        aria-labelledby="current-partners-heading"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2
              id="current-partners-heading"
              className="font-serif text-3xl font-bold text-charcoal-900 sm:text-4xl"
            >
              {t("current_title")}
            </h2>
            <p className="mt-3 text-gray-500">{t("current_subtitle")}</p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {PARTNERS.map((partner) => (
              <article
                key={partner.id}
                className="flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-gray-100 transition-all hover:shadow-lg hover:ring-teal-200"
              >
                <div className="p-8">
                  {/* Logo placeholder */}
                  <div
                    className={`mb-6 flex h-16 w-16 items-center justify-center rounded-full ${partner.color} text-xl font-bold text-white shadow-md`}
                    aria-hidden="true"
                  >
                    {partner.initials}
                  </div>

                  <h3 className="font-serif text-2xl font-bold text-charcoal-900">
                    {partner.name}
                  </h3>

                  <p className="mt-3 text-sm leading-relaxed text-gray-600">
                    {t(partner.descKey)}
                  </p>
                </div>

                <div className="mt-auto border-t border-gray-50 px-8 py-4">
                  {partner.website !== "#" ? (
                    <Link
                      href={partner.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-sm font-medium text-teal-600 transition-colors hover:text-teal-800"
                    >
                      <Globe className="h-3.5 w-3.5" aria-hidden="true" />
                      {t("visit_website")}
                    </Link>
                  ) : (
                    <span className="text-xs text-gray-400">
                      {t("website_soon")}
                    </span>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Become a partner */}
      <section
        className="bg-white py-20"
        aria-labelledby="become-partner-heading"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
            {/* Left column — what we offer */}
            <div>
              <h2
                id="become-partner-heading"
                className="font-serif text-3xl font-bold text-charcoal-900 sm:text-4xl"
              >
                {t("become_title")}
              </h2>
              <p className="mt-4 text-gray-500">{t("become_subtitle")}</p>

              <h3 className="mt-8 font-serif text-xl font-semibold text-charcoal-900">
                {t("offers_title")}
              </h3>
              <ul className="mt-4 space-y-3" role="list">
                {WHAT_WE_OFFER_KEYS.map((key) => (
                  <li key={key} className="flex items-start gap-3">
                    <span
                      className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-teal-100 text-teal-700"
                      aria-hidden="true"
                    >
                      ✓
                    </span>
                    <span className="text-sm text-gray-700">{t(key)}</span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="mailto:contact@h-cw.org?subject=Partenariat HCW"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-teal-600 px-6 py-3 text-sm font-semibold text-white shadow-md transition-colors hover:bg-teal-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600"
                >
                  <Mail className="h-4 w-4" aria-hidden="true" />
                  {t("become_cta")}
                </Link>
                <span className="self-center text-sm text-gray-400">
                  contact@h-cw.org
                </span>
              </div>
            </div>

            {/* Right column — partnership types */}
            <div>
              <h3 className="font-serif text-xl font-semibold text-charcoal-900">
                {t("types_title")}
              </h3>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                {PARTNERSHIP_TYPES.map((type) => {
                  const Icon = type.icon;
                  return (
                    <div
                      key={type.id}
                      className="rounded-xl bg-cream-50 p-5 ring-1 ring-teal-100"
                    >
                      <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-teal-600 text-white">
                        <Icon className="h-5 w-5" aria-hidden="true" />
                      </div>
                      <h4 className="font-semibold text-charcoal-900 text-sm">
                        {t(type.titleKey)}
                      </h4>
                      <p className="mt-1 text-xs text-gray-500">
                        {t(type.descKey)}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Institutional supporters */}
      <section
        className="bg-charcoal-900 py-16"
        aria-labelledby="institutional-heading"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2
            id="institutional-heading"
            className="mb-10 text-center font-serif text-2xl font-bold text-white sm:text-3xl"
          >
            {t("institutional_title")}
          </h2>
          <div className="grid gap-6 sm:grid-cols-3">
            {INSTITUTIONAL_SUPPORTERS.map((s) => (
              <div
                key={s.name}
                className="rounded-xl bg-white/5 p-6 text-center ring-1 ring-white/10 backdrop-blur-sm"
              >
                <div className="mb-2 font-serif text-xl font-bold text-white">
                  {s.name}
                </div>
                <p className="text-sm text-white/60">{t(s.descKey)}</p>
              </div>
            ))}
          </div>

          <p className="mt-8 text-center text-sm text-white/40">
            {t("institutional_note")}
          </p>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-teal-600 py-16">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <Handshake
            className="mx-auto mb-4 h-10 w-10 text-white/80"
            aria-hidden="true"
          />
          <h2 className="font-serif text-3xl font-bold text-white">
            {t("cta_title")}
          </h2>
          <p className="mt-4 text-teal-100">{t("cta_subtitle")}</p>
          <Link
            href="mailto:contact@h-cw.org?subject=Partenariat HCW"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-8 py-3 text-sm font-semibold text-teal-700 shadow-md transition-colors hover:bg-teal-50"
          >
            <Mail className="h-4 w-4" aria-hidden="true" />
            {common("learn_more")}
          </Link>
        </div>
      </section>
    </>
  );
}
