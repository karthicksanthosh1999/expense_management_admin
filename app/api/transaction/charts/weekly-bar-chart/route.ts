import { asyncHandler } from "@/lib/async-handler";
import { getCurrentWeekDates } from "@/lib/getCurrentMonth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export const GET = asyncHandler(async()=>{
    const { startDate, endDate } =getCurrentWeekDates();

const transactions = await prisma.transaction.findMany({
  where: {
    transactionType: "EXPENSE",
    transactionDate: {
      gte: startDate,
      lte: endDate,
    },
  },
  select: {
    amount: true,
    transactionDate: true,
  },
});

const weekData = {
  Mon: 0,
  Tue: 0,
  Wed: 0,
  Thu: 0,
  Fri: 0,
  Sat: 0,
  Sun: 0,
};

transactions.forEach((tx) => {
  const day = tx.transactionDate.toLocaleDateString("en-US", {
    weekday: "short",
  });

  weekData[day as keyof typeof weekData] += Number(tx.amount);
});

const formattedTransactions = Object.entries(weekData).map(
  ([day, total]) => ({
    day,
    total,
  })
);

return NextResponse.json({
  message: "Transactions Get Successfully",
  success: true,
  statusCode: 200,
  data: formattedTransactions,
});

    return NextResponse.json(
        {
            message : "Transactions Get Successfully",
            success : true,
            statusCode : 200,
            data : formattedTransactions
        }
    )
    }
)