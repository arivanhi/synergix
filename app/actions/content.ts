"use server";
import { prisma } from "../../lib/prisma";
import { requireAdmin } from "../../lib/admin";
import { validateContent, type SiteContent } from "../../lib/content-model";
import { revalidatePath } from "next/cache";

export async function saveSiteContent(data: SiteContent) {
  await requireAdmin();
  try {
    const content = validateContent(data);
    await prisma.kontenWebsite.upsert({ where: { id: 1 }, create: { id: 1, data: content }, update: { data: content } });
    revalidatePath("/", "layout");
    return { success: true };
  } catch (error) { return { error: error instanceof Error ? error.message : "Gagal menyimpan konten." }; }
}
