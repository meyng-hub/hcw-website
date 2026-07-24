import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/constants";

// [en slug, fr slug] for indexable routes (localized per routing.ts).
// Excludes noindex pages (privacy, legal), the transactional thank-you page,
// and /campaign (declared in routing but has no page).
const ROUTES: ReadonlyArray<readonly [string, string]> = [
  ["", ""],
  ["/about", "/about"],
  ["/projects", "/projets"],
  ["/impact", "/impact"],
  ["/donate", "/donner"],
  ["/news", "/actualites"],
  ["/shop", "/boutique"],
  ["/volunteer", "/benevoles"],
  ["/partners", "/partenaires"],
  ["/contact", "/contact"],
];

export default function sitemap(): MetadataRoute.Sitemap {
  return ROUTES.flatMap(([en, fr]) => {
    const enUrl = `${SITE_URL}/en${en}`;
    const frUrl = `${SITE_URL}/fr${fr}`;
    const languages = { en: enUrl, fr: frUrl };
    const priority = en === "" ? 1 : en === "/donate" ? 0.9 : 0.7;
    const changeFrequency = "monthly" as const;
    // fr is the default locale — list it first.
    return [
      { url: frUrl, changeFrequency, priority, alternates: { languages } },
      { url: enUrl, changeFrequency, priority, alternates: { languages } },
    ];
  });
}
