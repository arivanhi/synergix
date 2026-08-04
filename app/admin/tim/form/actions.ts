"use server";

import { prisma } from "../../../../lib/prisma";

export async function getTimById(id: number) {
	try {
		const data = await prisma.keanggotaan.findUnique({
			where: { id },
		});
		return { data };
	} catch (error) {
		return { error: "Gagal memuat profil" };
	}
}
