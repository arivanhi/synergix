import AdminLayout from "../../components/AdminLayout";
import { requireAdmin } from "../../../lib/admin";
import { getOverview } from "../../../lib/overview";
import Link from "next/link";
export const dynamic = "force-dynamic";
export default async function ActivityPage() {
  const admin = await requireAdmin(); const overview = await getOverview();
  return <AdminLayout user={{ name: admin.nama }}><h1 className="text-2xl font-bold mb-2">Aktivitas Konten</h1><p className="text-gray-500 mb-6">Pembaruan terakhir setiap konten dan permintaan yang membutuhkan tindak lanjut: {overview.pending}.</p><div className="bg-white rounded-xl border divide-y">{overview.activities.map((activity, i) => <Link key={i} href={activity.href} className="block p-4 hover:bg-gray-50"><p className="font-bold">{activity.title}</p><time className="text-sm text-gray-500">{new Date(activity.date).toLocaleString("id-ID", { timeZone: "Asia/Jakarta" })}</time></Link>)}{!overview.activities.length && <p className="p-6 text-gray-500">Belum ada aktivitas.</p>}</div></AdminLayout>;
}
