"use server";

import { prisma } from "../../lib/prisma";
import { revalidatePath } from "next/cache";

export async function saveLayanan(data: { id?: number, judul: string, deskripsi: string, gambar?: string, ikon?: string }) {
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
}

export async function deleteLayanan(id: number) {
	await prisma.layanan.delete({ where: { id } });
	revalidatePath("/");
	revalidatePath("/admin/layanan-web");
}
