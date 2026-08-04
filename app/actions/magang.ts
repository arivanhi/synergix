"use server";

import { prisma } from "../../lib/prisma";
import { revalidatePath } from "next/cache";
import { StatusMagang } from "@prisma/client";

export async function updateStatusMagang(id: number, status: StatusMagang) {
	try {
		await prisma.pendaftarMagang.update({
			where: { id },
			data: { status },
		});
		revalidatePath("/admin/layanan");
		return { success: true };
	} catch (error) {
		console.error("Gagal update status magang:", error);
		return { error: "Gagal memperbarui status pendaftar" };
	}
}
