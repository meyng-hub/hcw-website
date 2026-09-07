/**
 * GA4 / Google tag helpers.
 *
 * The whole integration is env-gated: with no NEXT_PUBLIC_GA_ID set, nothing is
 * rendered and every helper here is a no-op. That keeps preview deployments and
 * local dev free of analytics without any extra configuration.
 */

/**
 * GA4 measurement ID (format `G-XXXXXXXXXX`).
 *
 * `.trim()` is deliberate: a value piped into `vercel env add` with `echo`
 * instead of `printf` carries a trailing newline, which Vite/Next inlines
 * verbatim and which silently breaks the tag. Trimming makes that class of
 * mistake harmless.
 */
export const GA_ID = (process.env.NEXT_PUBLIC_GA_ID ?? "").trim();

export const isAnalyticsConfigured = GA_ID.length > 0;

/** localStorage key holding the visitor's cookie choice. */
export const CONSENT_STORAGE_KEY = "hcw-consent-v1";

/** Fired on `window` whenever the stored consent choice changes. */
export const CONSENT_CHANGE_EVENT = "hcw-consent-change";

export type ConsentChoice = "granted" | "denied";

type ConsentState = {
  ad_storage: ConsentChoice;
  ad_user_data: ConsentChoice;
  ad_personalization: ConsentChoice;
  analytics_storage: ConsentChoice;
};

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

function consentState(choice: ConsentChoice): ConsentState {
  return {
    ad_storage: choice,
    ad_user_data: choice,
    ad_personalization: choice,
    analytics_storage: choice,
  };
}

/** Reads the stored choice. Returns null when the visitor has not chosen yet. */
export function readStoredConsent(): ConsentChoice | null {
  if (typeof window === "undefined") return null;
  try {
    const value = window.localStorage.getItem(CONSENT_STORAGE_KEY);
    return value === "granted" || value === "denied" ? value : null;
  } catch {
    // Private mode / storage disabled — treat as "not chosen".
    return null;
  }
}

/** Persists the choice and pushes a Consent Mode v2 update to the Google tag. */
export function setConsent(choice: ConsentChoice): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(CONSENT_STORAGE_KEY, choice);
  } catch {
    // Storage unavailable: the update below still applies for this page view.
  }
  window.gtag?.("consent", "update", consentState(choice));
  window.dispatchEvent(new Event(CONSENT_CHANGE_EVENT));
}

/**
 * Sends a GA4 event. Safe to call unconditionally: no tag, no consent decision
 * or a blocked script simply means nothing happens.
 */
export function trackEvent(
  name: string,
  params: Record<string, unknown> = {},
): void {
  if (typeof window === "undefined" || !isAnalyticsConfigured) return;
  window.gtag?.("event", name, params);
}

/**
 * Forgets the stored choice and re-denies consent, so the banner can ask again.
 */
export function clearConsent(): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.removeItem(CONSENT_STORAGE_KEY);
  } catch {
    // Storage unavailable — the denial below still applies for this page view.
  }
  window.gtag?.("consent", "update", consentState("denied"));
  window.dispatchEvent(new Event(CONSENT_CHANGE_EVENT));
}

/* -------------------------------------------------------------------------- */
/* useSyncExternalStore adapter                                               */
/* -------------------------------------------------------------------------- */

/**
 * The consent choice is external state (localStorage), so components read it
 * through `useSyncExternalStore` rather than copying it into an effect. That
 * keeps the server and hydration renders consistent and means a change made
 * anywhere — the banner, the privacy page, another tab — updates every reader.
 */
export function subscribeConsent(onChange: () => void): () => void {
  window.addEventListener(CONSENT_CHANGE_EVENT, onChange);
  // Also react to a choice made in another tab.
  window.addEventListener("storage", onChange);
  return () => {
    window.removeEventListener(CONSENT_CHANGE_EVENT, onChange);
    window.removeEventListener("storage", onChange);
  };
}

/** `null` means the visitor has not decided yet. Returns a primitive, so it is
 * safe to call on every render. */
export function getConsentSnapshot(): ConsentChoice | null {
  return readStoredConsent();
}

/**
 * Server/hydration snapshot. Deliberately distinct from `null` so the banner
 * renders nothing on the server: the choice is unknowable there, and guessing
 * would flash a banner at visitors who already answered.
 */
export function getConsentServerSnapshot(): "unknown" {
  return "unknown";
}
