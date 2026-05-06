import { asyncHandler } from "@/lib/async-handler";
import { AppError } from "@/lib/errors";
import { prisma } from "@/lib/prisma";
import { budgetValidationSchema } from "@/validation_schema/budget-validation";
import { NextResponse } from "next/server";

export const POST = asyncHandler(async (req: Request) => {
  const body = await req.json();
  const validatedData = budgetValidationSchema.parse(body);

  if (!validatedData) {
    throw new AppError("Fill the all budget inputs", 400);
  }

  const { alert, amount, category, notes, period, status, userId } =
    validatedData;

  const budget = await prisma.budgets.create({
    data: {
      alert,
      amount,
      category,
      notes,
      period,
      status,
      userId,
    },
  });

  return NextResponse.json({
    message: "Budget Created Successfully",
    status: true,
    statusCode: 201,
    data: budget,
  });
});
