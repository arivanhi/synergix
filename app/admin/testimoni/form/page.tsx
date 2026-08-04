"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { uploadImage } from "../../../actions/upload";
import { createTestimoni, updateTestimoni } from "../../../actions/testimoni";
import { ArrowLeft, Save, Loader2, Image as ImageIcon } from "lucide-react";
import Link from "next/link";
import { getTestimoniById } from "./actions";

function TestimoniFormContent() {
	const router = useRouter();
	const searchParams = useSearchParams();
	const editId = searchParams.get("id");

	const [nama, setNama] = useState("");
	const [jabatan, setJabatan] = useState("");
	const [teks, setTeks] = useState("");
	const [file, setFile] = useState<File | null>(null);
	const [previewUrl, setPreviewUrl] = useState<string | null>(null);
	
	const [loading, setLoading] = useState(false);
	const [fetching, setFetching] = useState(!!editId);
	const [error, setError] = useState("");

	useEffect(() => {
		if (editId) {
			getTestimoniById(parseInt(editId)).then((res) => {
				if (res.data) {
					setNama(res.data.nama);
					setJabatan(res.data.jabatan);
					setTeks(res.data.teks);
					setPreviewUrl(res.data.foto || null);
				}
				setFetching(false);
			});
		}
	}, [editId]);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);
		setError("");

		try {
			let imageUrl = previewUrl;

			if (file) {
				const formData = new FormData();
				formData.append("file", file);
				const uploadRes = await uploadImage(formData);
				
				if (uploadRes.error) {
					setError(uploadRes.error);
					setLoading(false);
					return;
				}
				imageUrl = uploadRes.url || null;
			}

			const payload = { nama, jabatan, teks, foto: imageUrl || undefined };
			
			let result;
			if (editId) {
				result = await updateTestimoni(parseInt(editId), payload);
			} else {
				result = await createTestimoni(payload);
			}

			if (result.error) {
				setError(result.error);
				setLoading(false);
			} else {
				router.push("/admin/testimoni");
			}
		} catch (err) {
			setError("Terjadi kesalahan yang tidak terduga.");
			setLoading(false);
		}
	};

	if (fetching) {
		return <div className="p-8 text-center">Memuat data...</div>;
	}

	return (
		<div className="max-w-3xl mx-auto py-8">
			<Link href="/admin/testimoni" className="inline-flex items-center gap-2 text-gray-500 hover:text-blue-600 mb-6 transition-colors">
				<ArrowLeft size={18} /> Kembali ke Daftar Testimoni
			</Link>

			<div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
				<h1 className="text-2xl font-bold text-gray-900 mb-6">
					{editId ? "Edit Testimoni" : "Tambah Testimoni Baru"}
				</h1>

				{error && (
					<div className="mb-6 p-4 bg-red-50 text-red-600 rounded-xl border border-red-100 text-sm">
						{error}
					</div>
				)}

				<form onSubmit={handleSubmit} className="space-y-6">
					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						<div>
							<label className="block text-sm font-bold text-gray-700 mb-2">Nama Client / User</label>
							<input
								type="text"
								required
								value={nama}
								onChange={(e) => setNama(e.target.value)}
								className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all"
								placeholder="Contoh: Budi Santoso"
							/>
						</div>
						<div>
							<label className="block text-sm font-bold text-gray-700 mb-2">Jabatan / Perusahaan</label>
							<input
								type="text"
								required
								value={jabatan}
								onChange={(e) => setJabatan(e.target.value)}
								className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all"
								placeholder="Contoh: CEO PT Maju Mundur"
							/>
						</div>
					</div>

					<div>
						<label className="block text-sm font-bold text-gray-700 mb-2">Isi Testimoni</label>
						<textarea
							required
							rows={4}
							value={teks}
							onChange={(e) => setTeks(e.target.value)}
							className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all resize-y"
							placeholder="Tulis ulasan client..."
						/>
					</div>

					<div>
						<label className="block text-sm font-bold text-gray-700 mb-2">Foto Client</label>
						
						{previewUrl && (
							<div className="mb-4 relative w-24 h-24 bg-gray-100 rounded-full border border-gray-200 overflow-hidden">
								<img src={previewUrl} alt="Preview" className="w-full h-full object-cover" />
							</div>
						)}

						<label className="flex items-center justify-center w-full sm:w-auto px-4 py-3 border-2 border-dashed border-gray-300 rounded-xl hover:bg-gray-50 hover:border-teal-500 cursor-pointer transition-colors group">
							<div className="flex items-center gap-2 text-sm text-gray-500 group-hover:text-teal-600">
								<ImageIcon size={20} />
								<span className="font-semibold">{file ? file.name : "Pilih foto dari komputer"}</span>
							</div>
							<input
								type="file"
								accept="image/*"
								className="hidden"
								onChange={(e) => {
									const selected = e.target.files?.[0];
									if (selected) {
										setFile(selected);
										setPreviewUrl(URL.createObjectURL(selected));
									}
								}}
							/>
						</label>
					</div>

					<hr className="border-gray-100" />

					<div className="flex justify-end">
						<button
							type="submit"
							disabled={loading}
							className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 transition-all disabled:opacity-70"
						>
							{loading ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
							{loading ? "Menyimpan..." : "Simpan Testimoni"}
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}

export default function TestimoniForm() {
	return (
		<Suspense fallback={<div className="p-8 text-center">Memuat form...</div>}>
			<TestimoniFormContent />
		</Suspense>
	);
}
