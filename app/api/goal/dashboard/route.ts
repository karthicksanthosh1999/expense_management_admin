import { asyncHandler } from "@/lib/async-handler";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export const GET = asyncHandler(async()=>{
    const goals = await prisma.goal.groupBy({
        by:['goalStatus'],
        _count: {
            goalStatus: true
        }
    })
const formattedGoals = {
  ACTIVE: 0,
  INACTIVE: 0,
  COMPLETED: 0,
    TOTAL: 0,
};

goals.forEach((item) => {
      const count = item._count.goalStatus;
  formattedGoals[item.goalStatus!] =
    item._count.goalStatus;
      formattedGoals.TOTAL += count;
});

    return NextResponse.json({
        message : "Goal group fetch successfully",
        data: formattedGoals,
        statusCode : 200,
        status: "Success"
    })
}) 