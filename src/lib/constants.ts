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

export const IMPACT_STATS = {
  prizes: 800,
  students: 90_000,
  donations: 70_000,
  projects: 6,
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

export const PROJECTS = [
  {
    id: "endara-challenge",
    titleFr: "eNdara Challenge",
    titleEn: "eNdara Challenge",
    descFr:
      "Concours de créativité et d'innovation pour les jeunes — pensée critique et résolution de problèmes.",
    descEn:
      "Creativity and innovation competition for youth — critical thinking and problem solving.",
    category: "digital" as const,
    status: "active" as const,
    location: { lat: 4.3612, lng: 18.555, city: "Bangui" },
  },
  {
    id: "empowering-girls",
    titleFr: "Équiper nos jeunes filles",
    titleEn: "Empowering Young Girls",
    descFr:
      "Réduire les inégalités de genre grâce à l'éducation et l'autonomisation des jeunes filles.",
    descEn:
      "Reducing gender inequality through education and empowerment of young girls.",
    category: "girls" as const,
    status: "active" as const,
    location: { lat: 4.3612, lng: 18.555, city: "Bangui" },
  },
  {
    id: "fighting-illiteracy",
    titleFr: "Lutter contre l'illettrisme",
    titleEn: "Fighting Illiteracy",
    descFr:
      "Programmes d'alphabétisation pour enfants et adultes en Afrique centrale.",
    descEn:
      "Literacy programmes for children and adults across Central Africa.",
    category: "education" as const,
    status: "active" as const,
    location: { lat: 4.3612, lng: 18.555, city: "Bangui" },
  },
  {
    id: "tolerance-fair-play",
    titleFr: "Tolérance et fair-play",
    titleEn: "Tolerance and Fair Play",
    descFr:
      "Utiliser le sport comme vecteur de coopération interculturelle et de tolérance.",
    descEn:
      "Using sport as a vehicle for intercultural cooperation and tolerance.",
    category: "culture" as const,
    status: "active" as const,
    location: { lat: 4.3612, lng: 18.555, city: "Bangui" },
  },
  {
    id: "kaikelem",
    titleFr: "KAIKELEM",
    titleEn: "KAIKELEM",
    descFr:
      "Soutien aux veuves et orphelins en RCA — restaurer la dignité et l'espoir.",
    descEn:
      "Support for widows and orphans in CAR — restoring dignity and hope.",
    category: "solidarity" as const,
    status: "active" as const,
    location: { lat: 4.3612, lng: 18.555, city: "Bangui" },
  },
  {
    id: "digital-inclusion",
    titleFr: "Inclusion numérique",
    titleEn: "Digital Inclusion",
    descFr:
      "Plateforme eNdara : espace d'apprentissage virtuel, ateliers numériques sans frontières.",
    descEn:
      "eNdara platform: virtual learning space, borderless digital workshops.",
    category: "digital" as const,
    status: "active" as const,
    location: { lat: 4.3612, lng: 18.555, city: "Bangui" },
  },
] as const;
