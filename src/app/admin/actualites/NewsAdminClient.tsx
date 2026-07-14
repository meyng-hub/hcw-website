"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useAdminT } from "@/lib/admin/i18n";
import AdminHeader from "../AdminHeader";
import type { NewsArticle } from "@/lib/content/schemas";

const TAGS = [
  "impact",
  "education",
  "partnership",
  "report",
  "campaign",
  "award",
] as const;

const EMPTY: NewsArticle = {
  id: "",
  title: { fr: "", en: "" },
  excerpt: { fr: "", en: "" },
  date: new Date().toISOString().slice(0, 10),
  tag: "impact",
  accentColor: "teal",
  image: null,
};

function slugify(s: string): string {
  return (
    s
      .normalize("NFD")
      .replace(/[̀-ͯ]/g, "")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 60) || `article-${Date.now()}`
  );
}

export default function NewsAdminClient({ email }: { email: string }) {
  const { t } = useAdminT();
  const [articles, setArticles] = useState<NewsArticle[] | null>(null);
  const [sha, setSha] = useState<string | undefined>();
  const [editing, setEditing] = useState<NewsArticle | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [state, setState] = useState<"loading" | "ready" | "saving" | "saved" | "error">(
    "loading",
  );
  const [errorMsg, setErrorMsg] = useState("");

  // Initial state is already "loading" — no synchronous setState here.
  const load = () => {
    fetch("/api/admin/content/news")
      .then(async (res) => {
        if (!res.ok) throw new Error();
        const json = (await res.json()) as { data: NewsArticle[]; sha: string };
        setArticles(json.data);
        setSha(json.sha);
        setState("ready");
      })
      .catch(() => setState("error"));
  };
  useEffect(load, []);

  const persist = async (next: NewsArticle[]) => {
    setState("saving");
    setErrorMsg("");
    try {
      const res = await fetch("/api/admin/content/news", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data: next, sha }),
      });
      if (!res.ok) {
        const json = (await res.json()) as { error?: string };
        throw new Error(json.error);
      }
      setArticles(next);
      setEditing(null);
      setState("saved");
      // sha changed on GitHub — refetch quietly so the next save has it.
      fetch("/api/admin/content/news")
        .then(async (r) => r.ok && setSha(((await r.json()) as { sha: string }).sha))
        .catch(() => {});
    } catch (err) {
      setErrorMsg(err instanceof Error && err.message ? err.message : "");
      setState("error");
    }
  };

  const submitEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editing || !articles) return;
    const article: NewsArticle = {
      ...editing,
      id: editing.id || slugify(editing.title.fr),
      image: editing.image?.trim() ? editing.image.trim() : null,
    };
    const next = isNew
      ? [article, ...articles]
      : articles.map((a) => (a.id === article.id ? article : a));
    void persist(next);
  };

  const remove = (id: string) => {
    if (!articles) return;
    if (!window.confirm(t("confirm_delete"))) return;
    void persist(articles.filter((a) => a.id !== id));
  };

  const input =
    "mt-1 w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-100";

  return (
    <>
      <AdminHeader email={email} />
      <main className="mx-auto max-w-3xl px-4 py-10">
        <Link href="/admin/tableau" className="text-sm text-teal-600 hover:underline">
          ← {t("back")}
        </Link>
        <div className="mt-2 flex items-center justify-between">
          <h1 className="font-serif text-2xl font-bold">{t("news_title")}</h1>
          {!editing && state !== "loading" && (
            <button
              onClick={() => {
                setEditing({ ...EMPTY, date: new Date().toISOString().slice(0, 10) });
                setIsNew(true);
              }}
              className="rounded-xl bg-teal-600 px-4 py-2 text-sm font-semibold text-white hover:bg-teal-700"
            >
              + {t("news_new")}
            </button>
          )}
        </div>

        {state === "loading" && <p className="mt-8 text-gray-500">{t("loading")}</p>}
        {state === "saved" && !editing && (
          <p className="mt-4 rounded-lg bg-teal-50 p-3 text-sm text-teal-800">
            {t("saved_ok")}
          </p>
        )}
        {state === "error" && !editing && (
          <p className="mt-4 rounded-lg bg-red-50 p-3 text-sm text-red-700">
            {errorMsg || t("error_generic")}
          </p>
        )}

        {editing && (
          <form
            onSubmit={submitEdit}
            className="mt-6 space-y-4 rounded-2xl bg-white p-8 shadow-sm ring-1 ring-teal-100"
          >
            <label className="block text-sm font-medium">
              {t("news_field_title_fr")}
              <input
                required
                value={editing.title.fr}
                onChange={(e) =>
                  setEditing({ ...editing, title: { ...editing.title, fr: e.target.value } })
                }
                className={input}
              />
            </label>
            <label className="block text-sm font-medium">
              {t("news_field_title_en")}
              <input
                required
                value={editing.title.en}
                onChange={(e) =>
                  setEditing({ ...editing, title: { ...editing.title, en: e.target.value } })
                }
                className={input}
              />
            </label>
            <label className="block text-sm font-medium">
              {t("news_field_excerpt_fr")}
              <textarea
                required
                rows={3}
                value={editing.excerpt.fr}
                onChange={(e) =>
                  setEditing({
                    ...editing,
                    excerpt: { ...editing.excerpt, fr: e.target.value },
                  })
                }
                className={input}
              />
            </label>
            <label className="block text-sm font-medium">
              {t("news_field_excerpt_en")}
              <textarea
                required
                rows={3}
                value={editing.excerpt.en}
                onChange={(e) =>
                  setEditing({
                    ...editing,
                    excerpt: { ...editing.excerpt, en: e.target.value },
                  })
                }
                className={input}
              />
            </label>

            <div className="grid gap-4 sm:grid-cols-3">
              <label className="block text-sm font-medium">
                {t("news_field_date")}
                <input
                  type="date"
                  required
                  value={editing.date}
                  onChange={(e) => setEditing({ ...editing, date: e.target.value })}
                  className={input}
                />
              </label>
              <label className="block text-sm font-medium">
                {t("news_field_tag")}
                <select
                  value={editing.tag}
                  onChange={(e) =>
                    setEditing({ ...editing, tag: e.target.value as NewsArticle["tag"] })
                  }
                  className={input}
                >
                  {TAGS.map((tag) => (
                    <option key={tag} value={tag}>
                      {t(`tag_${tag}`)}
                    </option>
                  ))}
                </select>
              </label>
              <label className="block text-sm font-medium">
                {t("news_field_accent")}
                <select
                  value={editing.accentColor}
                  onChange={(e) =>
                    setEditing({
                      ...editing,
                      accentColor: e.target.value as NewsArticle["accentColor"],
                    })
                  }
                  className={input}
                >
                  <option value="teal">{t("accent_teal")}</option>
                  <option value="amber">{t("accent_amber")}</option>
                </select>
              </label>
            </div>

            <label className="block text-sm font-medium">
              {t("news_field_image")}
              <input
                value={editing.image ?? ""}
                onChange={(e) => setEditing({ ...editing, image: e.target.value })}
                placeholder="/images/…"
                className={input}
              />
              <span className="mt-1 block text-xs font-normal text-gray-400">
                {t("news_image_hint")}
              </span>
            </label>

            <div className="flex gap-3 pt-2">
              <button
                type="submit"
                disabled={state === "saving"}
                className="flex-1 rounded-xl bg-teal-600 py-3 text-sm font-semibold text-white hover:bg-teal-700 disabled:opacity-60"
              >
                {state === "saving" ? t("saving") : t("save")}
              </button>
              <button
                type="button"
                onClick={() => setEditing(null)}
                className="rounded-xl bg-gray-100 px-6 py-3 text-sm font-medium text-gray-600 hover:bg-gray-200"
              >
                {t("cancel")}
              </button>
            </div>
            {state === "error" && (
              <p className="rounded-lg bg-red-50 p-3 text-sm text-red-700">
                {errorMsg || t("error_generic")}
              </p>
            )}
          </form>
        )}

        {!editing && articles && (
          <div className="mt-6 space-y-3">
            {articles.length === 0 && (
              <p className="rounded-lg bg-white p-6 text-sm text-gray-500 ring-1 ring-gray-100">
                {t("news_empty")}
              </p>
            )}
            {[...articles]
              .sort((a, b) => b.date.localeCompare(a.date))
              .map((article) => (
                <div
                  key={article.id}
                  className="flex items-center justify-between gap-4 rounded-xl bg-white p-4 ring-1 ring-gray-100"
                >
                  <div className="min-w-0">
                    <p className="truncate font-medium">{article.title.fr}</p>
                    <p className="text-xs text-gray-400">
                      {article.date} · {t(`tag_${article.tag}`)}
                    </p>
                  </div>
                  <div className="flex shrink-0 gap-2">
                    <button
                      onClick={() => {
                        setEditing(article);
                        setIsNew(false);
                      }}
                      className="rounded-lg bg-teal-50 px-3 py-1.5 text-sm font-medium text-teal-700 hover:bg-teal-100"
                    >
                      {t("edit")}
                    </button>
                    <button
                      onClick={() => remove(article.id)}
                      className="rounded-lg bg-red-50 px-3 py-1.5 text-sm font-medium text-red-600 hover:bg-red-100"
                    >
                      {t("delete")}
                    </button>
                  </div>
                </div>
              ))}
          </div>
        )}
      </main>
    </>
  );
}
