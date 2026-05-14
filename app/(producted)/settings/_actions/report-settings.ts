import { prisma } from "@/lib/prisma";

interface IRportSettings

export const reportSettings = async () => {
  try {
    const settings = await prisma.settings.upsert({
      where: { userId },

      update: {
        currency,
        enable_monthly_transaction_report,
      },

      create: {
        userId,
        currency,
        enable_monthly_transaction_report,
      },
    });
  } catch (error) {}
};
