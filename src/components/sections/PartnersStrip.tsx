import Image from "next/image";
import Link from "next/link";
import { getLocale } from "next-intl/server";

const PARTNERS = [
  {
    name: "Kaïkelem",
    logo: "/images/partner-kaikelem.png",
    url: "#",
    bg: "bg-white",
  },
  {
    name: "WEIRAM",
    logo: "/images/partner-weiram.jpg",
    url: "#",
    bg: "bg-white",
  },
  {
    name: "MEYNG",
    logo: "/images/partner-meyng.jpg",
    url: "https://meyng.com",
    bg: "bg-gray-900",
  },
  {
    name: "Solidatech",
    logo: "/images/partner-solidatech.png",
    url: "https://www.solidatech.fr",
    bg: "bg-white",
  },
];

export default async function PartnersStrip() {
  const locale = await getLocale();

  return (
    <section
      className="bg-gray-50 py-16 border-t border-gray-100"
      aria-label="Partenaires"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="text-center text-xs font-semibold uppercase tracking-widest text-gray-400 mb-10">
          {locale === "fr" ? "Ils nous font confiance" : "They trust us"}
        </p>

        <div className="flex flex-wrap items-center justify-center gap-8 lg:gap-16">
          {PARTNERS.map((partner) => (
            <a
              key={partner.name}
              href={partner.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={partner.name}
              className={`group relative flex h-16 w-36 items-center justify-center rounded-xl p-3 shadow-sm transition-all hover:shadow-md hover:-translate-y-0.5 ${partner.bg}`}
            >
              <div className="relative h-full w-full">
                <Image
                  src={partner.logo}
                  alt={`${partner.name} — partenaire HCW`}
                  fill
                  className="object-contain"
                  sizes="144px"
                />
              </div>
            </a>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link
            href={`/${locale}/partners`}
            className="text-sm text-teal-600 font-medium hover:text-teal-700 hover:underline transition-colors"
          >
            {locale === "fr" ? "Devenir partenaire →" : "Become a partner →"}
          </Link>
        </div>
      </div>
    </section>
  );
}
