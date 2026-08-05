"use client";

import { useState } from "react";
import { Plus, Edit, Trash2, X, Save, Image as ImageIcon, Loader2 } from "lucide-react";
import { saveLayanan, deleteLayanan } from "../../actions/layanan";
import { uploadImage } from "../../actions/upload";
import toast from "react-hot-toast";

type Layanan = {
	id: number;
	judul: string;
	deskripsi: string;
	gambar: string | null;
	ikon: string | null;
	createdAt: Date;
	updatedAt: Date;
};

export default function LayananWebClient({ initialData }: { initialData: Layanan[] }) {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [editData, setEditData] = useState<Layanan | null>(null);
	const [loading, setLoading] = useState(false);

	// Form states
	const [judul, setJudul] = useState("");
	const [deskripsi, setDeskripsi] = useState("");
	const [ikon, setIkon] = useState("");
	const [file, setFile] = useState<File | null>(null);
	const [previewUrl, setPreviewUrl] = useState<string | null>(null);

	const openModal = (data: Layanan | null = null) => {
		setEditData(data);
		if (data) {
			setJudul(data.judul);
			setDeskripsi(data.deskripsi);
			setIkon(data.ikon || "");
			setPreviewUrl(data.gambar || null);
		} else {
			setJudul("");
			setDeskripsi("");
			setIkon("");
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
				id: editData?.id,
				judul,
				deskripsi,
				ikon: ikon || undefined,
				gambar: imageUrl || undefined,
			};

			const result = await saveLayanan(payload);
			
			if (result?.error) {
				toast.error(result.error);
			} else {
				toast.success(editData ? "Layanan berhasil diperbarui!" : "Layanan berhasil ditambahkan!");
				closeModal();
			}
		} catch (error) {
			toast.error("Terjadi kesalahan.");
		}
		
		setLoading(false);
	};

	const handleDelete = async (id: number) => {
		if (!confirm("Apakah Anda yakin ingin menghapus layanan ini?")) return;
		
		const result = await deleteLayanan(id);
		if (result?.error) {
			toast.error(result.error);
		} else {
			toast.success("Layanan berhasil dihapus!");
		}
	};

	return (
		<>
			<div className="flex justify-between items-center mb-6">
				<div>
					<h1 className="text-2xl font-bold text-gray-900">Manajemen Layanan Web</h1>
					<p className="text-gray-500 text-sm">Kelola daftar layanan/solusi yang tampil di Beranda.</p>
				</div>
				<button
					onClick={() => openModal()}
					className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 transition-colors"
				>
					<Plus size={16} /> Tambah Layanan
				</button>
			</div>

			<div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
				<table className="w-full text-left border-collapse">
					<thead>
						<tr className="bg-gray-50 border-b border-gray-100 text-gray-500 text-sm">
							<th className="p-4 font-semibold w-24">Gambar</th>
							<th className="p-4 font-semibold">Judul Layanan</th>
							<th className="p-4 font-semibold hidden md:table-cell">Deskripsi</th>
							<th className="p-4 font-semibold text-right">Aksi</th>
						</tr>
					</thead>
					<tbody className="divide-y divide-gray-100">
						{initialData.map((item) => (
							<tr key={item.id} className="hover:bg-gray-50/50 transition-colors">
								<td className="p-4">
									{item.gambar ? (
										<img src={item.gambar} alt="Foto" className="w-16 h-12 object-cover rounded-md border border-gray-200" />
									) : (
										<div className="w-16 h-12 bg-gray-100 rounded-md border border-gray-200 flex items-center justify-center text-xs text-gray-400">Kosong</div>
									)}
								</td>
								<td className="p-4">
									<p className="font-bold text-gray-900 text-sm">{item.judul}</p>
								</td>
								<td className="p-4 hidden md:table-cell text-sm text-gray-600 line-clamp-2 max-w-sm">
									{item.deskripsi}
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
								<td colSpan={4} className="p-8 text-center text-gray-500">
									Belum ada data layanan.
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
							<h2 className="text-xl font-bold text-gray-900">{editData ? "Edit Layanan" : "Tambah Layanan Baru"}</h2>
							<button onClick={closeModal} className="text-gray-400 hover:text-red-500 transition-colors">
								<X size={24} />
							</button>
						</div>
						
						<div className="p-6 overflow-y-auto">
							<form id="layananForm" onSubmit={handleSubmit} className="space-y-6">
								<div>
									<label className="block text-sm font-bold text-gray-700 mb-2">Judul Layanan</label>
									<input
										type="text"
										required
										value={judul}
										onChange={(e) => setJudul(e.target.value)}
										className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all"
										placeholder="Masukkan judul layanan..."
									/>
								</div>

								<div>
									<label className="block text-sm font-bold text-gray-700 mb-2">Deskripsi Layanan</label>
									<textarea
										required
										rows={4}
										value={deskripsi}
										onChange={(e) => setDeskripsi(e.target.value)}
										className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all resize-none"
										placeholder="Tulis deskripsi..."
									/>
								</div>

								<div>
									<label className="block text-sm font-bold text-gray-700 mb-2">Gambar Layanan</label>
									{previewUrl && (
										<div className="mb-4 relative w-48 h-32 bg-gray-100 rounded-xl border border-gray-200 overflow-hidden">
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
								
								<div>
									<label className="block text-sm font-bold text-gray-700 mb-2">Ikon (Opsional)</label>
									<input
										type="text"
										value={ikon}
										onChange={(e) => setIkon(e.target.value)}
										className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all"
										placeholder="Cth: BookOpen"
									/>
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
								form="layananForm"
								disabled={loading}
								className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 transition-all disabled:opacity-70 shadow-md"
							>
								{loading ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
								{loading ? "Menyimpan..." : "Simpan Layanan"}
							</button>
						</div>
					</div>
				</div>
			)}
		</>
	);
}
