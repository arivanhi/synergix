"use client";
import { useSiteContent } from "../../lib/content-context";


import { submitKonsultasi } from "../actions/konsultasi";
import Link from "next/link";
import { useState, useEffect } from "react";
import { ArrowRight, RefreshCw, Rocket, Cpu, Headset, CheckCircle2 } from "lucide-react";
import ClientNavigation from "../components/ClientNavigation";
import Footer from "../components/Footer";

export default function Layanan() {
	const content = useSiteContent();
  const [sending, setSending] = useState(false);
  const [message, setMessage] = useState("");
  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault(); setSending(true); setMessage("");
    const form = event.currentTarget; const data = new FormData(form);
    try { const result = await submitKonsultasi({ nama: String(data.get("nama") || ""), perusahaan: String(data.get("perusahaan") || ""), layanan: String(data.get("layanan") || ""), detail: String(data.get("detail") || "") }); setMessage(result.error || content.values.consult_success); if (result.success) form.reset(); }
    catch { setMessage(content.values.consult_error); } finally { setSending(false); }
  }


	return (
		<main className="min-h-screen bg-gradient-to-br from-[#f4f7fb] to-[#e0f2fe] text-gray-800 font-sans">
			<ClientNavigation />

			{/* HEADER SECTION */}
			<section className="pt-36 pb-12 px-6 max-w-4xl mx-auto text-center">
				<h1 className="text-4xl md:text-5xl font-extrabold leading-tight text-gray-900 mb-6">{content.values["layanan_page_1"]}{" "}
					<span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-900 to-teal-400">{content.values["layanan_page_2"]}</span>
				</h1>
				<p className="text-gray-600 text-lg leading-relaxed">{content.values["layanan_page_3"]}</p>
			</section>

			{/* BENTO GRID SERVICES */}
			<section className="py-10 px-6 max-w-7xl mx-auto">
				<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
					<div className="col-span-1 md:col-span-2 bg-white/70 backdrop-blur-xl border border-white p-8 rounded-3xl shadow-xl flex flex-col justify-between group hover:-translate-y-1 transition-all">
						<div>
							<span className="bg-teal-100 text-teal-700 text-xs font-bold px-3 py-1 rounded-full mb-4 inline-block">{content.values["layanan_page_4"]}</span>
							<h3 className="text-3xl font-extrabold text-blue-950 mb-4 group-hover:text-teal-600 transition-all">{content.values["layanan_page_5"]}</h3>
							<p className="text-gray-600 leading-relaxed max-w-md">{content.values["layanan_page_6"]}</p>
						</div>
						<div className="mt-8">
							<Link href="#konsultasi" className="text-teal-600 font-bold flex items-center gap-2 hover:underline">{content.values["layanan_page_7"]}<ArrowRight size={18} />
							</Link>
						</div>
					</div>

					<div className="col-span-1 bg-white/70 backdrop-blur-xl border border-white p-8 rounded-3xl shadow-xl flex flex-col justify-between group hover:-translate-y-1 transition-all relative">
						<div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-6 shadow-sm border border-white">
							<RefreshCw className="text-blue-600" size={24} />
						</div>
						<div>
							<h3 className="text-2xl font-extrabold text-blue-950 mb-3 group-hover:text-teal-600 transition-all">{content.values["layanan_page_8"]}</h3>
							<p className="text-gray-600 text-sm leading-relaxed mb-6">{content.values["layanan_page_9"]}</p>
						</div>
						<Link
							href="#konsultasi"
							className="text-teal-600 font-bold text-sm flex items-center gap-1 border-t border-gray-200 pt-4 hover:underline"
						>{content.values["layanan_page_10"]}<ArrowRight size={14} />
						</Link>
					</div>

					<div className="col-span-1 md:col-span-3 bg-white/70 backdrop-blur-xl border border-white p-6 rounded-3xl shadow-xl flex flex-col md:flex-row gap-8 group hover:-translate-y-1 transition-all">
						<div className="w-full md:w-1/2 h-64 bg-gray-200 rounded-2xl overflow-hidden border border-white/50">
							<img
								src={content.values["layanan_page_11"]}
								alt={content.values["layanan_page_12"]}
								className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
							/>
						</div>
						<div className="w-full md:w-1/2 flex flex-col justify-center py-4 pr-6">
							<span className="bg-blue-100 text-blue-700 text-xs font-bold px-3 py-1 rounded-full mb-4 inline-block w-max">{content.values["layanan_page_13"]}</span>
							<h3 className="text-3xl font-extrabold text-blue-950 mb-4 group-hover:text-teal-600 transition-all">{content.values["layanan_page_14"]}</h3>
							<p className="text-gray-600 leading-relaxed mb-6">{content.values["layanan_page_15"]}</p>
							<div className="flex flex-wrap gap-4 text-sm font-semibold text-gray-700">
								<span className="flex items-center gap-2">
									<CheckCircle2 className="text-teal-500" size={18} />{content.values["layanan_page_16"]}</span>
								<span className="flex items-center gap-2">
									<CheckCircle2 className="text-teal-500" size={18} />{content.values["layanan_page_17"]}</span>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* KEUNGGULAN */}
			<section className="py-20 px-6 max-w-7xl mx-auto text-center">
				<h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-900 to-teal-400 mb-12">{content.values["layanan_page_18"]}</h2>
				<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
					{[
						{
							icon: <Rocket className="text-blue-600" size={32} />,
							title: content.values["layanan_page_19"],
							desc: content.values["layanan_page_20"],
						},
						{
							icon: <Cpu className="text-blue-600" size={32} />,
							title: content.values["layanan_page_21"],
							desc: content.values["layanan_page_22"],
						},
						{
							icon: <Headset className="text-blue-600" size={32} />,
							title: content.values["layanan_page_23"],
							desc: content.values["layanan_page_24"],
						},
					].map((item, idx) => (
						<div
							key={idx}
							className="bg-white/60 backdrop-blur-md border border-white p-8 rounded-3xl shadow-lg flex flex-col items-center text-center"
						>
							<div className="w-20 h-20 bg-gradient-to-tr from-blue-100 to-teal-50 rounded-full flex items-center justify-center mb-6 shadow-inner border border-white">
								{item.icon}
							</div>
							<h3 className="text-xl font-bold text-blue-950 mb-3">{item.title}</h3>
							<p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
						</div>
					))}
				</div>
			</section>

			{/* FORM KONSULTASI (SUDAH DIKEMBALIKAN) */}
			<section id="konsultasi" className="py-16 px-6 max-w-4xl mx-auto relative z-10">
				<div className="bg-white/80 backdrop-blur-2xl p-8 md:p-12 rounded-[2.5rem] shadow-2xl border border-white/60 relative overflow-hidden">
					{/* Ornamen Gradasi Halus di Latar Form */}
					<div className="absolute top-0 right-0 w-64 h-64 bg-teal-400/20 rounded-full blur-3xl -z-10"></div>
					<div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-900/10 rounded-full blur-3xl -z-10"></div>

					<h2 className="text-3xl font-extrabold text-blue-950 mb-2">{content.values["layanan_page_25"]}</h2>
					<p className="text-gray-600 mb-8 text-sm md:text-base">{content.values["layanan_page_26"]}</p>

					<form onSubmit={submit} className="space-y-6">
						<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
							<div>
								<label className="block text-xs font-bold text-gray-700 mb-2 uppercase tracking-wide">{content.values["layanan_page_27"]}</label>
								<input
									type="text" name="nama" required maxLength={191}
									placeholder={content.values["layanan_page_28"]}
									className="w-full bg-white/50 border border-teal-100 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal-400 transition-all text-sm shadow-sm"
								/>
							</div>
							<div>
								<label className="block text-xs font-bold text-gray-700 mb-2 uppercase tracking-wide">{content.values["layanan_page_29"]}</label>
								<input
									type="text" name="perusahaan" required maxLength={191}
									placeholder={content.values["layanan_page_30"]}
									className="w-full bg-white/50 border border-teal-100 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal-400 transition-all text-sm shadow-sm"
								/>
							</div>
						</div>

						<div>
							<label className="block text-xs font-bold text-gray-700 mb-2 uppercase tracking-wide">{content.values["layanan_page_31"]}</label>
							<select name="layanan" required className="w-full bg-white/50 border border-teal-100 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal-400 transition-all text-sm shadow-sm text-gray-700">
								<option>{content.values["layanan_page_32"]}</option>
								<option>{content.values["layanan_page_33"]}</option>
								<option>{content.values["layanan_page_34"]}</option>
								<option>{content.values["layanan_page_35"]}</option>
							</select>
						</div>

						<div>
							<label className="block text-xs font-bold text-gray-700 mb-2 uppercase tracking-wide">{content.values["layanan_page_36"]}</label>
							<textarea
								name="detail" required maxLength={10000} rows={4}
								placeholder={content.values["layanan_page_37"]}
								className="w-full bg-white/50 border border-teal-100 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal-400 transition-all text-sm shadow-sm resize-none"
							></textarea>
						</div>

						<button
							type="submit" disabled={sending}
							className="w-full bg-gradient-to-r from-blue-900 to-teal-500 text-white py-4 rounded-xl font-extrabold hover:shadow-lg hover:shadow-teal-500/40 transition-all hover:-translate-y-1 text-lg flex items-center justify-center gap-2"
						>{content.values["layanan_page_38"]}<ArrowRight size={20} />
						</button>
					{message && <p role="status" className="text-sm text-blue-900">{message}</p>}</form>
				</div>
			</section>

			<Footer />
		</main>
	);
}
