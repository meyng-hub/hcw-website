import { NextRequest, NextResponse } from "next/server";
// Use Resend for email (already installed)
// import { Resend } from "resend";
// const resend = new Resend(process.env.RESEND_API_KEY);

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

    // TODO: send via Resend when API key configured
    // await resend.emails.send({
    //   from: "noreply@h-cw.org",
    //   to: "contact@h-cw.org",
    //   subject: `[HCW Contact] ${subject || "General enquiry"}`,
    //   text: `From: ${name} <${email}>\nSubject: ${subject}\n\n${message}`,
    // });

    // No logging of sender details — PII must not land in function logs.
    void subject;

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 },
    );
  }
}
