import { prisma } from "@/lib/prisma";

export const transactionAmount = async () => {
  const [grouped, overall] = await prisma.$transaction([
    prisma.transaction.groupBy({
      by: ["transactionType"],
      _sum: { amount: true },
    }),
    prisma.transaction.aggregate({
      _sum: { amount: true },
    }),
  ]);

  const income =
    grouped.find((t) => t.transactionType === "INCOME")?._sum.amount ?? 0;

  const expense =
    grouped.find((t) => t.transactionType === "EXPENSE")?._sum.amount ?? 0;

  const balance = income - expense;

  const total = overall._sum.amount ?? 0;

  return { income, expense, balance, total };
};
