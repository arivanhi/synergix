import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
const prisma = new PrismaClient();
async function main() {
  const username = process.env.ADMIN_USERNAME; const password = process.env.ADMIN_PASSWORD;
  if (!username || !password || password.length < 12) throw new Error("Isi ADMIN_USERNAME dan ADMIN_PASSWORD (minimal 12 karakter) di environment server.");
  const exists = await prisma.admin.findUnique({ where: { username } });
  if (exists) throw new Error("Admin sudah ada; akun lama tidak ditimpa.");
  await prisma.admin.create({ data: { username, nama: process.env.ADMIN_NAME || "Administrator", password: await bcrypt.hash(password, 12) } });
  console.log("Admin berhasil dibuat.");
}
main().catch(error => { console.error(error.message); process.exitCode = 1; }).finally(() => prisma.$disconnect());
