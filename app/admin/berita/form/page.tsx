"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { uploadImage } from "../../../actions/upload";
import { createBerita, updateBerita } from "../../../actions/berita";
import { ArrowLeft, Save, Loader2, Image as ImageIcon } from "lucide-react";
import Link from "next/link";
// Perlu untuk mendapatkan data dari server component jika edit, tapi karena ini client component, kita fetch lewat API route atau lempar lewat wrapper.
// Untuk kesederhanaan, kita bisa menggunakan Server Action untuk GET data jika ID ada.
import { getBeritaById } from "./actions"; // Akan kita buat fungsi ini

function BeritaFormContent() {
	const router = useRouter();
	const searchParams = useSearchParams();
	const editId = searchParams.get("id");

	const [judul, setJudul] = useState("");
	const [konten, setKonten] = useState("");
	const [file, setFile] = useState<File | null>(null);
	const [previewUrl, setPreviewUrl] = useState<string | null>(null);
	
	const [loading, setLoading] = useState(false);
	const [fetching, setFetching] = useState(!!editId);
	const [error, setError] = useState("");

	useEffect(() => {
		if (editId) {
			getBeritaById(parseInt(editId)).then((res) => {
				if (res.data) {
					setJudul(res.data.judul);
					setKonten(res.data.konten);
					setPreviewUrl(res.data.gambar || null);
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

			// Jika ada file baru yang dipilih, unggah dulu
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

			// Simpan ke database
			const payload = { judul, konten, gambar: imageUrl || undefined };
			
			let result;
			if (editId) {
				result = await updateBerita(parseInt(editId), payload);
			} else {
				result = await createBerita(payload);
			}

			if (result.error) {
				setError(result.error);
				setLoading(false);
			} else {
				router.push("/admin/berita");
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
			<Link href="/admin/berita" className="inline-flex items-center gap-2 text-gray-500 hover:text-blue-600 mb-6 transition-colors">
				<ArrowLeft size={18} /> Kembali ke Daftar Berita
			</Link>

			<div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
				<h1 className="text-2xl font-bold text-gray-900 mb-6">
					{editId ? "Edit Berita" : "Tambah Berita Baru"}
				</h1>

				{error && (
					<div className="mb-6 p-4 bg-red-50 text-red-600 rounded-xl border border-red-100 text-sm">
						{error}
					</div>
				)}

				<form onSubmit={handleSubmit} className="space-y-6">
					<div>
						<label className="block text-sm font-bold text-gray-700 mb-2">Judul Berita</label>
						<input
							type="text"
							required
							value={judul}
							onChange={(e) => setJudul(e.target.value)}
							className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all"
							placeholder="Masukkan judul..."
						/>
					</div>

					<div>
						<label className="block text-sm font-bold text-gray-700 mb-2">Konten / Isi Berita</label>
						<textarea
							required
							rows={8}
							value={konten}
							onChange={(e) => setKonten(e.target.value)}
							className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all resize-y"
							placeholder="Tulis konten berita di sini..."
						/>
					</div>

					<div>
						<label className="block text-sm font-bold text-gray-700 mb-2">Gambar Sampul</label>
						
						{previewUrl && (
							<div className="mb-4 relative w-64 h-40 bg-gray-100 rounded-xl border border-gray-200 overflow-hidden">
								<img src={previewUrl} alt="Preview" className="w-full h-full object-cover" />
							</div>
						)}

						<label className="flex items-center justify-center w-full sm:w-auto px-4 py-3 border-2 border-dashed border-gray-300 rounded-xl hover:bg-gray-50 hover:border-teal-500 cursor-pointer transition-colors group">
							<div className="flex items-center gap-2 text-sm text-gray-500 group-hover:text-teal-600">
								<ImageIcon size={20} />
								<span className="font-semibold">{file ? file.name : "Pilih gambar dari komputer"}</span>
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
							{loading ? "Menyimpan..." : "Simpan Berita"}
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}

export default function BeritaForm() {
	return (
		<Suspense fallback={<div className="p-8 text-center">Memuat form...</div>}>
			<BeritaFormContent />
		</Suspense>
	);
}
