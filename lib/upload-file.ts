import { randomUUID } from "node:crypto";
import { promises as fs } from "node:fs";
import path from "node:path";

export const mimeTypes: Record<string, string> = { ".png": "image/png", ".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".webp": "image/webp", ".gif": "image/gif", ".pdf": "application/pdf" };
export function detectExtension(buffer: Buffer, allowPdf: boolean): string {
  if (buffer.subarray(0, 8).equals(Buffer.from([137,80,78,71,13,10,26,10]))) return ".png";
  if (buffer[0] === 255 && buffer[1] === 216 && buffer[2] === 255) return ".jpg";
  if (["GIF87a", "GIF89a"].includes(buffer.subarray(0, 6).toString())) return ".gif";
  if (buffer.subarray(0, 4).toString() === "RIFF" && buffer.subarray(8, 12).toString() === "WEBP") return ".webp";
  if (allowPdf && buffer.subarray(0, 5).toString() === "%PDF-") return ".pdf";
  throw new Error(allowPdf ? "Pilih PDF atau gambar PNG/JPG/WEBP/GIF yang valid." : "Pilih gambar PNG/JPG/WEBP/GIF yang valid.");
}
export async function saveUpload(formData: FormData, privateFile: boolean) {
  const file = formData.get("file");
  const limitMb = privateFile ? 5 : 8;
  if (!(file instanceof File) || !file.size || file.size > limitMb * 1024 * 1024) throw new Error(`File wajib diisi dan maksimal ${limitMb} MB.`);
  const buffer = Buffer.from(await file.arrayBuffer());
  const extension = detectExtension(buffer, privateFile);
  const filename = randomUUID() + extension;
  const dir = privateFile ? path.join(process.cwd(), "private-uploads") : path.join(process.cwd(), "public", "uploads");
  await fs.mkdir(dir, { recursive: true });
  await fs.writeFile(path.join(dir, filename), buffer, { flag: "wx" });
  return { url: `${privateFile ? "/api/documents" : "/api/uploads"}/${filename}` };
}
