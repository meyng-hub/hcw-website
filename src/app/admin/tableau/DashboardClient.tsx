"use client";

import Link from "next/link";
import { Newspaper, Target, Image as ImageIcon } from "lucide-react";
import { useAdminT } from "@/lib/admin/i18n";
import AdminHeader from "../AdminHeader";

export default function DashboardClient({ email }: { email: string }) {
  const { t } = useAdminT();

  const cards = [
    {
      href: "/admin/actualites",
      icon: Newspaper,
      title: t("dash_news"),
      desc: t("dash_news_desc"),
    },
    {
      href: "/admin/campagne",
      icon: Target,
      title: t("dash_campaign"),
      desc: t("dash_campaign_desc"),
    },
    {
      href: "/admin/images",
      icon: ImageIcon,
      title: t("dash_images"),
      desc: t("dash_images_desc"),
    },
  ];

  return (
    <>
      <AdminHeader email={email} />
      <main className="mx-auto max-w-4xl px-4 py-10">
        <h1 className="font-serif text-2xl font-bold">{t("dash_title")}</h1>
        <p className="mt-1 text-sm text-gray-500">{email}</p>
        <p className="mt-4 rounded-lg bg-amber-50 p-3 text-sm text-amber-800">
          {t("publish_note")}
        </p>

        <div className="mt-8 grid gap-6 sm:grid-cols-3">
          {cards.map(({ href, icon: Icon, title, desc }) => (
            <Link
              key={href}
              href={href}
              className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-teal-100 transition hover:shadow-md hover:ring-teal-300"
            >
              <Icon className="h-8 w-8 text-teal-600" aria-hidden="true" />
              <h2 className="mt-4 font-serif text-lg font-semibold">{title}</h2>
              <p className="mt-1 text-sm text-gray-500">{desc}</p>
            </Link>
          ))}
        </div>
      </main>
    </>
  );
}
