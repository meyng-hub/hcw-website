"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import { MessageCircle, Heart, Send } from "lucide-react";
import { SOCIAL, CONTACT } from "@/lib/constants";

/* ---------- Inline SVG brand icons (not in lucide-react) ---------- */
function FbIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className="h-4 w-4"
      aria-hidden="true"
    >
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}
function IgIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4"
      aria-hidden="true"
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}
function YtIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className="h-4 w-4"
      aria-hidden="true"
    >
      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
      <polygon fill="white" points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" />
    </svg>
  );
}
function XIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className="h-4 w-4"
      aria-hidden="true"
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}
/* ------------------------------------------------------------------ */

const SOCIAL_LINKS = [
  { href: SOCIAL.facebook, Icon: FbIcon, label: "Facebook" },
  { href: SOCIAL.instagram, Icon: IgIcon, label: "Instagram" },
  { href: SOCIAL.youtube, Icon: YtIcon, label: "YouTube" },
  { href: SOCIAL.twitter, Icon: XIcon, label: "X / Twitter" },
  { href: SOCIAL.whatsapp, Icon: MessageCircle, label: "WhatsApp" },
] as const;

export default function Footer() {
  const t = useTranslations();
  const locale = useLocale();
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleNewsletter = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Brevo API call
    setSubscribed(true);
    setEmail("");
  };

  return (
    <footer
      className="bg-charcoal-900 text-white"
      aria-labelledby="footer-heading"
    >
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>

      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-4">
          {/* Brand column */}
          <div className="lg:col-span-1">
            <div className="mb-4 flex items-center gap-3">
              <div className="relative h-10 w-16">
                <Image
                  src="/images/hcw-logo.png"
                  alt="HCW logo"
                  fill
                  className="object-contain brightness-0 invert"
                />
              </div>
              <span className="font-serif text-xl font-semibold">HCW</span>
            </div>
            <p className="mb-2 text-sm leading-relaxed text-gray-400">
              Humanity · Culture · Welfare
            </p>
            <p className="mb-6 text-xs font-medium italic text-amber-500">
              &ldquo;{t("footer.tagline")}&rdquo;
            </p>
            <p className="text-xs text-gray-500">{t("footer.founded")}</p>

            {/* Social links */}
            <div className="mt-6 flex gap-3" aria-label="Réseaux sociaux">
              {SOCIAL_LINKS.map(({ href, Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-gray-400 transition-colors hover:bg-teal-600 hover:text-white"
                >
                  <Icon />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-300">
              {t("footer.nav_title")}
            </h3>
            <ul className="space-y-2" role="list">
              {[
                { href: "/about", key: "about" },
                { href: "/projects", key: "projects" },
                { href: "/impact", key: "impact" },
                { href: "/news", key: "news" },
                { href: "/shop", key: "shop" },
                { href: "/volunteer", key: "volunteer" },
                { href: "/partners", key: "partners" },
                { href: "/contact", key: "contact" },
              ].map(({ href, key }) => (
                <li key={href}>
                  <Link
                    href={`/${locale}${href}`}
                    className="text-sm text-gray-400 transition-colors hover:text-white"
                  >
                    {t(`nav.${key}` as Parameters<typeof t>[0])}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-300">
              {t("contact.title")}
            </h3>
            <div className="space-y-4 text-sm text-gray-400">
              <div>
                <p className="mb-1 font-medium text-gray-300">
                  {t("contact.france_office")}
                </p>
                <p className="leading-relaxed">{CONTACT.france}</p>
              </div>
              <div>
                <p className="mb-1 font-medium text-gray-300">
                  {t("contact.car_office")}
                </p>
                <p className="leading-relaxed">{CONTACT.car}</p>
              </div>
              <a
                href={`mailto:${CONTACT.email}`}
                className="block transition-colors hover:text-teal-400"
              >
                {CONTACT.email}
              </a>
              <a
                href={SOCIAL.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-green-400 transition-colors hover:text-green-300"
              >
                <MessageCircle className="h-4 w-4" />
                WhatsApp
              </a>
            </div>
          </div>

          {/* Newsletter + Donate */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-300">
              {t("footer.newsletter_title")}
            </h3>
            {subscribed ? (
              <p className="flex items-center gap-2 text-sm text-teal-400">
                <Heart className="h-4 w-4" />
                {t("footer.newsletter_success")}
              </p>
            ) : (
              <form onSubmit={handleNewsletter} className="space-y-3">
                <div className="flex gap-2">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={t("footer.newsletter_placeholder")}
                    required
                    className="flex-1 rounded-lg bg-white/10 px-3 py-2 text-sm text-white placeholder-gray-500 outline-none focus:ring-2 focus:ring-teal-500"
                    aria-label={t("footer.newsletter_placeholder")}
                  />
                  <button
                    type="submit"
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-teal-600 text-white transition-colors hover:bg-teal-500"
                    aria-label={t("footer.newsletter_submit")}
                  >
                    <Send className="h-4 w-4" />
                  </button>
                </div>
                <p className="text-xs text-gray-500">{t("footer.gdpr_note")}</p>
              </form>
            )}

            {/* Donate CTA */}
            <div className="mt-8 rounded-xl bg-gradient-to-br from-teal-600 to-teal-800 p-5">
              <p className="mb-1 text-sm font-semibold text-white">
                {t("footer.take_action")}
              </p>
              <p className="mb-3 text-xs text-teal-200">
                {t("footer.every_euro")}
              </p>
              <Link
                href={`/${locale}/donate`}
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-amber-500 py-2 text-sm font-semibold text-white transition-colors hover:bg-amber-600"
              >
                <Heart className="h-4 w-4" />
                {t("common.donate_now")}
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-xs text-gray-500 sm:flex-row">
          <p>
            © {new Date().getFullYear()} HCW — {t("footer.rights")} ·{" "}
            {t("footer.registration")}
          </p>
          <div className="flex gap-4">
            <Link
              href={`/${locale}/legal`}
              className="transition-colors hover:text-gray-300"
            >
              {t("footer.legal")}
            </Link>
            <Link
              href={`/${locale}/privacy`}
              className="transition-colors hover:text-gray-300"
            >
              {t("footer.privacy")}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
