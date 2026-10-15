import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { defaultContent } from "../lib/content-model";
const prisma = new PrismaClient();
async function main() {
  await prisma.kontenWebsite.upsert({ where: { id: 1 }, update: {}, create: { id: 1, data: defaultContent } });
  if (!await prisma.admin.count() && process.env.ADMIN_USERNAME && process.env.ADMIN_PASSWORD) {
    if (process.env.ADMIN_PASSWORD.length < 12) throw new Error("ADMIN_PASSWORD minimal 12 karakter.");
    await prisma.admin.create({ data: { username: process.env.ADMIN_USERNAME, nama: process.env.ADMIN_NAME || "Administrator", password: await bcrypt.hash(process.env.ADMIN_PASSWORD, 12) } });
    console.log("Akun admin awal berhasil dibuat.");
  }
  console.log("Konten awal CMS siap; data yang sudah ada dipertahankan.");
}
main().catch(error => { console.error(error.message); process.exitCode = 1; }).finally(() => prisma.$disconnect());
