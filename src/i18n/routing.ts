import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en", "fr"],
  defaultLocale: "fr",
  pathnames: {
    "/": "/",
    "/about": "/about",
    "/projects": { en: "/projects", fr: "/projets" },
    "/impact": { en: "/impact", fr: "/impact" },
    "/donate": { en: "/donate", fr: "/donner" },
    "/campaign": { en: "/campaign", fr: "/campagne" },
    "/news": { en: "/news", fr: "/actualites" },
    "/shop": { en: "/shop", fr: "/boutique" },
    "/volunteer": { en: "/volunteer", fr: "/benevoles" },
    "/partners": { en: "/partners", fr: "/partenaires" },
    "/contact": { en: "/contact", fr: "/contact" },
    "/privacy": { en: "/privacy", fr: "/confidentialite" },
  },
});

export type Locale = (typeof routing.locales)[number];
