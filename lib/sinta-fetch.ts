import { normalizeSintaUrl, parseSintaHtml, parseScopusTotal, sintaPageNumbers, type AcademicEntry } from "./sinta-parser";
import { entrySignature, isPatent } from "./team-statistics";

async function readPage(url: string): Promise<string> {
  const response = await fetch(url, { headers: { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36", Accept: "text/html" }, signal: AbortSignal.timeout(45000), redirect: "error", cache: "no-store" });
  if (!response.ok) throw new Error(`HTTP ${response.status}. Coba lagi nanti atau isi data secara manual.`);
  if (!response.headers.get("content-type")?.includes("text/html")) throw new Error("Respons SINTA bukan HTML.");
  const reader = response.body?.getReader(); if (!reader) throw new Error("Halaman SINTA kosong.");
  const chunks: Uint8Array[] = []; let size = 0;
  try { while (true) { const { value, done } = await reader.read(); if (done) break; size += value.length; if (size > 2 * 1024 * 1024) throw new Error("Halaman SINTA terlalu besar."); chunks.push(value); } }
  finally { await reader.cancel(); }
  return Buffer.concat(chunks).toString("utf8");
}
export async function fetchSintaView(profile: string, view: "scopus" | "services" | "iprs", fetchPage: (url: string) => Promise<string> = readPage) {
  const base = `${normalizeSintaUrl(profile)}?view=${view}`;
  const html = await fetchPage(base);
  const sourceTotal = view === "scopus" ? parseScopusTotal(html) : undefined;
  const entries: AcademicEntry[] = parseSintaHtml(html, base, 1000);
  // IPR types are counted across every page; Scopus uses the profile's Article total.
  if (view === "iprs" || (view === "scopus" && (sourceTotal === undefined || sourceTotal < entries.length))) {
    const pending = sintaPageNumbers(html, base), visited = new Set([1]);
    while (pending.length) {
      const page = pending.shift()!; if (visited.has(page)) continue;
      if (page > 20 || visited.size >= 20) throw new Error("Profil melebihi batas 20 halaman. Statistik tidak diganti agar tidak menghitung data sebagian.");
      visited.add(page);
      const url = `${base}&page=${page}`, next = await fetchPage(url);
      entries.push(...parseSintaHtml(next, url, 1000));
      pending.push(...sintaPageNumbers(next, base).filter(n => !visited.has(n)));
    }
  }
  const unique = [...new Map(entries.map(e => [JSON.stringify([e.judul, e.tahun, e.jenis, e.url]), e])).values()];
  const preview = unique.slice(0, 4);
  return { entries: preview, statistics: view === "scopus" ? { publications: { total: Math.max(sourceTotal ?? 0, unique.length), signature: entrySignature(preview) } } : view === "iprs" ? { patents: { total: unique.filter(isPatent).length, signature: entrySignature(preview) } } : {} };
}
