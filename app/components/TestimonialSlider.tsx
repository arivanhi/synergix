"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Quote, ChevronLeft, ChevronRight } from "lucide-react";

interface Testimoni {
	id: number;
	nama: string;
	jabatan: string;
	teks: string;
	foto: string | null;
}

export default function TestimonialSlider({ testimoniData }: { testimoniData: Testimoni[] }) {
	const [currentTesti, setCurrentTesti] = useState(0);

	useEffect(() => {
		if (testimoniData.length === 0) return;
		const timer = setInterval(() => {
			setCurrentTesti((prev) => (prev + 1) % testimoniData.length);
		}, 5000);
		return () => clearInterval(timer);
	}, [testimoniData.length]);

	if (testimoniData.length === 0) {
		return <p className="text-gray-500 text-center">Belum ada testimoni.</p>;
	}

	const nextTesti = () => setCurrentTesti((prev) => (prev + 1) % testimoniData.length);
	const prevTesti = () => setCurrentTesti((prev) => (prev === 0 ? testimoniData.length - 1 : prev - 1));

	return (
		<div className="max-w-4xl mx-auto relative group">
			<div className="text-center bg-white/60 backdrop-blur-xl p-10 md:p-16 rounded-[3rem] shadow-2xl border border-white/80 relative min-h-[350px] flex flex-col justify-center">
				<Quote className="mx-auto text-blue-900/20 mb-6 absolute top-10 left-1/2 -translate-x-1/2" size={80} />

				<AnimatePresence mode="wait">
					<motion.div
						key={currentTesti}
						initial={{ opacity: 0, x: 20 }}
						animate={{ opacity: 1, x: 0 }}
						exit={{ opacity: 0, x: -20 }}
						transition={{ duration: 0.4 }}
						className="relative z-10 pt-8"
					>
						<p className="text-xl md:text-2xl text-gray-800 font-medium italic my-4 leading-relaxed">
							"{testimoniData[currentTesti].teks}"
						</p>
						<div className="flex flex-col items-center gap-3 mt-8">
							<div className="w-16 h-16 rounded-full overflow-hidden border-4 border-white shadow-xl bg-gray-200">
								{testimoniData[currentTesti].foto ? (
									<img src={testimoniData[currentTesti].foto!} alt="Avatar" className="w-full h-full object-cover" />
								) : null}
							</div>
							<div>
								<h4 className="font-bold text-blue-950 text-lg">{testimoniData[currentTesti].nama}</h4>
								<p className="text-xs text-teal-600 font-bold">{testimoniData[currentTesti].jabatan}</p>
							</div>
						</div>
					</motion.div>
				</AnimatePresence>
			</div>

			<button
				onClick={prevTesti}
				className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-12 bg-white p-3 rounded-full shadow-lg border border-gray-100 text-teal-600 hover:bg-teal-50 hover:scale-110 transition-all opacity-0 group-hover:opacity-100"
			>
				<ChevronLeft size={24} />
			</button>
			<button
				onClick={nextTesti}
				className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-12 bg-white p-3 rounded-full shadow-lg border border-gray-100 text-teal-600 hover:bg-teal-50 hover:scale-110 transition-all opacity-0 group-hover:opacity-100"
			>
				<ChevronRight size={24} />
			</button>

			<div className="flex justify-center gap-2 mt-6">
				{testimoniData.map((_, index) => (
					<button
						key={index}
						onClick={() => setCurrentTesti(index)}
						className={`w-2 h-2 rounded-full transition-all ${index === currentTesti ? "bg-teal-500 w-6" : "bg-gray-300"}`}
					/>
				))}
			</div>
		</div>
	);
}
