import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { recurringTransactionValidationSchema } from "@/validation_schema/transaction-validatino";
import { AppError } from "@/lib/errors";
import { asyncHandler } from "@/lib/async-handler";

export const POST = asyncHandler(async (req: Request) => {
  const body = await req.json();
  const validatedData = recurringTransactionValidationSchema.parse(body);
  if (!validatedData) {
    throw new AppError("Fill the all transactions inputs", 400);
  }
  const { amount, category, message, userId, frequency, nextRunDate } =
    validatedData;
  const transaction = await prisma.transaction.create({
    data: {
      userId,
      amount,
      category,
      message,
      frequency,
      nextRunDate,
    },
  });

  return NextResponse.json({
    message: "Transaction Created Successfully",
    status: true,
    statusCode: 201,
    data: transaction,
  });
});
