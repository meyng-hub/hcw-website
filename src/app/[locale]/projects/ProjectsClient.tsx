"use client";

import { useState } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { MapPin } from "lucide-react";
import { pickLocale, type Project } from "@/lib/content";

type Category =
  | "all"
  | "education"
  | "girls"
  | "digital"
  | "culture"
  | "solidarity";

interface ProjectsClientProps {
  projects: Project[];
  locale: string;
}

const CATEGORY_COLORS: Record<string, string> = {
  education: "bg-blue-100 text-blue-700 border-blue-200",
  girls: "bg-pink-100 text-pink-700 border-pink-200",
  digital: "bg-teal-100 text-teal-700 border-teal-200",
  culture: "bg-amber-100 text-amber-700 border-amber-200",
  solidarity: "bg-red-100 text-red-700 border-red-200",
};

const CATEGORY_BG: Record<string, string> = {
  education: "from-blue-100 to-blue-200",
  girls: "from-pink-100 to-pink-200",
  digital: "from-teal-100 to-teal-200",
  culture: "from-amber-100 to-amber-200",
  solidarity: "from-red-100 to-red-200",
};

const CATEGORY_EMOJI: Record<string, string> = {
  education: "📚",
  girls: "👧",
  digital: "💻",
  culture: "🎭",
  solidarity: "❤️",
};

const FILTER_CATEGORIES: { key: Category; translationKey: string }[] = [
  { key: "all", translationKey: "filter_all" },
  { key: "education", translationKey: "filter_education" },
  { key: "girls", translationKey: "filter_girls" },
  { key: "digital", translationKey: "filter_digital" },
  { key: "culture", translationKey: "filter_culture" },
  { key: "solidarity", translationKey: "filter_solidarity" },
];

export default function ProjectsClient({
  projects,
  locale,
}: ProjectsClientProps) {
  const t = useTranslations("projects");
  const common = useTranslations("common");
  const [activeFilter, setActiveFilter] = useState<Category>("all");

  const filtered =
    activeFilter === "all"
      ? projects
      : projects.filter((p) => p.category === activeFilter);

  return (
    <section
      className="bg-cream-50 py-16"
      aria-labelledby="projects-grid-heading"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* ── Filter bar ── */}
        <div
          className="mb-10 flex flex-wrap gap-2 justify-center"
          role="group"
          aria-label={t("filter_aria")}
        >
          {FILTER_CATEGORIES.map(({ key, translationKey }) => (
            <button
              key={key}
              onClick={() => setActiveFilter(key)}
              aria-pressed={activeFilter === key}
              className={`rounded-full px-5 py-2 text-sm font-medium transition-all border ${
                activeFilter === key
                  ? "bg-teal-600 text-white border-teal-600 shadow-md"
                  : "bg-white text-charcoal-900 border-gray-200 hover:border-teal-300 hover:text-teal-700"
              }`}
            >
              {t(translationKey as Parameters<typeof t>[0])}
            </button>
          ))}
        </div>

        {/* ── Grid ── */}
        <h2 id="projects-grid-heading" className="sr-only">
          {t("title")}
        </h2>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((project) => {
            const title = pickLocale(project.title, locale);
            const desc = pickLocale(project.description, locale);
            const emoji = CATEGORY_EMOJI[project.category] ?? "📍";
            const categoryColor =
              CATEGORY_COLORS[project.category] ?? "bg-gray-100 text-gray-700";
            const categoryBg =
              CATEGORY_BG[project.category] ?? "from-gray-100 to-gray-200";
            const categoryLabel = t(
              `filter_${project.category}` as Parameters<typeof t>[0],
            );
            const isActive = project.status === "active";

            return (
              <article
                key={project.id}
                className="group flex flex-col overflow-hidden rounded-2xl bg-white ring-1 ring-gray-100 transition-all hover:shadow-xl hover:ring-teal-200"
              >
                {/* Card header / image area */}
                <div
                  className={`relative h-44 bg-gradient-to-br ${categoryBg} flex items-center justify-center`}
                >
                  <span className="text-6xl" aria-hidden="true">
                    {emoji}
                  </span>

                  {/* Status badge */}
                  <span
                    className={`absolute right-3 top-3 flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold shadow-sm ${
                      isActive
                        ? "bg-green-50 text-green-700"
                        : "bg-gray-50 text-gray-500"
                    }`}
                  >
                    <span
                      className={`inline-block h-1.5 w-1.5 rounded-full ${isActive ? "bg-green-500" : "bg-gray-400"}`}
                      aria-hidden="true"
                    />
                    {isActive ? t("status_active") : t("status_completed")}
                  </span>
                </div>

                {/* Card body */}
                <div className="flex flex-1 flex-col p-6">
                  {/* Category badge */}
                  <span
                    className={`self-start rounded-full border px-3 py-0.5 text-xs font-medium ${categoryColor}`}
                  >
                    {categoryLabel}
                  </span>

                  {/* Title */}
                  <h3 className="mt-3 font-serif text-xl font-semibold text-charcoal-900 group-hover:text-teal-700 transition-colors line-clamp-2">
                    {title}
                  </h3>

                  {/* Description */}
                  <p className="mt-2 flex-1 text-sm text-gray-500 line-clamp-3">
                    {desc}
                  </p>

                  {/* Location */}
                  <div className="mt-4 flex items-center gap-1.5 text-xs text-gray-500">
                    <MapPin
                      className="h-3.5 w-3.5 shrink-0"
                      aria-hidden="true"
                    />
                    {project.location.city}, {common("country")}
                  </div>

                  {/* CTA */}
                  <div className="mt-5 flex gap-3">
                    <Link
                      href={`/${locale}/projects/${project.id}`}
                      className="flex-1 rounded-lg bg-teal-50 px-4 py-2 text-center text-sm font-medium text-teal-700 transition-colors hover:bg-teal-100"
                    >
                      {t("learn_more")}
                    </Link>
                    <Link
                      href={`/${locale}/donate`}
                      className="flex-1 rounded-lg bg-amber-500 px-4 py-2 text-center text-sm font-semibold text-white transition-colors hover:bg-amber-600"
                    >
                      {t("donate_project")}
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
