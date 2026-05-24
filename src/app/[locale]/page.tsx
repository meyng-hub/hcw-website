import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import HeroSection from "@/components/sections/HeroSection";
import ImpactCounter from "@/components/sections/ImpactCounter";
import CampaignProgress from "@/components/sections/CampaignProgress";
import ProjectsPreview from "@/components/sections/ProjectsPreview";
import DonateSection from "@/components/sections/DonateSection";
import NewsPreview from "@/components/sections/NewsPreview";
import PartnersStrip from "@/components/sections/PartnersStrip";
import PhotoGallery from "@/components/sections/PhotoGallery";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "hero" });
  return {
    title: "HCW — Humanity, Culture & Welfare",
    description: t("subheadline"),
  };
}

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ImpactCounter />
      <PhotoGallery />
      <CampaignProgress />
      <ProjectsPreview />
      <DonateSection />
      <NewsPreview />
      <PartnersStrip />
    </>
  );
}
