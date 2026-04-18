"use server";
import { prisma } from "@/lib/prisma";

export default async function currentLoggedUser(id: string) {
  const userDetails = await prisma.user.findUnique({ where: { id } });

  return userDetails;
}
