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

  // ✅  Default week range
  let { start, end } = getCurrentWeekRange();

  // ✅ Override if user passes dates
  if (startDateParam && endDateParam) {
    start = new Date(startDateParam);
    end = new Date(endDateParam);

    // normalize time
    start.setHours(0, 0, 0, 0);
    end.setHours(23, 59, 59, 999);
  }

  // 🔥 Dynamic filter
  const where: any = {
    transactionDate: {
      gte: start,
      lte: end,
    },
  };

  if (type && type !== "ALL") {
    where.transactionType = type;
  }

  if (category && category !== "ALL") {
    where.category = category;
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
    data: transactions,
    filters: {
      startDate: start,
      endDate: end,
    },
    pagination: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
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
