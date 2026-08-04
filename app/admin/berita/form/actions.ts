"use server";

import { prisma } from "../../../../lib/prisma";

export async function getBeritaById(id: number) {
	try {
		const data = await prisma.berita.findUnique({
			where: { id },
		});
		return { data };
	} catch (error) {
		return { error: "Gagal memuat berita" };
	}
}
