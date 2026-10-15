"use server";

import { requireAdmin } from "../../lib/admin";
import { prisma } from "../../lib/prisma";
import { revalidatePath } from "next/cache";
import { KategoriProduk } from "@prisma/client";
import { normalizePortfolioSourceUrl } from "../../lib/portfolio-model";

export async function createProduk(data: { nama: string; deskripsi: string; kategori: KategoriProduk; gambar?: string; sourceUrl?: string }) {
	await requireAdmin();
	try {
		await prisma.produk.create({ data: { ...data, sourceUrl: normalizePortfolioSourceUrl(data.sourceUrl) } });
		revalidatePath("/");
		revalidatePath("/portofolio");
		revalidatePath("/portofolio/[id]", "page");
		revalidatePath("/admin/produk");
		return { success: true };
	} catch (error) {
		console.error("Gagal membuat produk:", error);
		return { error: "Gagal membuat produk" };
	}
}

export async function updateProduk(id: number, data: { nama: string; deskripsi: string; kategori: KategoriProduk; gambar?: string; sourceUrl?: string }) {
	await requireAdmin();
	try {
		await prisma.produk.update({
			where: { id },
			data: { ...data, sourceUrl: normalizePortfolioSourceUrl(data.sourceUrl) },
		});
		revalidatePath("/");
		revalidatePath("/portofolio");
		revalidatePath("/portofolio/[id]", "page");
		revalidatePath("/admin/produk");
		return { success: true };
	} catch (error) {
		console.error("Gagal update produk:", error);
		return { error: "Gagal update produk" };
	}
}

export async function deleteProduk(id: number) {
	await requireAdmin();
	try {
		await prisma.produk.delete({ where: { id } });
		revalidatePath("/");
		revalidatePath("/portofolio");
		revalidatePath("/portofolio/[id]", "page");
		revalidatePath("/admin/produk");
		return { success: true };
	} catch (error) {
		console.error("Gagal menghapus produk:", error);
		return { error: "Gagal menghapus produk" };
	}
}
