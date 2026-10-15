import { test } from "node:test";
import assert from "node:assert/strict";
import { defaultContent, normalizeContent, validateContent } from "../lib/content-model";
import { normalizeSintaUrl, parseSintaHtml } from "../lib/sinta-parser";
import { validateTeam } from "../lib/team-input";
import { researchEntries } from "../lib/team-data";
import { detectExtension } from "../lib/upload-file";

test("CMS retains defaults when older content lacks new fields and preserves intentionally blank fields", () => {
  const content = normalizeContent({ values: { page_2: "Hero Baru", page_4: "" }, partners: [] });
  assert.equal(content.values.page_2, "Hero Baru"); assert.equal(content.values.page_4, "");
  assert.equal(content.values.page_6, defaultContent.values.page_6); assert.deepEqual(content.partners, []);
  assert.deepEqual(content.internships, []);
});
test("CMS preserves internship drafts and published openings, and rejects invalid opening data", () => {
  const internships = [
    { bidang: "Otomasi", deskripsi: "Belajar PLC", persyaratan: "Siswa SMK", periode: "3 bulan", tampil: true },
    { bidang: "Robotika", deskripsi: "", persyaratan: "", periode: "", tampil: false },
  ];
  assert.deepEqual(validateContent({ ...defaultContent, internships }).internships, internships);
  assert.throws(() => validateContent({ ...defaultContent, internships: [{ ...internships[0], bidang: " " }] }));
  assert.throws(() => validateContent({ ...defaultContent, internships: [{ ...internships[0], tampil: "yes" } as never] }));
  assert.throws(() => validateContent({ ...defaultContent, internships: Array(51).fill(internships[0]) }));
});
test("CMS rejects executable image URLs and malformed partner data", () => {
  assert.throws(() => validateContent({ ...defaultContent, values: { ...defaultContent.values, page_6: "javascript:alert(1)" } }));
  assert.throws(() => validateContent({ ...defaultContent, partners: [{ nama: "", logo: "", url: "" }] }));
});
test("SINTA canonicalizes profile IDs and limits requests to the intended host", () => {
  assert.equal(normalizeSintaUrl("6956997"), "https://sinta.kemdiktisaintek.go.id/authors/profile/6956997/");
  assert.equal(normalizeSintaUrl("https://sinta.kemdiktisaintek.go.id/authors/profile/6956997/?view=iprs"), normalizeSintaUrl("6956997"));
  for (const url of ["http://127.0.0.1/", "https://sinta.kemdiktisaintek.go.id.evil.com/authors/profile/1/", "https://sinta.kemdiktisaintek.go.id:4006/authors/profile/1/", "https://sinta.kemdiktisaintek.go.id/anything/", "https://user:pass@sinta.kemdiktisaintek.go.id/authors/profile/1/"]) assert.throws(() => normalizeSintaUrl(url));
});
test("SINTA extracts four text records, publishers and safe links for all views", () => {
  const html = Array.from({ length: 6 }, (_, i) => `<div class="ar-list-item"><div class="ar-title"><a href="${i === 1 ? 'javascript:alert(1)' : '/record/' + i}">Judul &amp; ${i}</a></div><div class="ar-pub">Jurnal\n Teknologi</div><span class="ar-year">2026</span></div>`).join("");
  const rows = parseSintaHtml(html, normalizeSintaUrl("6956997"));
  assert.equal(rows.length, 4); assert.equal(rows[0].judul, "Judul & 0"); assert.equal(rows[0].jurnal, "Jurnal Teknologi");
  assert.equal(rows[0].url, "https://sinta.kemdiktisaintek.go.id/record/0"); assert.equal(rows[1].url, undefined); assert.equal(rows[0].tahun, "2026");
  assert.throws(() => parseSintaHtml("<h1>Access denied</h1>", normalizeSintaUrl("6956997")));
  assert.deepEqual(parseSintaHtml('<div class="ar-list">No data</div>', normalizeSintaUrl("6956997")), []);
  assert.deepEqual(parseSintaHtml('<h2>Document Not Found</h2>', normalizeSintaUrl("6956997")), []);
});
test("Team role, imported data and legacy research normalize without dropping descriptions", () => {
  const result = validateTeam({ nama: "Peneliti", peran: "PENELITI_UTAMA", hakCipta: [{ judul: "Hak Cipta", url: "https://example.org" }], pengabdian: [{ judul: "Pengabdian" }] });
  assert.equal(result.peran, "PENELITI_UTAMA");
  assert.equal(validateTeam({ nama: "Peneliti", peran: "ANGGOTA", sintaUrl: "6956997" }).sintaUrl, normalizeSintaUrl("6956997"));
  assert.throws(() => validateTeam({ nama: "Peneliti", peran: "ANGGOTA", publikasi: [{ judul: "Artikel", url: "javascript:alert(1)" }] }));
  assert.equal(researchEntries([{ judul: "Riset", desc: "Deskripsi lama", tags: "AI, Robotika" }])[0].deskripsi, "Deskripsi lama");
});
test("Upload validates content signatures rather than trusting filenames or MIME labels", () => {
  assert.equal(detectExtension(Buffer.from("%PDF-1.7"), true), ".pdf");
  assert.throws(() => detectExtension(Buffer.from("%PDF-1.7"), false));
  assert.throws(() => detectExtension(Buffer.from('<svg onload="alert(1)"></svg>'), false));
  assert.equal(detectExtension(Buffer.from([137,80,78,71,13,10,26,10]), false), ".png");
});
