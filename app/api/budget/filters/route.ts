import { asyncHandler } from "@/lib/async-handler";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export const POST = asyncHandler(async (req: Request) => {
  const { searchParams } = new URL(req.url);

  const page = Number(searchParams.get("page")) || 1;
  const limit = Number(searchParams.get("limit")) || 10;

  const status = searchParams.get("status");

  const skip = (page - 1) * limit;

  // 🔥 Dynamic filter
  const where: any = {};

  const normalizedType = status?.toUpperCase();

  if (normalizedType && normalizedType !== "ALL") {
    where.status = normalizedType;
  }

  const [goals, total] = await Promise.all([
    prisma.budget.findMany({
      where,
      skip,
      take: limit,
      orderBy: {
        createdAt: "desc",
      },
    }),
    prisma.budget.count({ where }),
  ]);

  return NextResponse.json({
    message: "Budget Get Successfully",
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
