export class TestimonialInputError extends Error {}

export function validateTestimonialFields(input: unknown, publicSubmission = false) {
  if (!input || typeof input !== "object") throw new TestimonialInputError("Isian testimoni tidak valid.");
  const data = input as Record<string, unknown>;
  const field = (key: string, label: string, required: boolean, max: number, min = 1) => {
    const value = data[key];
    if (value == null && !required) return "";
    if (typeof value !== "string") throw new TestimonialInputError(`Periksa isian ${label}.`);
    const trimmed = value.trim();
    if ((required && trimmed.length < min) || trimmed.length > max) throw new TestimonialInputError(`${label} harus berisi ${min}–${max} karakter.`);
    return trimmed;
  };
  return {
    nama: field("nama", "Nama", true, 150),
    jabatan: field("jabatan", "Jabatan", true, 150),
    instansi: field("instansi", "Instansi", publicSubmission, 150) || null,
    teks: field("teks", "Testimoni", true, 2000, publicSubmission ? 20 : 1),
  };
}

export function validatePublicTestimonial(formData: FormData) {
  if (formData.get("website")) throw new TestimonialInputError("Permintaan tidak valid.");
  if (formData.get("persetujuan") !== "on") throw new TestimonialInputError("Berikan persetujuan publikasi sebelum mengirim testimoni.");
  return { ...validateTestimonialFields(Object.fromEntries(["nama", "jabatan", "instansi", "teks"].map(key => [key, formData.get(key)])), true), status: "MENUNGGU" as const };
}

export function validateTestimonialStatus(value: unknown): "MENUNGGU" | "DISETUJUI" | "DITOLAK" {
  if (value !== "MENUNGGU" && value !== "DISETUJUI" && value !== "DITOLAK") throw new TestimonialInputError("Status testimoni tidak valid.");
  return value;
}
