import { prisma } from "../../lib/prisma";
import TimClient from "./TimClient";

export const dynamic = 'force-dynamic';

export default async function TimPage() {
	const allTim = await prisma.keanggotaan.findMany({
		orderBy: { createdAt: "asc" }
	});

	const pimpinanData = allTim.filter(t => ["PIMPINAN", "KETUA", "WAKIL", "PENELITI_UTAMA"].includes(t.peran));
	const anggotaData = allTim.filter(t => !["PIMPINAN", "KETUA", "WAKIL", "PENELITI_UTAMA"].includes(t.peran));

	return <TimClient pimpinanData={pimpinanData} anggotaData={anggotaData} />;
}
