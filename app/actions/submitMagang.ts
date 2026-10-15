"use server";

import { prisma } from "../../lib/prisma";
import { revalidatePath } from "next/cache";
import { promises as fs } from "node:fs";
import path from "node:path";

export async function submitMagang(data: { 
	nama: string; 
	email: string; 
	asalSekolah: string; 
	nisn?: string;
	jurusan?: string;
	durasi?: string;
	motivasi?: string;
	suratRekomendasi?: string 
}) {
	try {
		for (const key of ["nama", "email", "asalSekolah", "nisn", "jurusan", "durasi", "motivasi"] as const) {
			if (typeof data?.[key] !== "string" || !data[key]?.trim() || (data[key]?.length || 0) > (key === "motivasi" ? 10000 : 191)) return { error: "Lengkapi seluruh isian pendaftaran." };
		}
		if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email) || !/^\d{10}$/.test(data.nisn || "")) return { error: "Email atau NISN tidak valid. NISN harus 10 digit." };
		if (!/^\/api\/documents\/[a-zA-Z0-9_-]+\.(pdf|png|jpg|gif|webp)$/.test(data.suratRekomendasi || "")) return { error: "Unggah surat rekomendasi yang valid." };
		await fs.access(path.join(process.cwd(), "private-uploads", path.basename(data.suratRekomendasi!)));
		await prisma.pendaftarMagang.create({
			data: {
				nama: data.nama,
				email: data.email,
				asalSekolah: data.asalSekolah,
				nisn: data.nisn || "",
				jurusan: data.jurusan || "",
				durasi: data.durasi || "",
				motivasi: data.motivasi || "",
				suratRekomendasi: data.suratRekomendasi,
			}
		});
		revalidatePath("/admin/layanan"); revalidatePath("/admin");
		return { success: true };
	} catch (error) {
		console.error("Gagal mendaftar magang:", error);
		return { error: "Terjadi kesalahan saat menyimpan data pendaftaran." };
	}
}
