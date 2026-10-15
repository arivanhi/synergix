import { requireAdmin } from "../../../../lib/admin";
import { prisma } from "../../../../lib/prisma";
export async function GET(request: Request) {
  try { await requireAdmin(); } catch { return Response.json({ error: "Tidak diizinkan." }, { status: 401 }); }
  const q = new URL(request.url).searchParams.get("q")?.trim().slice(0, 100) || "";
  if (!q) return Response.json([]);
  const [produk, berita, tim, magang, layanan, konsultasi] = await Promise.all([
    prisma.produk.findMany({ where: { nama: { contains: q } }, take: 5, select: { nama: true } }),
    prisma.berita.findMany({ where: { judul: { contains: q } }, take: 5, select: { judul: true } }),
    prisma.keanggotaan.findMany({ where: { nama: { contains: q } }, take: 5, select: { nama: true } }),
    prisma.pendaftarMagang.findMany({ where: { nama: { contains: q } }, take: 5, select: { nama: true } }),
    prisma.layanan.findMany({ where: { judul: { contains: q } }, take: 5, select: { judul: true } }),
    prisma.konsultasi.findMany({ where: { nama: { contains: q } }, take: 5, select: { nama: true } }),
  ]);
  return Response.json([
    ...produk.map(r => ({ title: `Produk: ${r.nama}`, href: "/admin/produk" })),
    ...berita.map(r => ({ title: `Berita: ${r.judul}`, href: "/admin/berita" })),
    ...tim.map(r => ({ title: `Tim: ${r.nama}`, href: "/admin/tim" })),
    ...magang.map(r => ({ title: `Magang: ${r.nama}`, href: "/admin/layanan" })),
    ...layanan.map(r => ({ title: `Layanan: ${r.judul}`, href: "/admin/layanan-web" })),
    ...konsultasi.map(r => ({ title: `Konsultasi: ${r.nama}`, href: "/admin/konsultasi" })),
  ]);
}
