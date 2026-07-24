import { SITE_URL, SITE_NAME, CONTACT, SOCIAL } from "@/lib/constants";

/**
 * Organization + WebSite structured data (schema.org NGO).
 * Rendered once in the root layout. Gives search engines a machine-readable
 * identity (name, logo, address, RNA/SIREN, socials) and a nonprofit trust signal.
 */
export default function OrganizationJsonLd({ locale }: { locale: string }) {
  const description =
    locale === "fr"
      ? "Association loi 1901 fondée en 2009, HCW œuvre pour l'égalité éducative en Afrique centrale (Bangui, République Centrafricaine)."
      : "A French non-profit (loi 1901) founded in 2009, HCW works for educational equality in Central Africa (Bangui, Central African Republic).";

  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "NGO",
        "@id": `${SITE_URL}/#organization`,
        name: SITE_NAME,
        legalName: "Association Hervé-Charles Wenezoui",
        alternateName: "HCW",
        url: SITE_URL,
        logo: `${SITE_URL}/icon.svg`,
        description,
        foundingDate: "2009",
        email: CONTACT.email,
        telephone: CONTACT.whatsapp,
        address: {
          "@type": "PostalAddress",
          streetAddress: "13, rue Anatole France",
          postalCode: "60290",
          addressLocality: "Rantigny",
          addressCountry: "FR",
        },
        areaServed: { "@type": "Country", name: "Central African Republic" },
        sameAs: [
          SOCIAL.facebook,
          SOCIAL.instagram,
          SOCIAL.youtube,
          SOCIAL.twitter,
        ],
        identifier: [
          { "@type": "PropertyValue", propertyID: "RNA", value: "W602001421" },
          { "@type": "PropertyValue", propertyID: "SIREN", value: "841629157" },
        ],
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: SITE_NAME,
        publisher: { "@id": `${SITE_URL}/#organization` },
        inLanguage: locale === "fr" ? "fr-FR" : "en-US",
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      // Structured data is static and self-generated — safe to inline.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
    />
  );
}
