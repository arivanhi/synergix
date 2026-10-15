import AdminLayout from "../../components/AdminLayout";
import { requireAdmin } from "../../../lib/admin";
import { prisma } from "../../../lib/prisma";
import { updateKonsultasi } from "../../actions/konsultasi";
export const dynamic = "force-dynamic";
export default async function ConsultationPage() {
  const admin = await requireAdmin(); const rows = await prisma.konsultasi.findMany({ orderBy: { createdAt: "desc" } });
  return <AdminLayout user={{ name: admin.nama }}><h1 className="text-2xl font-bold mb-6">Permintaan Konsultasi</h1><div className="space-y-4">{rows.map(row => <article key={row.id} className="bg-white border rounded-xl p-6"><div className="flex justify-between gap-4"><div><h2 className="font-bold">{row.nama} — {row.perusahaan}</h2><p className="text-sm text-gray-500">{row.layanan} · {row.createdAt.toLocaleString("id-ID", { timeZone: "Asia/Jakarta" })}</p></div><form action={async () => { "use server"; await updateKonsultasi(row.id, !row.diproses); }}><button className="bg-teal-100 text-teal-800 rounded-lg px-3 py-2 text-sm">{row.diproses ? "Buka kembali" : "Tandai diproses"}</button></form></div><p className="mt-4 whitespace-pre-wrap text-gray-700">{row.detail}</p><p className="mt-3 text-sm font-bold">{row.diproses ? "Sudah diproses" : "Menunggu tindak lanjut"}</p></article>)}{!rows.length && <p className="bg-white rounded-xl p-6 text-gray-500">Belum ada permintaan konsultasi.</p>}</div></AdminLayout>;
}
