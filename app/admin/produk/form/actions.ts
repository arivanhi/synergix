"use server";

import { prisma } from "../../../../lib/prisma";

export async function getProdukById(id: number) {
	try {
		const data = await prisma.produk.findUnique({
			where: { id },
		});
		return { data };
	} catch (error) {
		return { error: "Gagal memuat produk" };
	}
}
