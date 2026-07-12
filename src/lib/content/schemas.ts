import { z } from "zod";

/** Bilingual text — every editor-facing string carries both locales. */
export const localizedString = z.object({
  fr: z.string(),
  en: z.string(),
});
export type LocalizedString = z.infer<typeof localizedString>;

/** Resolve a localized string for the active locale. */
export function pickLocale(value: LocalizedString, locale: string): string {
  return locale === "fr" ? value.fr : value.en;
}

export const projectSchema = z.object({
  id: z.string(),
  title: localizedString,
  description: localizedString,
  category: z.enum(["education", "girls", "digital", "culture", "solidarity"]),
  status: z.enum(["active", "completed", "planned"]),
  location: z.object({
    lat: z.number(),
    lng: z.number(),
    city: z.string(),
  }),
  image: z.string(),
});
export type Project = z.infer<typeof projectSchema>;

export const newsArticleSchema = z.object({
  id: z.string(),
  title: localizedString,
  excerpt: localizedString,
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "ISO date (YYYY-MM-DD)"),
  tag: z.enum([
    "impact",
    "education",
    "partnership",
    "report",
    "campaign",
    "award",
  ]),
  accentColor: z.enum(["teal", "amber"]),
  image: z.string().nullable().default(null),
});
export type NewsArticle = z.infer<typeof newsArticleSchema>;

export const campaignSchema = z.object({
  active: z.boolean(),
  goalAmount: z.number().positive(),
  // Hand-maintained until Phase 3 replaces it with Stripe-computed totals.
  raisedAmount: z.number().nonnegative(),
  donorCount: z.number().int().nonnegative(),
});
export type Campaign = z.infer<typeof campaignSchema>;

export const productSchema = z.object({
  id: z.string(),
  name: localizedString,
  price: z.number().positive(),
  category: localizedString,
  emoji: z.string(),
  colorFrom: z.string(),
  colorTo: z.string(),
});
export type Product = z.infer<typeof productSchema>;

export const shopSchema = z.object({
  products: z.array(productSchema),
  howItWorks: z.array(
    z.object({
      step: z.string(),
      title: localizedString,
      desc: localizedString,
      emoji: z.string(),
    }),
  ),
});
export type Shop = z.infer<typeof shopSchema>;

export const partnerSchema = z.object({
  name: z.string(),
  logo: z.string(),
  url: z.string(),
  bg: z.string(),
});
export type Partner = z.infer<typeof partnerSchema>;

export const galleryPhotoSchema = z.object({
  src: z.string(),
  alt: localizedString,
  caption: localizedString,
  rowSpan: z.boolean(),
});
export type GalleryPhoto = z.infer<typeof galleryPhotoSchema>;

export const statsSchema = z.object({
  prizes: z.number().int().nonnegative(),
  students: z.number().int().nonnegative(),
  donations: z.number().int().nonnegative(),
  projects: z.number().int().nonnegative(),
});
export type Stats = z.infer<typeof statsSchema>;
