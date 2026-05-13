import cron from "node-cron";
import { prisma } from "./prisma";

declare global {
  // Prevent multiple cron jobs in dev/hot reload
  var recurringCronStarted: boolean | undefined;
}

function getNextRunDate(currentDate: Date, frequency: string): Date {
  const nextDate = new Date(currentDate);
  switch (frequency) {
    case "DAILY":
      nextDate.setDate(nextDate.getDate() + 1);
      break;
    case "WEEKLY":
      nextDate.setDate(nextDate.getDate() + 7);
      break;
    case "MONTHLY":
      nextDate.setMonth(nextDate.getMonth() + 1);
      break;
    case "YEARLY":
      nextDate.setFullYear(nextDate.getFullYear() + 1);
      break;
  }

  return nextDate;
}

export function startRecurringTransactionCron() {
  if (global.recurringCronStarted) {
    console.log("Recurring cron already running");
    return;
  }

  global.recurringCronStarted = true;

  cron.schedule("* * * * *", async () => {
    console.log("Running recurring transaction cron...");

    const today = new Date();

    const recurringList = await prisma.recurringTransaction.findMany({
      where: {
        isActive: true,
        nextRunDate: {
          lte: today,
        },
      },
    });

    for (const recurring of recurringList) {
      await prisma.transaction.create({
        data: {
          userId: recurring?.userId,
          amount: recurring?.amount,
          message: recurring?.message,
          category: recurring?.category,
        },
      });

      const nextDate = getNextRunDate(
        recurring?.nextRunDate,
        recurring?.frequency,
      );

      const expired = recurring?.endDate && nextDate > recurring?.endDate;

      await prisma.recurringTransaction.update({
        where: { id: recurring?.id },
        data: {
          nextRunDate: nextDate,
          isActive: !expired,
        },
      });
      console.log("Cron Transaction Created Successfully");
    }
  });

  console.log("Recurring cron started globally");
}
