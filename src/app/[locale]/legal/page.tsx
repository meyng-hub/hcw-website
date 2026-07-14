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
  const isFr = locale === "fr";

  return (
    <>
      {/* ── Hero ── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-teal-700 to-charcoal-900 pt-32 pb-16 text-white">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h1 className="font-serif text-4xl font-bold tracking-tight">
            {isFr ? "Mentions légales" : "Legal Notice"}
          </h1>
          <p className="mt-4 text-teal-100 text-sm">
            {isFr
              ? "Conformément à la loi n° 2004-575 du 21 juin 2004 pour la confiance dans l'économie numérique (LCEN)"
              : "In accordance with French Law no. 2004-575 of 21 June 2004 on confidence in the digital economy (LCEN)"}
          </p>
        </div>
      </section>

      {/* ── Content ── */}
      <article
        aria-label={isFr ? "Mentions légales" : "Legal notice"}
        className="bg-cream-50 py-16"
      >
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl bg-white p-8 shadow-sm ring-1 ring-gray-100 space-y-0">
            {/* Publisher */}
            <Section title={isFr ? "1. Éditeur du site" : "1. Publisher"}>
              {isFr ? (
                <>
                  <p>
                    <strong>Dénomination sociale :</strong> HCW —
                    Hervé-Charles Wenezoui
                  </p>
                  <p>
                    <strong>Forme juridique :</strong> Association régie par la
                    loi du 1er juillet 1901
                  </p>
                  <p>
                    <strong>Siège social :</strong> {CONTACT.france}
                  </p>
                  <p>
                    <strong>Président :</strong> Dr. Ulrich Guene
                  </p>
                  <p>
                    <strong>Email :</strong>{" "}
                    <a
                      href={`mailto:${CONTACT.email}`}
                      className="text-teal-600 hover:underline"
                    >
                      {CONTACT.email}
                    </a>
                  </p>
                  <p>
                    <strong>Téléphone :</strong> {CONTACT.phoneDisplay}
                  </p>
                  <p>
                    <strong>Numéro RNA :</strong> W601009060
                  </p>
                </>
              ) : (
                <>
                  <p>
                    <strong>Organisation name:</strong> HCW — Hervé-Charles
Wenezoui
                  </p>
                  <p>
                    <strong>Legal form:</strong> Non-profit association under
                    French law of 1 July 1901
                  </p>
                  <p>
                    <strong>Registered office:</strong> {CONTACT.france}
                  </p>
                  <p>
                    <strong>President:</strong> Dr. Ulrich Guene
                  </p>
                  <p>
                    <strong>Email:</strong>{" "}
                    <a
                      href={`mailto:${CONTACT.email}`}
                      className="text-teal-600 hover:underline"
                    >
                      {CONTACT.email}
                    </a>
                  </p>
                  <p>
                    <strong>Phone:</strong> {CONTACT.phoneDisplay}
                  </p>
                  <p>
                    <strong>RNA number:</strong> W601009060
                  </p>
                </>
              )}
            </Section>

            {/* Director of publication */}
            <Section
              title={
                isFr
                  ? "2. Directeur de la publication"
                  : "2. Director of publication"
              }
            >
              <p>
                {isFr
                  ? "Le directeur de la publication est Dr. Ulrich Guene, Président de l'association HCW."
                  : "The director of publication is Dr. Ulrich Guene, President of the HCW association."}
              </p>
            </Section>

            {/* Host */}
            <Section title={isFr ? "3. Hébergement" : "3. Hosting"}>
              {isFr ? (
                <>
                  <p>Le site est hébergé par :</p>
                  <p>
                    <strong>Vercel Inc.</strong>
                    <br />
                    340 Pine Street Suite 701
                    <br />
                    San Francisco, CA 94104
                    <br />
                    États-Unis
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
                </>
              ) : (
                <>
                  <p>This website is hosted by:</p>
                  <p>
                    <strong>Vercel Inc.</strong>
                    <br />
                    340 Pine Street Suite 701
                    <br />
                    San Francisco, CA 94104
                    <br />
                    United States
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
                </>
              )}
            </Section>

            {/* Intellectual property */}
            <Section
              title={
                isFr
                  ? "4. Propriété intellectuelle"
                  : "4. Intellectual property"
              }
            >
              <p>
                {isFr
                  ? "L'ensemble des contenus présents sur ce site (textes, images, graphismes, logo, icônes, sons, logiciels…) est la propriété exclusive de l'association HCW ou de ses partenaires, et est protégé par les lois françaises et internationales relatives à la propriété intellectuelle."
                  : "All content on this website (text, images, graphics, logo, icons, sounds, software…) is the exclusive property of the HCW association or its partners, and is protected by French and international intellectual property laws."}
              </p>
              <p>
                {isFr
                  ? "Toute reproduction, distribution, modification, adaptation, retransmission ou publication, même partielle, de ces différents éléments est strictement interdite sans l'accord exprès par écrit de HCW."
                  : "Any reproduction, distribution, modification, adaptation, retransmission or publication, even partial, of these various elements is strictly prohibited without the express written consent of HCW."}
              </p>
            </Section>

            {/* Liability */}
            <Section
              title={
                isFr
                  ? "5. Limitation de responsabilité"
                  : "5. Limitation of liability"
              }
            >
              <p>
                {isFr
                  ? "L'association HCW s'efforce d'assurer l'exactitude et la mise à jour des informations diffusées sur ce site. Toutefois, HCW ne peut garantir l'exactitude, la précision ou l'exhaustivité des informations mises à disposition sur ce site."
                  : "HCW strives to ensure the accuracy and currency of information published on this website. However, HCW cannot guarantee the accuracy, precision or completeness of information made available on this site."}
              </p>
              <p>
                {isFr
                  ? "En conséquence, HCW décline toute responsabilité pour toute imprécision, inexactitude ou omission portant sur des informations disponibles sur ce site, ainsi que pour tous dommages résultant d'une intrusion frauduleuse d'un tiers ayant entraîné une modification des informations mises à disposition sur ce site."
                  : "Accordingly, HCW declines all liability for any inaccuracy, inexactitude or omission relating to information available on this site, and for any damage resulting from fraudulent intrusion by a third party that has led to a modification of information made available on this site."}
              </p>
            </Section>

            {/* External links */}
            <Section title={isFr ? "6. Liens hypertextes" : "6. Hyperlinks"}>
              <p>
                {isFr
                  ? "Le site peut contenir des liens hypertextes vers d'autres sites internet. HCW n'exerce aucun contrôle sur ces sites et n'est pas responsable de leur contenu. La création de liens hypertextes vers le site de HCW est soumise à l'accord préalable de l'éditeur."
                  : "This website may contain hyperlinks to other websites. HCW has no control over such sites and is not responsible for their content. The creation of hyperlinks to the HCW website is subject to the prior consent of the publisher."}
              </p>
            </Section>

            {/* Governing law */}
            <Section
              title={
                isFr
                  ? "7. Droit applicable et juridiction compétente"
                  : "7. Governing law and jurisdiction"
              }
            >
              <p>
                {isFr
                  ? "Le présent site est régi par le droit français. En cas de litige et à défaut de résolution amiable, les tribunaux de l'Oise (France) seront seuls compétents."
                  : "This website is governed by French law. In the event of a dispute and failing amicable resolution, the courts of Oise (France) shall have sole jurisdiction."}
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
