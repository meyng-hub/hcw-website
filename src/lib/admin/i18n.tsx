"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

/**
 * Tiny self-contained i18n for the admin (FR default, EN toggle).
 * Deliberately independent from the site's next-intl setup — the admin
 * lives outside the [locale] tree.
 */

export type AdminLocale = "fr" | "en";

const STRINGS = {
  fr: {
    // Shared
    app_title: "Administration HCW",
    loading: "Chargement…",
    save: "Enregistrer",
    saving: "Enregistrement…",
    cancel: "Annuler",
    delete: "Supprimer",
    edit: "Modifier",
    add: "Ajouter",
    back: "Retour",
    logout: "Se déconnecter",
    error_generic: "Une erreur est survenue. Réessayez.",
    publish_note:
      "Chaque enregistrement est publié automatiquement — en ligne sous 2 à 3 minutes.",
    saved_ok: "Enregistré ! Publication en cours (2–3 min).",
    confirm_delete: "Supprimer définitivement ?",
    // Login
    login_title: "Connexion",
    login_intro:
      "Entrez votre adresse email. Si elle est autorisée, vous recevrez un lien de connexion.",
    login_email_label: "Adresse email",
    login_submit: "Recevoir le lien de connexion",
    login_sent:
      "Si cette adresse est autorisée, un lien de connexion vient de lui être envoyé. Vérifiez votre boîte mail (et les spams).",
    login_invalid_link:
      "Lien de connexion invalide ou expiré. Demandez-en un nouveau.",
    // Dashboard
    dash_title: "Tableau de bord",
    dash_news: "Actualités",
    dash_news_desc: "Publier, modifier ou retirer des articles",
    dash_campaign: "Campagne",
    dash_campaign_desc: "Objectif, montant collecté, activation",
    dash_images: "Images",
    dash_images_desc: "Téléverser et parcourir les photos du site",
    dash_view_site: "Voir le site",
    // News
    news_title: "Actualités",
    news_empty: "Aucun article publié — le site affiche « bientôt disponible ».",
    news_new: "Nouvel article",
    news_field_title_fr: "Titre (français)",
    news_field_title_en: "Titre (anglais)",
    news_field_excerpt_fr: "Résumé (français)",
    news_field_excerpt_en: "Résumé (anglais)",
    news_field_date: "Date",
    news_field_tag: "Catégorie",
    news_field_accent: "Couleur d'accent",
    news_field_image: "Image (chemin, optionnel)",
    news_image_hint: "Exemple : /images/hero-classroom.jpg — voir la page Images",
    tag_impact: "Impact",
    tag_education: "Éducation",
    tag_partnership: "Partenariat",
    tag_report: "Rapport",
    tag_campaign: "Campagne",
    tag_award: "Prix",
    accent_teal: "Vert (teal)",
    accent_amber: "Ambre",
    // Campaign
    campaign_title: "Campagne",
    campaign_active: "Campagne active (affichée sur la page d'accueil)",
    campaign_goal: "Objectif (€)",
    campaign_raised: "Montant collecté (€)",
    campaign_donors: "Nombre de donateurs",
    // Images
    images_title: "Images",
    images_upload: "Téléverser une image",
    images_uploading: "Téléversement…",
    images_hint:
      "JPG, PNG ou WebP, 3 Mo maximum. L'image sera visible sur le site après publication (2–3 min).",
    images_copy: "Copier le chemin",
    images_copied: "Copié !",
    images_too_big: "Fichier trop volumineux (3 Mo maximum).",
    images_bad_type: "Format non pris en charge (JPG, PNG ou WebP).",
  },
  en: {
    app_title: "HCW Admin",
    loading: "Loading…",
    save: "Save",
    saving: "Saving…",
    cancel: "Cancel",
    delete: "Delete",
    edit: "Edit",
    add: "Add",
    back: "Back",
    logout: "Log out",
    error_generic: "Something went wrong. Try again.",
    publish_note:
      "Every save is published automatically — live within 2–3 minutes.",
    saved_ok: "Saved! Publishing now (2–3 min).",
    confirm_delete: "Delete permanently?",
    login_title: "Sign in",
    login_intro:
      "Enter your email address. If it is authorised, you will receive a sign-in link.",
    login_email_label: "Email address",
    login_submit: "Send me a sign-in link",
    login_sent:
      "If this address is authorised, a sign-in link has just been sent to it. Check your inbox (and spam).",
    login_invalid_link: "Invalid or expired sign-in link. Request a new one.",
    dash_title: "Dashboard",
    dash_news: "News",
    dash_news_desc: "Publish, edit or remove articles",
    dash_campaign: "Campaign",
    dash_campaign_desc: "Goal, amount raised, activation",
    dash_images: "Images",
    dash_images_desc: "Upload and browse the site's photos",
    dash_view_site: "View site",
    news_title: "News",
    news_empty: "No published articles — the site shows “coming soon”.",
    news_new: "New article",
    news_field_title_fr: "Title (French)",
    news_field_title_en: "Title (English)",
    news_field_excerpt_fr: "Excerpt (French)",
    news_field_excerpt_en: "Excerpt (English)",
    news_field_date: "Date",
    news_field_tag: "Category",
    news_field_accent: "Accent colour",
    news_field_image: "Image (path, optional)",
    news_image_hint: "Example: /images/hero-classroom.jpg — see the Images page",
    tag_impact: "Impact",
    tag_education: "Education",
    tag_partnership: "Partnership",
    tag_report: "Report",
    tag_campaign: "Campaign",
    tag_award: "Award",
    accent_teal: "Teal",
    accent_amber: "Amber",
    campaign_title: "Campaign",
    campaign_active: "Campaign active (shown on the homepage)",
    campaign_goal: "Goal (€)",
    campaign_raised: "Amount raised (€)",
    campaign_donors: "Number of donors",
    images_title: "Images",
    images_upload: "Upload an image",
    images_uploading: "Uploading…",
    images_hint:
      "JPG, PNG or WebP, 3 MB max. The image appears on the site after publishing (2–3 min).",
    images_copy: "Copy path",
    images_copied: "Copied!",
    images_too_big: "File too large (3 MB max).",
    images_bad_type: "Unsupported format (JPG, PNG or WebP).",
  },
} as const;

export type AdminStringKey = keyof (typeof STRINGS)["fr"];

const AdminLocaleContext = createContext<{
  locale: AdminLocale;
  setLocale: (l: AdminLocale) => void;
}>({ locale: "fr", setLocale: () => {} });

export function AdminLocaleProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [locale, setLocaleState] = useState<AdminLocale>("fr");

  useEffect(() => {
    // Hydration-safe restore of the stored preference; only EN needs a
    // flip since FR is the default.
    const stored = window.localStorage.getItem("hcw_admin_locale");
    if (stored === "en") {
      queueMicrotask(() => setLocaleState("en"));
    }
  }, []);

  const setLocale = useCallback((l: AdminLocale) => {
    setLocaleState(l);
    window.localStorage.setItem("hcw_admin_locale", l);
  }, []);

  return (
    <AdminLocaleContext.Provider value={{ locale, setLocale }}>
      {children}
    </AdminLocaleContext.Provider>
  );
}

export function useAdminT() {
  const { locale, setLocale } = useContext(AdminLocaleContext);
  const t = useCallback(
    (key: AdminStringKey) => STRINGS[locale][key],
    [locale],
  );
  return { t, locale, setLocale };
}
