export const SITE_NAME = "HCW — Humanity, Culture & Welfare";
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.h-cw.org";

export const SOCIAL = {
  facebook: "https://www.facebook.com/HCW09",
  instagram: "https://www.instagram.com/hcw_09",
  youtube: "https://www.youtube.com/channel/UCY5U9cjBqTTsteXege356Hg",
  twitter: "https://twitter.com/09Hcw",
  whatsapp: "https://wa.me/33661935017",
} as const;

export const CONTACT = {
  email: "contact@h-cw.org",
  phoneDisplay: "+33 6 61 93 50 17",
  whatsapp: "+33661935017",
  france: "13, rue Anatole France, 60290 Rantigny, France",
  car: "Quartier Sica 1, Bangui, République Centrafricaine",
} as const;

// Donation impact mapping (amount in EUR → i18n key)
export const DONATION_IMPACT: Record<number, string> = {
  20: "impact_calculator.impact_20",
  50: "impact_calculator.impact_50",
  100: "impact_calculator.impact_100",
  200: "impact_calculator.impact_200",
  500: "impact_calculator.impact_500",
  1000: "impact_calculator.impact_1000",
};

export const DONATION_PRESETS = [20, 50, 100, 500];
