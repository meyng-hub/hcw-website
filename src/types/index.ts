export interface Project {
  _id: string;
  slug: string;
  title: { fr: string; en: string };
  description: { fr: string; en: string };
  category: "education" | "girls" | "digital" | "culture" | "solidarity";
  status: "active" | "completed" | "ongoing";
  location?: { lat: number; lng: number; city: string };
  image?: string;
  donateUrl?: string;
}

export interface NewsArticle {
  _id: string;
  slug: string;
  title: { fr: string; en: string };
  excerpt: { fr: string; en: string };
  content: { fr: string; en: string };
  publishedAt: string;
  image?: string;
  tags?: string[];
}

export interface Campaign {
  _id: string;
  title: { fr: string; en: string };
  subtitle: { fr: string; en: string };
  goalAmount: number;
  raisedAmount: number;
  donorCount: number;
  endsAt?: string;
  active: boolean;
}

export interface DonationTier {
  amount: number;
  labelKey: string;
  descKey: string;
}

export interface ShopProduct {
  _id: string;
  name: { fr: string; en: string };
  description: { fr: string; en: string };
  price: number;
  currency: string;
  image?: string;
  printfulId?: string;
  stripeProductId?: string;
}

export interface VolunteerForm {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  skills: string;
  availability: "remote" | "onsite" | "both";
  message?: string;
}

export interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
}
