"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { uploadImage } from "../../../actions/upload";
import { createTim, updateTim } from "../../../actions/tim";
import { ArrowLeft, Save, Loader2, Image as ImageIcon, Plus, Trash2 } from "lucide-react";
import Link from "next/link";
import { getTimById } from "./actions";

function TimFormContent() {
	const router = useRouter();
	const searchParams = useSearchParams();
	const editId = searchParams.get("id");

	const [nama, setNama] = useState("");
	const [peran, setPeran] = useState("ANGGOTA");
	const [jabatan, setJabatan] = useState("");
	const [gelar, setGelar] = useState("");
	const [pengalaman, setPengalaman] = useState("");
	const [lokasi, setLokasi] = useState("");
	const [paten, setPaten] = useState("");
	const [jumlahPublikasi, setJumlahPublikasi] = useState("");
	const [biografi, setBiografi] = useState("");
	
	const [riset, setRiset] = useState<{judul: string, desc: string, tags: string}[]>([]);
	const [publikasi, setPublikasi] = useState<{judul: string, jurnal: string}[]>([]);

	const [file, setFile] = useState<File | null>(null);
	const [previewUrl, setPreviewUrl] = useState<string | null>(null);
	
	const [loading, setLoading] = useState(false);
	const [fetching, setFetching] = useState(!!editId);
	const [error, setError] = useState("");

	useEffect(() => {
		if (editId) {
			getTimById(parseInt(editId)).then((res) => {
				if (res.data) {
					setNama(res.data.nama);
					setPeran(res.data.peran);
					setJabatan(res.data.jabatan || "");
					setGelar(res.data.gelar || "");
					setPengalaman(res.data.pengalaman || "");
					setLokasi(res.data.lokasi || "");
					setPaten(res.data.paten || "");
					setJumlahPublikasi(res.data.jumlahPublikasi || "");
					setBiografi(res.data.biografi || "");
					setPreviewUrl(res.data.foto || null);

					if (res.data.riset) {
						// @ts-ignore
						setRiset(res.data.riset);
					}
					if (res.data.publikasi) {
						// @ts-ignore
						setPublikasi(res.data.publikasi);
					}
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

			// Format tags for riset
			const formattedRiset = riset.map(r => ({
				judul: r.judul,
				desc: r.desc,
				tags: typeof r.tags === 'string' ? r.tags.split(',').map(t => t.trim()).filter(Boolean) : r.tags
			}));

			// @ts-ignore - PeranAnggota enum
			const payload = { 
				nama, peran, jabatan, gelar, pengalaman, lokasi, paten, jumlahPublikasi, biografi,
				riset: formattedRiset,
				publikasi,
				foto: imageUrl || undefined 
			};
			
			let result;
			if (editId) {
				result = await updateTim(parseInt(editId), payload);
			} else {
				result = await createTim(payload);
			}

			if (result.error) {
				setError(result.error);
				setLoading(false);
			} else {
				router.push("/admin/tim");
			}
		} catch (err) {
			setError("Terjadi kesalahan yang tidak terduga.");
			setLoading(false);
		}
	};

	if (fetching) return <div className="p-8 text-center">Memuat data...</div>;

	return (
		<div className="max-w-4xl mx-auto py-8">
			<Link href="/admin/tim" className="inline-flex items-center gap-2 text-gray-500 hover:text-blue-600 mb-6 transition-colors">
				<ArrowLeft size={18} /> Kembali ke Daftar Tim
			</Link>

			<div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
				<h1 className="text-2xl font-bold text-gray-900 mb-6">
					{editId ? "Edit Profil Anggota" : "Tambah Anggota Tim"}
				</h1>

				{error && (
					<div className="mb-6 p-4 bg-red-50 text-red-600 rounded-xl border border-red-100 text-sm">
						{error}
					</div>
				)}

				<form onSubmit={handleSubmit} className="space-y-8">
					
					{/* SEKSI 1: Info Dasar */}
					<div>
						<h2 className="text-lg font-bold text-blue-900 border-b border-gray-100 pb-2 mb-4">Informasi Dasar</h2>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
							<div>
								<label className="block text-sm font-bold text-gray-700 mb-2">Nama Lengkap</label>
								<input type="text" required value={nama} onChange={(e) => setNama(e.target.value)} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-teal-500" placeholder="Contoh: Prof. Dr. Budi Santoso" />
							</div>
							<div>
								<label className="block text-sm font-bold text-gray-700 mb-2">Peran (Sistem)</label>
								<select value={peran} onChange={(e) => setPeran(e.target.value)} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-teal-500 appearance-none">
									<option value="KETUA">Ketua (Pimpinan)</option>
									<option value="WAKIL">Wakil</option>
									<option value="PENELITI_UTAMA">Peneliti Utama (Pimpinan)</option>
									<option value="DOSEN_PEMBIMBING">Dosen Pembimbing</option>
									<option value="ANGGOTA">Anggota Periset</option>
									<option value="PENELITI_ALUMNI">Alumni</option>
								</select>
							</div>
							<div>
								<label className="block text-sm font-bold text-gray-700 mb-2">Jabatan Tampil</label>
								<input type="text" value={jabatan} onChange={(e) => setJabatan(e.target.value)} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-teal-500" placeholder="Contoh: Peneliti AI Utama" />
							</div>
							<div>
								<label className="block text-sm font-bold text-gray-700 mb-2">Gelar</label>
								<input type="text" value={gelar} onChange={(e) => setGelar(e.target.value)} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-teal-500" placeholder="Contoh: MSc., PhD dalam Robotika" />
							</div>
						</div>
					</div>

					{/* SEKSI 2: Profil & Statistik */}
					<div>
						<h2 className="text-lg font-bold text-blue-900 border-b border-gray-100 pb-2 mb-4">Profil & Statistik</h2>
						<div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-4">
							<div>
								<label className="block text-sm font-bold text-gray-700 mb-2">Pengalaman</label>
								<input type="text" value={pengalaman} onChange={(e) => setPengalaman(e.target.value)} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-teal-500" placeholder="Contoh: 15+ Tahun" />
							</div>
							<div>
								<label className="block text-sm font-bold text-gray-700 mb-2">Jumlah Paten</label>
								<input type="text" value={paten} onChange={(e) => setPaten(e.target.value)} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-teal-500" placeholder="Contoh: 24 Terdaftar" />
							</div>
							<div>
								<label className="block text-sm font-bold text-gray-700 mb-2">Jumlah Publikasi</label>
								<input type="text" value={jumlahPublikasi} onChange={(e) => setJumlahPublikasi(e.target.value)} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-teal-500" placeholder="Contoh: 100+ Sitasi" />
							</div>
							<div>
								<label className="block text-sm font-bold text-gray-700 mb-2">Lokasi</label>
								<input type="text" value={lokasi} onChange={(e) => setLokasi(e.target.value)} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-teal-500" placeholder="Contoh: Pusat Riset, SMG" />
							</div>
						</div>
						<div>
							<label className="block text-sm font-bold text-gray-700 mb-2">Biografi</label>
							<textarea rows={5} value={biografi} onChange={(e) => setBiografi(e.target.value)} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-teal-500" placeholder="Tulis biografi..." />
						</div>
					</div>

					{/* SEKSI 3: Riset & Publikasi (JSON Arrays) */}
					<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
						{/* RISET */}
						<div>
							<div className="flex justify-between items-center mb-4">
								<h2 className="text-lg font-bold text-blue-900">Riset Berjalan</h2>
								<button type="button" onClick={() => setRiset([...riset, {judul: "", desc: "", tags: ""}])} className="text-xs bg-blue-100 text-blue-700 font-bold px-2 py-1 rounded flex items-center gap-1"><Plus size={14}/> Tambah</button>
							</div>
							<div className="space-y-4">
								{riset.map((r, i) => (
									<div key={i} className="bg-gray-50 p-4 rounded-xl border border-gray-200 relative">
										<button type="button" onClick={() => setRiset(riset.filter((_, idx) => idx !== i))} className="absolute top-3 right-3 text-red-500 hover:text-red-700"><Trash2 size={16} /></button>
										<input type="text" placeholder="Judul Riset" value={r.judul} onChange={(e) => {const n = [...riset]; n[i].judul = e.target.value; setRiset(n)}} className="w-full mb-2 bg-white border border-gray-200 rounded px-3 py-1.5 text-sm" />
										<textarea placeholder="Deskripsi Singkat" value={r.desc} onChange={(e) => {const n = [...riset]; n[i].desc = e.target.value; setRiset(n)}} className="w-full mb-2 bg-white border border-gray-200 rounded px-3 py-1.5 text-sm" rows={2} />
										<input type="text" placeholder="Tags (Pisahkan dengan koma, misal: AI, Robotika)" value={typeof r.tags === 'string' ? r.tags : r.tags?.join(', ') || ""} onChange={(e) => {const n = [...riset]; n[i].tags = e.target.value; setRiset(n)}} className="w-full bg-white border border-gray-200 rounded px-3 py-1.5 text-sm" />
									</div>
								))}
							</div>
						</div>

						{/* PUBLIKASI */}
						<div>
							<div className="flex justify-between items-center mb-4">
								<h2 className="text-lg font-bold text-blue-900">Publikasi Terbaru</h2>
								<button type="button" onClick={() => setPublikasi([...publikasi, {judul: "", jurnal: ""}])} className="text-xs bg-teal-100 text-teal-700 font-bold px-2 py-1 rounded flex items-center gap-1"><Plus size={14}/> Tambah</button>
							</div>
							<div className="space-y-4">
								{publikasi.map((p, i) => (
									<div key={i} className="bg-gray-50 p-4 rounded-xl border border-gray-200 relative">
										<button type="button" onClick={() => setPublikasi(publikasi.filter((_, idx) => idx !== i))} className="absolute top-3 right-3 text-red-500 hover:text-red-700"><Trash2 size={16} /></button>
										<input type="text" placeholder="Judul Publikasi" value={p.judul} onChange={(e) => {const n = [...publikasi]; n[i].judul = e.target.value; setPublikasi(n)}} className="w-full mb-2 bg-white border border-gray-200 rounded px-3 py-1.5 text-sm" />
										<input type="text" placeholder="Nama Jurnal / Konferensi (Tahun)" value={p.jurnal} onChange={(e) => {const n = [...publikasi]; n[i].jurnal = e.target.value; setPublikasi(n)}} className="w-full bg-white border border-gray-200 rounded px-3 py-1.5 text-sm" />
									</div>
								))}
							</div>
						</div>
					</div>

					{/* SEKSI 4: Foto */}
					<div>
						<h2 className="text-lg font-bold text-blue-900 border-b border-gray-100 pb-2 mb-4">Foto Profil</h2>
						{previewUrl && (
							<div className="mb-4 relative w-32 h-32 bg-gray-100 rounded-full border-4 border-white shadow-lg overflow-hidden">
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
						<button type="submit" disabled={loading} className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 transition-all disabled:opacity-70">
							{loading ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
							{loading ? "Menyimpan..." : "Simpan Profil Tim"}
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}

export default function TimForm() {
	return (
		<Suspense fallback={<div className="p-8 text-center">Memuat form...</div>}>
			<TimFormContent />
		</Suspense>
	);
}
