"use client";

import Link from "next/link";
import { useAdminT } from "@/lib/admin/i18n";

export default function AdminHeader({ email }: { email?: string }) {
  const { t, locale, setLocale } = useAdminT();

  return (
    <header className="border-b border-teal-100 bg-white">
      <div className="mx-auto flex max-w-4xl items-center justify-between gap-4 px-4 py-4">
        <Link href="/admin/tableau" className="font-serif text-lg font-bold text-teal-700">
          {t("app_title")}
        </Link>
        <div className="flex items-center gap-3 text-sm">
          <button
            onClick={() => setLocale(locale === "fr" ? "en" : "fr")}
            className="rounded-full border border-gray-200 px-3 py-1 font-medium text-gray-600 hover:border-teal-300 hover:text-teal-700"
            aria-label="Changer de langue / Switch language"
          >
            {locale === "fr" ? "EN" : "FR"}
          </button>
          <a
            href="/fr"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden text-teal-600 hover:underline sm:block"
          >
            {t("dash_view_site")}
          </a>
          {email && (
            <form action="/api/admin/auth/logout" method="POST">
              <button
                type="submit"
                className="rounded-lg bg-gray-100 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-200"
              >
                {t("logout")}
              </button>
            </form>
          )}
        </div>
      </div>
    </header>
  );
}
