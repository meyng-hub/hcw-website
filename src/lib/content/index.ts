import { z } from "zod";
import {
  campaignSchema,
  galleryPhotoSchema,
  newsArticleSchema,
  partnerSchema,
  projectSchema,
  shopSchema,
  statsSchema,
  type Campaign,
  type GalleryPhoto,
  type NewsArticle,
  type Partner,
  type Project,
  type Shop,
  type Stats,
} from "./schemas";
import campaignJson from "../../../content/campaign.json";
import galleryJson from "../../../content/gallery.json";
import newsJson from "../../../content/news.json";
import partnersJson from "../../../content/partners.json";
import projectsJson from "../../../content/projects.json";
import shopJson from "../../../content/shop.json";
import statsJson from "../../../content/stats.json";

/**
 * Tolerant load: invalid content degrades to the fallback (and logs)
 * instead of failing the build. An editor mistake must never take the
 * site down — see docs/ADMIN-ARCHITECTURE.md.
 */
function load<S extends z.ZodTypeAny>(
  name: string,
  schema: S,
  data: unknown,
  fallback: z.infer<S>,
): z.infer<S> {
  const result = schema.safeParse(data);
  if (!result.success) {
    console.error(
      `[content] content/${name}.json is invalid — using fallback.`,
      z.treeifyError(result.error),
    );
    return fallback;
  }
  return result.data;
}

export const projects: Project[] = load(
  "projects",
  z.array(projectSchema),
  projectsJson,
  [],
);

export const news: NewsArticle[] = load(
  "news",
  z.array(newsArticleSchema),
  newsJson,
  [],
);

export const campaign: Campaign = load("campaign", campaignSchema, campaignJson, {
  active: false,
  goalAmount: 0,
  raisedAmount: 0,
  donorCount: 0,
});

export const shop: Shop = load("shop", shopSchema, shopJson, {
  products: [],
  howItWorks: [],
});

export const partners: Partner[] = load(
  "partners",
  z.array(partnerSchema),
  partnersJson,
  [],
);

export const gallery: GalleryPhoto[] = load(
  "gallery",
  z.array(galleryPhotoSchema),
  galleryJson,
  [],
);

export const stats: Stats = load("stats", statsSchema, statsJson, {
  prizes: 0,
  students: 0,
  donations: 0,
  projects: 0,
});

export { pickLocale } from "./schemas";
export type {
  Campaign,
  GalleryPhoto,
  NewsArticle,
  Partner,
  Project,
  Shop,
  Stats,
} from "./schemas";
