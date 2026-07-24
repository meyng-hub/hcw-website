import { NextRequest, NextResponse } from "next/server";

/**
 * Newsletter signup → Brevo contact list.
 * Requires explicit consent (GDPR art. 6.1.a) and both BREVO_API_KEY +
 * BREVO_LIST_ID. Returns honest 503 when unconfigured — never a fake success.
 */
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as Record<string, unknown>;
    const email = typeof body.email === "string" ? body.email.trim() : "";
    const consent = body.consent === true;

    if (!email || !emailRegex.test(email)) {
      return NextResponse.json({ error: "invalid_email" }, { status: 400 });
    }
    if (!consent) {
      return NextResponse.json({ error: "consent_required" }, { status: 400 });
    }

    const apiKey = process.env.BREVO_API_KEY;
    const listId = process.env.BREVO_LIST_ID;
    if (!apiKey || !listId) {
      // Not configured yet — signal the UI to show a "coming soon" notice.
      return NextResponse.json({ error: "unavailable" }, { status: 503 });
    }

    const res = await fetch("https://api.brevo.com/v3/contacts", {
      method: "POST",
      headers: {
        "api-key": apiKey,
        "content-type": "application/json",
        accept: "application/json",
      },
      body: JSON.stringify({
        email,
        listIds: [Number(listId)],
        updateEnabled: true,
      }),
    });

    // 201 created / 204 updated → success.
    if (res.ok || res.status === 204) {
      return NextResponse.json({ success: true });
    }
    // Already subscribed is not a user-facing error.
    const data = (await res.json().catch(() => null)) as {
      code?: string;
    } | null;
    if (res.status === 400 && data?.code === "duplicate_parameter") {
      return NextResponse.json({ success: true });
    }
    console.error("Brevo error (newsletter):", res.status, data?.code);
    return NextResponse.json({ error: "failed" }, { status: 502 });
  } catch {
    return NextResponse.json({ error: "failed" }, { status: 500 });
  }
}
