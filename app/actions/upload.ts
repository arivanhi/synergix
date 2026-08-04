"use server";

import { promises as fs } from "fs";
import path from "path";

export async function uploadImage(formData: FormData): Promise<{ url?: string; error?: string }> {
	try {
		const file = formData.get("file") as File;
		if (!file) {
			return { error: "File tidak ditemukan" };
		}

		const bytes = await file.arrayBuffer();
		const buffer = Buffer.from(bytes);

		// Buat nama file unik (cegah penimpaan nama yang sama)
		const timestamp = Date.now();
		const safeName = file.name.replace(/[^a-zA-Z0-9.\-_]/g, "_");
		const filename = `${timestamp}-${safeName}`;
		
		// Pastikan folder uploads ada (di dalam public)
		const uploadDir = path.join(process.cwd(), "public", "uploads");
		try {
			await fs.access(uploadDir);
		} catch {
			await fs.mkdir(uploadDir, { recursive: true });
		}

		const filepath = path.join(uploadDir, filename);
		
		// Simpan file
		await fs.writeFile(filepath, buffer);
		
		// Kembalikan URL publik
		return { url: `/uploads/${filename}` };
	} catch (error) {
		console.error("Gagal mengunggah gambar:", error);
		return { error: "Terjadi kesalahan saat mengunggah gambar" };
	}
}
