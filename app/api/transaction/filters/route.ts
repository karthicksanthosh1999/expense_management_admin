import { asyncHandler } from "@/lib/async-handler";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export const POST = asyncHandler(async (req: Request) => {
  const { searchParams } = new URL(req.url);

  const page = Number(searchParams.get("page")) || 1;
  const limit = Number(searchParams.get("limit")) || 10;

  const type = searchParams.get("type");
  const category = searchParams.get("category");

  const startDateParam = searchParams.get("startDate");
  const endDateParam = searchParams.get("endDate");

  const skip = (page - 1) * limit;

  // Default week range
  let { start, end } = getCurrentWeekRange();

  // Override if user passes dates
  if (
    startDateParam &&
    endDateParam &&
    startDateParam !== "undefined" &&
    endDateParam !== "undefined"
  ) {
    const parsedStart = new Date(startDateParam);
    const parsedEnd = new Date(endDateParam);

    if (!isNaN(parsedStart.getTime()) && !isNaN(parsedEnd.getTime())) {
      start = parsedStart;
      end = parsedEnd;

      start.setHours(0, 0, 0, 0);
      end.setHours(23, 59, 59, 999);
    }
  }

  // Dynamic filter
  const where: any = {
    transactionDate: {
      gte: start,
      lte: end,
    },
  };

  const normalizedType = type?.toUpperCase();
  const normalizedCategory = category?.toLowerCase();

  if (normalizedType && normalizedType !== "ALL") {
    where.transactionType = normalizedType;
  }

  if (normalizedCategory && normalizedCategory !== "all") {
    where.category = normalizedCategory;
  }

  const [transactions, total] = await Promise.all([
    prisma.transaction.findMany({
      where,
      skip,
      take: limit,
      orderBy: {
        transactionDate: "desc",
      },
    }),
    prisma.transaction.count({ where }),
  ]);

  return NextResponse.json({
    message: "Transaction Get Successfully",
    status: true,
    statusCode: 200,
    data: {
      transactions,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    },
    filters: {
      startDate: start,
      endDate: end,
    },
  });
});

const getCurrentWeekRange = () => {
  const now = new Date();

  const day = now.getDay(); // 0 (Sun) - 6 (Sat)
  const diffToMonday = day === 0 ? -6 : 1 - day;

  const start = new Date(now);
  start.setDate(now.getDate() + diffToMonday);
  start.setHours(0, 0, 0, 0);

  const end = new Date(start);
  end.setDate(start.getDate() + 6);
  end.setHours(23, 59, 59, 999);

  return { start, end };
};
