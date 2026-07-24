import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import Link from "next/link";
import { ShoppingBag, Truck, Leaf, Heart, CheckCircle } from "lucide-react";
import { shop, pickLocale } from "@/lib/content";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "shop" });
  return {
    title: t("page_title"),
    description: t("page_description"),
    openGraph: {
      title: t("page_title"),
      description: t("page_description"),
    },
  };
}

export default async function ShopPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "shop" });
  const common = await getTranslations({ locale, namespace: "common" });
  const steps = shop.howItWorks;

  return (
    <>
      {/* Hero */}
      <section
        className="relative overflow-hidden py-28"
        aria-labelledby="shop-heading"
        style={{
          background:
            "linear-gradient(135deg, #f5a623 0%, #0d6e6e 60%, #1c1c2e 100%)",
        }}
      >
        <div className="pointer-events-none absolute inset-0 opacity-10">
          <div className="absolute -left-20 -top-20 h-80 w-80 rounded-full bg-white" />
          <div className="absolute -bottom-20 -right-20 h-96 w-96 rounded-full bg-amber-300" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-1.5 text-sm font-medium text-white backdrop-blur-sm">
            <ShoppingBag className="h-4 w-4" aria-hidden="true" />
            {t("badge")}
          </div>
          <h1
            id="shop-heading"
            className="font-serif text-5xl font-bold text-white sm:text-6xl"
          >
            {t("hero_headline")}
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-xl text-white/85">
            {t("hero_subtitle")}
          </p>
        </div>
      </section>

      {/* Info banner */}
      <div className="border-y border-teal-100 bg-teal-50 py-4">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-6 px-4 text-sm font-medium text-teal-800 sm:px-6 lg:px-8">
          <span className="flex items-center gap-2">
            <Truck className="h-4 w-4 text-teal-600" aria-hidden="true" />
            {t("banner_shipping")}
          </span>
          <span
            className="hidden h-4 w-px bg-teal-200 sm:block"
            aria-hidden="true"
          />
          <span className="flex items-center gap-2">
            <Leaf className="h-4 w-4 text-teal-600" aria-hidden="true" />
            {t("banner_pod")}
          </span>
          <span
            className="hidden h-4 w-px bg-teal-200 sm:block"
            aria-hidden="true"
          />
          <span className="flex items-center gap-2">
            <Heart className="h-4 w-4 text-amber-500" aria-hidden="true" />
            {t("banner_profits")}
          </span>
        </div>
      </div>

      {/* Product grid */}
      <section className="bg-cream-50 py-20" aria-labelledby="products-heading">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2
            id="products-heading"
            className="mb-12 font-serif text-3xl font-bold text-charcoal-900 sm:text-4xl"
          >
            {t("products_title")}
          </h2>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {shop.products.map((product) => (
              <article
                key={product.id}
                className="group overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-gray-100 transition-all hover:shadow-lg hover:ring-teal-200"
              >
                {/* Product visual */}
                <div
                  className={`relative flex h-52 items-center justify-center bg-gradient-to-br ${product.colorFrom} ${product.colorTo}`}
                >
                  <span
                    className="text-7xl transition-transform group-hover:scale-110"
                    role="img"
                    aria-label={pickLocale(product.name, locale)}
                  >
                    {product.emoji}
                  </span>
                  {/* Category badge */}
                  <span className="absolute right-3 top-3 rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-teal-700 shadow-sm">
                    {pickLocale(product.category, locale)}
                  </span>
                </div>

                <div className="p-6">
                  <h3 className="font-serif text-lg font-semibold text-charcoal-900 group-hover:text-teal-700 transition-colors">
                    {pickLocale(product.name, locale)}
                  </h3>

                  <div className="mt-1 flex items-baseline gap-1">
                    <span className="text-2xl font-bold text-teal-600">
                      €{product.price}
                    </span>
                    <span className="text-sm text-gray-500">
                      {t("price_note")}
                    </span>
                  </div>

                  <div className="mt-5 flex gap-3">
                    <Link
                      href={`mailto:shop@h-cw.org?subject=${encodeURIComponent(t("order_subject", { name: pickLocale(product.name, locale) }))}`}
                      className="flex-1 rounded-lg bg-teal-600 px-4 py-2.5 text-center text-sm font-semibold text-white transition-colors hover:bg-teal-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600"
                    >
                      {t("shop_cta")}
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="bg-white py-20" aria-labelledby="how-heading">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2
              id="how-heading"
              className="font-serif text-3xl font-bold text-charcoal-900 sm:text-4xl"
            >
              {t("how_title")}
            </h2>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {steps.map((s) => (
              <div
                key={s.step}
                className="flex flex-col items-center rounded-2xl bg-cream-50 p-8 text-center ring-1 ring-teal-100"
              >
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-teal-600 text-xl font-bold text-white shadow-md">
                  {s.step}
                </div>
                <div className="mb-3 text-4xl" role="img" aria-hidden="true">
                  {s.emoji}
                </div>
                <h3 className="font-serif text-lg font-semibold text-charcoal-900">
                  {pickLocale(s.title, locale)}
                </h3>
                <p className="mt-2 text-sm text-gray-500">
                  {pickLocale(s.desc, locale)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact banner */}
      <section className="bg-amber-500 py-16">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <CheckCircle
              className="mx-auto mb-4 h-10 w-10 text-white/80"
              aria-hidden="true"
            />
            <p className="font-serif text-2xl font-bold text-white sm:text-3xl">
              {t("impact_banner")}
            </p>
            <p className="mt-3 text-white/80">{t("impact_note")}</p>
            <Link
              href={`/${locale}/donate`}
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-amber-600 shadow-md transition-colors hover:bg-amber-50"
            >
              <Heart className="h-4 w-4" aria-hidden="true" />
              {common("donate_now")}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
