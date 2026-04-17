import { asyncHandler } from "@/lib/async-handler";
import { AppError } from "@/lib/errors";
import { prisma } from "@/lib/prisma";
import { goalValidationSchema } from "@/validation_schema/goal-validation";
import { NextResponse } from "next/server";

export const POST = asyncHandler(async (req: Request) => {
  const body = await req.json();
  const validatedData = goalValidationSchema.parse(body);
  console.log(body);
  if (!validatedData) {
    throw new AppError("Fill the all transactions inputs", 400);
  }
  const { userId, title, goalAmount, currentAmount } = validatedData;
  const transaction = await prisma.goal.create({
    data: {
      userId,
      title,
      goalAmount,
      currentAmount,
    },
  });

  return NextResponse.json({
    message: "Goal Created Successfully",
    status: true,
    statusCode: 201,
    data: transaction,
  });
});

export const GET = asyncHandler(async () => {
  const transactions = await prisma.goal.findMany();
  return NextResponse.json({
    message: "Goal Get Successfully",
    status: true,
    statusCode: 200,
    data: transactions,
  });
});
