import Link from "next/link";
import { getLocale, getTranslations } from "next-intl/server";
import { ArrowRight, Calendar } from "lucide-react";

// Static recent news — replace with Sanity query when CMS ready
const RECENT_NEWS = [
  {
    id: "1",
    slug: "accessibility-award-2024",
    titleFr:
      "Ensemble pour l'Inclusion — HCW célèbre l'accessibilité numérique",
    titleEn: "Together for Inclusion — HCW celebrates digital accessibility",
    excerptFr:
      "Alexandra Nothnagel reçoit le prix IAAP pour son engagement en faveur de l'accessibilité numérique, une valeur au cœur de la mission HCW.",
    excerptEn:
      "Alexandra Nothnagel receives the IAAP award for her commitment to digital accessibility, a core HCW value.",
    date: "2024-04-12",
    tag: "Inclusion",
  },
  {
    id: "2",
    slug: "orphanage-support-2023",
    titleFr:
      "Soutien à l'orphelinat Yakandja — une aide concrète pour 60 enfants",
    titleEn: "Support for Yakandja Orphanage — concrete help for 60 children",
    excerptFr:
      "HCW renforce son soutien à l'orphelinat Yakandja de Bangui avec des fournitures scolaires et des repas pour 60 enfants vulnérables.",
    excerptEn:
      "HCW strengthens its support of the Yakandja orphanage in Bangui with school supplies and meals for 60 vulnerable children.",
    date: "2023-11-15",
    tag: "Solidarité",
  },
  {
    id: "3",
    slug: "teacher-empowerment-2022",
    titleFr:
      "Formation des enseignants — construire l'avenir de l'éducation en RCA",
    titleEn: "Teacher empowerment — building the future of education in CAR",
    excerptFr:
      "Un nouveau programme de formation continue permet à 30 enseignants de la RCA d'accéder aux méthodes pédagogiques modernes.",
    excerptEn:
      "A new continuous training programme enables 30 CAR teachers to access modern teaching methods.",
    date: "2022-11-08",
    tag: "Éducation",
  },
];

function formatDate(dateStr: string, locale: string) {
  return new Intl.DateTimeFormat(locale === "fr" ? "fr-FR" : "en-GB", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(dateStr));
}

export default async function NewsPreview() {
  const locale = await getLocale();
  const t = await getTranslations("news");

  return (
    <section className="bg-white py-24" aria-labelledby="news-heading">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 flex items-end justify-between">
          <div>
            <h2
              id="news-heading"
              className="font-serif text-3xl font-bold text-charcoal-900 sm:text-4xl"
            >
              {t("title")}
            </h2>
            <p className="mt-2 text-gray-500">{t("subtitle")}</p>
          </div>
          <Link
            href={`/${locale}/news`}
            className="hidden sm:flex items-center gap-1.5 text-sm font-semibold text-teal-600 hover:text-teal-800 transition-colors"
          >
            {t("all_articles")}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {RECENT_NEWS.map((article) => (
            <article
              key={article.id}
              className="group flex flex-col rounded-2xl bg-cream-50 ring-1 ring-gray-100 overflow-hidden hover:shadow-md hover:ring-teal-200 transition-all"
            >
              {/* Color strip header */}
              <div
                className="h-2 w-full bg-gradient-to-r from-teal-500 to-teal-700"
                aria-hidden="true"
              />

              <div className="flex flex-1 flex-col p-6">
                <div className="flex items-center gap-2 text-xs text-gray-400 mb-3">
                  <Calendar className="h-3.5 w-3.5" aria-hidden="true" />
                  <time dateTime={article.date}>
                    {formatDate(article.date, locale)}
                  </time>
                  <span className="ml-auto rounded-full bg-teal-50 px-2.5 py-0.5 text-teal-700 font-medium">
                    {article.tag}
                  </span>
                </div>

                <h3 className="font-serif text-lg font-semibold text-charcoal-900 group-hover:text-teal-700 transition-colors line-clamp-2">
                  {locale === "fr" ? article.titleFr : article.titleEn}
                </h3>

                <p className="mt-2 flex-1 text-sm text-gray-500 line-clamp-3">
                  {locale === "fr" ? article.excerptFr : article.excerptEn}
                </p>

                <Link
                  href={`/${locale}/news`}
                  className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-teal-600 hover:text-teal-800 transition-colors"
                >
                  {t("read_more")}
                  <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
