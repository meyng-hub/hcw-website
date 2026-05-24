import { redirect } from "next/navigation";

// Root "/" redirects to default locale /fr
export default function RootPage() {
  redirect("/fr");
}
