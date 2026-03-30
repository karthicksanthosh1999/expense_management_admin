"use client";
import { prisma } from "@/lib/prisma";

export const getSingleTransaction = async (id: string) => {
  try {
    const transaction = await prisma.transaction.findUnique({
      where: { id },
    });

    return transaction;
  } catch (error) {
    console.log(error);
  }
};
