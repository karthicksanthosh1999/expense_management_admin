// app/actions/getMonthlyTransactions.ts
"use server";

import { getUserFromToken } from "@/lib/getUser";
import { prisma } from "@/lib/prisma";

export async function getYearWiseTransactions() {
  const user = await getUserFromToken();

  try {
    const currentYear = new Date().getFullYear();

    const startDate = new Date(currentYear, 0, 1); // Jan 1
    const endDate = new Date(currentYear, 11, 31, 23, 59, 59); // Dec 31

    const transactions = await prisma.transaction.findMany({
      where: {
        userId: user?.id,
        transactionDate: {
          gte: startDate,
          lte: endDate,
        },
      },
      select: {
        amount: true,
        transactionDate: true,
        transactionType: true,
      },
      orderBy: {
        transactionDate: "asc",
      },
    });

    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    const monthlyData = months.map((month) => ({
      month,
      income: 0,
      expense: 0,
    }));

    transactions.forEach((transaction) => {
      const monthIndex = new Date(transaction.transactionDate).getMonth();
      const amount = Number(transaction.amount);

      if (transaction.transactionType === "INCOME") {
        monthlyData[monthIndex].income += amount;
      } else {
        monthlyData[monthIndex].expense += amount;
      }
    });

    return monthlyData;
  } catch (error) {
    console.error("Monthly Transaction Error:", error);
    return [];
  }
}
