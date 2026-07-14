"use client";

import { useState } from "react";
import { useAdminT } from "@/lib/admin/i18n";
import AdminHeader from "./AdminHeader";

export default function LoginClient({
  invalidLink,
}: {
  invalidLink: boolean;
}) {
  const { t } = useAdminT();
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "sending" | "sent" | "error">(
    "idle",
  );

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setState("sending");
    try {
      const res = await fetch("/api/admin/auth/request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      setState(res.ok ? "sent" : "error");
    } catch {
      setState("error");
    }
  };

  return (
    <>
      <AdminHeader />
      <main className="mx-auto max-w-md px-4 py-16">
        <div className="rounded-2xl bg-white p-8 shadow-sm ring-1 ring-teal-100">
          <h1 className="font-serif text-2xl font-bold">{t("login_title")}</h1>
          <p className="mt-2 text-sm text-gray-500">{t("login_intro")}</p>

          {invalidLink && (
            <p className="mt-4 rounded-lg bg-red-50 p-3 text-sm text-red-700">
              {t("login_invalid_link")}
            </p>
          )}

          {state === "sent" ? (
            <p className="mt-6 rounded-lg bg-teal-50 p-4 text-sm text-teal-800">
              {t("login_sent")}
            </p>
          ) : (
            <form onSubmit={submit} className="mt-6 space-y-4">
              <label className="block text-sm font-medium">
                {t("login_email_label")}
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1 w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-100"
                  placeholder="vous@exemple.org"
                />
              </label>
              <button
                type="submit"
                disabled={state === "sending"}
                className="w-full rounded-xl bg-teal-600 py-3 text-sm font-semibold text-white hover:bg-teal-700 disabled:opacity-60"
              >
                {state === "sending" ? t("loading") : t("login_submit")}
              </button>
              {state === "error" && (
                <p className="text-sm text-red-600">{t("error_generic")}</p>
              )}
            </form>
          )}
        </div>
      </main>
    </>
  );
}
