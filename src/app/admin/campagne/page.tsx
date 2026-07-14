import { redirect } from "next/navigation";
import { getAdminSession } from "@/lib/admin/session";
import CampaignAdminClient from "./CampaignAdminClient";

export default async function AdminCampaignPage() {
  const session = await getAdminSession();
  if (!session) redirect("/admin");
  return <CampaignAdminClient email={session.email} />;
}
