import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { recurringTransactionValidationSchema } from "@/validation_schema/transaction-validatino";
import { AppError } from "@/lib/errors";
import { asyncHandler } from "@/lib/async-handler";
import cron from "node-cron";

export const POST = asyncHandler(async (req: Request) => {
  const body = await req.json();
  const validatedData = recurringTransactionValidationSchema.parse(body);
  if (!validatedData) {
    throw new AppError("Fill the all transactions inputs", 400);
  }
  const {
    amount,
    category,
    message,
    userId,
    frequency,
    nextRunDate,
    startDate,
  } = validatedData;
  const convertedDate = new Date(startDate);
  const transaction = await prisma.recurringTransaction.create({
    data: {
      userId,
      amount,
      category,
      message,
      frequency,
      nextRunDate,
      startDate: convertedDate,
    },
  });

  return NextResponse.json({
    message: "Transaction Created Successfully",
    status: true,
    statusCode: 201,
    data: transaction,
  });
});

export const GET = asyncHandler(async (req: Request) => {
  const transaction = await prisma.recurringTransaction.findMany({ orderBy: { createdAt: "desc" } });
  return NextResponse.json({
    message: "Transaction Get Successfully",
    status: true,
    statusCode: 200,
    data: transaction,
  });
});

