"use server";

import { prisma } from "../../lib/prisma";
import { revalidatePath } from "next/cache";
import { KategoriProduk } from "@prisma/client";

export async function createProduk(data: { nama: string; deskripsi: string; kategori: KategoriProduk; gambar?: string }) {
	try {
		await prisma.produk.create({ data });
		revalidatePath("/");
		revalidatePath("/admin/produk");
		return { success: true };
	} catch (error) {
		console.error("Gagal membuat produk:", error);
		return { error: "Gagal membuat produk" };
	}
}

export async function updateProduk(id: number, data: { nama: string; deskripsi: string; kategori: KategoriProduk; gambar?: string }) {
	try {
		await prisma.produk.update({
			where: { id },
			data,
		});
		revalidatePath("/");
		revalidatePath("/admin/produk");
		return { success: true };
	} catch (error) {
		console.error("Gagal update produk:", error);
		return { error: "Gagal update produk" };
	}
}

export async function deleteProduk(id: number) {
	try {
		await prisma.produk.delete({ where: { id } });
		revalidatePath("/");
		revalidatePath("/admin/produk");
		return { success: true };
	} catch (error) {
		console.error("Gagal menghapus produk:", error);
		return { error: "Gagal menghapus produk" };
	}
}
