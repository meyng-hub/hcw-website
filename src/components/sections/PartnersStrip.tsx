import Link from "next/link";
import { getLocale } from "next-intl/server";
import { ExternalLink } from "lucide-react";

const PARTNERS = [
  {
    name: "MEYNG",
    url: "https://meyng.com",
    desc: "Partenaire technologique / Technology partner",
  },
  {
    name: "WEIRAM",
    url: "#",
    desc: "Partenaire associatif / Associate partner",
  },
  {
    name: "KAIKELEM",
    url: "#",
    desc: "Programme solidarité / Solidarity programme",
  },
];

export default async function PartnersStrip() {
  const locale = await getLocale();

  return (
    <section
      className="bg-cream-50 py-20 border-t border-gray-100"
      aria-labelledby="partners-heading"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2
            id="partners-heading"
            className="text-sm font-semibold uppercase tracking-widest text-gray-400"
          >
            {locale === "fr" ? "Ils nous font confiance" : "Our partners"}
          </h2>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16">
          {PARTNERS.map(({ name, url, desc }) => (
            <a
              key={name}
              href={url}
              target={url !== "#" ? "_blank" : undefined}
              rel="noopener noreferrer"
              className="group flex items-center gap-2 text-gray-400 hover:text-teal-600 transition-colors"
              aria-label={desc}
            >
              <span className="font-serif text-2xl font-bold tracking-tight">
                {name}
              </span>
              {url !== "#" && (
                <ExternalLink
                  className="h-3.5 w-3.5 opacity-0 group-hover:opacity-100 transition-opacity"
                  aria-hidden="true"
                />
              )}
            </a>
          ))}
        </div>

        {/* Become a partner CTA */}
        <div className="mt-12 text-center">
          <Link
            href={`/${locale}/partners`}
            className="text-sm font-medium text-teal-600 hover:text-teal-800 underline underline-offset-4 transition-colors"
          >
            {locale === "fr" ? "Devenir partenaire →" : "Become a partner →"}
          </Link>
        </div>
      </div>
    </section>
  );
}
