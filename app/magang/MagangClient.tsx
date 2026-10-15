"use client";
import { useSiteContent } from "../../lib/content-context";
import InternshipInfo from "./InternshipInfo";


import { useState, useRef } from "react";
import { uploadRecommendation } from "../actions/upload";
import { submitMagang } from "../actions/submitMagang";
import {
	Loader2, UploadCloud, CheckCircle, X, FileUp,
	Award, BookOpen, Settings, User, Building, Map, GraduationCap
} from "lucide-react";

export default function MagangClient() {
	const content = useSiteContent();
	const [nama, setNama] = useState("");
	const [nisn, setNisn] = useState("");
	const [asalSekolah, setAsalSekolah] = useState("");
	const [jurusan, setJurusan] = useState("");
	const [email, setEmail] = useState("");
	const [durasi, setDurasi] = useState(content.values.magang_MagangClient_41);
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
				const uploadRes = await uploadRecommendation(formData);
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
				setEmail(""); setDurasi(content.values.magang_MagangClient_41); setMotivasi(""); setFile(null);
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
				<h2 className="text-3xl font-extrabold text-blue-950 mb-4">{content.values["magang_MagangClient_1"]}</h2>
				<p className="text-gray-600 mb-8 leading-relaxed">{content.values["magang_MagangClient_2"]}</p>
				<button onClick={() => setSuccess(false)} className="bg-[#005a9c] hover:bg-[#004a80] text-white font-bold py-3 px-8 rounded-xl transition-all">{content.values["magang_MagangClient_3"]}</button>
			</div>
		);
	}

	return (
		<div className="text-left w-full max-w-7xl mx-auto">

			{/* HERO HEADER */}
			<div className="text-center max-w-3xl mx-auto mb-16 pt-6">
				<div className="inline-block bg-[#e0f2fe] text-[#005a9c] text-xs font-bold px-3 py-1 rounded-full mb-6 uppercase tracking-wider">{content.values["magang_MagangClient_4"]}</div>
				<h1 className="text-4xl md:text-5xl font-extrabold text-[#001738] mb-6 leading-tight tracking-tight">{content.values["magang_MagangClient_5"]}</h1>
				<p className="text-gray-500 text-lg md:text-xl font-medium leading-relaxed">{content.values["magang_MagangClient_6"]}</p>
			</div>

			<InternshipInfo />

			{/* WHY INTERN WITH US (BENTO GRID) */}
			<div className="mb-20">
				<h2 className="text-2xl font-bold text-[#001738] mb-8 text-center">{content.values["magang_MagangClient_7"]}</h2>
				<div className="grid grid-cols-1 md:grid-cols-3 gap-6">

					{/* Card 1: Large Image (Span 2) */}
					<div className="md:col-span-2 relative rounded-3xl overflow-hidden min-h-[280px] shadow-sm group">
						<img src={content.values["magang_MagangClient_8"]} alt={content.values["magang_MagangClient_9"]} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
						<div className="absolute inset-0 bg-gradient-to-r from-[#002f5c]/90 to-transparent"></div>
						<div className="absolute bottom-0 left-0 p-8 w-full max-w-md text-white">
							<div className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center mb-4 text-white">
								<Settings size={20} />
							</div>
							<h3 className="text-2xl font-bold mb-2 shadow-sm">{content.values["magang_MagangClient_10"]}</h3>
							<p className="text-blue-100 text-sm font-medium leading-relaxed">{content.values["magang_MagangClient_11"]}</p>
						</div>
					</div>

					{/* Card 2: Small Top Right */}
					<div className="bg-white rounded-3xl p-8 shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-gray-100 flex flex-col justify-center transition-transform hover:-translate-y-1">
						<div className="w-12 h-12 bg-pink-50 rounded-xl flex items-center justify-center mb-5 text-pink-600">
							<User size={24} />
						</div>
						<h3 className="text-xl font-bold text-[#001738] mb-3">{content.values["magang_MagangClient_12"]}</h3>
						<p className="text-gray-500 text-sm leading-relaxed">{content.values["magang_MagangClient_13"]}</p>
					</div>

					{/* Card 3: Small Bottom Left */}
					<div className="bg-white rounded-3xl p-8 shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-gray-100 flex flex-col justify-center transition-transform hover:-translate-y-1">
						<div className="w-12 h-12 bg-teal-50 rounded-xl flex items-center justify-center mb-5 text-teal-600">
							<Award size={24} />
						</div>
						<h3 className="text-xl font-bold text-[#001738] mb-3">{content.values["magang_MagangClient_14"]}</h3>
						<p className="text-gray-500 text-sm leading-relaxed">{content.values["magang_MagangClient_15"]}</p>
					</div>

					{/* Card 4: Wide Bottom Right (Span 2) */}
					<div className="md:col-span-2 bg-white rounded-3xl p-8 shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-gray-100 flex flex-row items-center gap-6 transition-transform hover:-translate-y-1">
						<div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center shrink-0 text-blue-600">
							<BookOpen size={28} />
						</div>
						<div>
							<h3 className="text-xl font-bold text-[#001738] mb-2">{content.values["magang_MagangClient_16"]}</h3>
							<p className="text-gray-500 text-sm leading-relaxed max-w-lg">{content.values["magang_MagangClient_17"]}</p>
						</div>
					</div>

				</div>
			</div>

			{/* REGISTRATION FORM BEFORE FOOTER */}
			<section id="form-pendaftaran" aria-labelledby="judul-form-pendaftaran" className="scroll-mt-28 mt-10">
				<div className="w-full max-w-4xl mx-auto bg-white rounded-3xl p-8 md:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100">
					<h2 id="judul-form-pendaftaran" className="text-2xl font-bold text-[#001738] mb-2">{content.values["magang_MagangClient_27"]}</h2>
					<p className="text-gray-500 text-sm mb-8">{content.values["magang_MagangClient_28"]}</p>

					{error && (
						<div className="mb-6 p-4 bg-red-50 text-red-600 font-medium rounded-xl border border-red-100 text-sm">
							{error}
						</div>
					)}

					<form onSubmit={handleSubmit} className="space-y-6">
						{/* Name & NISN */}
						<div className="grid grid-cols-1 md:grid-cols-2 gap-5">
							<div>
								<label className="block text-xs font-bold text-gray-700 mb-1.5">{content.values["magang_MagangClient_29"]}</label>
								<input
									type="text" required value={nama} onChange={(e) => setNama(e.target.value)}
									placeholder={content.values["magang_MagangClient_30"]}
									className="w-full border border-gray-200 text-gray-900 text-sm rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all"
								/>
							</div>
							<div>
								<label className="block text-xs font-bold text-gray-700 mb-1.5">{content.values["magang_MagangClient_31"]}</label>
								<input
									type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
									placeholder={content.values["magang_MagangClient_32"]}
									className="w-full border border-gray-200 text-gray-900 text-sm rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all"
								/>
							</div>
						</div>

						{/* School Details Box */}
						<div className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
							<div className="flex items-center gap-2 mb-4 text-[#005a9c]">
								<Building size={18} /> <h4 className="font-bold text-sm">{content.values["magang_MagangClient_33"]}</h4>
							</div>
							<div className="grid grid-cols-1 md:grid-cols-2 gap-5">
								<div>
									<label className="block text-xs font-bold text-gray-600 mb-1.5">{content.values["magang_MagangClient_34"]}</label>
									<input
										type="text" required value={asalSekolah} onChange={(e) => setAsalSekolah(e.target.value)}
										placeholder={content.values["magang_MagangClient_35"]}
										className="w-full border border-gray-200 text-gray-900 text-sm rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500/50 bg-white"
									/>
								</div>
								<div>
									<label className="block text-xs font-bold text-gray-600 mb-1.5">{content.values["magang_MagangClient_36"]}</label>
									<input
										type="text" required value={jurusan} onChange={(e) => setJurusan(e.target.value)}
										placeholder={content.values["magang_MagangClient_37"]}
										className="w-full border border-gray-200 text-gray-900 text-sm rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500/50 bg-white"
									/>
								</div>
								<div className="md:col-span-2">
									<label className="block text-xs font-bold text-gray-600 mb-1.5">{content.values["magang_MagangClient_38"]}</label>
									<input
										type="text" required value={nisn} onChange={(e) => setNisn(e.target.value)}
										placeholder={content.values["magang_MagangClient_39"]}
										className="w-full border border-gray-200 text-gray-900 text-sm rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500/50 bg-white"
									/>
								</div>
							</div>
						</div>

						{/* Duration & File */}
						<div className="grid grid-cols-1 md:grid-cols-2 gap-5">
							<div>
								<label className="block text-xs font-bold text-gray-700 mb-1.5">{content.values["magang_MagangClient_40"]}</label>
								<select
									value={durasi} onChange={(e) => setDurasi(e.target.value)}
									className="w-full border border-gray-200 text-gray-900 text-sm rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500/50 appearance-none bg-white cursor-pointer"
								>
									<option>{content.values["magang_MagangClient_41"]}</option>
									<option>{content.values["magang_MagangClient_42"]}</option>
									<option>{content.values["magang_MagangClient_43"]}</option>
								</select>
							</div>
							<div>
								<label className="block text-xs font-bold text-gray-700 mb-1.5">{content.values["magang_MagangClient_44"]}</label>
								<button
									type="button"
									onClick={() => setIsModalOpen(true)}
									className="w-full bg-white border border-gray-200 hover:bg-slate-50 text-gray-700 text-sm rounded-xl px-4 py-3 flex items-center justify-between transition-colors text-left"
								>
									<span className="truncate max-w-[200px] text-gray-400">
										{file ? (
											<span className="text-[#005a9c] font-medium">{file.name}</span>
										) : content.values.magang_file_choose}
									</span>
									<UploadCloud size={16} className="text-gray-400" />
								</button>
							</div>
						</div>

						{/* Interest */}
						<div>
							<label className="block text-xs font-bold text-gray-700 mb-1.5">{content.values["magang_MagangClient_45"]}</label>
							<textarea
								required rows={4}
								value={motivasi} onChange={(e) => setMotivasi(e.target.value)}
								placeholder={content.values["magang_MagangClient_46"]}
								className="w-full border border-gray-200 bg-slate-50/50 text-gray-900 text-sm rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 resize-none"
							></textarea>
						</div>

						<div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-4 border-t border-gray-100">
							<p className="text-xs text-gray-400 leading-relaxed max-w-xs text-center md:text-left">{content.values["magang_MagangClient_47"]}</p>
							<button
								type="submit"
								disabled={loading || !file}
								className="w-full md:w-auto bg-[#005a9c] hover:bg-[#004a80] text-white text-sm font-bold py-3.5 px-8 rounded-xl shadow-[0_4px_12px_rgb(0,90,156,0.3)] transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
							>
								{loading && <Loader2 size={16} className="animate-spin" />}
								{loading ? content.values.magang_sending : content.values.magang_submit}
							</button>
						</div>
					</form>
				</div>
			</section>

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
							<h3 className="text-xl font-bold text-[#001738] mb-1">{content.values["magang_MagangClient_48"]}</h3>
							<p className="text-gray-500 text-xs mb-6">{content.values["magang_MagangClient_49"]}</p>

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
									<p className="font-bold text-[#001738] text-sm mb-1">{content.values["magang_MagangClient_50"]}</p>
									<p className="text-gray-500 text-xs">{content.values["magang_MagangClient_51"]}</p>
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
