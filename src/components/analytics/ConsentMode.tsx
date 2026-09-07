import { CONSENT_STORAGE_KEY } from "@/lib/analytics";

/**
 * Google Consent Mode v2 defaults.
 *
 * Rendered only when a GA measurement ID is configured: with the tag off there
 * is nothing to consent to, so the site ships no analytics code at all.
 *
 * Rendered as a plain inline <script> rather than next/script on purpose: it has
 * to execute in document order, BEFORE the `gtag('config', ...)` call that
 * <GoogleAnalytics> injects with the afterInteractive strategy. If the defaults
 * landed after the config call, the first page view would be measured with
 * consent implicitly granted — which is exactly what French law does not allow.
 *
 * Everything defaults to "denied": until the visitor accepts, the Google tag
 * sends cookieless pings only and sets no identifier. A previously stored
 * "granted" choice is replayed synchronously here so returning visitors are not
 * downgraded for the first few hundred milliseconds of every page view.
 */
export default function ConsentMode() {
  const script = `
(function(){
  window.dataLayer = window.dataLayer || [];
  function gtag(){window.dataLayer.push(arguments);}
  window.gtag = window.gtag || gtag;
  gtag('consent', 'default', {
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
    analytics_storage: 'denied',
    wait_for_update: 500
  });
  gtag('set', 'ads_data_redaction', true);
  var stored = null;
  try { stored = window.localStorage.getItem(${JSON.stringify(CONSENT_STORAGE_KEY)}); } catch (e) {}
  if (stored === 'granted') {
    gtag('consent', 'update', {
      ad_storage: 'granted',
      ad_user_data: 'granted',
      ad_personalization: 'granted',
      analytics_storage: 'granted'
    });
  }
})();`.trim();

  return (
    <script
      id="google-consent-mode"
      dangerouslySetInnerHTML={{ __html: script }}
    />
  );
}
