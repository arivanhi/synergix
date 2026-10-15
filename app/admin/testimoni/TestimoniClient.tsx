"use client";

import { useState } from "react";
import { Plus, Edit, Trash2, X, Save, Image as ImageIcon, Loader2 } from "lucide-react";
import { createTestimoni, updateTestimoni, deleteTestimoni, setTestimoniStatus } from "../../actions/testimoni";
import { uploadImage } from "../../actions/upload";
import toast from "react-hot-toast";
import Link from "next/link";
import type { Testimoni, StatusTestimoni } from "@prisma/client";

const statusLabels: Record<StatusTestimoni, string> = { MENUNGGU: "Menunggu", DISETUJUI: "Tayang", DITOLAK: "Ditolak" };

export default function TestimoniClient({ initialData }: { initialData: Testimoni[] }) {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [editData, setEditData] = useState<Testimoni | null>(null);
	const [loading, setLoading] = useState(false);
	const [statusFilter, setStatusFilter] = useState<StatusTestimoni | "SEMUA">("SEMUA");
	const [moderating, setModerating] = useState<number | null>(null);

	// Form states
	const [nama, setNama] = useState("");
	const [jabatan, setJabatan] = useState("");
	const [instansi, setInstansi] = useState("");
	const [status, setStatus] = useState<StatusTestimoni>("DISETUJUI");
	const [teks, setTeks] = useState("");
	const [file, setFile] = useState<File | null>(null);
	const [previewUrl, setPreviewUrl] = useState<string | null>(null);

	const openModal = (data: Testimoni | null = null) => {
		setEditData(data);
		if (data) {
			setNama(data.nama);
			setJabatan(data.jabatan);
			setInstansi(data.instansi || "");
			setStatus(data.status);
			setTeks(data.teks);
			setPreviewUrl(data.foto || null);
		} else {
			setNama("");
			setJabatan("");
			setInstansi("");
			setStatus("DISETUJUI");
			setTeks("");
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

			const payload = {
				nama,
				jabatan,
				instansi,
				status,
				teks,
				foto: imageUrl || undefined,
			};

			let result;
			if (editData) {
				result = await updateTestimoni(editData.id, payload);
			} else {
				result = await createTestimoni(payload);
			}
			
			if (result?.error) {
				toast.error(result.error);
			} else {
				toast.success(editData ? "Testimoni berhasil diperbarui!" : "Testimoni berhasil ditambahkan!");
				closeModal();
			}
		} catch (error) {
			toast.error("Terjadi kesalahan.");
		}
		
		setLoading(false);
	};

	const handleDelete = async (id: number) => {
		if (!confirm("Apakah Anda yakin ingin menghapus testimoni ini?")) return;
		
		const result = await deleteTestimoni(id);
		if (result?.error) {
			toast.error(result.error);
		} else {
			toast.success("Testimoni berhasil dihapus!");
		}
	};

	const handleStatus = async (id: number, nextStatus: StatusTestimoni) => {
		setModerating(id);
		try {
			const result = await setTestimoniStatus(id, nextStatus);
			if (result.error) toast.error(result.error);
			else toast.success(nextStatus === "DISETUJUI" ? "Testimoni ditampilkan di beranda." : "Status testimoni diperbarui.");
		} catch { toast.error("Status belum tersimpan. Silakan coba kembali."); }
		finally { setModerating(null); }
	};

	return (
		<>
			<div className="flex justify-between items-center mb-6">
				<div>
					<h1 className="text-2xl font-bold text-gray-900">Manajemen Testimoni</h1>
					<p className="text-gray-500 text-sm">Kelola testimoni dari klien dan mitra.</p>
				</div>
				<button
					onClick={() => openModal()}
					className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 transition-colors"
				>
					<Plus size={16} /> Tambah Testimoni
				</button>
			</div>
			<div className="flex flex-wrap justify-between items-center gap-4 mb-6">
				<div className="flex flex-wrap gap-2">
					{(["SEMUA", "MENUNGGU", "DISETUJUI", "DITOLAK"] as const).map(value => <button key={value} onClick={() => setStatusFilter(value)} className={`rounded-lg px-3 py-2 text-sm font-semibold ${statusFilter === value ? "bg-teal-600 text-white" : "bg-white border text-gray-600"}`}>{value === "SEMUA" ? "Semua" : statusLabels[value]} ({initialData.filter(row => value === "SEMUA" || row.status === value).length})</button>)}
				</div>
				<Link href="/testimoni" target="_blank" rel="noopener noreferrer" className="text-sm font-bold text-teal-700 hover:underline">Halaman Testimoni Mitra ↗</Link>
			</div>

			<div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
				<table className="w-full text-left border-collapse">
					<thead>
						<tr className="bg-gray-50 border-b border-gray-100 text-gray-500 text-sm">
							<th className="p-4 font-semibold w-24">Foto</th>
							<th className="p-4 font-semibold">Nama</th>
							<th className="p-4 font-semibold hidden md:table-cell">Jabatan</th>
							<th className="p-4 font-semibold hidden lg:table-cell">Testimoni</th>
							<th className="p-4 font-semibold">Status</th>
							<th className="p-4 font-semibold text-right">Aksi</th>
						</tr>
					</thead>
					<tbody className="divide-y divide-gray-100">
						{initialData.filter(item => statusFilter === "SEMUA" || item.status === statusFilter).map((item) => (
							<tr key={item.id} className="hover:bg-gray-50/50 transition-colors">
								<td className="p-4">
									{item.foto ? (
										<img src={item.foto} alt="Profil" className="w-12 h-12 rounded-full object-cover border border-gray-200" />
									) : (
										<div className="w-12 h-12 bg-gray-100 rounded-full border border-gray-200 flex items-center justify-center text-xs text-gray-400">?</div>
									)}
								</td>
								<td className="p-4">
									<p className="font-bold text-gray-900 text-sm">{item.nama}</p>
								</td>
								<td className="p-4 hidden md:table-cell text-sm text-gray-600">
									{item.jabatan}
									{item.instansi && <p className="text-xs text-gray-500 mt-1">{item.instansi}</p>}
								</td>
								<td className="p-4 hidden lg:table-cell text-sm text-gray-500 max-w-xs truncate">
									{item.teks}
								</td>
								<td className="p-4"><span className={`text-xs font-bold px-2 py-1 rounded ${item.status === "DISETUJUI" ? "bg-teal-50 text-teal-700" : item.status === "MENUNGGU" ? "bg-amber-50 text-amber-700" : "bg-gray-100 text-gray-600"}`}>{statusLabels[item.status]}</span></td>
								<td className="p-4 text-right">
									<div className="flex flex-wrap justify-end gap-2">
										{item.status !== "DISETUJUI" && <button disabled={moderating !== null} onClick={() => handleStatus(item.id, "DISETUJUI")} className="text-xs font-bold text-teal-700 bg-teal-50 px-3 py-2 rounded-lg disabled:opacity-50">Setujui</button>}
										{item.status === "MENUNGGU" && <button disabled={moderating !== null} onClick={() => handleStatus(item.id, "DITOLAK")} className="text-xs font-bold text-red-700 bg-red-50 px-3 py-2 rounded-lg disabled:opacity-50">Tolak</button>}
										{item.status === "DISETUJUI" && <button disabled={moderating !== null} onClick={() => handleStatus(item.id, "MENUNGGU")} className="text-xs font-bold text-gray-600 bg-gray-100 px-3 py-2 rounded-lg disabled:opacity-50">Sembunyikan</button>}
										<button
											onClick={() => openModal(item)}
											title="Edit Testimoni"
											disabled={moderating !== null}
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
						{initialData.filter(item => statusFilter === "SEMUA" || item.status === statusFilter).length === 0 && (
							<tr>
								<td colSpan={6} className="p-8 text-center text-gray-500">
									Belum ada data testimoni.
								</td>
							</tr>
						)}
					</tbody>
				</table>
			</div>

			{/* MODAL */}
			{isModalOpen && (
				<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
					<div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl overflow-hidden max-h-[90vh] flex flex-col">
						<div className="flex justify-between items-center p-6 border-b border-gray-100">
							<h2 className="text-xl font-bold text-gray-900">{editData ? "Edit Testimoni" : "Tambah Testimoni Baru"}</h2>
							<button onClick={closeModal} className="text-gray-400 hover:text-red-500 transition-colors">
								<X size={24} />
							</button>
						</div>
						
						<div className="p-6 overflow-y-auto">
							<form id="testimoniForm" onSubmit={handleSubmit} className="space-y-6">
								<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
									<div>
										<label className="block text-sm font-bold text-gray-700 mb-2">Nama Klien</label>
										<input
											type="text"
											required
											value={nama}
											onChange={(e) => setNama(e.target.value)}
											className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all"
											placeholder="Masukkan nama..."
										/>
									</div>
									<div>
										<label className="block text-sm font-bold text-gray-700 mb-2">Jabatan / Instansi</label>
										<input
											type="text"
											required
											value={jabatan}
											onChange={(e) => setJabatan(e.target.value)}
											className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all"
											placeholder="Cth: CEO PT. Maju Bersama"
										/>
									</div>
								</div>

								<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
									<div><label htmlFor="admin-testi-instansi" className="block text-sm font-bold text-gray-700 mb-2">Instansi</label><input id="admin-testi-instansi" value={instansi} maxLength={150} onChange={e => setInstansi(e.target.value)} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal-500" /></div>
									<div><label htmlFor="admin-testi-status" className="block text-sm font-bold text-gray-700 mb-2">Status Publikasi</label><select id="admin-testi-status" value={status} onChange={e => setStatus(e.target.value as StatusTestimoni)} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal-500">{Object.entries(statusLabels).map(([value, label]) => <option key={value} value={value}>{label}</option>)}</select></div>
								</div>
								<div>
									<label className="block text-sm font-bold text-gray-700 mb-2">Isi Testimoni</label>
									<textarea
										required
										rows={5}
										maxLength={2000}
										value={teks}
										onChange={(e) => setTeks(e.target.value)}
										className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all resize-none"
										placeholder="Tulis testimoni di sini..."
									/>
								</div>

								<div>
									<label className="block text-sm font-bold text-gray-700 mb-2">Foto Profil (Opsional)</label>
									
									{previewUrl && (
										<div className="mb-4 relative w-24 h-24 bg-gray-100 rounded-full border border-gray-200 overflow-hidden">
											<img src={previewUrl} alt="Preview" className="w-full h-full object-cover" />
										</div>
									)}

									<label className="flex items-center justify-center w-full px-4 py-3 border-2 border-dashed border-gray-300 rounded-xl hover:bg-gray-50 hover:border-teal-500 cursor-pointer transition-colors group">
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
								form="testimoniForm"
								disabled={loading}
								className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 transition-all disabled:opacity-70 shadow-md"
							>
								{loading ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
								{loading ? "Menyimpan..." : "Simpan Testimoni"}
							</button>
						</div>
					</div>
				</div>
			)}
		</>
	);
}
