import { requireAdmin } from "../../../../lib/admin";
import { getOverview } from "../../../../lib/overview";
export async function GET() {
  try { await requireAdmin(); } catch { return Response.json({ error: "Tidak diizinkan." }, { status: 401 }); }
  const overview = await getOverview();
  const rows = [["Laporan SynergiX", new Date().toISOString()], ["Total produk", String(overview.stats.totalProduk)], ["Total berita", String(overview.stats.totalBerita)], ["Total pendaftar magang", String(overview.stats.pendaftarMagang)], ["Perlu ditindaklanjuti", String(overview.pending)], ["Tanggal pembaruan", "Konten"], ...overview.activities.map(a => [a.date, a.title])];
  const csv = "\uFEFF" + rows.map(row => row.map(value => `"${(/^[=+\-@\t\r]/.test(value) ? "'" + value : value).replace(/"/g, '""')}"`).join(",")).join("\r\n");
  return new Response(csv, { headers: { "Content-Type": "text/csv; charset=utf-8", "Content-Disposition": 'attachment; filename="laporan-synergix.csv"', "Cache-Control": "no-store" } });
}
