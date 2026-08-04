"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { uploadImage } from "../../../actions/upload";
import { createProduk, updateProduk } from "../../../actions/produk";
import { ArrowLeft, Save, Loader2, Image as ImageIcon } from "lucide-react";
import Link from "next/link";
import { getProdukById } from "./actions";
import { Suspense } from "react";

function ProdukFormContent() {
	const router = useRouter();
	const searchParams = useSearchParams();
	const editId = searchParams.get("id");

	const [nama, setNama] = useState("");
	const [kategori, setKategori] = useState("PRODUK_BUATAN");
	const [deskripsi, setDeskripsi] = useState("");
	const [file, setFile] = useState<File | null>(null);
	const [previewUrl, setPreviewUrl] = useState<string | null>(null);
	
	const [loading, setLoading] = useState(false);
	const [fetching, setFetching] = useState(!!editId);
	const [error, setError] = useState("");

	useEffect(() => {
		if (editId) {
			getProdukById(parseInt(editId)).then((res) => {
				if (res.data) {
					setNama(res.data.nama);
					setKategori(res.data.kategori);
					setDeskripsi(res.data.deskripsi || "");
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

			// @ts-ignore - KategoriProduk enum value
			const payload = { nama, deskripsi, kategori, gambar: imageUrl || undefined };
			
			let result;
			if (editId) {
				result = await updateProduk(parseInt(editId), payload);
			} else {
				result = await createProduk(payload);
			}

			if (result.error) {
				setError(result.error);
				setLoading(false);
			} else {
				router.push("/admin/produk");
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
			<Link href="/admin/produk" className="inline-flex items-center gap-2 text-gray-500 hover:text-blue-600 mb-6 transition-colors">
				<ArrowLeft size={18} /> Kembali ke Daftar Produk
			</Link>

			<div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
				<h1 className="text-2xl font-bold text-gray-900 mb-6">
					{editId ? "Edit Produk" : "Tambah Produk Baru"}
				</h1>

				{error && (
					<div className="mb-6 p-4 bg-red-50 text-red-600 rounded-xl border border-red-100 text-sm">
						{error}
					</div>
				)}

				<form onSubmit={handleSubmit} className="space-y-6">
					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						<div>
							<label className="block text-sm font-bold text-gray-700 mb-2">Nama Produk</label>
							<input
								type="text"
								required
								value={nama}
								onChange={(e) => setNama(e.target.value)}
								className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all"
								placeholder="Masukkan nama produk..."
							/>
						</div>
						<div>
							<label className="block text-sm font-bold text-gray-700 mb-2">Kategori</label>
							<select
								value={kategori}
								onChange={(e) => setKategori(e.target.value)}
								className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all appearance-none"
							>
								<option value="PRODUK_BUATAN">Produk Buatan</option>
								<option value="CAPSTONE_DESIGN">Capstone Design</option>
								<option value="PATEN">Paten</option>
							</select>
						</div>
					</div>

					<div>
						<label className="block text-sm font-bold text-gray-700 mb-2">Deskripsi Produk</label>
						<textarea
							required
							rows={6}
							value={deskripsi}
							onChange={(e) => setDeskripsi(e.target.value)}
							className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all resize-y"
							placeholder="Tulis deskripsi produk di sini..."
						/>
					</div>

					<div>
						<label className="block text-sm font-bold text-gray-700 mb-2">Foto Produk</label>
						
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
							{loading ? "Menyimpan..." : "Simpan Produk"}
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}

export default function ProdukForm() {
	return (
		<Suspense fallback={<div className="p-8 text-center">Memuat form...</div>}>
			<ProdukFormContent />
		</Suspense>
	);
}
