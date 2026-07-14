import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const CONTACT_INBOX = "contact@h-cw.org";
const FROM_ADDRESS = "HCW <noreply@h-cw.org>";

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as Record<string, unknown>;
    const name = typeof body.name === "string" ? body.name.trim() : "";
    const email = typeof body.email === "string" ? body.email.trim() : "";
    const subject = typeof body.subject === "string" ? body.subject.trim() : "";
    const message = typeof body.message === "string" ? body.message.trim() : "";

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    // Basic email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 },
      );
    }

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      // Honest failure — never pretend a message was delivered.
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
      replyTo: email,
      subject: `[HCW Contact] ${subject || "Message du site"}`,
      text: `De : ${name} <${email}>\nSujet : ${subject || "—"}\n\n${message}`,
    });
    if (error) {
      console.error("Resend error (contact):", error.name);
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
