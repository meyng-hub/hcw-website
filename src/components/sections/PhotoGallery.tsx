"use client";

import Image from "next/image";
import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { gallery, pickLocale } from "@/lib/content";

export default function PhotoGallery() {
  const locale = useLocale();
  const t = useTranslations("gallery");
  const common = useTranslations("common");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const prev = () =>
    setLightboxIndex((i) =>
      i !== null ? (i - 1 + gallery.length) % gallery.length : 0,
    );
  const next = () =>
    setLightboxIndex((i) =>
      i !== null ? (i + 1) % gallery.length : 0,
    );

  return (
    <>
      <section
        className="py-4 bg-charcoal-900"
        aria-label={t("aria_label")}
      >
        {/* Section header */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-teal-400 mb-2">
            {t("kicker")}
          </p>
          <h2 className="font-serif text-3xl font-bold text-white sm:text-4xl">
            {t("title")}
          </h2>
        </div>

        {/* Masonry-style grid */}
        <div className="mx-auto max-w-7xl px-2 sm:px-4 lg:px-8">
          <div className="grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-5 auto-rows-[200px]">
            {gallery.map((photo, index) => (
              <button
                key={photo.src}
                onClick={() => setLightboxIndex(index)}
                className={`group relative overflow-hidden rounded-lg bg-gray-800 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:ring-offset-2 focus:ring-offset-charcoal-900${
                  photo.rowSpan ? " md:row-span-2" : ""
                }`}
                aria-label={pickLocale(photo.caption, locale)}
              >
                <Image
                  src={photo.src}
                  alt={pickLocale(photo.alt, locale)}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                />
                {/* Hover caption overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3">
                  <p className="text-xs font-medium text-white">
                    {pickLocale(photo.caption, locale)}
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
            {t("facebook_cta")}
          </a>
        </div>
      </section>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
          role="dialog"
          aria-modal="true"
          aria-label={t("viewer_label")}
          onClick={() => setLightboxIndex(null)}
        >
          <button
            onClick={(e) => {
              e.stopPropagation();
              prev();
            }}
            className="absolute left-4 p-2 rounded-full bg-white/20 text-white hover:bg-white/30 transition-colors"
            aria-label={t("prev")}
          >
            <ChevronLeft className="h-6 w-6" />
          </button>

          <div
            className="relative max-h-[85vh] max-w-5xl w-full mx-16"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full h-[70vh]">
              <Image
                src={gallery[lightboxIndex].src}
                alt={pickLocale(gallery[lightboxIndex].alt, locale)}
                fill
                className="object-contain"
                sizes="90vw"
                priority
              />
            </div>
            <p className="text-center text-sm text-gray-300 mt-3">
              {pickLocale(gallery[lightboxIndex].caption, locale)}
            </p>
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              next();
            }}
            className="absolute right-4 p-2 rounded-full bg-white/20 text-white hover:bg-white/30 transition-colors"
            aria-label={t("next")}
          >
            <ChevronRight className="h-6 w-6" />
          </button>

          <button
            onClick={() => setLightboxIndex(null)}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/20 text-white hover:bg-white/30 transition-colors"
            aria-label={common("close")}
          >
            <X className="h-6 w-6" />
          </button>
        </div>
      )}
    </>
  );
}
