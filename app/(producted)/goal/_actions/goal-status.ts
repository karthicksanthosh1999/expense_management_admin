"use server";

import { prisma } from "@/lib/prisma";

export const goalStatusCount = async () => {
  const grouped = await prisma.goal.groupBy({
    by: ["goalStatus"],
    _count: { goalStatus: true },
  });

  const result = grouped.reduce(
    (acc, item) => {
      acc[item.goalStatus!] = item._count.goalStatus;
      return acc;
    },
    {} as Record<string, number>,
  );

  return result;
};
