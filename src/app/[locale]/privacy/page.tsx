import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { SITE_NAME, CONTACT } from "@/lib/constants";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "privacy" });
  return {
    title: t("page_title"),
    description: t("meta_description"),
    robots: { index: false },
    alternates: {
      canonical: `/${locale}/privacy`,
      languages: {
        fr: "/fr/privacy",
        en: "/en/privacy",
      },
    },
    openGraph: {
      title: `${t("page_title")} | ${SITE_NAME}`,
      type: "website",
    },
  };
}

function Section({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-heading`}
      className="py-6 first:pt-0 border-b border-gray-100 last:border-0"
    >
      <h2
        id={`${id}-heading`}
        className="font-serif text-xl font-semibold text-charcoal-900 mb-3"
      >
        {title}
      </h2>
      <div className="space-y-3 text-sm leading-relaxed text-gray-600">
        {children}
      </div>
    </section>
  );
}

function Dl({ items }: { items: { term: string; detail: React.ReactNode }[] }) {
  return (
    <dl className="grid gap-2 sm:grid-cols-[160px_1fr]">
      {items.map(({ term, detail }) => (
        <>
          <dt key={`dt-${term}`} className="font-medium text-charcoal-900">
            {term}
          </dt>
          <dd key={`dd-${term}`} className="text-gray-600">
            {detail}
          </dd>
        </>
      ))}
    </dl>
  );
}

const SECTION_NUMBERS = [1, 2, 3, 4, 5, 6, 7, 8] as const;
const DATA_ROWS = ["newsletter", "contact", "stats", "donations"] as const;
const DATA_COLS = ["purpose", "data", "basis"] as const;
const RETENTION_ITEMS = ["contact", "newsletter", "stats", "payment"] as const;
const RIGHTS_ITEMS = [
  "access",
  "rectification",
  "erasure",
  "portability",
  "objection",
  "restriction",
] as const;

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "privacy" });

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

      {/* ── Table of contents ── */}
      <div className="bg-teal-50 border-b border-teal-100">
        <div className="mx-auto max-w-3xl px-4 py-5 sm:px-6 lg:px-8">
          <nav aria-label={t("toc_aria_label")}>
            <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-teal-700">
              {t("toc_heading")}
            </p>
            <ol className="grid grid-cols-1 gap-1 sm:grid-cols-2 text-xs text-teal-800">
              {SECTION_NUMBERS.map((num) => (
                <li key={num}>
                  <a
                    href={`#section-${num}`}
                    className="hover:text-teal-600 transition-colors"
                  >
                    {num}.{" "}
                    {t(`section_${num}_title` as Parameters<typeof t>[0])}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        </div>
      </div>

      {/* ── Content ── */}
      <article aria-label={t("article_aria_label")} className="bg-cream-50 py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl bg-white p-8 shadow-sm ring-1 ring-gray-100">
            {/* 1. Data controller */}
            <Section id="section-1" title={`1. ${t("section_1_title")}`}>
              <Dl
                items={[
                  {
                    term: t("controller_org_label"),
                    detail: t("controller_org"),
                  },
                  { term: t("controller_address_label"), detail: CONTACT.france },
                  {
                    term: t("controller_email_label"),
                    detail: (
                      <a
                        href={`mailto:${CONTACT.email}`}
                        className="text-teal-600 hover:underline"
                      >
                        {CONTACT.email}
                      </a>
                    ),
                  },
                  {
                    term: t("controller_phone_label"),
                    detail: CONTACT.phoneDisplay,
                  },
                ]}
              />
            </Section>

            {/* 2. Data collected */}
            <Section id="section-2" title={`2. ${t("section_2_title")}`}>
              <p>{t("data_intro")}</p>
              <div className="overflow-x-auto">
                <table className="min-w-full text-xs border-collapse border border-gray-200 rounded-lg overflow-hidden">
                  <thead className="bg-teal-50">
                    <tr>
                      {DATA_COLS.map((col) => (
                        <th
                          key={col}
                          className="border border-gray-200 px-3 py-2 text-left font-semibold text-charcoal-900"
                        >
                          {t(`data_th_${col}` as Parameters<typeof t>[0])}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {DATA_ROWS.map((row, i) => (
                      <tr key={row} className={i % 2 === 1 ? "bg-gray-50" : undefined}>
                        {DATA_COLS.map((col) => (
                          <td
                            key={col}
                            className="border border-gray-200 px-3 py-2"
                          >
                            {t(
                              `data_row_${row}_${col}` as Parameters<typeof t>[0],
                            )}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Section>

            {/* 3. Purposes */}
            <Section id="section-3" title={`3. ${t("section_3_title")}`}>
              <p>{t("purposes_body")}</p>
            </Section>

            {/* 4. Retention */}
            <Section id="section-4" title={`4. ${t("section_4_title")}`}>
              <ul className="list-disc list-inside space-y-1">
                {RETENTION_ITEMS.map((item) => (
                  <li key={item}>
                    <strong>
                      {t(`retention_${item}_label` as Parameters<typeof t>[0])}
                    </strong>{" "}
                    {t(`retention_${item}_text` as Parameters<typeof t>[0])}
                  </li>
                ))}
              </ul>
            </Section>

            {/* 5. Rights */}
            <Section id="section-5" title={`5. ${t("section_5_title")}`}>
              <p>{t("rights_intro")}</p>
              <ul className="list-disc list-inside space-y-1">
                {RIGHTS_ITEMS.map((item) => (
                  <li key={item}>
                    <strong>
                      {t(`rights_${item}_label` as Parameters<typeof t>[0])}
                    </strong>{" "}
                    {t(`rights_${item}_text` as Parameters<typeof t>[0])}
                  </li>
                ))}
              </ul>
              <p>
                {t.rich("rights_contact", {
                  email: CONTACT.email,
                  emailLink: (chunks) => (
                    <a
                      href={`mailto:${CONTACT.email}`}
                      className="text-teal-600 hover:underline"
                    >
                      {chunks}
                    </a>
                  ),
                  cnil: (chunks) => (
                    <a
                      href="https://www.cnil.fr"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-teal-600 hover:underline"
                    >
                      {chunks}
                    </a>
                  ),
                })}
              </p>
            </Section>

            {/* 6. Cookies */}
            <Section id="section-6" title={`6. ${t("section_6_title")}`}>
              <p>{t("cookies_p1")}</p>
              <p>{t("cookies_p2")}</p>
            </Section>

            {/* 7. Hosting */}
            <Section id="section-7" title={`7. ${t("section_7_title")}`}>
              <p>{t("hosting_p1")}</p>
              <p>{t("hosting_p2")}</p>
            </Section>

            {/* 8. Policy changes */}
            <Section id="section-8" title={`8. ${t("section_8_title")}`}>
              <p>{t("changes_body")}</p>
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
