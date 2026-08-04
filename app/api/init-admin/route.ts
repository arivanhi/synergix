import { NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";
import bcrypt from "bcrypt";

export async function GET(request: Request) {
	try {
		// Cek apakah admin sudah ada
		const existingAdmin = await prisma.admin.findUnique({
			where: { username: "admin" },
		});

		if (existingAdmin) {
			return NextResponse.json(
				{ message: "Akun admin sudah ada!", username: "admin" },
				{ status: 200 }
			);
		}

		// Buat hash password
		const hashedPassword = await bcrypt.hash("admin123", 10);

		// Buat akun admin baru
		const newAdmin = await prisma.admin.create({
			data: {
				username: "admin",
				password: hashedPassword,
				nama: "Administrator Utama",
			},
		});

		return NextResponse.json(
			{
				message: "Akun admin berhasil dibuat!",
				username: newAdmin.username,
				password_bawaan: "admin123",
				keterangan: "Segera ganti password Anda jika memungkinkan."
			},
			{ status: 201 }
		);
	} catch (error) {
		console.error("Gagal inisiasi admin:", error);
		return NextResponse.json(
			{ error: "Gagal membuat akun admin" },
			{ status: 500 }
		);
	}
}
