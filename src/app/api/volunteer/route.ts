import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const CONTACT_INBOX = "contact@h-cw.org";
const FROM_ADDRESS = "HCW <noreply@h-cw.org>";

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as Record<string, unknown>;
    const { name, email, role, motivation } = body;

    if (!name || !email || !role) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      // Honest failure — never pretend an application was delivered.
      return NextResponse.json(
        {
          error: `Formulaire momentanément indisponible — écrivez-nous directement à ${CONTACT_INBOX}`,
        },
        { status: 503 },
      );
    }

    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: FROM_ADDRESS,
      to: CONTACT_INBOX,
      replyTo: String(email),
      subject: `[HCW Bénévolat] Candidature — ${String(name)}`,
      text: `Nom : ${String(name)}\nEmail : ${String(email)}\nRôle souhaité : ${String(role)}\n\nMotivation :\n${String(motivation ?? "—")}`,
    });
    if (error) {
      console.error("Resend error (volunteer):", error.name);
      return NextResponse.json(
        {
          error: `L'envoi a échoué — écrivez-nous directement à ${CONTACT_INBOX}`,
        },
        { status: 502 },
      );
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 },
    );
  }
}
