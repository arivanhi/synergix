import { prisma } from "../../../lib/prisma";
import TimDetailClient from "./TimDetailClient";
import { notFound } from "next/navigation";

export const dynamic = 'force-dynamic';

export default async function ProfilDetail({ params }: { params: Promise<{ id: string }> }) {
	const resolvedParams = await params;
	const id = parseInt(resolvedParams.id);
	
	if (isNaN(id)) {
		notFound();
	}

	const profilData = await prisma.keanggotaan.findUnique({
		where: { id }
	});

	if (!profilData) {
		notFound();
	}

	// Fetch previous and next items
	const prevItem = await prisma.keanggotaan.findFirst({
		where: { id: { lt: id } },
		orderBy: { id: 'desc' },
		select: { id: true, nama: true }
	});
	
	const nextItem = await prisma.keanggotaan.findFirst({
		where: { id: { gt: id } },
		orderBy: { id: 'asc' },
		select: { id: true, nama: true }
	});

	return <TimDetailClient profilData={profilData} prevItem={prevItem} nextItem={nextItem} />;
}
