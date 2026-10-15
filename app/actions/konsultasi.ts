"use server";
import { prisma } from "../../lib/prisma";
import { requireAdmin } from "../../lib/admin";
import { revalidatePath } from "next/cache";
export async function submitKonsultasi(data: { nama: string; perusahaan: string; layanan: string; detail: string }) {
  try {
    for (const key of ["nama", "perusahaan", "layanan", "detail"] as const) if (typeof data?.[key] !== "string" || !data[key].trim() || data[key].length > (key === "detail" ? 10000 : 191)) throw new Error("Lengkapi data konsultasi dengan benar.");
    await prisma.konsultasi.create({ data: { nama: data.nama.trim(), perusahaan: data.perusahaan.trim(), layanan: data.layanan.trim(), detail: data.detail.trim() } });
    revalidatePath("/admin/konsultasi"); revalidatePath("/admin");
    return { success: true };
  } catch (error) { return { error: error instanceof Error && error.message === "Lengkapi data konsultasi dengan benar." ? error.message : "Permintaan gagal disimpan. Silakan coba lagi." }; }
}
export async function updateKonsultasi(id: number, diproses: boolean) {
  await requireAdmin();
  if (!Number.isSafeInteger(id) || id <= 0 || typeof diproses !== "boolean") throw new Error("Data tidak valid.");
  await prisma.konsultasi.update({ where: { id }, data: { diproses } });
  revalidatePath("/admin/konsultasi"); revalidatePath("/admin");
}
