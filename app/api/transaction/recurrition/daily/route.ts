import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { addMonths } from "date-fns";

export async function GET() {
  const today = new Date();

  const due = await prisma.recurringTransaction.findMany({
    where: {
      isActive: true,
      nextRunDate: { lte: today },
    },
  });

  for (const item of due) {
    await prisma.transaction.create({
      data: {
        userId: item.userId,
        amount: item.amount,
        message: item.message,
        category: item.category,
        recurringId: item.id,
      },
    });

    await prisma.recurringTransaction.update({
      where: { id: item.id },
      data: {
        nextRunDate: addMonths(item.nextRunDate, 1),
      },
    });
  }

  return NextResponse.json({
    processed: due.length,
  });
}
