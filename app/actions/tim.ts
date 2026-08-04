"use server";

import { prisma } from "../../lib/prisma";
import { revalidatePath } from "next/cache";
import { PeranAnggota } from "@prisma/client";

export async function createTim(data: {
	nama: string;
	peran: PeranAnggota;
	jabatan?: string;
	biografi?: string;
	gelar?: string;
	pengalaman?: string;
	lokasi?: string;
	jumlahPublikasi?: string;
	publikasi?: any;
	riset?: any;
	paten?: string;
	foto?: string;
}) {
	try {
		await prisma.keanggotaan.create({ data });
		revalidatePath("/");
		revalidatePath("/tim");
		revalidatePath("/admin/tim");
		return { success: true };
	} catch (error) {
		console.error("Gagal membuat data tim:", error);
		return { error: "Gagal membuat profil anggota" };
	}
}

export async function updateTim(id: number, data: any) {
	try {
		await prisma.keanggotaan.update({
			where: { id },
			data,
		});
		revalidatePath("/");
		revalidatePath("/tim");
		revalidatePath("/admin/tim");
		return { success: true };
	} catch (error) {
		console.error("Gagal update tim:", error);
		return { error: "Gagal update profil anggota" };
	}
}

export async function deleteTim(id: number) {
	try {
		await prisma.keanggotaan.delete({ where: { id } });
		revalidatePath("/");
		revalidatePath("/tim");
		revalidatePath("/admin/tim");
		return { success: true };
	} catch (error) {
		console.error("Gagal menghapus profil tim:", error);
		return { error: "Gagal menghapus profil anggota" };
	}
}
