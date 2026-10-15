"use server";
import { prisma } from "../../lib/prisma";
import { requireAdmin } from "../../lib/admin";
import { validateTeam, type TeamInput } from "../../lib/team-input";
import { revalidatePath } from "next/cache";
function refresh() { revalidatePath("/"); revalidatePath("/tim", "page"); revalidatePath("/tim/[id]", "page"); revalidatePath("/admin/tim"); }
export async function createTim(data: TeamInput) {
  await requireAdmin();
  try { await prisma.keanggotaan.create({ data: validateTeam(data) }); refresh(); return { success: true }; }
  catch (error) { return { error: error instanceof Error ? error.message : "Gagal membuat profil anggota." }; }
}
export async function updateTim(id: number, data: TeamInput) {
  await requireAdmin();
  try { if (!Number.isSafeInteger(id) || id <= 0) throw new Error("ID tidak valid."); await prisma.keanggotaan.update({ where: { id }, data: validateTeam(data) }); refresh(); return { success: true }; }
  catch (error) { return { error: error instanceof Error ? error.message : "Gagal memperbarui profil anggota." }; }
}
export async function deleteTim(id: number) {
  await requireAdmin();
  try { await prisma.keanggotaan.delete({ where: { id } }); refresh(); return { success: true }; }
  catch { return { error: "Gagal menghapus profil anggota." }; }
}
