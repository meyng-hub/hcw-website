"use client";

import dynamic from "next/dynamic";

interface ProjectPin {
  id: string;
  title: string;
  category: string;
  location: { lat: number; lng: number; city: string };
}

interface Props {
  projects: ProjectPin[];
  locationLabel: string;
}

// Leaflet uses `window` — must be dynamically imported with ssr:false from a Client Component
const ProjectMap = dynamic(() => import("./ProjectMap"), {
  ssr: false,
  loading: () => (
    <div className="flex h-96 w-full items-center justify-center rounded-xl bg-teal-50">
      <p className="animate-pulse text-sm text-teal-600">
        Chargement de la carte…
      </p>
    </div>
  ),
});

export default function ProjectMapWrapper({ projects, locationLabel }: Props) {
  return <ProjectMap projects={projects} locationLabel={locationLabel} />;
}
