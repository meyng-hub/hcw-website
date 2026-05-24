import Stripe from "stripe";
import { NextRequest, NextResponse } from "next/server";

// Lazy init — env var is not available at build time
function getStripe() {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) throw new Error("STRIPE_SECRET_KEY is not configured");
  return new Stripe(key, { apiVersion: "2026-04-22.dahlia" });
}

export async function POST(req: NextRequest) {
  try {
    const stripe = getStripe();
    const body = (await req.json()) as {
      amount?: unknown;
      currency?: unknown;
      locale?: unknown;
      recurring?: unknown;
    };

    const { amount, currency = "eur", locale = "fr", recurring } = body;

    if (
      !amount ||
      typeof amount !== "number" ||
      !Number.isFinite(amount) ||
      amount < 5
    ) {
      return NextResponse.json(
        { error: "Invalid amount. Minimum donation is €5." },
        { status: 400 },
      );
    }

    const safeLocale = locale === "fr" ? "fr" : "en";
    const safeCurrency = typeof currency === "string" ? currency : "eur";
    const isRecurring = Boolean(recurring);
    const mode: Stripe.Checkout.SessionCreateParams["mode"] = isRecurring
      ? "subscription"
      : "payment";

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.h-cw.org";

    const sessionParams: Stripe.Checkout.SessionCreateParams = {
      mode,
      currency: safeCurrency,
      locale: safeLocale,
      success_url: `${siteUrl}/${safeLocale}/donate/merci`,
      cancel_url: `${siteUrl}/${safeLocale}/donate`,
      line_items: isRecurring
        ? [
            {
              price_data: {
                currency: safeCurrency,
                unit_amount: Math.round(amount * 100),
                recurring: { interval: "month" },
                product_data: {
                  name: "Don mensuel HCW",
                  description:
                    "Don récurrent HCW — Humanity, Culture & Welfare",
                },
              },
              quantity: 1,
            },
          ]
        : [
            {
              price_data: {
                currency: safeCurrency,
                unit_amount: Math.round(amount * 100),
                product_data: {
                  name: `Don HCW — €${amount}`,
                  description:
                    "Soutien aux projets éducatifs en Afrique centrale",
                },
              },
              quantity: 1,
            },
          ],
      payment_method_types: isRecurring
        ? ["card", "sepa_debit"]
        : ["card", "paypal"],
      metadata: {
        source: "hcw_website",
        locale: safeLocale,
      },
    };

    const session = await stripe.checkout.sessions.create(sessionParams);

    return NextResponse.json({ url: session.url });
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Internal server error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
