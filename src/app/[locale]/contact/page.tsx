"use client";

import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  MapPin,
  Mail,
  Phone,
  MessageCircle,
  CheckCircle,
  AlertCircle,
  Send,
  ExternalLink,
} from "lucide-react";
import { CONTACT, SOCIAL } from "@/lib/constants";

/* ── Zod schema ── */
const contactSchema = z.object({
  name: z.string().min(2, "name_required"),
  email: z.string().email("email_invalid"),
  subject: z.enum(
    ["general", "partnership", "press", "volunteer", "donation"],
    { error: () => ({ message: "subject_required" }) },
  ),
  message: z.string().min(20, "message_min"),
});

type ContactFormValues = z.infer<typeof contactSchema>;

/* ── Social SVG icons (not available in lucide-react) ── */
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

/* ── Form field wrapper ── */
function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p
      id={id}
      role="alert"
      className="mt-1.5 flex items-center gap-1.5 text-xs text-red-600"
    >
      <AlertCircle className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
      {message}
    </p>
  );
}

/* ── Main component ── */
export default function ContactPage() {
  const t = useTranslations("contact");
  const locale = useLocale();
  const isFr = locale === "fr";

  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [serverError, setServerError] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
  });

  /* Error message resolver */
  const errorMsg = (key: string | undefined) => {
    if (!key) return undefined;
    const map: Record<string, string> = {
      name_required: isFr
        ? "Le nom est requis (min. 2 caractères)"
        : "Name is required (min. 2 characters)",
      email_invalid: isFr ? "Adresse email invalide" : "Invalid email address",
      subject_required: isFr
        ? "Veuillez choisir un sujet"
        : "Please choose a subject",
      message_min: isFr
        ? "Le message doit contenir au moins 20 caractères"
        : "Message must be at least 20 characters",
    };
    return map[key] ?? key;
  };

  const onSubmit = async (data: ContactFormValues) => {
    setStatus("loading");
    setServerError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const json = (await res.json()) as { error?: string };
        throw new Error(json.error ?? "Unknown error");
      }
      setStatus("success");
      reset();
    } catch (error: unknown) {
      const msg = error instanceof Error ? error.message : String(error);
      setServerError(msg);
      setStatus("error");
    }
  };

  const SUBJECTS = [
    { value: "general", fr: "Question générale", en: "General enquiry" },
    { value: "partnership", fr: "Partenariat", en: "Partnership" },
    { value: "press", fr: "Presse / Médias", en: "Press / Media" },
    { value: "volunteer", fr: "Bénévolat", en: "Volunteering" },
    { value: "donation", fr: "Don / Financement", en: "Donation / Funding" },
  ] as const;

  return (
    <>
      {/* ── Page hero ── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-teal-700 to-charcoal-900 pt-32 pb-16 text-white">
        <div className="pointer-events-none absolute -top-20 -right-20 h-80 w-80 rounded-full border border-white/10" />
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h1 className="font-serif text-5xl font-bold tracking-tight">
            {t("title")}
          </h1>
          <p className="mt-4 text-lg text-teal-100">
            {isFr
              ? "Une question, un projet ou envie de nous rejoindre ? Écrivez-nous."
              : "A question, a project, or want to join us? Write to us."}
          </p>
        </div>
      </section>

      {/* ── Split layout ── */}
      <section className="bg-cream-50 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            {/* ── Left: contact info ── */}
            <div className="space-y-6">
              <div>
                <div className="mb-3 h-1 w-10 rounded bg-teal-600" />
                <h2 className="font-serif text-2xl font-bold text-charcoal-900">
                  {isFr ? "Coordonnées" : "Get in touch"}
                </h2>
              </div>

              {/* France office */}
              <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-100">
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-teal-50">
                    <MapPin
                      className="h-5 w-5 text-teal-600"
                      aria-hidden="true"
                    />
                  </div>
                  <div>
                    <p className="font-semibold text-charcoal-900">
                      {t("france_office")}
                    </p>
                    <p className="mt-1 text-sm text-gray-500">
                      {CONTACT.france}
                    </p>
                  </div>
                </div>
              </div>

              {/* CAR office */}
              <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-100">
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-50">
                    <MapPin
                      className="h-5 w-5 text-amber-500"
                      aria-hidden="true"
                    />
                  </div>
                  <div>
                    <p className="font-semibold text-charcoal-900">
                      {t("car_office")}
                    </p>
                    <p className="mt-1 text-sm text-gray-500">{CONTACT.car}</p>
                  </div>
                </div>
              </div>

              {/* Email */}
              <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-100">
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-teal-50">
                    <Mail
                      className="h-5 w-5 text-teal-600"
                      aria-hidden="true"
                    />
                  </div>
                  <div>
                    <p className="font-semibold text-charcoal-900">
                      {t("email")}
                    </p>
                    <a
                      href={`mailto:${CONTACT.email}`}
                      className="mt-1 text-sm text-teal-600 hover:text-teal-700 transition-colors"
                    >
                      {CONTACT.email}
                    </a>
                  </div>
                </div>
              </div>

              {/* Phone */}
              <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-100">
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-teal-50">
                    <Phone
                      className="h-5 w-5 text-teal-600"
                      aria-hidden="true"
                    />
                  </div>
                  <div>
                    <p className="font-semibold text-charcoal-900">
                      {t("phone")}
                    </p>
                    <a
                      href={`tel:${CONTACT.whatsapp}`}
                      className="mt-1 text-sm text-teal-600 hover:text-teal-700 transition-colors"
                    >
                      {CONTACT.phoneDisplay}
                    </a>
                  </div>
                </div>
              </div>

              {/* WhatsApp */}
              <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-100">
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-green-50">
                    <MessageCircle
                      className="h-5 w-5 text-green-600"
                      aria-hidden="true"
                    />
                  </div>
                  <div>
                    <p className="font-semibold text-charcoal-900">
                      {t("whatsapp")}
                    </p>
                    <a
                      href={SOCIAL.whatsapp}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-1 flex items-center gap-1 text-sm text-green-600 hover:text-green-700 transition-colors"
                    >
                      {CONTACT.phoneDisplay}
                      <ExternalLink className="h-3 w-3" aria-hidden="true" />
                    </a>
                  </div>
                </div>
              </div>

              {/* Social links */}
              <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-100">
                <p className="mb-4 font-semibold text-charcoal-900">
                  {isFr ? "Réseaux sociaux" : "Social media"}
                </p>
                <div
                  className="flex gap-3"
                  aria-label={isFr ? "Réseaux sociaux" : "Social media links"}
                >
                  {[
                    { href: SOCIAL.facebook, Icon: FbIcon, label: "Facebook" },
                    {
                      href: SOCIAL.instagram,
                      Icon: IgIcon,
                      label: "Instagram",
                    },
                    { href: SOCIAL.youtube, Icon: YtIcon, label: "YouTube" },
                    { href: SOCIAL.twitter, Icon: XIcon, label: "X / Twitter" },
                  ].map(({ href, Icon, label }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-gray-500 transition-colors hover:bg-teal-600 hover:text-white"
                    >
                      <Icon />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* ── Right: contact form ── */}
            <div>
              <div className="rounded-2xl bg-white p-8 shadow-sm ring-1 ring-gray-100">
                <div className="mb-6">
                  <div className="mb-3 h-1 w-10 rounded bg-amber-500" />
                  <h2 className="font-serif text-2xl font-bold text-charcoal-900">
                    {isFr ? "Envoyer un message" : "Send a message"}
                  </h2>
                  <p className="mt-2 text-sm text-gray-500">
                    {isFr
                      ? "Nous répondons dans les 48 heures ouvrées."
                      : "We reply within 48 working hours."}
                  </p>
                </div>

                {/* Success state */}
                {status === "success" && (
                  <div
                    role="status"
                    aria-live="polite"
                    className="mb-6 flex items-start gap-3 rounded-xl bg-green-50 p-4 text-green-800"
                  >
                    <CheckCircle
                      className="mt-0.5 h-5 w-5 shrink-0 text-green-600"
                      aria-hidden="true"
                    />
                    <div>
                      <p className="font-semibold">
                        {isFr ? "Message envoyé !" : "Message sent!"}
                      </p>
                      <p className="text-sm">{t("form_success")}</p>
                    </div>
                  </div>
                )}

                {/* Server error state */}
                {status === "error" && serverError && (
                  <div
                    role="alert"
                    aria-live="assertive"
                    className="mb-6 flex items-start gap-3 rounded-xl bg-red-50 p-4 text-red-800"
                  >
                    <AlertCircle
                      className="mt-0.5 h-5 w-5 shrink-0 text-red-600"
                      aria-hidden="true"
                    />
                    <p className="text-sm">{serverError}</p>
                  </div>
                )}

                <form
                  onSubmit={handleSubmit(onSubmit)}
                  noValidate
                  aria-label={isFr ? "Formulaire de contact" : "Contact form"}
                >
                  <div className="space-y-5">
                    {/* Name */}
                    <div>
                      <label
                        htmlFor="contact-name"
                        className="mb-1.5 block text-sm font-medium text-charcoal-900"
                      >
                        {t("form_name")}
                        <span className="ml-1 text-red-500" aria-hidden="true">
                          *
                        </span>
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        autoComplete="name"
                        aria-required="true"
                        aria-describedby={
                          errors.name ? "name-error" : undefined
                        }
                        aria-invalid={!!errors.name}
                        {...register("name")}
                        className={`w-full rounded-xl border px-4 py-3 text-sm text-charcoal-900 outline-none transition-colors focus:ring-2 focus:ring-teal-500 ${
                          errors.name
                            ? "border-red-300 bg-red-50 focus:ring-red-400"
                            : "border-gray-200 bg-gray-50 focus:border-teal-300 focus:bg-white"
                        }`}
                        placeholder={
                          isFr ? "Votre nom complet" : "Your full name"
                        }
                      />
                      <FieldError
                        id="name-error"
                        message={errorMsg(errors.name?.message)}
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <label
                        htmlFor="contact-email"
                        className="mb-1.5 block text-sm font-medium text-charcoal-900"
                      >
                        {t("form_email")}
                        <span className="ml-1 text-red-500" aria-hidden="true">
                          *
                        </span>
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        autoComplete="email"
                        aria-required="true"
                        aria-describedby={
                          errors.email ? "email-error" : undefined
                        }
                        aria-invalid={!!errors.email}
                        {...register("email")}
                        className={`w-full rounded-xl border px-4 py-3 text-sm text-charcoal-900 outline-none transition-colors focus:ring-2 focus:ring-teal-500 ${
                          errors.email
                            ? "border-red-300 bg-red-50 focus:ring-red-400"
                            : "border-gray-200 bg-gray-50 focus:border-teal-300 focus:bg-white"
                        }`}
                        placeholder={
                          isFr ? "votre@email.com" : "your@email.com"
                        }
                      />
                      <FieldError
                        id="email-error"
                        message={errorMsg(errors.email?.message)}
                      />
                    </div>

                    {/* Subject */}
                    <div>
                      <label
                        htmlFor="contact-subject"
                        className="mb-1.5 block text-sm font-medium text-charcoal-900"
                      >
                        {t("form_subject")}
                        <span className="ml-1 text-red-500" aria-hidden="true">
                          *
                        </span>
                      </label>
                      <select
                        id="contact-subject"
                        aria-required="true"
                        aria-describedby={
                          errors.subject ? "subject-error" : undefined
                        }
                        aria-invalid={!!errors.subject}
                        {...register("subject")}
                        className={`w-full rounded-xl border px-4 py-3 text-sm text-charcoal-900 outline-none transition-colors focus:ring-2 focus:ring-teal-500 ${
                          errors.subject
                            ? "border-red-300 bg-red-50 focus:ring-red-400"
                            : "border-gray-200 bg-gray-50 focus:border-teal-300 focus:bg-white"
                        }`}
                        defaultValue=""
                      >
                        <option value="" disabled>
                          {isFr ? "Choisir un sujet…" : "Choose a subject…"}
                        </option>
                        {SUBJECTS.map(({ value, fr, en }) => (
                          <option key={value} value={value}>
                            {isFr ? fr : en}
                          </option>
                        ))}
                      </select>
                      <FieldError
                        id="subject-error"
                        message={errorMsg(errors.subject?.message)}
                      />
                    </div>

                    {/* Message */}
                    <div>
                      <label
                        htmlFor="contact-message"
                        className="mb-1.5 block text-sm font-medium text-charcoal-900"
                      >
                        {t("form_message")}
                        <span className="ml-1 text-red-500" aria-hidden="true">
                          *
                        </span>
                      </label>
                      <textarea
                        id="contact-message"
                        rows={5}
                        aria-required="true"
                        aria-describedby={
                          errors.message ? "message-error" : undefined
                        }
                        aria-invalid={!!errors.message}
                        {...register("message")}
                        className={`w-full resize-none rounded-xl border px-4 py-3 text-sm text-charcoal-900 outline-none transition-colors focus:ring-2 focus:ring-teal-500 ${
                          errors.message
                            ? "border-red-300 bg-red-50 focus:ring-red-400"
                            : "border-gray-200 bg-gray-50 focus:border-teal-300 focus:bg-white"
                        }`}
                        placeholder={
                          isFr
                            ? "Décrivez votre demande en quelques lignes… (min. 20 caractères)"
                            : "Describe your request in a few lines… (min. 20 characters)"
                        }
                      />
                      <FieldError
                        id="message-error"
                        message={errorMsg(errors.message?.message)}
                      />
                    </div>

                    {/* Submit */}
                    <button
                      type="submit"
                      disabled={status === "loading"}
                      className="flex w-full items-center justify-center gap-2 rounded-xl bg-teal-600 px-6 py-3.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-teal-700 hover:shadow-md active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {status === "loading" ? (
                        <>
                          <span
                            className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white"
                            aria-hidden="true"
                          />
                          {isFr ? "Envoi en cours…" : "Sending…"}
                        </>
                      ) : (
                        <>
                          <Send className="h-4 w-4" aria-hidden="true" />
                          {t("form_submit")}
                        </>
                      )}
                    </button>

                    <p className="text-center text-xs text-gray-400">
                      {isFr
                        ? "Données protégées conformément au RGPD."
                        : "Data protected in compliance with GDPR."}
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
