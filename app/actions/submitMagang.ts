"use server";

import { prisma } from "../../lib/prisma";

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
		return { success: true };
	} catch (error) {
		console.error("Gagal mendaftar magang:", error);
		return { error: "Terjadi kesalahan saat menyimpan data pendaftaran." };
	}
}
