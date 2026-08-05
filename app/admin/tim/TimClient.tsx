"use client";

import { useState } from "react";
import { Plus, Edit, Trash2, X, Save, Image as ImageIcon, Loader2 } from "lucide-react";
import { createTim, updateTim, deleteTim } from "../../actions/tim";
import { uploadImage } from "../../actions/upload";
import toast from "react-hot-toast";

type PeranAnggota = "PIMPINAN" | "KETUA" | "ANGGOTA_PERISET" | "WAKIL" | "PENELITI_UTAMA" | "DOSEN_PEMBIMBING" | "ANGGOTA" | "PENELITI_ALUMNI";

type Tim = {
	id: number;
	nama: string;
	peran: PeranAnggota;
	jabatan: string | null;
	biografi: string | null;
	gelar: string | null;
	pengalaman: string | null;
	lokasi: string | null;
	jumlahPublikasi: string | null;
	publikasi: any;
	riset: any;
	paten: string | null;
	foto: string | null;
	createdAt: Date;
	updatedAt: Date;
};

export default function TimClient({ initialData }: { initialData: Tim[] }) {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [editData, setEditData] = useState<Tim | null>(null);
	const [loading, setLoading] = useState(false);

	// Form states
	const [nama, setNama] = useState("");
	const [peran, setPeran] = useState<PeranAnggota | string>("ANGGOTA");
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

	const openModal = (data: Tim | null = null) => {
		setEditData(data);
		if (data) {
			setNama(data.nama);
			setPeran(data.peran);
			setJabatan(data.jabatan || "");
			setGelar(data.gelar || "");
			setPengalaman(data.pengalaman || "");
			setLokasi(data.lokasi || "");
			setPaten(data.paten || "");
			setJumlahPublikasi(data.jumlahPublikasi || "");
			setBiografi(data.biografi || "");
			setPreviewUrl(data.foto || null);
			
			if (data.riset) {
				setRiset(Array.isArray(data.riset) ? data.riset : []);
			} else {
				setRiset([]);
			}
			
			if (data.publikasi) {
				setPublikasi(Array.isArray(data.publikasi) ? data.publikasi : []);
			} else {
				setPublikasi([]);
			}
		} else {
			setNama("");
			setPeran("ANGGOTA");
			setJabatan("");
			setGelar("");
			setPengalaman("");
			setLokasi("");
			setPaten("");
			setJumlahPublikasi("");
			setBiografi("");
			setRiset([]);
			setPublikasi([]);
			setPreviewUrl(null);
		}
		setFile(null);
		setIsModalOpen(true);
	};

	const closeModal = () => {
		setIsModalOpen(false);
		setEditData(null);
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);

		try {
			let imageUrl = previewUrl;

			if (file) {
				const formData = new FormData();
				formData.append("file", file);
				const uploadRes = await uploadImage(formData);
				
				if (uploadRes.error) {
					toast.error(uploadRes.error);
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

			const payload = {
				nama, 
				peran: peran as PeranAnggota, 
				jabatan, 
				gelar, 
				pengalaman, 
				lokasi, 
				paten, 
				jumlahPublikasi, 
				biografi,
				riset: formattedRiset,
				publikasi,
				foto: imageUrl || undefined 
			};

			let result;
			if (editData) {
				result = await updateTim(editData.id, payload);
			} else {
				result = await createTim(payload);
			}
			
			if (result?.error) {
				toast.error(result.error);
			} else {
				toast.success(editData ? "Profil anggota berhasil diperbarui!" : "Anggota berhasil ditambahkan!");
				closeModal();
			}
		} catch (error) {
			toast.error("Terjadi kesalahan.");
		}
		
		setLoading(false);
	};

	const handleDelete = async (id: number) => {
		if (!confirm("Apakah Anda yakin ingin menghapus profil ini?")) return;
		
		const result = await deleteTim(id);
		if (result?.error) {
			toast.error(result.error);
		} else {
			toast.success("Profil anggota berhasil dihapus!");
		}
	};

	return (
		<>
			<div className="flex justify-between items-center mb-6">
				<div>
					<h1 className="text-2xl font-bold text-gray-900">Manajemen Tim Riset</h1>
					<p className="text-gray-500 text-sm">Kelola profil peneliti, dosen, dan anggota riset.</p>
				</div>
				<button
					onClick={() => openModal()}
					className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 transition-colors"
				>
					<Plus size={16} /> Tambah Anggota
				</button>
			</div>

			<div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
				<table className="w-full text-left border-collapse">
					<thead>
						<tr className="bg-gray-50 border-b border-gray-100 text-gray-500 text-sm">
							<th className="p-4 font-semibold w-24">Foto</th>
							<th className="p-4 font-semibold">Nama</th>
							<th className="p-4 font-semibold hidden md:table-cell">Peran (Sistem)</th>
							<th className="p-4 font-semibold hidden lg:table-cell">Jabatan Tampil</th>
							<th className="p-4 font-semibold text-right">Aksi</th>
						</tr>
					</thead>
					<tbody className="divide-y divide-gray-100">
						{initialData.map((item) => (
							<tr key={item.id} className="hover:bg-gray-50/50 transition-colors">
								<td className="p-4">
									{item.foto ? (
										<img src={item.foto} alt="Profil" className="w-12 h-12 object-cover rounded-full border border-gray-200" />
									) : (
										<div className="w-12 h-12 bg-gray-100 rounded-full border border-gray-200 flex items-center justify-center text-xs text-gray-400">?</div>
									)}
								</td>
								<td className="p-4">
									<p className="font-bold text-gray-900 text-sm">{item.nama}</p>
									{item.gelar && <p className="text-xs text-gray-500">{item.gelar}</p>}
								</td>
								<td className="p-4 hidden md:table-cell text-sm text-gray-600">
									<span className="bg-blue-50 text-blue-700 px-2.5 py-1 rounded-md text-xs font-semibold">
										{item.peran.replace('_', ' ')}
									</span>
								</td>
								<td className="p-4 hidden lg:table-cell text-sm text-gray-600">
									{item.jabatan || "-"}
								</td>
								<td className="p-4 text-right">
									<div className="flex justify-end gap-2">
										<button
											onClick={() => openModal(item)}
											className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
										>
											<Edit size={18} />
										</button>
										<button
											onClick={() => handleDelete(item.id)}
											className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
											title="Hapus"
										>
											<Trash2 size={18} />
										</button>
									</div>
								</td>
							</tr>
						))}
						{initialData.length === 0 && (
							<tr>
								<td colSpan={5} className="p-8 text-center text-gray-500">
									Belum ada data anggota tim.
								</td>
							</tr>
						)}
					</tbody>
				</table>
			</div>

			{/* MODAL */}
			{isModalOpen && (
				<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
					<div className="bg-white rounded-2xl shadow-xl w-full max-w-4xl overflow-hidden max-h-[90vh] flex flex-col">
						<div className="flex justify-between items-center p-6 border-b border-gray-100">
							<h2 className="text-xl font-bold text-gray-900">{editData ? "Edit Profil Anggota" : "Tambah Anggota Tim"}</h2>
							<button onClick={closeModal} className="text-gray-400 hover:text-red-500 transition-colors">
								<X size={24} />
							</button>
						</div>
						
						<div className="p-6 overflow-y-auto">
							<form id="timForm" onSubmit={handleSubmit} className="space-y-8">
								{/* SEKSI 1: Info Dasar */}
								<div>
									<h3 className="text-lg font-bold text-blue-900 border-b border-gray-100 pb-2 mb-4">Informasi Dasar</h3>
									<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
										<div>
											<label className="block text-sm font-bold text-gray-700 mb-2">Nama Lengkap</label>
											<input type="text" required value={nama} onChange={(e) => setNama(e.target.value)} className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-xl px-4 py-3 focus:ring-2 focus:ring-teal-500" placeholder="Contoh: Prof. Dr. Budi Santoso" />
										</div>
										<div>
											<label className="block text-sm font-bold text-gray-700 mb-2">Peran (Sistem)</label>
											<select value={peran} onChange={(e) => setPeran(e.target.value)} className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-xl px-4 py-3 focus:ring-2 focus:ring-teal-500 appearance-none">
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
											<input type="text" value={jabatan} onChange={(e) => setJabatan(e.target.value)} className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-xl px-4 py-3 focus:ring-2 focus:ring-teal-500" placeholder="Contoh: Peneliti AI Utama" />
										</div>
										<div>
											<label className="block text-sm font-bold text-gray-700 mb-2">Gelar</label>
											<input type="text" value={gelar} onChange={(e) => setGelar(e.target.value)} className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-xl px-4 py-3 focus:ring-2 focus:ring-teal-500" placeholder="Contoh: MSc., PhD dalam Robotika" />
										</div>
									</div>
								</div>

								{/* SEKSI 2: Profil & Statistik */}
								<div>
									<h3 className="text-lg font-bold text-blue-900 border-b border-gray-100 pb-2 mb-4">Profil & Statistik</h3>
									<div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-4">
										<div>
											<label className="block text-sm font-bold text-gray-700 mb-2">Pengalaman</label>
											<input type="text" value={pengalaman} onChange={(e) => setPengalaman(e.target.value)} className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-xl px-4 py-3 focus:ring-2 focus:ring-teal-500" placeholder="Contoh: 15+ Tahun" />
										</div>
										<div>
											<label className="block text-sm font-bold text-gray-700 mb-2">Jumlah Paten</label>
											<input type="text" value={paten} onChange={(e) => setPaten(e.target.value)} className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-xl px-4 py-3 focus:ring-2 focus:ring-teal-500" placeholder="Contoh: 24 Terdaftar" />
										</div>
										<div>
											<label className="block text-sm font-bold text-gray-700 mb-2">Jumlah Publikasi</label>
											<input type="text" value={jumlahPublikasi} onChange={(e) => setJumlahPublikasi(e.target.value)} className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-xl px-4 py-3 focus:ring-2 focus:ring-teal-500" placeholder="Contoh: 100+ Sitasi" />
										</div>
										<div>
											<label className="block text-sm font-bold text-gray-700 mb-2">Lokasi</label>
											<input type="text" value={lokasi} onChange={(e) => setLokasi(e.target.value)} className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-xl px-4 py-3 focus:ring-2 focus:ring-teal-500" placeholder="Contoh: Pusat Riset, SMG" />
										</div>
									</div>
									<div>
										<label className="block text-sm font-bold text-gray-700 mb-2">Biografi</label>
										<textarea rows={4} value={biografi} onChange={(e) => setBiografi(e.target.value)} className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-xl px-4 py-3 focus:ring-2 focus:ring-teal-500 resize-none" placeholder="Tulis biografi..." />
									</div>
								</div>

								{/* SEKSI 3: Riset & Publikasi */}
								<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
									{/* RISET */}
									<div>
										<div className="flex justify-between items-center mb-4">
											<h3 className="text-lg font-bold text-blue-900">Riset Berjalan</h3>
											<button type="button" onClick={() => setRiset([...riset, {judul: "", desc: "", tags: ""}])} className="text-xs bg-blue-100 text-blue-700 font-bold px-2 py-1 rounded flex items-center gap-1"><Plus size={14}/> Tambah</button>
										</div>
										<div className="space-y-4">
											{riset.map((r, i) => (
												<div key={i} className="bg-gray-50 p-4 rounded-xl border border-gray-200 relative">
													<button type="button" onClick={() => setRiset(riset.filter((_, idx) => idx !== i))} className="absolute top-3 right-3 text-red-500 hover:text-red-700"><Trash2 size={16} /></button>
													<input type="text" placeholder="Judul Riset" value={r.judul} onChange={(e) => {const n = [...riset]; n[i].judul = e.target.value; setRiset(n)}} className="w-full mb-2 bg-white border border-gray-200 text-gray-900 rounded px-3 py-1.5 text-sm" />
													<textarea placeholder="Deskripsi Singkat" value={r.desc} onChange={(e) => {const n = [...riset]; n[i].desc = e.target.value; setRiset(n)}} className="w-full mb-2 bg-white border border-gray-200 text-gray-900 rounded px-3 py-1.5 text-sm resize-none" rows={2} />
													<input type="text" placeholder="Tags (Pisahkan koma)" value={typeof r.tags === 'string' ? r.tags : r.tags?.join(', ') || ""} onChange={(e) => {const n = [...riset]; n[i].tags = e.target.value; setRiset(n)}} className="w-full bg-white border border-gray-200 text-gray-900 rounded px-3 py-1.5 text-sm" />
												</div>
											))}
										</div>
									</div>

									{/* PUBLIKASI */}
									<div>
										<div className="flex justify-between items-center mb-4">
											<h3 className="text-lg font-bold text-blue-900">Publikasi Terbaru</h3>
											<button type="button" onClick={() => setPublikasi([...publikasi, {judul: "", jurnal: ""}])} className="text-xs bg-teal-100 text-teal-700 font-bold px-2 py-1 rounded flex items-center gap-1"><Plus size={14}/> Tambah</button>
										</div>
										<div className="space-y-4">
											{publikasi.map((p, i) => (
												<div key={i} className="bg-gray-50 p-4 rounded-xl border border-gray-200 relative">
													<button type="button" onClick={() => setPublikasi(publikasi.filter((_, idx) => idx !== i))} className="absolute top-3 right-3 text-red-500 hover:text-red-700"><Trash2 size={16} /></button>
													<input type="text" placeholder="Judul Publikasi" value={p.judul} onChange={(e) => {const n = [...publikasi]; n[i].judul = e.target.value; setPublikasi(n)}} className="w-full mb-2 bg-white border border-gray-200 text-gray-900 rounded px-3 py-1.5 text-sm" />
													<input type="text" placeholder="Nama Jurnal / Konferensi (Tahun)" value={p.jurnal} onChange={(e) => {const n = [...publikasi]; n[i].jurnal = e.target.value; setPublikasi(n)}} className="w-full bg-white border border-gray-200 text-gray-900 rounded px-3 py-1.5 text-sm" />
												</div>
											))}
										</div>
									</div>
								</div>

								{/* SEKSI 4: Foto */}
								<div>
									<h3 className="text-lg font-bold text-blue-900 border-b border-gray-100 pb-2 mb-4">Foto Profil</h3>
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
							</form>
						</div>
						
						<div className="p-6 border-t border-gray-100 flex justify-end gap-3 bg-gray-50 mt-auto">
							<button
								type="button"
								onClick={closeModal}
								className="px-5 py-2.5 text-sm font-bold text-gray-600 hover:text-gray-900 hover:bg-gray-200 rounded-xl transition-colors"
							>
								Batal
							</button>
							<button
								type="submit"
								form="timForm"
								disabled={loading}
								className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 transition-all disabled:opacity-70 shadow-md"
							>
								{loading ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
								{loading ? "Menyimpan..." : "Simpan Profil Tim"}
							</button>
						</div>
					</div>
				</div>
			)}
		</>
	);
}
