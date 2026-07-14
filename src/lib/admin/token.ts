import { createHmac, timingSafeEqual } from "crypto";

/**
 * Minimal signed tokens (HMAC-SHA256) for the admin: a "login" token
 * travels in the magic-link email (15 min), a "session" token lives in
 * the httpOnly cookie (12 h). No external dependency, Node runtime only.
 */

export interface AdminTokenPayload {
  email: string;
  purpose: "login" | "session";
  exp: number; // unix seconds
}

const LOGIN_TTL_S = 15 * 60;
const SESSION_TTL_S = 12 * 60 * 60;

function secret(): string {
  const s = process.env.ADMIN_SESSION_SECRET;
  if (!s) throw new Error("ADMIN_SESSION_SECRET is not configured");
  return s;
}

function b64url(buf: Buffer): string {
  return buf.toString("base64url");
}

function hmac(data: string): string {
  return b64url(createHmac("sha256", secret()).update(data).digest());
}

export function signToken(
  email: string,
  purpose: AdminTokenPayload["purpose"],
): string {
  const ttl = purpose === "login" ? LOGIN_TTL_S : SESSION_TTL_S;
  const payload: AdminTokenPayload = {
    email,
    purpose,
    exp: Math.floor(Date.now() / 1000) + ttl,
  };
  const body = b64url(Buffer.from(JSON.stringify(payload), "utf8"));
  return `${body}.${hmac(body)}`;
}

export function verifyToken(
  token: string,
  purpose: AdminTokenPayload["purpose"],
): AdminTokenPayload | null {
  const dot = token.lastIndexOf(".");
  if (dot <= 0) return null;
  const body = token.slice(0, dot);
  const sig = token.slice(dot + 1);
  const expected = hmac(body);
  const a = Buffer.from(sig);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !timingSafeEqual(a, b)) return null;

  let payload: AdminTokenPayload;
  try {
    payload = JSON.parse(Buffer.from(body, "base64url").toString("utf8"));
  } catch {
    return null;
  }
  if (payload.purpose !== purpose) return null;
  if (typeof payload.exp !== "number" || payload.exp < Date.now() / 1000)
    return null;
  if (typeof payload.email !== "string" || !payload.email) return null;
  return payload;
}

export function allowedEmails(): string[] {
  return (process.env.ADMIN_ALLOWED_EMAILS ?? "")
    .split(",")
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);
}

export function isEmailAllowed(email: string): boolean {
  return allowedEmails().includes(email.trim().toLowerCase());
}
