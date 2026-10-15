import { load } from "cheerio";

export type AcademicEntry = { judul: string; jurnal: string; url?: string; tahun?: string; jenis?: string };
export const sintaHost = "sinta.kemdiktisaintek.go.id";
export function normalizeSintaUrl(input: string): string {
  const value = /^\d+$/.test(input.trim()) ? `https://${sintaHost}/authors/profile/${input.trim()}/` : input.trim();
  const url = new URL(value);
  const match = url.pathname.match(/^\/authors\/profile\/(\d+)\/?$/);
  if (url.protocol !== "https:" || url.hostname !== sintaHost || url.port || url.username || url.password || !match) throw new Error("Masukkan ID atau URL profil SINTA yang valid.");
  return `https://${sintaHost}/authors/profile/${match[1]}/`;
}

export function parseSintaHtml(html: string, base: string, limit = 4): AcademicEntry[] {
  const $ = load(html);
  const entries: AcademicEntry[] = [];
  $(".ar-list-item").slice(0, limit).each((_, element) => {
    const row = $(element);
    const title = row.find(".ar-title a").first();
    const judul = (title.text() || row.find(".ar-title").text()).replace(/\s+/g, " ").trim();
    if (!judul) return;
    const href = title.attr("href");
    let url: string | undefined;
    try { if (href) { const link = new URL(href, base); if (["http:", "https:"].includes(link.protocol)) url = link.href; } } catch { /* Preserve title if link is malformed. */ }
    const jurnal = row.find(".ar-pub").text().replace(/\s+/g, " ").trim();
    const tahun = row.find(".ar-year, .ar-year-text").first().text().trim();
    const jenis = new URL(base).searchParams.get("view") === "iprs" ? row.find(".ar-quartile").text().replace(/\s+/g, " ").trim() : "";
    entries.push({ judul, jurnal, ...(url ? { url } : {}), ...(tahun ? { tahun } : {}), ...(jenis ? { jenis } : {}) });
  });
  if (!entries.length && !$(".ar-list, .ar-list-item, .profile-name, .author-profile, .profile-header").length && !/Tidak ada|No (data|records|publications)|(?:Data|Document) not found/i.test($.text())) {
    throw new Error("Struktur halaman SINTA tidak dikenali atau akses dibatasi. Data lama tidak diubah.");
  }
  return entries;
}

export function parseScopusTotal(html: string): number | undefined {
  const $ = load(html); let total: number | undefined;
  $("table").each((_, table) => {
    const headings = $(table).find("thead th").map((_, el) => $(el).text().trim().toLowerCase()).get();
    const column = headings.indexOf("scopus"); if (column < 0) return;
    $(table).find("tbody tr").each((_, row) => {
      const cells = $(row).find("td");
      if (cells.first().text().trim().toLowerCase() !== "article") return;
      const value = cells.eq(column).text().trim().replace(/[.,\s]/g, "");
      if (/^\d+$/.test(value)) total = Number(value);
    });
  });
  return total;
}

export function sintaPageNumbers(html: string, base: string): number[] {
  const $ = load(html), current = new URL(base), pages = new Set<number>();
  $("a[href]").each((_, el) => {
    try {
      const link = new URL($(el).attr("href")!, current);
      const value = link.searchParams.get("page") || "";
      if (link.origin === current.origin && link.pathname.replace(/\/$/, "") === current.pathname.replace(/\/$/, "") && link.searchParams.get("view") === current.searchParams.get("view") && /^\d+$/.test(value) && Number(value) > 1) pages.add(Number(value));
    } catch { /* Ignore navigation outside the requested profile. */ }
  });
  return [...pages].sort((a, b) => a - b);
}
