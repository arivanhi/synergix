import fields from "./content-fields.json";

export { fields as contentFields };
export type Partner = { nama: string; logo: string; url: string };
export type InternshipOpening = { bidang: string; deskripsi: string; persyaratan: string; periode: string; tampil: boolean };
export type SiteContent = { values: Record<string, string>; partners: Partner[]; internships: InternshipOpening[] };
export const defaultContent: SiteContent = {
  values: Object.fromEntries(fields.map(field => [field.key, field.value])),
  partners: ["TECHCORP", "ROBOSYS", "MECHMACH", "AI-AUTOM"].map(nama => ({ nama, logo: "", url: "" })),
  internships: [],
};

function isInternshipOpening(value: unknown): value is InternshipOpening {
  if (!value || typeof value !== "object") return false;
  const opening = value as InternshipOpening;
  return [opening.bidang, opening.deskripsi, opening.persyaratan, opening.periode].every(v => typeof v === "string") && typeof opening.tampil === "boolean";
}

export function safeUrl(value: string, allowEmail = false): boolean {
  if (!value) return true;
  if ((value.startsWith("/") && !value.startsWith("//") && !value.includes("\\")) || value.startsWith("#")) return true;
  try {
    const url = new URL(value);
    return ["https:", "http:", ...(allowEmail ? ["mailto:", "tel:"] : [])].includes(url.protocol);
  } catch { return false; }
}

export function normalizeContent(data: unknown): SiteContent {
  if (!data || typeof data !== "object") return defaultContent;
  const input = data as Partial<SiteContent>;
  return {
    values: Object.fromEntries(fields.map(field => [field.key, typeof input.values?.[field.key] === "string" ? input.values[field.key] : field.value])),
    partners: Array.isArray(input.partners) ? input.partners.filter(p => p && typeof p.nama === "string" && typeof p.logo === "string" && typeof p.url === "string") : defaultContent.partners,
    internships: Array.isArray(input.internships) ? input.internships.filter(isInternshipOpening) : [],
  };
}

export function validateContent(data: SiteContent): SiteContent {
  if (!data || !data.values || !Array.isArray(data.partners)) throw new Error("Format konten tidak valid.");
  for (const field of fields) {
    const value = data.values[field.key];
    if (typeof value !== "string" || value.length > 10000) throw new Error(`Isian ${field.label} tidak valid.`);
    if (["image", "url"].includes(field.kind) && !safeUrl(value, true)) throw new Error(`URL ${field.label} tidak valid.`);
  }
  if (data.partners.length > 50) throw new Error("Maksimal 50 mitra.");
  for (const p of data.partners) {
    if (!p || typeof p.nama !== "string" || !p.nama.trim() || p.nama.length > 150 || typeof p.logo !== "string" || typeof p.url !== "string" || !safeUrl(p.logo) || !safeUrl(p.url)) throw new Error("Nama atau URL mitra tidak valid.");
  }
  if (!Array.isArray(data.internships) || data.internships.length > 50) throw new Error("Maksimal 50 lowongan magang.");
  for (const opening of data.internships) {
    if (!isInternshipOpening(opening) || !opening.bidang.trim() || opening.bidang.length > 150 || opening.deskripsi.length > 5000 || opening.persyaratan.length > 5000 || opening.periode.length > 200) throw new Error("Isi bidang dan periksa panjang informasi lowongan magang.");
  }
  return normalizeContent(data);
}
