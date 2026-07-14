import { redirect } from "next/navigation";
import { getAdminSession } from "@/lib/admin/session";
import LoginClient from "./LoginClient";

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ erreur?: string }>;
}) {
  const session = await getAdminSession();
  if (session) redirect("/admin/tableau");

  const { erreur } = await searchParams;
  return <LoginClient invalidLink={erreur === "lien-invalide"} />;
}
