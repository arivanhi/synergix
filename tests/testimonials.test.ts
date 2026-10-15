import test from "node:test";
import assert from "node:assert/strict";
import { validatePublicTestimonial, validateTestimonialFields, validateTestimonialStatus } from "../lib/testimonial-input";
import { createTestimonialLimiter } from "../lib/testimonial-rate-limit";

function submission() {
  const data = new FormData();
  for (const [key, value] of Object.entries({ nama: "  Mitra Uji  ", jabatan: "Koordinator", instansi: "Instansi Uji", teks: "Kerja sama otomasi membantu proses kerja tim kami.", persetujuan: "on", website: "" })) data.set(key, value);
  return data;
}

test("public submissions always await moderation and ignore injected IDs, status, and image URLs", () => {
  const data = submission();
  data.set("status", "DISETUJUI"); data.set("id", "99"); data.set("foto", "https://example.com/photo.png");
  assert.deepEqual(validatePublicTestimonial(data), { nama: "Mitra Uji", jabatan: "Koordinator", instansi: "Instansi Uji", teks: "Kerja sama otomasi membantu proses kerja tim kami.", status: "MENUNGGU" });
});

test("public testimonial validation requires consent and rejects spam, missing fields, and oversized text", () => {
  for (const [key, value] of [["persetujuan", ""], ["website", "https://spam.example"], ["nama", " "], ["instansi", ""], ["teks", "Singkat"], ["jabatan", "x".repeat(151)], ["teks", "x".repeat(2001)]]) {
    const data = submission(); data.set(key, value); assert.throws(() => validatePublicTestimonial(data));
  }
  const data = submission(); data.set("nama", new File(["text"], "name.txt"));
  assert.throws(() => validatePublicTestimonial(data));
});

test("administrator edits preserve legacy testimonials without a separate institution and only accept known statuses", () => {
  assert.equal(validateTestimonialFields({ nama: "Nama", jabatan: "Direktur PT Mitra", teks: "Pengalaman baik." }).instansi, null);
  assert.equal(validateTestimonialStatus("DISETUJUI"), "DISETUJUI");
  assert.throws(() => validateTestimonialStatus("PUBLISHED"));
});

test("submission limiter separates clients, resets expired quotas, and bounds retained entries", () => {
  const allow = createTestimonialLimiter(2, 1000, 2);
  assert.equal(allow("one", 100), true); assert.equal(allow("one", 200), true); assert.equal(allow("one", 300), false);
  assert.equal(allow("two", 300), true); assert.equal(allow("three", 400), false);
  assert.equal(allow("one", 1100), true); assert.equal(allow("three", 1300), true);
});
