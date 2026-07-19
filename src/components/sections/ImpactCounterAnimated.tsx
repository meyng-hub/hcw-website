"use client";

import { useEffect, useRef, useState } from "react";

interface ImpactCounterAnimatedProps {
  value: number;
  suffix?: string;
  label: string;
  icon?: React.ReactNode;
  duration?: number;
}

// SSR fallback: render the final value immediately; the count-up from 0 is a
// progressive enhancement that only runs once the observer marks it started.
function useCountUp(
  target: number,
  duration: number,
  started: boolean,
): number {
  const [count, setCount] = useState(target);

  useEffect(() => {
    if (!started) return;
    let current = 0;
    setCount(0);
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      current += step;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [target, duration, started]);

  return count;
}

export default function ImpactCounterAnimated({
  value,
  suffix = "",
  label,
  icon,
  duration = 2200,
}: ImpactCounterAnimatedProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [started, setStarted] = useState(false);
  const count = useCountUp(value, duration, started);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // No observer support or reduced motion: keep the final value, no animation.
    if (
      typeof IntersectionObserver === "undefined" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="flex flex-col items-center rounded-2xl bg-white p-8 shadow-sm ring-1 ring-teal-100 transition-all hover:shadow-md hover:ring-teal-200"
    >
      {icon && (
        <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-teal-50 text-teal-600">
          {icon}
        </div>
      )}
      <div className="font-serif text-4xl font-bold tabular-nums text-charcoal-900">
        {count.toLocaleString()}
        {suffix}
      </div>
      <div className="mt-2 text-center text-sm text-gray-500">{label}</div>
    </div>
  );
}
