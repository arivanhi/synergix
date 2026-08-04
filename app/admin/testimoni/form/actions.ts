"use server";

import { prisma } from "../../../../lib/prisma";

export async function getTestimoniById(id: number) {
	try {
		const data = await prisma.testimoni.findUnique({
			where: { id },
		});
		return { data };
	} catch (error) {
		return { error: "Gagal memuat testimoni" };
	}
}
