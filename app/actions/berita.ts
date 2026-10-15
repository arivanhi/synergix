"use server";

import { requireAdmin } from "../../lib/admin";
import { prisma } from "../../lib/prisma";
import { revalidatePath } from "next/cache";

export async function createBerita(data: { judul: string; konten: string; gambar?: string }) {
	await requireAdmin();
	try {
		await prisma.berita.create({ data });
		revalidatePath("/");
		revalidatePath("/berita");
		revalidatePath("/berita/[id]", "page");
		revalidatePath("/admin/berita");
		return { success: true };
	} catch (error) {
		console.error("Gagal membuat berita:", error);
		return { error: "Gagal membuat berita" };
	}
}

export async function updateBerita(id: number, data: { judul: string; konten: string; gambar?: string }) {
	await requireAdmin();
	try {
		await prisma.berita.update({
			where: { id },
			data,
		});
		revalidatePath("/");
		revalidatePath("/berita");
		revalidatePath("/berita/[id]", "page");
		revalidatePath("/admin/berita");
		return { success: true };
	} catch (error) {
		console.error("Gagal update berita:", error);
		return { error: "Gagal update berita" };
	}
}

export async function deleteBerita(id: number) {
	await requireAdmin();
	try {
		await prisma.berita.delete({ where: { id } });
		revalidatePath("/");
		revalidatePath("/berita");
		revalidatePath("/berita/[id]", "page");
		revalidatePath("/admin/berita");
		return { success: true };
	} catch (error) {
		console.error("Gagal menghapus berita:", error);
		return { error: "Gagal menghapus berita" };
	}
}
