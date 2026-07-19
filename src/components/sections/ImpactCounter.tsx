"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { stats } from "@/lib/content";
import { Trophy, Users, Heart, Layers } from "lucide-react";

// SSR fallback: render the final value immediately; the count-up from 0 is a
// progressive enhancement that only runs once the observer marks it started.
function useCountUp(target: number, duration = 2000, started: boolean) {
  const [count, setCount] = useState(target);
  useEffect(() => {
    if (!started) return;
    let start = 0;
    setCount(0);
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [target, duration, started]);
  return count;
}

function StatCard({
  value,
  label,
  icon: Icon,
  suffix = "",
  started,
}: {
  value: number;
  label: string;
  icon: React.ElementType;
  suffix?: string;
  started: boolean;
}) {
  const count = useCountUp(value, 2200, started);
  return (
    <div className="flex flex-col items-center rounded-2xl bg-white p-8 shadow-sm ring-1 ring-teal-100 hover:shadow-md hover:ring-teal-200 transition-all">
      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-teal-50 text-teal-600">
        <Icon className="h-7 w-7" aria-hidden="true" />
      </div>
      <div className="font-serif text-4xl font-bold text-charcoal-900 tabular-nums">
        {count.toLocaleString()}
        {suffix}
      </div>
      <div className="mt-2 text-center text-sm text-gray-500">{label}</div>
    </div>
  );
}

export default function ImpactCounter() {
  const t = useTranslations("impact");
  const ref = useRef<HTMLDivElement>(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    // No observer support or reduced motion: keep the final value, no animation.
    if (
      typeof IntersectionObserver === "undefined" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setStarted(true);
      },
      { threshold: 0.3 },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      className="relative overflow-hidden py-24"
      aria-labelledby="impact-heading"
    >
      {/* Subtle classroom photo background */}
      <Image
        src="/images/hero-classroom.jpg"
        alt=""
        fill
        className="object-cover object-center opacity-10"
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-cream-50/90" aria-hidden="true" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h2
            id="impact-heading"
            className="font-serif text-3xl font-bold text-charcoal-900 sm:text-4xl"
          >
            {t("title")}
          </h2>
          <p className="mt-3 text-sm text-gray-500">{t("updated")}</p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4" role="list">
          <StatCard
            value={stats.prizes}
            label={t("prizes")}
            icon={Trophy}
            started={started}
          />
          <StatCard
            value={stats.students}
            label={t("students")}
            icon={Users}
            started={started}
            suffix="+"
          />
          <StatCard
            value={stats.donations}
            label={t("donations")}
            icon={Heart}
            started={started}
            suffix="+"
          />
          <StatCard
            value={stats.projects}
            label={t("projects")}
            icon={Layers}
            started={started}
          />
        </div>
      </div>
    </section>
  );
}
