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

	return <TimDetailClient profilData={profilData} />;
}
