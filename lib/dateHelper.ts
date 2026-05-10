import { prisma } from "./prisma";
import { addDays, addWeeks, addMonths, addYears } from "date-fns";

function getNextDate(date: Date, frequency: string) {
  switch (frequency) {
    case "DAILY":
      return addDays(date, 1);

    case "WEEKLY":
      return addWeeks(date, 1);

    case "MONTHLY":
      return addMonths(date, 1);

    case "YEARLY":
      return addYears(date, 1);

    default:
      return date;
  }
}

export async function runRecurringTransactions() {
  const today = new Date();

  const dueItems = await prisma.recurringTransaction.findMany({
    where: {
      isActive: true,
      nextRunDate: {
        lte: today,
      },
    },
  });

  for (const item of dueItems) {
    await prisma.transaction.create({
      data: {
        userId: item.userId,
        amount: item.amount,
        message: item.message,
        category: item.category,
        recurringId: item.id,
        transactionDate: new Date(),
      },
    });

    const nextDate = getNextDate(item.nextRunDate, item.frequency);

    await prisma.recurringTransaction.update({
      where: { id: item.id },
      data: {
        nextRunDate: nextDate,
      },
    });
  }

  return dueItems.length;
}
