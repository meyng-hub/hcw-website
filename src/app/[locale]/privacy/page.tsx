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

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const isFr = locale === "fr";

  return (
    <>
      {/* ── Hero ── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-teal-700 to-charcoal-900 pt-32 pb-16 text-white">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h1 className="font-serif text-4xl font-bold tracking-tight">
            {isFr ? "Politique de confidentialité" : "Privacy Policy"}
          </h1>
          <p className="mt-4 text-teal-100 text-sm">
            {isFr
              ? "Conformément au Règlement Général sur la Protection des Données (RGPD) — UE 2016/679"
              : "In compliance with the General Data Protection Regulation (GDPR) — EU 2016/679"}
          </p>
        </div>
      </section>

      {/* ── Table of contents ── */}
      <div className="bg-teal-50 border-b border-teal-100">
        <div className="mx-auto max-w-3xl px-4 py-5 sm:px-6 lg:px-8">
          <nav aria-label={isFr ? "Sommaire" : "Table of contents"}>
            <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-teal-700">
              {isFr ? "Sommaire" : "Contents"}
            </p>
            <ol className="grid grid-cols-1 gap-1 sm:grid-cols-2 text-xs text-teal-800">
              {(isFr
                ? [
                    [1, "Responsable du traitement"],
                    [2, "Données collectées"],
                    [3, "Finalités et bases légales"],
                    [4, "Durée de conservation"],
                    [5, "Vos droits"],
                    [6, "Cookies et traceurs"],
                    [7, "Hébergement et transferts"],
                    [8, "Modification de la politique"],
                  ]
                : [
                    [1, "Data controller"],
                    [2, "Data collected"],
                    [3, "Purposes and legal bases"],
                    [4, "Retention periods"],
                    [5, "Your rights"],
                    [6, "Cookies and trackers"],
                    [7, "Hosting and transfers"],
                    [8, "Policy changes"],
                  ]
              ).map(([num, label]) => (
                <li key={num}>
                  <a
                    href={`#section-${num}`}
                    className="hover:text-teal-600 transition-colors"
                  >
                    {num}. {label}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        </div>
      </div>

      {/* ── Content ── */}
      <article
        aria-label={isFr ? "Politique de confidentialité" : "Privacy policy"}
        className="bg-cream-50 py-16"
      >
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl bg-white p-8 shadow-sm ring-1 ring-gray-100">
            {/* 1. Data controller */}
            <Section
              id="section-1"
              title={
                isFr ? "1. Responsable du traitement" : "1. Data controller"
              }
            >
              {isFr ? (
                <Dl
                  items={[
                    {
                      term: "Organisation",
                      detail: "HCW — Hervé-Charles Wenezoui",
                    },
                    { term: "Adresse", detail: CONTACT.france },
                    {
                      term: "Email",
                      detail: (
                        <a
                          href={`mailto:${CONTACT.email}`}
                          className="text-teal-600 hover:underline"
                        >
                          {CONTACT.email}
                        </a>
                      ),
                    },
                    { term: "Téléphone", detail: CONTACT.phoneDisplay },
                  ]}
                />
              ) : (
                <Dl
                  items={[
                    {
                      term: "Organisation",
                      detail: "HCW — Hervé-Charles Wenezoui",
                    },
                    { term: "Address", detail: CONTACT.france },
                    {
                      term: "Email",
                      detail: (
                        <a
                          href={`mailto:${CONTACT.email}`}
                          className="text-teal-600 hover:underline"
                        >
                          {CONTACT.email}
                        </a>
                      ),
                    },
                    { term: "Phone", detail: CONTACT.phoneDisplay },
                  ]}
                />
              )}
            </Section>

            {/* 2. Data collected */}
            <Section
              id="section-2"
              title={isFr ? "2. Données collectées" : "2. Data collected"}
            >
              {isFr ? (
                <>
                  <p>
                    Nous collectons uniquement les données strictement
                    nécessaires à nos activités :
                  </p>
                  <div className="overflow-x-auto">
                    <table className="min-w-full text-xs border-collapse border border-gray-200 rounded-lg overflow-hidden">
                      <thead className="bg-teal-50">
                        <tr>
                          <th className="border border-gray-200 px-3 py-2 text-left font-semibold text-charcoal-900">
                            Finalité
                          </th>
                          <th className="border border-gray-200 px-3 py-2 text-left font-semibold text-charcoal-900">
                            Données
                          </th>
                          <th className="border border-gray-200 px-3 py-2 text-left font-semibold text-charcoal-900">
                            Base légale
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="border border-gray-200 px-3 py-2">
                            Newsletter
                          </td>
                          <td className="border border-gray-200 px-3 py-2">
                            Adresse email
                          </td>
                          <td className="border border-gray-200 px-3 py-2">
                            Consentement (art. 6.1.a RGPD)
                          </td>
                        </tr>
                        <tr className="bg-gray-50">
                          <td className="border border-gray-200 px-3 py-2">
                            Formulaire de contact
                          </td>
                          <td className="border border-gray-200 px-3 py-2">
                            Nom, email, message
                          </td>
                          <td className="border border-gray-200 px-3 py-2">
                            Intérêt légitime (art. 6.1.f RGPD)
                          </td>
                        </tr>
                        <tr>
                          <td className="border border-gray-200 px-3 py-2">
                            Statistiques de visite
                          </td>
                          <td className="border border-gray-200 px-3 py-2">
                            Pages visitées, durée (anonymisées)
                          </td>
                          <td className="border border-gray-200 px-3 py-2">
                            Intérêt légitime (art. 6.1.f RGPD)
                          </td>
                        </tr>
                        <tr className="bg-gray-50">
                          <td className="border border-gray-200 px-3 py-2">
                            Dons / Paiements
                          </td>
                          <td className="border border-gray-200 px-3 py-2">
                            Traité par HelloAsso / Stripe
                          </td>
                          <td className="border border-gray-200 px-3 py-2">
                            Exécution contractuelle (art. 6.1.b RGPD)
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </>
              ) : (
                <>
                  <p>
                    We only collect data strictly necessary for our activities:
                  </p>
                  <div className="overflow-x-auto">
                    <table className="min-w-full text-xs border-collapse border border-gray-200 rounded-lg overflow-hidden">
                      <thead className="bg-teal-50">
                        <tr>
                          <th className="border border-gray-200 px-3 py-2 text-left font-semibold text-charcoal-900">
                            Purpose
                          </th>
                          <th className="border border-gray-200 px-3 py-2 text-left font-semibold text-charcoal-900">
                            Data
                          </th>
                          <th className="border border-gray-200 px-3 py-2 text-left font-semibold text-charcoal-900">
                            Legal basis
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="border border-gray-200 px-3 py-2">
                            Newsletter
                          </td>
                          <td className="border border-gray-200 px-3 py-2">
                            Email address
                          </td>
                          <td className="border border-gray-200 px-3 py-2">
                            Consent (Art. 6.1.a GDPR)
                          </td>
                        </tr>
                        <tr className="bg-gray-50">
                          <td className="border border-gray-200 px-3 py-2">
                            Contact form
                          </td>
                          <td className="border border-gray-200 px-3 py-2">
                            Name, email, message
                          </td>
                          <td className="border border-gray-200 px-3 py-2">
                            Legitimate interest (Art. 6.1.f GDPR)
                          </td>
                        </tr>
                        <tr>
                          <td className="border border-gray-200 px-3 py-2">
                            Visit statistics
                          </td>
                          <td className="border border-gray-200 px-3 py-2">
                            Pages visited, duration (anonymised)
                          </td>
                          <td className="border border-gray-200 px-3 py-2">
                            Legitimate interest (Art. 6.1.f GDPR)
                          </td>
                        </tr>
                        <tr className="bg-gray-50">
                          <td className="border border-gray-200 px-3 py-2">
                            Donations / Payments
                          </td>
                          <td className="border border-gray-200 px-3 py-2">
                            Processed by HelloAsso / Stripe
                          </td>
                          <td className="border border-gray-200 px-3 py-2">
                            Contractual performance (Art. 6.1.b GDPR)
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </>
              )}
            </Section>

            {/* 3. Purposes */}
            <Section
              id="section-3"
              title={
                isFr
                  ? "3. Finalités et bases légales"
                  : "3. Purposes and legal bases"
              }
            >
              <p>
                {isFr
                  ? "Les données collectées sont utilisées exclusivement pour répondre à vos demandes, vous envoyer notre newsletter si vous y avez consenti, et améliorer l'expérience sur notre site. Aucune donnée n'est cédée à des tiers à des fins commerciales."
                  : "Collected data is used exclusively to respond to your requests, send you our newsletter if you have consented, and improve the experience on our website. No data is sold or transferred to third parties for commercial purposes."}
              </p>
            </Section>

            {/* 4. Retention */}
            <Section
              id="section-4"
              title={isFr ? "4. Durée de conservation" : "4. Retention periods"}
            >
              {isFr ? (
                <ul className="list-disc list-inside space-y-1">
                  <li>
                    <strong>Formulaire de contact :</strong> 3 ans à compter du
                    dernier contact
                  </li>
                  <li>
                    <strong>Newsletter :</strong> jusqu&apos;au désabonnement
                  </li>
                  <li>
                    <strong>Statistiques de visite :</strong> données agrégées,
                    aucune donnée personnelle conservée
                  </li>
                  <li>
                    <strong>Données de paiement :</strong> conservées par les
                    prestataires selon leurs obligations légales
                  </li>
                </ul>
              ) : (
                <ul className="list-disc list-inside space-y-1">
                  <li>
                    <strong>Contact form:</strong> 3 years from last contact
                  </li>
                  <li>
                    <strong>Newsletter:</strong> until unsubscribe
                  </li>
                  <li>
                    <strong>Visit statistics:</strong> aggregated data, no
                    personal data retained
                  </li>
                  <li>
                    <strong>Payment data:</strong> retained by payment providers
                    according to their legal obligations
                  </li>
                </ul>
              )}
            </Section>

            {/* 5. Rights */}
            <Section
              id="section-5"
              title={isFr ? "5. Vos droits" : "5. Your rights"}
            >
              <p>
                {isFr
                  ? "Conformément au RGPD, vous disposez des droits suivants concernant vos données personnelles :"
                  : "Under GDPR, you have the following rights regarding your personal data:"}
              </p>
              {isFr ? (
                <ul className="list-disc list-inside space-y-1">
                  <li>
                    <strong>Droit d&apos;accès</strong> — obtenir une copie de
                    vos données
                  </li>
                  <li>
                    <strong>Droit de rectification</strong> — corriger des
                    données inexactes
                  </li>
                  <li>
                    <strong>Droit à l&apos;effacement</strong> — demander la
                    suppression de vos données
                  </li>
                  <li>
                    <strong>Droit à la portabilité</strong> — recevoir vos
                    données dans un format structuré
                  </li>
                  <li>
                    <strong>Droit d&apos;opposition</strong> — vous opposer à
                    certains traitements
                  </li>
                  <li>
                    <strong>Droit à la limitation</strong> — limiter le
                    traitement dans certains cas
                  </li>
                </ul>
              ) : (
                <ul className="list-disc list-inside space-y-1">
                  <li>
                    <strong>Right of access</strong> — obtain a copy of your
                    data
                  </li>
                  <li>
                    <strong>Right of rectification</strong> — correct inaccurate
                    data
                  </li>
                  <li>
                    <strong>Right of erasure</strong> — request deletion of your
                    data
                  </li>
                  <li>
                    <strong>Right of portability</strong> — receive your data in
                    a structured format
                  </li>
                  <li>
                    <strong>Right to object</strong> — object to certain
                    processing activities
                  </li>
                  <li>
                    <strong>Right to restriction</strong> — restrict processing
                    in certain cases
                  </li>
                </ul>
              )}
              <p>
                {isFr ? (
                  <>
                    Pour exercer ces droits, contactez-nous à{" "}
                    <a
                      href={`mailto:${CONTACT.email}`}
                      className="text-teal-600 hover:underline"
                    >
                      {CONTACT.email}
                    </a>
                    . Vous pouvez également introduire une réclamation auprès de
                    la{" "}
                    <a
                      href="https://www.cnil.fr"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-teal-600 hover:underline"
                    >
                      CNIL
                    </a>
                    .
                  </>
                ) : (
                  <>
                    To exercise these rights, contact us at{" "}
                    <a
                      href={`mailto:${CONTACT.email}`}
                      className="text-teal-600 hover:underline"
                    >
                      {CONTACT.email}
                    </a>
                    . You may also lodge a complaint with the{" "}
                    <a
                      href="https://www.cnil.fr"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-teal-600 hover:underline"
                    >
                      CNIL
                    </a>{" "}
                    (French data protection authority).
                  </>
                )}
              </p>
            </Section>

            {/* 6. Cookies */}
            <Section
              id="section-6"
              title={
                isFr ? "6. Cookies et traceurs" : "6. Cookies and trackers"
              }
            >
              <p>
                {isFr
                  ? "Ce site utilise Plausible Analytics, une solution d'analyse d'audience respectueuse de la vie privée, sans cookies, sans collecte de données personnelles identifiables et sans transfert de données vers des tiers. Aucun bandeau de consentement aux cookies n'est requis."
                  : "This website uses Plausible Analytics, a privacy-friendly audience analytics solution with no cookies, no collection of personally identifiable data, and no third-party data transfers. No cookie consent banner is required."}
              </p>
              <p>
                {isFr
                  ? "Aucun cookie de traçage publicitaire ou de partage sur les réseaux sociaux n'est utilisé sur ce site."
                  : "No advertising tracking cookies or social media sharing cookies are used on this website."}
              </p>
            </Section>

            {/* 7. Hosting */}
            <Section
              id="section-7"
              title={
                isFr
                  ? "7. Hébergement et transferts"
                  : "7. Hosting and transfers"
              }
            >
              <p>
                {isFr
                  ? "Le site est hébergé par Vercel Inc. (États-Unis). Vercel est soumis à des Clauses Contractuelles Types (CCT) approuvées par la Commission européenne, garantissant un niveau de protection adéquat pour les transferts de données hors de l'Espace Économique Européen."
                  : "This website is hosted by Vercel Inc. (United States). Vercel operates under Standard Contractual Clauses (SCCs) approved by the European Commission, ensuring an adequate level of protection for data transfers outside the European Economic Area."}
              </p>
              <p>
                {isFr
                  ? "Vos données ne sont en aucun cas vendues, louées ou cédées à des tiers."
                  : "Your data is never sold, rented or transferred to third parties."}
              </p>
            </Section>

            {/* 8. Policy changes */}
            <Section
              id="section-8"
              title={
                isFr ? "8. Modification de la politique" : "8. Policy changes"
              }
            >
              <p>
                {isFr
                  ? "HCW se réserve le droit de modifier la présente politique de confidentialité à tout moment. Les modifications entrent en vigueur dès leur publication sur cette page. Nous vous encourageons à consulter régulièrement cette page."
                  : "HCW reserves the right to modify this privacy policy at any time. Changes take effect upon publication on this page. We encourage you to check this page regularly."}
              </p>
            </Section>

            {/* Last updated */}
            <div className="pt-6 text-right text-xs text-gray-400">
              {isFr
                ? "Dernière mise à jour : mai 2026"
                : "Last updated: May 2026"}
            </div>
          </div>
        </div>
      </article>
    </>
  );
}
