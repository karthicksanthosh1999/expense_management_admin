"use server";

import { prisma } from "@/lib/prisma";

export const goalStatusCount = async () => {
  const grouped = await prisma.goal.groupBy({
    by: ["goalStatus"],
    _count: { goalStatus: true },
  });

  return grouped.map((item) => ({
    status: item.goalStatus,
    count: item._count.goalStatus,
  }));
};
