"use client";

import Image from "next/image";
import { useState } from "react";
import { useLocale } from "next-intl";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

const GALLERY = [
  {
    src: "/images/project-girls.jpg",
    alt: "Jeunes filles lors d'un événement KAIKELEM à Bangui",
    captionFr: "Programme KAIKELEM — Bangui, RCA",
    captionEn: "KAIKELEM Programme — Bangui, CAR",
    rowSpan: false,
  },
  {
    src: "/images/endara-students.png",
    alt: "Élèves dans une salle de classe eNdara",
    captionFr: "Plateforme eNdara — salle de classe",
    captionEn: "eNdara Platform — classroom",
    rowSpan: true,
  },
  {
    src: "/images/project-kaikelem.jpg",
    alt: "Enfants recevant des cadeaux lors d'un événement HCW",
    captionFr: "Distribution de fournitures scolaires",
    captionEn: "School supplies distribution",
    rowSpan: false,
  },
  {
    src: "/images/hero-classroom.jpg",
    alt: "Enfants réunis dans une salle de classe avec le banner Bienvenue",
    captionFr: "Séance d'accueil des élèves — Bangui",
    captionEn: "Student welcome session — Bangui",
    rowSpan: false,
  },
  {
    src: "/images/team-community.jpg",
    alt: "Leaders communautaires lors d'un événement HCW",
    captionFr: "Partenaires communautaires en RCA",
    captionEn: "Community partners in CAR",
    rowSpan: false,
  },
];

export default function PhotoGallery() {
  const locale = useLocale();
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const prev = () =>
    setLightboxIndex((i) =>
      i !== null ? (i - 1 + GALLERY.length) % GALLERY.length : 0,
    );
  const next = () =>
    setLightboxIndex((i) =>
      i !== null ? (i + 1) % GALLERY.length : 0,
    );

  const isFr = locale === "fr";

  return (
    <>
      <section
        className="py-4 bg-charcoal-900"
        aria-label={isFr ? "Galerie photos" : "Photo gallery"}
      >
        {/* Section header */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-teal-400 mb-2">
            {isFr ? "Notre action sur le terrain" : "Our field action"}
          </p>
          <h2 className="font-serif text-3xl font-bold text-white sm:text-4xl">
            {isFr ? "HCW en images" : "HCW in pictures"}
          </h2>
        </div>

        {/* Masonry-style grid */}
        <div className="mx-auto max-w-7xl px-2 sm:px-4 lg:px-8">
          <div className="grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-5 auto-rows-[200px]">
            {GALLERY.map((photo, index) => (
              <button
                key={photo.src}
                onClick={() => setLightboxIndex(index)}
                className={`group relative overflow-hidden rounded-lg bg-gray-800 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:ring-offset-2 focus:ring-offset-charcoal-900${
                  photo.rowSpan ? " md:row-span-2" : ""
                }`}
                aria-label={isFr ? photo.captionFr : photo.captionEn}
              >
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                />
                {/* Hover caption overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3">
                  <p className="text-xs font-medium text-white">
                    {isFr ? photo.captionFr : photo.captionEn}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Link to full gallery / Facebook */}
        <div className="text-center mt-8 pb-8">
          <a
            href="https://www.facebook.com/HCW09"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg border border-teal-600 px-6 py-2.5 text-sm font-medium text-teal-400 transition-colors hover:bg-teal-600 hover:text-white"
          >
            {isFr
              ? "Voir toutes nos photos sur Facebook →"
              : "See all our photos on Facebook →"}
          </a>
        </div>
      </section>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
          role="dialog"
          aria-modal="true"
          aria-label={isFr ? "Visionneuse de photos" : "Photo viewer"}
          onClick={() => setLightboxIndex(null)}
        >
          <button
            onClick={(e) => {
              e.stopPropagation();
              prev();
            }}
            className="absolute left-4 p-2 rounded-full bg-white/20 text-white hover:bg-white/30 transition-colors"
            aria-label={isFr ? "Photo précédente" : "Previous photo"}
          >
            <ChevronLeft className="h-6 w-6" />
          </button>

          <div
            className="relative max-h-[85vh] max-w-5xl w-full mx-16"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full h-[70vh]">
              <Image
                src={GALLERY[lightboxIndex].src}
                alt={GALLERY[lightboxIndex].alt}
                fill
                className="object-contain"
                sizes="90vw"
                priority
              />
            </div>
            <p className="text-center text-sm text-gray-300 mt-3">
              {isFr
                ? GALLERY[lightboxIndex].captionFr
                : GALLERY[lightboxIndex].captionEn}
            </p>
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              next();
            }}
            className="absolute right-4 p-2 rounded-full bg-white/20 text-white hover:bg-white/30 transition-colors"
            aria-label={isFr ? "Photo suivante" : "Next photo"}
          >
            <ChevronRight className="h-6 w-6" />
          </button>

          <button
            onClick={() => setLightboxIndex(null)}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/20 text-white hover:bg-white/30 transition-colors"
            aria-label={isFr ? "Fermer" : "Close"}
          >
            <X className="h-6 w-6" />
          </button>
        </div>
      )}
    </>
  );
}
