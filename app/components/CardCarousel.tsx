"use client";

import { useRef, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function CardCarousel({ children }: { children: React.ReactNode }) {
	const scrollRef = useRef<HTMLDivElement>(null);
	const [showLeft, setShowLeft] = useState(false);
	const [showRight, setShowRight] = useState(true);

	const handleScroll = () => {
		if (scrollRef.current) {
			const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
			setShowLeft(scrollLeft > 0);
			setShowRight(Math.ceil(scrollLeft + clientWidth) < scrollWidth);
		}
	};

	useEffect(() => {
		handleScroll();
		window.addEventListener("resize", handleScroll);
		return () => window.removeEventListener("resize", handleScroll);
	}, []);

	const scroll = (direction: "left" | "right") => {
		if (scrollRef.current) {
			const { scrollLeft, clientWidth } = scrollRef.current;
			const scrollAmount = clientWidth * 0.8;
			scrollRef.current.scrollTo({
				left: direction === "left" ? scrollLeft - scrollAmount : scrollLeft + scrollAmount,
				behavior: "smooth"
			});
		}
	};

	return (
		<div className="relative group">
			{showLeft && (
				<button 
					onClick={() => scroll("left")} 
					className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-6 z-10 bg-white p-2 md:p-3 rounded-full shadow-lg border border-gray-100 text-teal-600 hover:bg-teal-50 hover:scale-110 transition-all opacity-100 md:opacity-0 group-hover:opacity-100"
				>
					<ChevronLeft size={24} />
				</button>
			)}
			
			<div 
				ref={scrollRef} 
				onScroll={handleScroll}
				className="flex gap-6 overflow-x-auto snap-x snap-mandatory hide-scrollbar pb-8 pt-4 px-2 [&::-webkit-scrollbar]:hidden"
				style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
			>
				{children}
			</div>

			{showRight && (
				<button 
					onClick={() => scroll("right")} 
					className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-6 z-10 bg-white p-2 md:p-3 rounded-full shadow-lg border border-gray-100 text-teal-600 hover:bg-teal-50 hover:scale-110 transition-all opacity-100 md:opacity-0 group-hover:opacity-100"
				>
					<ChevronRight size={24} />
				</button>
			)}
		</div>
	);
}
