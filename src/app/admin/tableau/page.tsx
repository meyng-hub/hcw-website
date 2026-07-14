import { redirect } from "next/navigation";
import { getAdminSession } from "@/lib/admin/session";
import DashboardClient from "./DashboardClient";

export default async function AdminDashboardPage() {
  const session = await getAdminSession();
  if (!session) redirect("/admin");
  return <DashboardClient email={session.email} />;
}
