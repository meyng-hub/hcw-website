import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import ProjectsClient from "./ProjectsClient";
import ProjectMapWrapper from "@/components/map/ProjectMapWrapper";
import { PROJECTS } from "@/lib/constants";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "projects" });
  return {
    title: t("meta_title"),
    description: t("meta_description"),
    openGraph: {
      title: t("meta_title"),
      description: t("meta_description"),
    },
  };
}

export default async function ProjectsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "projects" });

  // Normalise PROJECTS from const to plain objects for client component
  const projects = PROJECTS.map((p) => ({
    id: p.id,
    titleFr: p.titleFr,
    titleEn: p.titleEn,
    descFr: p.descFr,
    descEn: p.descEn,
    category: p.category,
    status: p.status,
    location: { ...p.location },
  }));

  const mapProjects = projects.map((p) => ({
    id: p.id,
    title: locale === "fr" ? p.titleFr : p.titleEn,
    category: p.category,
    location: p.location,
  }));

  return (
    <>
      {/* ── Hero ── */}
      <section className="relative overflow-hidden bg-teal-600 pt-28 pb-20">
        {/* Decorative circles */}
        <div
          aria-hidden="true"
          className="absolute -top-16 -right-16 h-64 w-64 rounded-full bg-teal-500/40"
        />
        <div
          aria-hidden="true"
          className="absolute bottom-0 left-1/3 h-48 w-48 rounded-full bg-amber-500/20"
        />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-amber-400 mb-3">
            HCW · République Centrafricaine
          </p>
          <h1 className="font-serif text-4xl font-bold text-white sm:text-5xl lg:text-6xl">
            {t("title")}
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-teal-100">
            {t("hero_subtitle")}
          </p>
        </div>
      </section>

      {/* ── Projects grid + filter (client) ── */}
      <ProjectsClient projects={projects} locale={locale} />

      {/* ── Map section ── */}
      <section className="bg-white py-20" aria-labelledby="map-heading">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 text-center">
            <h2
              id="map-heading"
              className="font-serif text-3xl font-bold text-charcoal-900"
            >
              {t("map_title")}
            </h2>
            <p className="mt-2 text-gray-500 max-w-xl mx-auto">
              {t("map_subtitle")}
            </p>
          </div>
          <ProjectMapWrapper
            projects={mapProjects}
            locationLabel={locale === "fr" ? "RCA" : "CAR"}
          />
        </div>
      </section>
    </>
  );
}
