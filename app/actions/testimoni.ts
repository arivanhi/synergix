"use server";

import { requireAdmin } from "../../lib/admin";
import { prisma } from "../../lib/prisma";
import { revalidatePath } from "next/cache";
import { TestimonialInputError, validateTestimonialFields, validateTestimonialStatus } from "../../lib/testimonial-input";
import { safeUrl } from "../../lib/content-model";

type TestimonialData = { nama: string; jabatan: string; teks: string; foto?: string; instansi?: string; status?: string };

function photoUrl(foto?: string) {
	if (foto !== undefined && (typeof foto !== "string" || foto.length > 191 || !safeUrl(foto))) throw new TestimonialInputError("URL foto tidak valid.");
	return foto;
}

function refreshTestimoni() {
	revalidatePath("/");
	revalidatePath("/admin/testimoni");
	revalidatePath("/admin");
}

export async function createTestimoni(data: TestimonialData) {
	await requireAdmin();
	try {
		await prisma.testimoni.create({ data: { ...validateTestimonialFields(data), foto: photoUrl(data.foto), status: validateTestimonialStatus(data.status ?? "DISETUJUI") } });
		refreshTestimoni();
		return { success: true };
	} catch (error) {
		console.error("Gagal membuat testimoni:", error);
		return { error: error instanceof TestimonialInputError ? error.message : "Gagal membuat testimoni" };
	}
}

export async function updateTestimoni(id: number, data: TestimonialData) {
	await requireAdmin();
	try {
		await prisma.testimoni.update({
			where: { id },
			data: { ...validateTestimonialFields(data), foto: photoUrl(data.foto), ...(data.status !== undefined ? { status: validateTestimonialStatus(data.status) } : {}) },
		});
		refreshTestimoni();
		return { success: true };
	} catch (error) {
		console.error("Gagal update testimoni:", error);
		return { error: error instanceof TestimonialInputError ? error.message : "Gagal update testimoni" };
	}
}

export async function deleteTestimoni(id: number) {
	await requireAdmin();
	try {
		await prisma.testimoni.delete({ where: { id } });
		refreshTestimoni();
		return { success: true };
	} catch (error) {
		console.error("Gagal menghapus testimoni:", error);
		return { error: "Gagal menghapus testimoni" };
	}
}

export async function setTestimoniStatus(id: number, status: string) {
	await requireAdmin();
	try {
		if (!Number.isSafeInteger(id) || id <= 0) throw new TestimonialInputError("Testimoni tidak valid.");
		await prisma.testimoni.update({ where: { id }, data: { status: validateTestimonialStatus(status) } });
		refreshTestimoni();
		return { success: true };
	} catch (error) {
		return { error: error instanceof TestimonialInputError ? error.message : "Status belum tersimpan. Silakan coba kembali." };
	}
}
