import { prisma } from "../../../../lib/prisma";
import AdminLayout from "../../../components/AdminLayout";
import Link from "next/link";
import { ArrowLeft, Save } from "lucide-react";
import { saveLayanan } from "../../../actions/layanan";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../../api/auth/[...nextauth]/route";

export const dynamic = 'force-dynamic';

export default async function LayananWebFormPage({
	searchParams,
}: {
	searchParams: { id?: string };
}) {
	const session = await getServerSession(authOptions);
	const isEdit = !!searchParams.id;
	let data = null;

	if (isEdit) {
		data = await prisma.layanan.findUnique({
			where: { id: parseInt(searchParams.id as string) },
		});
	}

	async function handleSubmit(formData: FormData) {
		"use server";
		const id = formData.get("id") as string;
		const judul = formData.get("judul") as string;
		const deskripsi = formData.get("deskripsi") as string;
		const gambar = formData.get("gambar") as string;
		const ikon = formData.get("ikon") as string;

		await saveLayanan({
			id: id ? parseInt(id) : undefined,
			judul,
			deskripsi,
			gambar,
			ikon,
		});

		redirect("/admin/layanan-web");
	}

	return (
		<AdminLayout user={session?.user || {}}>
			<div className="flex items-center gap-4 mb-6">
				<Link href="/admin/layanan-web" className="text-gray-400 hover:text-blue-600 transition-colors">
					<ArrowLeft size={24} />
				</Link>
				<div>
					<h1 className="text-2xl font-bold text-gray-900">{isEdit ? "Edit Layanan" : "Tambah Layanan"}</h1>
					<p className="text-gray-500 text-sm">Silakan isi detail layanan web di bawah ini.</p>
				</div>
			</div>

			<div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden max-w-3xl">
				<form action={handleSubmit} className="p-6 space-y-6">
					{isEdit && <input type="hidden" name="id" value={data?.id} />}
					
					<div>
						<label className="block text-sm font-bold text-gray-700 mb-2">Judul Layanan</label>
						<input
							type="text"
							name="judul"
							defaultValue={data?.judul || ""}
							required
							className="w-full border border-gray-200 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
							placeholder="Cth: Edukasi Robotika"
						/>
					</div>

					<div>
						<label className="block text-sm font-bold text-gray-700 mb-2">Deskripsi Singkat</label>
						<textarea
							name="deskripsi"
							defaultValue={data?.deskripsi || ""}
							required
							rows={4}
							className="w-full border border-gray-200 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm resize-none"
							placeholder="Tuliskan deskripsi singkat tentang layanan ini..."
						></textarea>
					</div>

					<div>
						<label className="block text-sm font-bold text-gray-700 mb-2">URL Gambar (Opsional)</label>
						<input
							type="text"
							name="gambar"
							defaultValue={data?.gambar || ""}
							className="w-full border border-gray-200 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
							placeholder="https://..."
						/>
						<p className="text-xs text-gray-400 mt-1">Masukkan link gambar (URL) untuk tampilan di beranda.</p>
					</div>

					<div>
						<label className="block text-sm font-bold text-gray-700 mb-2">Ikon (Opsional)</label>
						<input
							type="text"
							name="ikon"
							defaultValue={data?.ikon || ""}
							className="w-full border border-gray-200 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
							placeholder="Cth: BookOpen"
						/>
					</div>

					<div className="pt-4 border-t border-gray-100 flex justify-end">
						<button
							type="submit"
							className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg text-sm font-bold flex items-center gap-2 transition-colors"
						>
							<Save size={18} /> Simpan Layanan
						</button>
					</div>
				</form>
			</div>
		</AdminLayout>
	);
}
