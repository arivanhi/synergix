"use server";

import { requireAdmin } from "../../lib/admin";
import { prisma } from "../../lib/prisma";
import { revalidatePath } from "next/cache";
import { StatusMagang } from "@prisma/client";

export async function updateStatusMagang(id: number, status: StatusMagang) {
	await requireAdmin();
	try {
		if (!Number.isSafeInteger(id) || id <= 0 || !["MENUNGGU", "DITERIMA", "DITOLAK"].includes(status)) return { error: "Status pendaftar tidak valid." };
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
