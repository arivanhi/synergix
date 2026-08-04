"use server";

import { prisma } from "../../lib/prisma";
import { revalidatePath } from "next/cache";

export async function createTestimoni(data: { nama: string; jabatan: string; teks: string; foto?: string }) {
	try {
		await prisma.testimoni.create({ data });
		revalidatePath("/");
		revalidatePath("/admin/testimoni");
		return { success: true };
	} catch (error) {
		console.error("Gagal membuat testimoni:", error);
		return { error: "Gagal membuat testimoni" };
	}
}

export async function updateTestimoni(id: number, data: { nama: string; jabatan: string; teks: string; foto?: string }) {
	try {
		await prisma.testimoni.update({
			where: { id },
			data,
		});
		revalidatePath("/");
		revalidatePath("/admin/testimoni");
		return { success: true };
	} catch (error) {
		console.error("Gagal update testimoni:", error);
		return { error: "Gagal update testimoni" };
	}
}

export async function deleteTestimoni(id: number) {
	try {
		await prisma.testimoni.delete({ where: { id } });
		revalidatePath("/");
		revalidatePath("/admin/testimoni");
		return { success: true };
	} catch (error) {
		console.error("Gagal menghapus testimoni:", error);
		return { error: "Gagal menghapus testimoni" };
	}
}
