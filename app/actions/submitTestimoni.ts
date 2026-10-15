"use server";

import { createHash } from "node:crypto";
import { promises as fs } from "node:fs";
import path from "node:path";
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";
import { prisma } from "../../lib/prisma";
import { saveUpload, detectExtension } from "../../lib/upload-file";
import { TestimonialInputError, validatePublicTestimonial } from "../../lib/testimonial-input";
import { allowTestimonialSubmission } from "../../lib/testimonial-rate-limit";

export async function submitTestimoni(_state: { success?: boolean; error?: string }, formData: FormData): Promise<{ success?: boolean; error?: string }> {
  let data;
  let photo: File | null = null;
  try {
    data = validatePublicTestimonial(formData);
    const file = formData.get("foto");
    if (file instanceof File && file.size) {
      if (file.size > 2 * 1024 * 1024) throw new TestimonialInputError("Foto maksimal 2 MB.");
      try { detectExtension(Buffer.from(await file.arrayBuffer()), false); }
      catch { throw new TestimonialInputError("Pilih foto PNG, JPG, WEBP, atau GIF yang valid."); }
      photo = file;
    }
    const requestHeaders = await headers();
    const ip = requestHeaders.get("cf-connecting-ip") || requestHeaders.get("x-forwarded-for")?.split(",")[0].trim() || "unknown";
    const key = createHash("sha256").update(ip).digest("hex");
    if (!allowTestimonialSubmission(key)) throw new TestimonialInputError("Batas pengiriman tercapai. Silakan coba kembali dalam satu jam.");
  } catch (error) {
    return { error: error instanceof TestimonialInputError ? error.message : "Isian tidak dapat diproses. Silakan coba kembali." };
  }

  let foto: string | null = null;
  try {
    if (photo) {
      const upload = new FormData();
      upload.set("file", photo);
      foto = (await saveUpload(upload, false)).url;
    }
    // Never accept status, IDs, or image URLs from the public form.
    await prisma.testimoni.create({ data: { ...data, foto } });
  } catch {
    if (foto) await fs.unlink(path.join(process.cwd(), "public", "uploads", path.basename(foto))).catch(() => {});
    return { error: "Testimoni belum tersimpan. Silakan coba kembali." };
  }
  revalidatePath("/admin/testimoni");
  revalidatePath("/admin");
  return { success: true };
}
