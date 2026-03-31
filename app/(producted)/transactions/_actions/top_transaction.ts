"use server";
import { prisma } from "@/lib/prisma";

export const topFiveTransaction = async () => {
  try {
    const transaction = await prisma.transaction.findMany({
      where: {
        transactionType: "EXPENSE",
      },
      orderBy: {
        amount: "desc",
      },
      take: 5,
    });

    return transaction;
  } catch (error) {
    console.log(error);
  }
};
