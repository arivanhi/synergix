"use server";
import { requireAdmin } from "../../lib/admin";
import { saveUpload } from "../../lib/upload-file";
export async function uploadImage(formData: FormData): Promise<{ url?: string; error?: string }> {
  await requireAdmin();
  try { return await saveUpload(formData, false); }
  catch (error) { return { error: error instanceof Error ? error.message : "Gagal mengunggah gambar." }; }
}
export async function uploadRecommendation(formData: FormData): Promise<{ url?: string; error?: string }> {
  try { return await saveUpload(formData, true); }
  catch (error) { return { error: error instanceof Error ? error.message : "Gagal mengunggah berkas." }; }
}
