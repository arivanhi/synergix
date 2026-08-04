"use client";

import { motion } from "framer-motion";

export default function Template({ children }: { children: React.ReactNode }) {
	return (
		<motion.div
			initial={{ y: 15, opacity: 0.8 }}
			animate={{ y: 0, opacity: 1 }}
			transition={{ duration: 0.4, ease: "easeOut" }}
		>
			{children}
		</motion.div>
	);
}
