import AdminLayout from "../../components/AdminLayout";
import ContentEditor from "./ContentEditor";
import { getSiteContent } from "../../../lib/content";
import { requireAdmin } from "../../../lib/admin";

export const dynamic = "force-dynamic";
export default async function ContentPage() {
  const admin = await requireAdmin();
  return <AdminLayout user={{ name: admin.nama }}><ContentEditor initialContent={await getSiteContent()} /></AdminLayout>;
}
