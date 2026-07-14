import { redirect } from "next/navigation";
import { getAdminSession } from "@/lib/admin/session";
import ImagesAdminClient from "./ImagesAdminClient";

export default async function AdminImagesPage() {
  const session = await getAdminSession();
  if (!session) redirect("/admin");
  return <ImagesAdminClient email={session.email} />;
}
