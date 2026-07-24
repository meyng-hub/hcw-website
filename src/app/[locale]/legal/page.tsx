import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { SITE_NAME, CONTACT } from "@/lib/constants";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "legal" });
  return {
    title: t("page_title"),
    description: t("meta_description"),
    robots: { index: false },
    alternates: {
      canonical: `/${locale}/legal`,
      languages: {
        fr: "/fr/legal",
        en: "/en/legal",
      },
    },
    openGraph: {
      title: `${t("page_title")} | ${SITE_NAME}`,
      type: "website",
    },
  };
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="py-6 first:pt-0 border-b border-gray-100 last:border-0">
      <h2 className="font-serif text-xl font-semibold text-charcoal-900 mb-3">
        {title}
      </h2>
      <div className="prose prose-gray max-w-none text-sm leading-relaxed text-gray-600 space-y-2">
        {children}
      </div>
    </section>
  );
}

export default async function LegalPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "legal" });

  return (
    <>
      {/* ── Hero ── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-teal-700 to-charcoal-900 pt-32 pb-16 text-white">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h1 className="font-serif text-4xl font-bold tracking-tight">
            {t("hero_title")}
          </h1>
          <p className="mt-4 text-teal-100 text-sm">{t("hero_subtitle")}</p>
        </div>
      </section>

      {/* ── Content ── */}
      <article aria-label={t("article_aria")} className="bg-cream-50 py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl bg-white p-8 shadow-sm ring-1 ring-gray-100 space-y-0">
            {/* Publisher */}
            <Section title={t("publisher_title")}>
              <p>
                <strong>{t("org_name_label")}</strong> {t("org_name_value")}
              </p>
              <p>
                <strong>{t("legal_form_label")}</strong>{" "}
                {t("legal_form_value")}
              </p>
              <p>
                <strong>{t("office_label")}</strong> {CONTACT.france}
              </p>
              <p>
                <strong>{t("president_label")}</strong> {t("president_value")}
              </p>
              <p>
                <strong>{t("email_label")}</strong>{" "}
                <a
                  href={`mailto:${CONTACT.email}`}
                  className="text-teal-600 hover:underline"
                >
                  {CONTACT.email}
                </a>
              </p>
              <p>
                <strong>{t("phone_label")}</strong> {CONTACT.phoneDisplay}
              </p>
              <p>
                <strong>{t("rna_label")}</strong> {t("rna_value")}
              </p>
            </Section>

            {/* Director of publication */}
            <Section title={t("director_title")}>
              <p>{t("director_text")}</p>
            </Section>

            {/* Host */}
            <Section title={t("host_title")}>
              <p>{t("host_intro")}</p>
              <p>
                <strong>{t("host_name")}</strong>
                {t("host_details")
                  .split("\n")
                  .map((line) => (
                    <span key={line}>
                      <br />
                      {line}
                    </span>
                  ))}
                <br />
                <a
                  href="https://vercel.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-teal-600 hover:underline"
                >
                  https://vercel.com
                </a>
              </p>
            </Section>

            {/* Intellectual property */}
            <Section title={t("ip_title")}>
              <p>{t("ip_text_1")}</p>
              <p>{t("ip_text_2")}</p>
            </Section>

            {/* Liability */}
            <Section title={t("liability_title")}>
              <p>{t("liability_text_1")}</p>
              <p>{t("liability_text_2")}</p>
            </Section>

            {/* External links */}
            <Section title={t("links_title")}>
              <p>{t("links_text")}</p>
            </Section>

            {/* Governing law */}
            <Section title={t("law_title")}>
              <p>{t("law_text")}</p>
            </Section>

            {/* Last updated */}
            <div className="pt-6 text-right text-xs text-gray-500">
              {t("last_updated")}
            </div>
          </div>
        </div>
      </article>
    </>
  );
}
