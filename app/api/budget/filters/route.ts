import { asyncHandler } from "@/lib/async-handler";
import { getDefaultDates } from "@/lib/getCurrentMonth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export const POST = asyncHandler(async (req: Request) => {
  const { searchParams } = new URL(req.url);
    const { startDate, endDate } = getDefaultDates();

  const page = Number(searchParams.get("page")) || 1;
  const limit = Number(searchParams.get("limit")) || 10;

  const type = searchParams.get("status");
  const period = searchParams.get("period");

  const skip = (page - 1) * limit;

  // Dynamic filter
  const where: any = {};

  const normalizedType = type?.toUpperCase();
  const normalizedPeriod = period?.toUpperCase();

  if (normalizedType && normalizedType !== "ALL") {
    where.status = normalizedType;
  }

  if (normalizedPeriod && normalizedPeriod !== "ALL") {
    where.period = normalizedPeriod;
  }

  const [budgets, total] = await Promise.all([
    prisma.budgets.findMany({
      where,
      skip,
      take: limit
    }),

    prisma.budgets.count({ where }),
  ]);

  // GET ALL CATEGORIES
  const categories = budgets.map((budget) => budget.category);

  // GET TRANSACTION SUMMARY
  const transactionSummary = await prisma.transaction.groupBy({
    by: ["category"],

    where: {
      transactionDate: {
          gte: startDate,
          lte: endDate,
      },
      category: {
        in: categories,
      },

      transactionType: "EXPENSE",
    },

    _sum: {
      amount: true,
    },
  });

  // MERGE BUDGET + SPENT
  const mergedBudgets = budgets.map((budget) => {
    const transaction = transactionSummary.find(
      (t) => t.category === budget.category
    );

    const spent = Number(transaction?._sum.amount || 0);

    const budgetAmount = Number(budget.amount);

    const usedPercentage =
      budgetAmount > 0
        ? Number(((spent / budgetAmount) * 100).toFixed(2))
        : 0;

    return {
      ...budget,
      budgetAmount,
      spent,
      remaining: budgetAmount - spent,
      usedPercentage,
      status:
        spent > budgetAmount
          ? "EXCEEDED"
          : spent >= budgetAmount * 0.8
          ? "WARNING"
          : "ON_TRACK",
    };
  });

  return NextResponse.json({
    message: "Budget Get Successfully",
    status: true,
    statusCode: 200,

    data: {
      budgets: mergedBudgets,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    },
  });
});