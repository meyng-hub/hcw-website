import Link from "next/link";
import Image from "next/image";
import { getLocale, getTranslations } from "next-intl/server";
import { ArrowRight, Calendar } from "lucide-react";
import { news, pickLocale } from "@/lib/content";

const FALLBACK_IMAGE = "/images/hero-classroom.jpg";

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

  const recent = [...news]
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, 3);

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
          {recent.map((article) => {
            const title = pickLocale(article.title, locale);
            return (
              <article
                key={article.id}
                className="group flex flex-col rounded-2xl bg-cream-50 ring-1 ring-gray-100 overflow-hidden hover:shadow-md hover:ring-teal-200 transition-all"
              >
                {/* Photo header */}
                <div className="relative h-44 overflow-hidden">
                  <Image
                    src={article.image ?? FALLBACK_IMAGE}
                    alt={title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>

                <div className="flex flex-1 flex-col p-6">
                  <div className="flex items-center gap-2 text-xs text-gray-400 mb-3">
                    <Calendar className="h-3.5 w-3.5" aria-hidden="true" />
                    <time dateTime={article.date}>
                      {formatDate(article.date, locale)}
                    </time>
                    <span className="ml-auto rounded-full bg-teal-50 px-2.5 py-0.5 text-teal-700 font-medium">
                      {t(`tag_${article.tag}` as Parameters<typeof t>[0])}
                    </span>
                  </div>

                  <h3 className="font-serif text-lg font-semibold text-charcoal-900 group-hover:text-teal-700 transition-colors line-clamp-2">
                    {title}
                  </h3>

                  <p className="mt-2 flex-1 text-sm text-gray-500 line-clamp-3">
                    {pickLocale(article.excerpt, locale)}
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
            );
          })}
        </div>
      </div>
    </section>
  );
}
