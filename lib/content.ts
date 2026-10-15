import "server-only";
import { cache } from "react";
import { prisma } from "./prisma";
import { normalizeContent } from "./content-model";

export const getSiteContent = cache(async () => {
  const row = await prisma.kontenWebsite.findUnique({ where: { id: 1 } });
  return normalizeContent(row?.data);
});
