import "server-only";
import { prisma } from "./prisma";
export async function getOverview() {
  const [produk, berita, tim, magang, layanan, testimoni, konsultasi, konten] = await Promise.all([
    prisma.produk.findMany({ select: { nama: true, updatedAt: true } }),
    prisma.berita.findMany({ select: { judul: true, updatedAt: true } }),
    prisma.keanggotaan.findMany({ select: { nama: true, updatedAt: true } }),
    prisma.pendaftarMagang.findMany({ select: { nama: true, updatedAt: true, status: true } }),
    prisma.layanan.findMany({ select: { judul: true, updatedAt: true } }),
    prisma.testimoni.findMany({ select: { nama: true, updatedAt: true, status: true } }),
    prisma.konsultasi.findMany({ select: { nama: true, updatedAt: true, diproses: true } }),
    prisma.kontenWebsite.findUnique({ where: { id: 1 }, select: { updatedAt: true } }),
  ]);
  const activities = [
    ...produk.map(r => ({ title: `Produk: ${r.nama}`, href: "/admin/produk", date: r.updatedAt.toISOString() })),
    ...berita.map(r => ({ title: `Berita: ${r.judul}`, href: "/admin/berita", date: r.updatedAt.toISOString() })),
    ...tim.map(r => ({ title: `Tim: ${r.nama}`, href: "/admin/tim", date: r.updatedAt.toISOString() })),
    ...magang.map(r => ({ title: `Magang: ${r.nama} (${r.status})`, href: "/admin/layanan", date: r.updatedAt.toISOString() })),
    ...layanan.map(r => ({ title: `Layanan: ${r.judul}`, href: "/admin/layanan-web", date: r.updatedAt.toISOString() })),
    ...testimoni.map(r => ({ title: `Testimoni: ${r.nama} (${r.status})`, href: "/admin/testimoni", date: r.updatedAt.toISOString() })),
    ...konsultasi.map(r => ({ title: `Konsultasi: ${r.nama}`, href: "/admin/konsultasi", date: r.updatedAt.toISOString() })),
    ...(konten ? [{ title: "Konten website diperbarui", href: "/admin/konten", date: konten.updatedAt.toISOString() }] : []),
  ].sort((a, b) => b.date.localeCompare(a.date));
  const days = Array.from({ length: 7 }, (_, i) => { const date = new Date(); date.setUTCDate(date.getUTCDate() - 6 + i); const day = date.toISOString().slice(0, 10); return { day, count: activities.filter(a => a.date.startsWith(day)).length }; });
  return { stats: { totalProduk: produk.length, totalBerita: berita.length, pendaftarMagang: magang.length }, activities, days, pending: magang.filter(r => r.status === "MENUNGGU").length + konsultasi.filter(r => !r.diproses).length + testimoni.filter(r => r.status === "MENUNGGU").length };
}
