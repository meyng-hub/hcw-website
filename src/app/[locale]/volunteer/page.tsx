"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { MessageCircle, Globe, Heart, Laptop } from "lucide-react";

const WHATSAPP_URL =
  "https://wa.me/33661935017?text=Je%20souhaite%20devenir%20b%C3%A9n%C3%A9vole%20pour%20HCW";

// ── Zod schema ──────────────────────────────────────────────────────────────
const volunteerSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email"),
  phone: z.string().optional(),
  role: z.enum(["communication", "education", "it", "fundraising", "other"]),
  availability: z.enum(["weekend", "evenings", "fulltime", "occasional"]),
  motivation: z.string().min(50, "Please write at least 50 characters"),
  whatsappConsent: z.boolean().optional(),
});

type VolunteerFormValues = z.infer<typeof volunteerSchema>;

// ── Sub-components ───────────────────────────────────────────────────────────

function BenefitCard({
  icon,
  title,
  desc,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
}) {
  return (
    <div className="flex flex-col items-center rounded-2xl bg-white p-8 text-center ring-1 ring-amber-100 shadow-sm">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-amber-50 text-amber-500 mb-4">
        {icon}
      </div>
      <h3 className="font-serif text-lg font-semibold text-charcoal-900">
        {title}
      </h3>
      <p className="mt-2 text-sm text-gray-500">{desc}</p>
    </div>
  );
}

function RoleCard({
  emoji,
  title,
  desc,
}: {
  emoji: string;
  title: string;
  desc: string;
}) {
  return (
    <div className="rounded-xl border border-gray-100 bg-white p-6 hover:border-teal-200 hover:shadow-md transition-all">
      <span className="text-3xl" aria-hidden="true">
        {emoji}
      </span>
      <h3 className="mt-3 font-semibold text-charcoal-900">{title}</h3>
      <p className="mt-1 text-sm text-gray-500">{desc}</p>
    </div>
  );
}

// ── Main page ────────────────────────────────────────────────────────────────

export default function VolunteerPage() {
  const t = useTranslations("volunteer");
  const common = useTranslations("common");
  const [submitted, setSubmitted] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<VolunteerFormValues>({
    resolver: zodResolver(volunteerSchema),
  });

  const onSubmit = async (data: VolunteerFormValues) => {
    setServerError(null);
    try {
      const res = await fetch("/api/volunteer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const json = (await res.json()) as { error?: string };
        throw new Error(json.error ?? "Unknown error");
      }
      setSubmitted(true);
    } catch (err: unknown) {
      setServerError(err instanceof Error ? err.message : t("form_error"));
    }
  };

  const inputClass =
    "w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-charcoal-900 outline-none transition focus:border-teal-400 focus:ring-2 focus:ring-teal-100";
  const errorClass = "mt-1 text-xs text-red-500";
  const labelClass = "mb-1 block text-sm font-medium text-charcoal-900";

  return (
    <>
      {/* ── Hero ── */}
      <section className="relative overflow-hidden bg-amber-500 pt-28 pb-20">
        <div
          aria-hidden="true"
          className="absolute -top-16 -right-16 h-64 w-64 rounded-full bg-amber-400/40"
        />
        <div
          aria-hidden="true"
          className="absolute bottom-0 left-1/3 h-48 w-48 rounded-full bg-teal-600/20"
        />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-white/80 mb-3">
            HCW · {t("kicker")}
          </p>
          <h1 className="font-serif text-4xl font-bold text-white sm:text-5xl lg:text-6xl">
            {t("title")}
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-amber-50">
            {t("hero_subtitle")}
          </p>
          {/* WhatsApp CTA */}
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-amber-600 shadow-md transition-all hover:bg-amber-50 hover:shadow-lg"
          >
            <MessageCircle className="h-4 w-4" aria-hidden="true" />
            {t("whatsapp_cta")}
          </a>
        </div>
      </section>

      {/* ── Why volunteer ── */}
      <section className="bg-cream-50 py-20" aria-labelledby="why-heading">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2
            id="why-heading"
            className="font-serif text-3xl font-bold text-charcoal-900 text-center mb-12"
          >
            {t("why_title")}
          </h2>
          <div className="grid gap-8 sm:grid-cols-3">
            <BenefitCard
              icon={<Globe className="h-6 w-6" />}
              title={t("benefit1_title")}
              desc={t("benefit1_desc")}
            />
            <BenefitCard
              icon={<Heart className="h-6 w-6" />}
              title={t("benefit2_title")}
              desc={t("benefit2_desc")}
            />
            <BenefitCard
              icon={<Laptop className="h-6 w-6" />}
              title={t("benefit3_title")}
              desc={t("benefit3_desc")}
            />
          </div>
        </div>
      </section>

      {/* ── Volunteer roles ── */}
      <section className="bg-white py-20" aria-labelledby="roles-heading">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2
            id="roles-heading"
            className="font-serif text-3xl font-bold text-charcoal-900 text-center mb-12"
          >
            {t("roles_title")}
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <RoleCard
              emoji="📣"
              title={t("role_communication")}
              desc={t("role_communication_desc")}
            />
            <RoleCard
              emoji="📚"
              title={t("role_education")}
              desc={t("role_education_desc")}
            />
            <RoleCard
              emoji="💻"
              title={t("role_it")}
              desc={t("role_it_desc")}
            />
            <RoleCard
              emoji="💰"
              title={t("role_fundraising")}
              desc={t("role_fundraising_desc")}
            />
          </div>
        </div>
      </section>

      {/* ── Application form ── */}
      <section className="bg-cream-50 py-20" aria-labelledby="form-heading">
        <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
          <h2
            id="form-heading"
            className="font-serif text-3xl font-bold text-charcoal-900 text-center mb-2"
          >
            {t("form_title")}
          </h2>
          <p className="text-center text-gray-500 mb-10">{t("subtitle")}</p>

          {submitted ? (
            /* ── Success card ── */
            <div className="rounded-2xl bg-green-50 border border-green-200 p-10 text-center">
              <span className="text-5xl" aria-hidden="true">
                🎉
              </span>
              <h3 className="mt-4 font-serif text-2xl font-bold text-green-800">
                {t("form_success_title")}
              </h3>
              <p className="mt-3 text-green-700">{t("form_success_message")}</p>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-green-600 px-6 py-3 text-sm font-semibold text-white hover:bg-green-700 transition-colors"
              >
                <MessageCircle className="h-4 w-4" aria-hidden="true" />
                {t("form_success_whatsapp")}
              </a>
            </div>
          ) : (
            /* ── Form ── */
            <form
              onSubmit={handleSubmit(onSubmit)}
              noValidate
              className="space-y-6 rounded-2xl bg-white p-8 ring-1 ring-gray-100 shadow-sm"
            >
              {/* Name */}
              <div>
                <label htmlFor="v-name" className={labelClass}>
                  {t("form_name")} *
                </label>
                <input
                  id="v-name"
                  type="text"
                  autoComplete="name"
                  {...register("name")}
                  className={inputClass}
                  aria-describedby={errors.name ? "v-name-error" : undefined}
                />
                {errors.name && (
                  <p id="v-name-error" className={errorClass} role="alert">
                    {errors.name.message}
                  </p>
                )}
              </div>

              {/* Email */}
              <div>
                <label htmlFor="v-email" className={labelClass}>
                  {t("form_email")} *
                </label>
                <input
                  id="v-email"
                  type="email"
                  autoComplete="email"
                  {...register("email")}
                  className={inputClass}
                  aria-describedby={errors.email ? "v-email-error" : undefined}
                />
                {errors.email && (
                  <p id="v-email-error" className={errorClass} role="alert">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Phone */}
              <div>
                <label htmlFor="v-phone" className={labelClass}>
                  {t("form_phone")}
                </label>
                <input
                  id="v-phone"
                  type="tel"
                  autoComplete="tel"
                  {...register("phone")}
                  className={inputClass}
                />
              </div>

              {/* Role */}
              <div>
                <label htmlFor="v-role" className={labelClass}>
                  {t("form_role")} *
                </label>
                <select
                  id="v-role"
                  {...register("role")}
                  className={inputClass}
                  aria-describedby={errors.role ? "v-role-error" : undefined}
                  defaultValue=""
                >
                  <option value="" disabled>
                    —
                  </option>
                  <option value="communication">
                    {t("form_role_communication")}
                  </option>
                  <option value="education">{t("form_role_education")}</option>
                  <option value="it">{t("form_role_it")}</option>
                  <option value="fundraising">
                    {t("form_role_fundraising")}
                  </option>
                  <option value="other">{t("form_role_other")}</option>
                </select>
                {errors.role && (
                  <p id="v-role-error" className={errorClass} role="alert">
                    {errors.role.message}
                  </p>
                )}
              </div>

              {/* Availability */}
              <div>
                <label htmlFor="v-availability" className={labelClass}>
                  {t("form_availability")} *
                </label>
                <select
                  id="v-availability"
                  {...register("availability")}
                  className={inputClass}
                  defaultValue=""
                >
                  <option value="" disabled>
                    —
                  </option>
                  <option value="weekend">{t("form_avail_weekend")}</option>
                  <option value="evenings">{t("form_avail_evenings")}</option>
                  <option value="fulltime">{t("form_avail_fulltime")}</option>
                  <option value="occasional">
                    {t("form_avail_occasional")}
                  </option>
                </select>
                {errors.availability && (
                  <p className={errorClass} role="alert">
                    {errors.availability.message}
                  </p>
                )}
              </div>

              {/* Motivation */}
              <div>
                <label htmlFor="v-motivation" className={labelClass}>
                  {t("form_motivation")} *
                </label>
                <textarea
                  id="v-motivation"
                  rows={5}
                  {...register("motivation")}
                  placeholder={t("form_motivation_placeholder")}
                  className={inputClass}
                  aria-describedby={
                    errors.motivation ? "v-motivation-error" : undefined
                  }
                />
                {errors.motivation && (
                  <p
                    id="v-motivation-error"
                    className={errorClass}
                    role="alert"
                  >
                    {errors.motivation.message}
                  </p>
                )}
              </div>

              {/* WhatsApp consent */}
              <div className="flex items-start gap-3">
                <input
                  id="v-whatsapp"
                  type="checkbox"
                  {...register("whatsappConsent")}
                  className="mt-0.5 h-4 w-4 rounded border-gray-300 text-teal-600 focus:ring-teal-500"
                />
                <label
                  htmlFor="v-whatsapp"
                  className="text-sm text-gray-600 cursor-pointer"
                >
                  {t("form_whatsapp_consent")}
                </label>
              </div>

              {/* Server error */}
              {serverError && (
                <p
                  className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600"
                  role="alert"
                >
                  {serverError}
                </p>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full rounded-full bg-amber-500 px-6 py-3.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-amber-600 hover:shadow-md active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isSubmitting ? t("form_submitting") : t("form_submit")}
              </button>

              {/* WhatsApp alternative */}
              <p className="text-center text-xs text-gray-400">
                {common("or")}{" "}
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-teal-600 underline hover:text-teal-800"
                >
                  {t("whatsapp_cta")}
                </a>
              </p>
            </form>
          )}
        </div>
      </section>

      {/* ── WhatsApp banner ── */}
      <section className="bg-teal-600 py-12">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
          <div>
            <p className="font-serif text-xl font-bold text-white">
              {t("whatsapp_desc")}
            </p>
            <p className="mt-1 text-teal-100 text-sm">{t("whatsapp_note")}</p>
          </div>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-teal-700 shadow hover:bg-teal-50 transition-colors"
          >
            <MessageCircle className="h-4 w-4" aria-hidden="true" />
            WhatsApp
          </a>
        </div>
      </section>
    </>
  );
}
