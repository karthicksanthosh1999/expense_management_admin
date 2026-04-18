import { asyncHandler } from "@/lib/async-handler";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export const POST = asyncHandler(async (req: Request) => {
  const { searchParams } = new URL(req.url);

  const page = Number(searchParams.get("page")) || 1;
  const limit = Number(searchParams.get("limit")) || 10;

  const goalStatus = searchParams.get("status");

  const skip = (page - 1) * limit;

  // 🔥 Dynamic filter
  const where: any = {};

  const normalizedType = goalStatus?.toUpperCase();

  if (normalizedType && normalizedType !== "ALL") {
    where.goalStatus = normalizedType;
  }

  const [goals, total] = await Promise.all([
    prisma.goal.findMany({
      where,
      skip,
      take: limit,
      orderBy: {
        createdAt: "desc",
      },
    }),
    prisma.goal.count({ where }),
  ]);

  return NextResponse.json({
    message: "Goals Get Successfully",
    status: true,
    statusCode: 200,
    data: {
      goals,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    },
  });
});
