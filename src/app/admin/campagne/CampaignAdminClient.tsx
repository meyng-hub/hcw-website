"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useAdminT } from "@/lib/admin/i18n";
import AdminHeader from "../AdminHeader";
import type { Campaign } from "@/lib/content/schemas";

export default function CampaignAdminClient({ email }: { email: string }) {
  const { t } = useAdminT();
  const [campaign, setCampaign] = useState<Campaign | null>(null);
  const [sha, setSha] = useState<string | undefined>();
  const [state, setState] = useState<"loading" | "ready" | "saving" | "saved" | "error">(
    "loading",
  );
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    fetch("/api/admin/content/campaign")
      .then(async (res) => {
        if (!res.ok) throw new Error();
        const json = (await res.json()) as { data: Campaign; sha: string };
        setCampaign(json.data);
        setSha(json.sha);
        setState("ready");
      })
      .catch(() => setState("error"));
  }, []);

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!campaign) return;
    setState("saving");
    setErrorMsg("");
    try {
      const res = await fetch("/api/admin/content/campaign", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data: campaign, sha }),
      });
      if (!res.ok) {
        const json = (await res.json()) as { error?: string };
        throw new Error(json.error);
      }
      setState("saved");
    } catch (err) {
      setErrorMsg(err instanceof Error && err.message ? err.message : "");
      setState("error");
    }
  };

  const num = (v: string) => (v === "" ? 0 : Number(v));

  return (
    <>
      <AdminHeader email={email} />
      <main className="mx-auto max-w-2xl px-4 py-10">
        <Link href="/admin/tableau" className="text-sm text-teal-600 hover:underline">
          ← {t("back")}
        </Link>
        <h1 className="mt-2 font-serif text-2xl font-bold">
          {t("campaign_title")}
        </h1>

        {state === "loading" && (
          <p className="mt-8 text-gray-500">{t("loading")}</p>
        )}

        {campaign && (
          <form
            onSubmit={save}
            className="mt-8 space-y-6 rounded-2xl bg-white p-8 shadow-sm ring-1 ring-teal-100"
          >
            <label className="flex items-center gap-3 text-sm font-medium">
              <input
                type="checkbox"
                checked={campaign.active}
                onChange={(e) =>
                  setCampaign({ ...campaign, active: e.target.checked })
                }
                className="h-5 w-5 rounded border-gray-300 text-teal-600 focus:ring-teal-500"
              />
              {t("campaign_active")}
            </label>

            <label className="block text-sm font-medium">
              {t("campaign_goal")}
              <input
                type="number"
                min={1}
                required
                value={campaign.goalAmount}
                onChange={(e) =>
                  setCampaign({ ...campaign, goalAmount: num(e.target.value) })
                }
                className="mt-1 w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-100"
              />
            </label>

            <label className="block text-sm font-medium">
              {t("campaign_raised")}
              <input
                type="number"
                min={0}
                required
                value={campaign.raisedAmount}
                onChange={(e) =>
                  setCampaign({ ...campaign, raisedAmount: num(e.target.value) })
                }
                className="mt-1 w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-100"
              />
            </label>

            <label className="block text-sm font-medium">
              {t("campaign_donors")}
              <input
                type="number"
                min={0}
                required
                value={campaign.donorCount}
                onChange={(e) =>
                  setCampaign({ ...campaign, donorCount: num(e.target.value) })
                }
                className="mt-1 w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-100"
              />
            </label>

            <button
              type="submit"
              disabled={state === "saving"}
              className="w-full rounded-xl bg-teal-600 py-3 text-sm font-semibold text-white hover:bg-teal-700 disabled:opacity-60"
            >
              {state === "saving" ? t("saving") : t("save")}
            </button>

            {state === "saved" && (
              <p className="rounded-lg bg-teal-50 p-3 text-sm text-teal-800">
                {t("saved_ok")}
              </p>
            )}
            {state === "error" && (
              <p className="rounded-lg bg-red-50 p-3 text-sm text-red-700">
                {errorMsg || t("error_generic")}
              </p>
            )}
          </form>
        )}
      </main>
    </>
  );
}
