import "server-only";
import { getServerSession } from "next-auth/next";
import { authOptions } from "./auth";
import { prisma } from "./prisma";

export async function requireAdmin() {
  const session = await getServerSession(authOptions);
  const id = Number(session?.user?.id);
  if (!Number.isSafeInteger(id) || id <= 0) throw new Error("Silakan masuk sebagai admin.");
  const admin = await prisma.admin.findUnique({ where: { id } });
  if (!admin) throw new Error("Akun admin tidak ditemukan.");
  return admin;
}
