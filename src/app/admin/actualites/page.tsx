import { redirect } from "next/navigation";
import { getAdminSession } from "@/lib/admin/session";
import NewsAdminClient from "./NewsAdminClient";

export default async function AdminNewsPage() {
  const session = await getAdminSession();
  if (!session) redirect("/admin");
  return <NewsAdminClient email={session.email} />;
}
