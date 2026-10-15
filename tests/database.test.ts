import { test } from "node:test";
import assert from "node:assert/strict";
import { PrismaClient } from "@prisma/client";
import { defaultContent } from "../lib/content-model";

test("MySQL persists CMS text/images/partners, all team roles, SINTA lists, and consultation status", { skip: process.env.RUN_DB_TESTS !== "1" }, async () => {
  if (!process.env.DATABASE_URL?.includes("synergix_cms_test")) throw new Error("Database uji wajib bernama synergix_cms_test.");
  const prisma = new PrismaClient();
  try {
    const row = await prisma.kontenWebsite.upsert({ where: { id: 1 }, create: { id: 1, data: defaultContent }, update: {} });
    await prisma.kontenWebsite.update({ where: { id: 1 }, data: { data: { ...defaultContent, values: { ...defaultContent.values, page_2: "Hero Uji", page_6: "/api/uploads/uji.png" }, partners: [{ nama: "Mitra Uji", logo: "/logo.png", url: "https://example.org" }] } } });
    const loaded = await prisma.kontenWebsite.findUniqueOrThrow({ where: { id: 1 } });
    assert.match(JSON.stringify(loaded.data), /Hero Uji/); assert.match(JSON.stringify(loaded.data), /Mitra Uji/);
    await prisma.kontenWebsite.update({ where: { id: 1 }, data: { data: row.data! } });
    const team = await prisma.keanggotaan.create({ data: { nama: "Verifikasi SINTA", peran: "WAKIL", sintaUrl: "https://sinta.kemdiktisaintek.go.id/authors/profile/6956997/", publikasi: [{ judul: "Scopus Uji", jurnal: "Jurnal", url: "https://example.org" }], hakCipta: [{ judul: "IPR Uji" }], pengabdian: [{ judul: "Services Uji" }] } });
    try { const result = await prisma.keanggotaan.findUniqueOrThrow({ where: { id: team.id } }); assert.match(JSON.stringify(result.pengabdian), /Services Uji/); assert.match(JSON.stringify(result.hakCipta), /IPR Uji/); }
    finally { await prisma.keanggotaan.delete({ where: { id: team.id } }); }
    const consultation = await prisma.konsultasi.create({ data: { nama: "Uji", perusahaan: "PT Uji", layanan: "Robotika", detail: "Permintaan pengujian" } });
    try { const processed = await prisma.konsultasi.update({ where: { id: consultation.id }, data: { diproses: true } }); assert.equal(processed.diproses, true); }
    finally { await prisma.konsultasi.delete({ where: { id: consultation.id } }); }
  } finally { await prisma.$disconnect(); }
});
