"use server";

import { prisma } from "../../lib/prisma";
import { revalidatePath } from "next/cache";

export async function saveLayanan(data: { id?: number, judul: string, deskripsi: string, gambar?: string, ikon?: string }) {
	try {
		if (data.id) {
			await prisma.layanan.update({
				where: { id: data.id },
				data: {
					judul: data.judul,
					deskripsi: data.deskripsi,
					gambar: data.gambar,
					ikon: data.ikon,
				}
			});
		} else {
			await prisma.layanan.create({
				data: {
					judul: data.judul,
					deskripsi: data.deskripsi,
					gambar: data.gambar,
					ikon: data.ikon,
				}
			});
		}
		revalidatePath("/");
		revalidatePath("/admin/layanan-web");
		return { success: true };
	} catch (error) {
		console.error("Error saving layanan:", error);
		return { error: "Gagal menyimpan layanan." };
	}
}

export async function deleteLayanan(id: number) {
	try {
		await prisma.layanan.delete({ where: { id } });
		revalidatePath("/");
		revalidatePath("/admin/layanan-web");
		return { success: true };
	} catch (error) {
		console.error("Error deleting layanan:", error);
		return { error: "Gagal menghapus layanan." };
	}
}
