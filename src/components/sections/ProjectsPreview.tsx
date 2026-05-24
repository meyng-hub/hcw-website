"use client";

import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import { ArrowRight, MapPin } from "lucide-react";
import { PROJECTS } from "@/lib/constants";

const CATEGORY_COLORS: Record<string, string> = {
  education: "bg-blue-100 text-blue-700",
  girls: "bg-pink-100 text-pink-700",
  digital: "bg-purple-100 text-purple-700",
  culture: "bg-amber-100 text-amber-700",
  solidarity: "bg-green-100 text-green-700",
};

const CATEGORY_EMOJI: Record<string, string> = {
  education: "📚",
  girls: "👩‍🎓",
  digital: "💻",
  culture: "🎭",
  solidarity: "🤝",
};

export default function ProjectsPreview() {
  const t = useTranslations("projects");
  const locale = useLocale();

  // Show first 3 projects on homepage
  const preview = PROJECTS.slice(0, 3);

  return (
    <section className="bg-white py-24" aria-labelledby="projects-heading">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h2
              id="projects-heading"
              className="font-serif text-3xl font-bold text-charcoal-900 sm:text-4xl"
            >
              {t("title")}
            </h2>
            <p className="mt-2 text-gray-500">{t("subtitle")}</p>
          </div>
          <Link
            href={`/${locale}/projects`}
            className="flex shrink-0 items-center gap-1.5 text-sm font-semibold text-teal-600 hover:text-teal-800 transition-colors"
          >
            {t("learn_more")}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {preview.map((project) => (
            <article
              key={project.id}
              className="group relative overflow-hidden rounded-2xl bg-cream-50 ring-1 ring-gray-100 transition-all hover:shadow-lg hover:ring-teal-200"
            >
              {/* Image placeholder — replace with real Sanity image */}
              <div className="relative h-48 overflow-hidden bg-gradient-to-br from-teal-100 to-teal-200">
                <div className="absolute inset-0 flex items-center justify-center text-5xl">
                  {CATEGORY_EMOJI[project.category]}
                </div>
                {/* Status badge */}
                <span className="absolute right-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-xs font-medium text-teal-700 shadow-sm">
                  ● {t("status_active")}
                </span>
              </div>

              <div className="p-6">
                {/* Category */}
                <span
                  className={`inline-block rounded-full px-3 py-1 text-xs font-medium ${CATEGORY_COLORS[project.category]}`}
                >
                  {t(`filter_${project.category}` as Parameters<typeof t>[0])}
                </span>

                {/* Title */}
                <h3 className="mt-3 font-serif text-xl font-semibold text-charcoal-900 group-hover:text-teal-700 transition-colors">
                  {locale === "fr" ? project.titleFr : project.titleEn}
                </h3>

                {/* Description */}
                <p className="mt-2 text-sm text-gray-500 line-clamp-3">
                  {locale === "fr" ? project.descFr : project.descEn}
                </p>

                {/* Location */}
                {project.location && (
                  <div className="mt-4 flex items-center gap-1.5 text-xs text-gray-400">
                    <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
                    {project.location.city}, RCA
                  </div>
                )}

                {/* CTA */}
                <div className="mt-5 flex gap-3">
                  <Link
                    href={`/${locale}/projects`}
                    className="flex-1 rounded-lg bg-teal-50 px-4 py-2 text-center text-sm font-medium text-teal-700 hover:bg-teal-100 transition-colors"
                  >
                    {t("learn_more")}
                  </Link>
                  <Link
                    href={`/${locale}/donate`}
                    className="flex-1 rounded-lg bg-amber-500 px-4 py-2 text-center text-sm font-semibold text-white hover:bg-amber-600 transition-colors"
                  >
                    {t("donate_project")}
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
