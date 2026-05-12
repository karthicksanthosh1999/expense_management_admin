'use server'

import { prisma } from "@/lib/prisma";

export const topGoalList = async () => {
  const goalList = await prisma.goal.findMany();

  const formattedGoals = goalList.map((goal) => {
    const goalAmount = Number(goal.goalAmount);
    const currentAmount = Number(goal.currentAmount);

    const percentage =
      goalAmount > 0
        ? Math.min((currentAmount / goalAmount) * 100, 100)
        : 0;

    return {
      ...goal,
      percentage: Number(percentage.toFixed(2)),
    };
  });

  return formattedGoals;
};