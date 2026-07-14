import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { isEmailAllowed, signToken } from "@/lib/admin/token";

const FROM_ADDRESS = "HCW Admin <noreply@h-cw.org>";

// Per-instance rate limit — good enough to stop accidental spamming.
const lastSent = new Map<string, number>();
const RATE_WINDOW_MS = 60_000;

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as { email?: unknown };
    const email =
      typeof body.email === "string" ? body.email.trim().toLowerCase() : "";

    // Always answer identically — never reveal whether an email is allowed.
    const genericOk = NextResponse.json({ ok: true });

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return genericOk;
    if (!isEmailAllowed(email)) return genericOk;

    const now = Date.now();
    const last = lastSent.get(email) ?? 0;
    if (now - last < RATE_WINDOW_MS) return genericOk;
    lastSent.set(email, now);

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      console.error("Admin auth: RESEND_API_KEY missing");
      return genericOk;
    }

    const token = signToken(email, "login");
    const link = `${req.nextUrl.origin}/api/admin/auth/callback?token=${encodeURIComponent(token)}`;

    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: FROM_ADDRESS,
      to: email,
      subject: "Connexion à l'administration HCW",
      text: `Bonjour,\n\nCliquez sur ce lien pour vous connecter à l'administration du site HCW (valable 15 minutes) :\n\n${link}\n\nSi vous n'êtes pas à l'origine de cette demande, ignorez cet email.\n\n— HCW`,
    });
    if (error) console.error("Admin auth: Resend error", error.name);

    return genericOk;
  } catch {
    return NextResponse.json({ ok: true });
  }
}
