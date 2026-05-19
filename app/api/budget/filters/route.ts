import { asyncHandler } from "@/lib/async-handler";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export const POST = asyncHandler(async (req: Request) => {
  const { searchParams } = new URL(req.url);

  const page = Number(searchParams.get("page")) || 1;
  const limit = Number(searchParams.get("limit")) || 10;

  const type = searchParams.get("status");
  const period = searchParams.get("period");



  const skip = (page - 1) * limit;

  // Dynamic filter
  const where: any = {};

  const normalizedType = type?.toUpperCase();
  const normalizedPeriod = period?.toUpperCase();

  if (normalizedType && normalizedType !== "ALL") {
    where.transactionType = normalizedType;
  }

  if (normalizedPeriod && normalizedPeriod !== "all") {
    where.period = normalizedPeriod;
  }

  const [budgets, total] = await Promise.all([
    prisma.budgets.findMany({
      where,
      skip,
      take: limit,
    }),
    prisma.budgets.count({ where }),
  ]);

  return NextResponse.json({
    message: "Budget Get Successfully",
    status: true,
    statusCode: 200,
    data: {
      budgets,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    }
  });
});