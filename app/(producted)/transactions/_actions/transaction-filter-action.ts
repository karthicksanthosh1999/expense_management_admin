"use server";
import { ITransactionFilterType } from "@/constants/transactionsTypes";
import { prisma } from "@/lib/prisma";

export const transactionFilter = async ({
  category,
  endDate,
  limit = 10,
  page = 1,
  startDate,
  type,
}: ITransactionFilterType) => {
  try {
    const where: any = {};

    // Type filter (Income / Expense)
    if (type && type !== "ALL") {
      where.type = type;
    }

    // Category filter
    if (category && category !== "all") {
      where.category = category;
    }

    // Date range filter
    if (startDate || endDate) {
      where.createdAt = {};

      if (startDate) {
        where.createdAt.gte = new Date(startDate);
      }

      if (endDate) {
        where.createdAt.lte = new Date(endDate);
      }
    }

    // Pagination
    const skip = (page - 1) * limit;

    const [transactions, total] = await Promise.all([
      prisma.transaction.findMany({
        where,
        skip,
        take: limit,
        orderBy: {
          createdAt: "desc",
        },
      }),
      prisma.transaction.count({ where }),
    ]);

    return {
      transactions,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  } catch (error) {
    console.error(error);
    throw new Error("Failed to filter transactions");
  }
};
