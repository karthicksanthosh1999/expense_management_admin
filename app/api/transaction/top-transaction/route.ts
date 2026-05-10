import { asyncHandler } from "@/lib/async-handler";
import { getDefaultDates } from "@/lib/getCurrentMonth";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export const GET = asyncHandler(async () => {
  const { startDate, endDate } = getDefaultDates();

  const groupedTransactions = await prisma.transaction.groupBy({
    by: ["category"],
    where: {
      transactionDate: {
        gte: startDate,
        lte: endDate,
      },
      transactionType: "EXPENSE",
    },
    _sum: {
      amount: true,
    },
    orderBy: {
      _sum: {
        amount: "desc",
      },
    },
    take: 6,
  });

  const transactions = groupedTransactions.map((item) => ({
    category: item.category,
    amount: Number(item._sum.amount || 0),
  }));

  return NextResponse.json({
    message: "Top Expense Categories",
    status: true,
    statusCode: 200,
    data: transactions,
  });
});

export const POST = asyncHandler(async (req: NextRequest) => {
  const body = await req.json();

  const { startDate, endDate } = body;

  const income = await prisma.transaction.aggregate({
    where: {
      transactionDate: {
        gte: new Date(startDate),
        lte: new Date(endDate),
      },
      transactionType: "INCOME",
    },
    _sum: {
      amount: true,
    },
  });

  const expense = await prisma.transaction.aggregate({
    where: {
      transactionDate: {
        gte: new Date(startDate),
        lte: new Date(endDate),
      },
      transactionType: "EXPENSE",
    },
    _sum: {
      amount: true,
    },
  });

  const totalIncome = Number(income._sum.amount || 0);
  const totalExpense = Number(expense._sum.amount || 0);

  const total = totalIncome + totalExpense;
  const balance = totalIncome - totalExpense;

  return NextResponse.json({
    message: "Summary fetched successfully",
    status: true,
    statusCode: 200,
    data: {
      income: totalIncome,
      expense: totalExpense,
      total,
      balance,
    },
  });
});
