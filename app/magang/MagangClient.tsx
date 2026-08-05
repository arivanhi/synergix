"use client";

import { useState, useRef } from "react";
import { uploadImage } from "../actions/upload";
import { submitMagang } from "../actions/submitMagang";
import {
	Loader2, UploadCloud, CheckCircle, X, FileUp,
	Award, BookOpen, Settings, User, Building, Map, GraduationCap
} from "lucide-react";

export default function MagangClient() {
	const [nama, setNama] = useState("");
	const [nisn, setNisn] = useState("");
	const [asalSekolah, setAsalSekolah] = useState("");
	const [jurusan, setJurusan] = useState("");
	const [email, setEmail] = useState("");
	const [durasi, setDurasi] = useState("3 Bulan");
	const [motivasi, setMotivasi] = useState("");

	const [file, setFile] = useState<File | null>(null);
	const [loading, setLoading] = useState(false);
	const [success, setSuccess] = useState(false);
	const [error, setError] = useState("");

	const [isModalOpen, setIsModalOpen] = useState(false);
	const [isDragging, setIsDragging] = useState(false);
	const fileInputRef = useRef<HTMLInputElement>(null);

	const handleDragOver = (e: React.DragEvent) => {
		e.preventDefault();
		setIsDragging(true);
	};

	const handleDragLeave = (e: React.DragEvent) => {
		e.preventDefault();
		setIsDragging(false);
	};

	const handleDrop = (e: React.DragEvent) => {
		e.preventDefault();
		setIsDragging(false);
		if (e.dataTransfer.files && e.dataTransfer.files[0]) {
			setFile(e.dataTransfer.files[0]);
			setIsModalOpen(false);
		}
	};

	const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && e.target.files[0]) {
			setFile(e.target.files[0]);
			setIsModalOpen(false);
		}
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);
		setError("");

		try {
			let fileUrl = undefined;
			if (file) {
				const formData = new FormData();
				formData.append("file", file);
				const uploadRes = await uploadImage(formData);
				if (uploadRes.error) {
					setError(uploadRes.error);
					setLoading(false);
					return;
				}
				fileUrl = uploadRes.url;
			}

			const res = await submitMagang({
				nama, email, asalSekolah, nisn, jurusan, durasi, motivasi, suratRekomendasi: fileUrl
			});

			if (res.error) {
				setError(res.error);
			} else {
				setSuccess(true);
				setNama(""); setNisn(""); setAsalSekolah(""); setJurusan("");
				setEmail(""); setDurasi("3 Bulan"); setMotivasi(""); setFile(null);
			}
		} catch (err) {
			setError("Terjadi kesalahan sistem. Silakan coba lagi.");
		}

		setLoading(false);
	};

	if (success) {
		return (
			<div className="bg-white p-12 rounded-3xl shadow-xl text-center max-w-2xl mx-auto border border-white mt-10">
				<div className="w-20 h-20 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-6 text-teal-600">
					<CheckCircle size={40} />
				</div>
				<h2 className="text-3xl font-extrabold text-blue-950 mb-4">Lamaran Terkirim!</h2>
				<p className="text-gray-600 mb-8 leading-relaxed">
					Terima kasih telah mendaftar di program Magang Robotika SynergiX. Kami akan meninjau lamaran Anda dan segera menghubungi Anda melalui email.
				</p>
				<button onClick={() => setSuccess(false)} className="bg-[#005a9c] hover:bg-[#004a80] text-white font-bold py-3 px-8 rounded-xl transition-all">
					Kirim Lamaran Lain
				</button>
			</div>
		);
	}

	return (
		<div className="text-left w-full max-w-7xl mx-auto">

			{/* HERO HEADER */}
			<div className="text-center max-w-3xl mx-auto mb-16 pt-6">
				<div className="inline-block bg-[#e0f2fe] text-[#005a9c] text-xs font-bold px-3 py-1 rounded-full mb-6 uppercase tracking-wider">
					Program Magang SMK 2026
				</div>
				<h1 className="text-4xl md:text-5xl font-extrabold text-[#001738] mb-6 leading-tight tracking-tight">
					Mulai Karir Robotika Anda
				</h1>
				<p className="text-gray-500 text-lg md:text-xl font-medium leading-relaxed">
					Bergabunglah dengan program magang industri imersif SynergiX yang dirancang khusus untuk siswa Sekolah Menengah Kejuruan (SMK). Dapatkan pengalaman langsung dengan teknologi otomasi mutakhir.
				</p>
			</div>

			{/* WHY INTERN WITH US (BENTO GRID) */}
			<div className="mb-20">
				<h2 className="text-2xl font-bold text-[#001738] mb-8 text-center">Mengapa Magang Bersama Kami?</h2>
				<div className="grid grid-cols-1 md:grid-cols-3 gap-6">

					{/* Card 1: Large Image (Span 2) */}
					<div className="md:col-span-2 relative rounded-3xl overflow-hidden min-h-[280px] shadow-sm group">
						<img src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1200&q=80" alt="Industrial Equipment" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
						<div className="absolute inset-0 bg-gradient-to-r from-[#002f5c]/90 to-transparent"></div>
						<div className="absolute bottom-0 left-0 p-8 w-full max-w-md text-white">
							<div className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center mb-4 text-white">
								<Settings size={20} />
							</div>
							<h3 className="text-2xl font-bold mb-2 shadow-sm">Peralatan Industri Nyata</h3>
							<p className="text-blue-100 text-sm font-medium leading-relaxed">
								Bekerja langsung dengan lengan robot canggih, sistem PLC, dan mesin dunia nyata yang digunakan oleh perusahaan manufaktur terkemuka di seluruh dunia.
							</p>
						</div>
					</div>

					{/* Card 2: Small Top Right */}
					<div className="bg-white rounded-3xl p-8 shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-gray-100 flex flex-col justify-center transition-transform hover:-translate-y-1">
						<div className="w-12 h-12 bg-pink-50 rounded-xl flex items-center justify-center mb-5 text-pink-600">
							<User size={24} />
						</div>
						<h3 className="text-xl font-bold text-[#001738] mb-3">Bimbingan Mentor</h3>
						<p className="text-gray-500 text-sm leading-relaxed">
							Bimbingan 1-on-1 dari insinyur otomasi senior kami.
						</p>
					</div>

					{/* Card 3: Small Bottom Left */}
					<div className="bg-white rounded-3xl p-8 shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-gray-100 flex flex-col justify-center transition-transform hover:-translate-y-1">
						<div className="w-12 h-12 bg-teal-50 rounded-xl flex items-center justify-center mb-5 text-teal-600">
							<Award size={24} />
						</div>
						<h3 className="text-xl font-bold text-[#001738] mb-3">Sertifikasi</h3>
						<p className="text-gray-500 text-sm leading-relaxed">
							Dapatkan sertifikat yang diakui industri setelah berhasil menyelesaikannya.
						</p>
					</div>

					{/* Card 4: Wide Bottom Right (Span 2) */}
					<div className="md:col-span-2 bg-white rounded-3xl p-8 shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-gray-100 flex flex-row items-center gap-6 transition-transform hover:-translate-y-1">
						<div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center shrink-0 text-blue-600">
							<BookOpen size={28} />
						</div>
						<div>
							<h3 className="text-xl font-bold text-[#001738] mb-2">Integrasi Nilai Sekolah</h3>
							<p className="text-gray-500 text-sm leading-relaxed max-w-lg">
								Program kami selaras dengan standar SMK PK (Pusat Keunggulan). Kami menyediakan dokumentasi lengkap untuk memastikan sekolah Anda menerima laporan nilai yang diperlukan.
							</p>
						</div>
					</div>

				</div>
			</div>

			{/* BOTTOM SECTION: TIMELINE & FORM */}
			<div className="flex flex-col lg:flex-row gap-12 mt-10">

				{/* LEFT: Application Process Timeline */}
				<div className="lg:w-1/3">
					<h3 className="text-lg font-bold text-[#001738] mb-8">Proses Pendaftaran</h3>

					<div className="relative border-l-2 border-gray-200 ml-3 pl-8 pb-4 space-y-10">
						<div className="relative">
							<div className="absolute -left-[41px] top-1 w-5 h-5 bg-[#00a8ff] rounded-full border-4 border-white shadow-sm ring-1 ring-gray-100"></div>
							<h4 className="font-bold text-[#001738] text-sm">1. Registrasi Online</h4>
							<p className="text-gray-500 text-xs mt-1 leading-relaxed">Isi formulir secara mendetail dengan data diri dan sekolah Anda.</p>
						</div>
						<div className="relative">
							<div className="absolute -left-[41px] top-1 w-5 h-5 bg-gray-200 rounded-full border-4 border-white shadow-sm ring-1 ring-gray-100"></div>
							<h4 className="font-bold text-[#001738] text-sm">2. Tinjauan Dokumen</h4>
							<p className="text-gray-500 text-xs mt-1 leading-relaxed">Tim kami akan meninjau Surat Rekomendasi dan transkrip yang dikirimkan.</p>
						</div>
						<div className="relative">
							<div className="absolute -left-[41px] top-1 w-5 h-5 bg-gray-200 rounded-full border-4 border-white shadow-sm ring-1 ring-gray-100"></div>
							<h4 className="font-bold text-[#001738] text-sm">3. Wawancara Teknis</h4>
							<p className="text-gray-500 text-xs mt-1 leading-relaxed">Wawancara online singkat untuk menilai pengetahuan dasar dan motivasi Anda.</p>
						</div>
						<div className="relative">
							<div className="absolute -left-[41px] top-1 w-5 h-5 bg-gray-200 rounded-full border-4 border-white shadow-sm ring-1 ring-gray-100"></div>
							<h4 className="font-bold text-[#001738] text-sm">4. Onboarding</h4>
							<p className="text-gray-500 text-xs mt-1 leading-relaxed">Selamat datang di SynergiX! Ikuti pengarahan orientasi program magang.</p>
						</div>
					</div>
				</div>

				{/* RIGHT: Registration Form */}
				<div className="lg:w-2/3 bg-white rounded-3xl p-8 md:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100">
					<h3 className="text-2xl font-bold text-[#001738] mb-2">Daftar Sekarang</h3>
					<p className="text-gray-500 text-sm mb-8">Mohon lengkapi data di bawah ini. Semua kolom wajib diisi.</p>

					{error && (
						<div className="mb-6 p-4 bg-red-50 text-red-600 font-medium rounded-xl border border-red-100 text-sm">
							{error}
						</div>
					)}

					<form onSubmit={handleSubmit} className="space-y-6">
						{/* Name & NISN */}
						<div className="grid grid-cols-1 md:grid-cols-2 gap-5">
							<div>
								<label className="block text-xs font-bold text-gray-700 mb-1.5">Nama Lengkap</label>
								<input
									type="text" required value={nama} onChange={(e) => setNama(e.target.value)}
									placeholder="Masukkan nama lengkap"
									className="w-full border border-gray-200 text-gray-900 text-sm rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all"
								/>
							</div>
							<div>
								<label className="block text-xs font-bold text-gray-700 mb-1.5">Alamat Email</label>
								<input
									type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
									placeholder="contoh: budi@siswa.com"
									className="w-full border border-gray-200 text-gray-900 text-sm rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all"
								/>
							</div>
						</div>

						{/* School Details Box */}
						<div className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
							<div className="flex items-center gap-2 mb-4 text-[#005a9c]">
								<Building size={18} /> <h4 className="font-bold text-sm">Detail Sekolah</h4>
							</div>
							<div className="grid grid-cols-1 md:grid-cols-2 gap-5">
								<div>
									<label className="block text-xs font-bold text-gray-600 mb-1.5">Nama SMK</label>
									<input
										type="text" required value={asalSekolah} onChange={(e) => setAsalSekolah(e.target.value)}
										placeholder="SMK Negeri 1..."
										className="w-full border border-gray-200 text-gray-900 text-sm rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500/50 bg-white"
									/>
								</div>
								<div>
									<label className="block text-xs font-bold text-gray-600 mb-1.5">Jurusan</label>
									<input
										type="text" required value={jurusan} onChange={(e) => setJurusan(e.target.value)}
										placeholder="Mekatronika"
										className="w-full border border-gray-200 text-gray-900 text-sm rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500/50 bg-white"
									/>
								</div>
								<div className="md:col-span-2">
									<label className="block text-xs font-bold text-gray-600 mb-1.5">NISN</label>
									<input
										type="text" required value={nisn} onChange={(e) => setNisn(e.target.value)}
										placeholder="0012345678"
										className="w-full border border-gray-200 text-gray-900 text-sm rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500/50 bg-white"
									/>
								</div>
							</div>
						</div>

						{/* Duration & File */}
						<div className="grid grid-cols-1 md:grid-cols-2 gap-5">
							<div>
								<label className="block text-xs font-bold text-gray-700 mb-1.5">Durasi Magang</label>
								<select
									value={durasi} onChange={(e) => setDurasi(e.target.value)}
									className="w-full border border-gray-200 text-gray-900 text-sm rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500/50 appearance-none bg-white cursor-pointer"
								>
									<option>3 Bulan</option>
									<option>6 Bulan</option>
									<option>1 Tahun</option>
								</select>
							</div>
							<div>
								<label className="block text-xs font-bold text-gray-700 mb-1.5">Unggah Surat Rekomendasi (PDF)</label>
								<button
									type="button"
									onClick={() => setIsModalOpen(true)}
									className="w-full bg-white border border-gray-200 hover:bg-slate-50 text-gray-700 text-sm rounded-xl px-4 py-3 flex items-center justify-between transition-colors text-left"
								>
									<span className="truncate max-w-[200px] text-gray-400">
										{file ? (
											<span className="text-[#005a9c] font-medium">{file.name}</span>
										) : "Pilih file..."}
									</span>
									<UploadCloud size={16} className="text-gray-400" />
								</button>
							</div>
						</div>

						{/* Interest */}
						<div>
							<label className="block text-xs font-bold text-gray-700 mb-1.5">Mengapa Anda ingin magang di SynergiX?</label>
							<textarea
								required rows={4}
								value={motivasi} onChange={(e) => setMotivasi(e.target.value)}
								placeholder="Ceritakan secara singkat ketertarikan Anda pada otomasi industri..."
								className="w-full border border-gray-200 bg-slate-50/50 text-gray-900 text-sm rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 resize-none"
							></textarea>
						</div>

						<div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-4 border-t border-gray-100">
							<p className="text-xs text-gray-400 leading-relaxed max-w-xs text-center md:text-left">
								Dengan mengirimkan lamaran ini, Anda mengonfirmasi persetujuan sekolah untuk mengikuti program magang.
							</p>
							<button
								type="submit"
								disabled={loading || !file}
								className="w-full md:w-auto bg-[#005a9c] hover:bg-[#004a80] text-white text-sm font-bold py-3.5 px-8 rounded-xl shadow-[0_4px_12px_rgb(0,90,156,0.3)] transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
							>
								{loading && <Loader2 size={16} className="animate-spin" />}
								{loading ? "Mengirim..." : "Kirim Lamaran"}
							</button>
						</div>
					</form>
				</div>
			</div>

			{/* MODAL UPLOAD DRAG & DROP */}
			{isModalOpen && (
				<div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#001738]/40 backdrop-blur-sm p-6">
					<div className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden relative">
						<button
							onClick={() => setIsModalOpen(false)}
							className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition-colors"
						>
							<X size={20} />
						</button>

						<div className="p-8 text-center mt-2">
							<h3 className="text-xl font-bold text-[#001738] mb-1">Unggah Dokumen</h3>
							<p className="text-gray-500 text-xs mb-6">Format didukung: PDF, JPG, PNG (Maks 5MB).</p>

							<div
								onDragOver={handleDragOver}
								onDragLeave={handleDragLeave}
								onDrop={handleDrop}
								onClick={() => fileInputRef.current?.click()}
								className={`border-2 border-dashed rounded-2xl p-10 cursor-pointer transition-all ${isDragging ? "border-blue-500 bg-blue-50" : "border-gray-200 hover:border-blue-400 hover:bg-slate-50"
									}`}
							>
								<div className="flex flex-col items-center justify-center pointer-events-none">
									<div className={`w-14 h-14 rounded-full flex items-center justify-center mb-4 transition-colors ${isDragging ? "bg-blue-100 text-blue-600" : "bg-gray-100 text-gray-400"}`}>
										<FileUp size={28} />
									</div>
									<p className="font-bold text-[#001738] text-sm mb-1">Tarik & Lepas file di sini</p>
									<p className="text-gray-500 text-xs">atau klik untuk mencari dari perangkat</p>
								</div>

								<input
									type="file"
									className="hidden"
									ref={fileInputRef}
									accept=".pdf,image/*"
									onChange={handleFileSelect}
								/>
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}
