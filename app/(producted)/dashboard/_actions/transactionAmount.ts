'use server'

import { prisma } from "@/lib/prisma";

type Filters = {
  startDate?: Date;
  endDate?: Date;
};

export const transactionAmount = async (filters: Filters = {}) => {
  const { startDate, endDate } = filters;

  const start = startDate ? new Date(startDate) : undefined;
  const end = endDate ? new Date(endDate) : undefined;

  if (start) start.setHours(0, 0, 0, 0);
  if (end) end.setHours(23, 59, 59, 999);


  const where = {
    ...(startDate && {
      createdAt: {
        gte: startDate,
      },
    }),
    ...(endDate && {
      createdAt: {
        ...(startDate ? { gte: startDate } : {}),
        lte: endDate,
      },
    }),
  };

  const [grouped, overall] = await prisma.$transaction([
    prisma.transaction.groupBy({
      by: ["transactionType"],
      where,
      _sum: { amount: true },
    }),
    prisma.transaction.aggregate({
      where,
      _sum: { amount: true },
    }),
  ]);
const income = Number(
  grouped.find((t) => t.transactionType === "INCOME")?._sum.amount ?? 0
);

const expense = Number(
  grouped.find((t) => t.transactionType === "EXPENSE")?._sum.amount ?? 0
);

const balance = income - expense;

const total = Number(overall._sum.amount ?? 0);

  return { income, expense, balance, total };
};
