"use client";

import { useState } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { Search } from "lucide-react";
import type { NewsArticle } from "./page";

interface NewsClientProps {
  articles: NewsArticle[];
  locale: string;
}

const TAG_COLORS: Record<string, string> = {
  impact: "bg-teal-100 text-teal-700",
  education: "bg-blue-100 text-blue-700",
  partnership: "bg-purple-100 text-purple-700",
  report: "bg-gray-100 text-gray-700",
  campaign: "bg-amber-100 text-amber-700",
  award: "bg-yellow-100 text-yellow-700",
};

const ACCENT_TOP: Record<string, string> = {
  teal: "bg-teal-600",
  amber: "bg-amber-500",
};

function formatDate(isoDate: string, locale: string): string {
  return new Intl.DateTimeFormat(locale === "fr" ? "fr-FR" : "en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(isoDate));
}

export default function NewsClient({ articles, locale }: NewsClientProps) {
  const t = useTranslations("news");
  const [query, setQuery] = useState("");

  const filtered = articles.filter((article) => {
    if (!query.trim()) return true;
    const title = locale === "fr" ? article.titleFr : article.titleEn;
    return title.toLowerCase().includes(query.toLowerCase());
  });

  return (
    <section className="bg-cream-50 py-16" aria-labelledby="news-grid-heading">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* ── Search bar ── */}
        <div className="mb-10 flex justify-center">
          <div className="relative w-full max-w-lg">
            <Search
              className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400"
              aria-hidden="true"
            />
            <label htmlFor="news-search" className="sr-only">
              {t("search_placeholder")}
            </label>
            <input
              id="news-search"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t("search_placeholder")}
              className="w-full rounded-full border border-gray-200 bg-white py-3 pl-11 pr-5 text-sm text-charcoal-900 shadow-sm outline-none transition focus:border-teal-400 focus:ring-2 focus:ring-teal-200"
            />
          </div>
        </div>

        {/* ── Grid ── */}
        <h2 id="news-grid-heading" className="sr-only">
          {t("all_articles")}
        </h2>

        {filtered.length === 0 ? (
          <p className="text-center text-gray-500 py-16">{t("no_results")}</p>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((article) => {
              const title = locale === "fr" ? article.titleFr : article.titleEn;
              const excerpt =
                locale === "fr" ? article.excerptFr : article.excerptEn;
              const tagColor =
                TAG_COLORS[article.tag] ?? "bg-gray-100 text-gray-700";
              const accentClass =
                ACCENT_TOP[article.accentColor] ?? "bg-teal-600";
              const tagKey = `tag_${article.tag}` as Parameters<typeof t>[0];

              return (
                <article
                  key={article.id}
                  className="group flex flex-col overflow-hidden rounded-2xl bg-white ring-1 ring-gray-100 shadow-sm transition-all hover:shadow-xl hover:ring-teal-200"
                >
                  {/* Coloured accent strip */}
                  <div
                    className={`h-1.5 w-full ${accentClass}`}
                    aria-hidden="true"
                  />

                  <div className="flex flex-1 flex-col p-6">
                    {/* Date */}
                    <time
                      dateTime={article.date}
                      className="text-xs text-gray-400"
                    >
                      {formatDate(article.date, locale)}
                    </time>

                    {/* Title */}
                    <h3 className="mt-3 font-serif text-xl font-semibold text-charcoal-900 group-hover:text-teal-700 transition-colors line-clamp-2">
                      {title}
                    </h3>

                    {/* Excerpt */}
                    <p className="mt-3 flex-1 text-sm text-gray-500 line-clamp-4">
                      {excerpt}
                    </p>

                    {/* Tag */}
                    <div className="mt-4">
                      <span
                        className={`inline-block rounded-full px-3 py-0.5 text-xs font-medium ${tagColor}`}
                      >
                        {t(tagKey)}
                      </span>
                    </div>

                    {/* Read more */}
                    <Link
                      href={`/${locale}/news/${article.id}`}
                      className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-teal-600 hover:text-teal-800 transition-colors"
                    >
                      {t("read_more")}
                      <span aria-hidden="true">→</span>
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        )}

        {/* ── Pagination placeholder ── */}
        <nav className="mt-12 flex justify-center" aria-label={t("page_label")}>
          <ol className="flex items-center gap-1" role="list">
            {[1, 2, 3].map((page) => (
              <li key={page}>
                <button
                  aria-current={page === 1 ? "page" : undefined}
                  className={`flex h-9 w-9 items-center justify-center rounded-full text-sm font-medium transition-colors ${
                    page === 1
                      ? "bg-teal-600 text-white shadow-sm"
                      : "text-gray-500 hover:bg-teal-50 hover:text-teal-700"
                  }`}
                >
                  {page}
                </button>
              </li>
            ))}
          </ol>
        </nav>
      </div>
    </section>
  );
}
