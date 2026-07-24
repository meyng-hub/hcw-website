/**
 * HCW brand mark — "Le H-Porte".
 * Two pillars forming an H whose centre is an arched doorway (amber) — the
 * founder's initial (Hervé-Charles Wenezoui) and the mission (education opens
 * a door) in one form. Icon only; pair with the "HCW" wordmark in Fraunces.
 *
 * Pillars follow the brand teal by default, or cream when `reversed` (for dark
 * grounds like the hero overlay and footer). The doorway arch is always amber.
 */
type HcwMarkProps = {
  className?: string;
  reversed?: boolean;
  /** Accessible label; omit (decorative) when a text wordmark sits beside it. */
  title?: string;
};

export default function HcwMark({
  className,
  reversed = false,
  title,
}: HcwMarkProps) {
  const pillar = reversed ? "#fdf8f0" : "#0d6e6e";
  return (
    <svg
      viewBox="0 0 64 64"
      className={className}
      role={title ? "img" : "presentation"}
      aria-label={title}
      aria-hidden={title ? undefined : true}
      focusable="false"
    >
      <rect x="13" y="12" width="8.5" height="40" rx="3" fill={pillar} />
      <rect x="42.5" y="12" width="8.5" height="40" rx="3" fill={pillar} />
      <path
        d="M21.5 52 V28 a10.5 10.5 0 0 1 21 0 V52"
        fill="none"
        stroke="#f5a623"
        strokeWidth="6"
        strokeLinejoin="round"
      />
    </svg>
  );
}
