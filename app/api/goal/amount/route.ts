import { asyncHandler } from "@/lib/async-handler";
import { AppError } from "@/lib/errors";
import { prisma } from "@/lib/prisma";
import { goalAmountValidationSchema } from "@/validation_schema/goal-validation";
import { NextResponse } from "next/server";

export const POST = asyncHandler(async (req: Request) => {
  const body = await req.json();
  const validatedData = goalAmountValidationSchema.parse(body);
  if (!validatedData) {
    throw new AppError("Fill the all goal inputs", 400);
  }
  const { userId, goalId, amount } = validatedData;

  const existingGoal = await prisma.goal.findUnique({ where: { id: goalId } });

  if (!existingGoal) {
    throw new AppError("Goal is not found", 404);
  }

  await prisma.goal.update({
    where: { id: goalId },
    data: {
      currentAmount: {
        increment: amount,
      },
    },
  });

  const goalAmount = await prisma.goalHistory.create({
    data: {
      userId,
      goalId,
      amount,
    },
  });

  return NextResponse.json({
    message: "Goal Amount Added Successfully",
    status: true,
    statusCode: 200,
    data: goalAmount,
  });
});

export const GET = asyncHandler(async (req: Request) => {
  const { searchParams } = new URL(req.url);
  const goalId = searchParams.get("goalId");
  if (!goalId) {
    throw new AppError("Goal Id is required", 400);
  }

  const goalAmount = await prisma.goalHistory.findMany({
    where: { goalId },
  });

  return NextResponse.json({
    message: "Goal Amount Get Successfully",
    status: true,
    statusCode: 200,
    data: goalAmount,
  });
});

export const PUT = asyncHandler(async (req: Request) => {
  const body = await req.json();
  const { userId, goalId, amount, id } = body;

  const existingGoal = await prisma.goal.findUnique({ where: { id: goalId } });

  if (!existingGoal) {
    throw new AppError("Goal is not found", 404);
  }
  const existingHistory = await prisma.goalHistory.findUnique({
    where: { id },
  });

  if (!existingHistory) {
    throw new AppError("Goal history not found", 404);
  }
  const oldAmount = existingHistory.amount;

  await prisma.goal.update({
    where: { id: goalId },
    data: {
      currentAmount: {
        decrement: oldAmount,
      },
    },
  });

  await prisma.goal.update({
    where: { id: goalId },
    data: {
      currentAmount: {
        increment: amount,
      },
    },
  });

  const goalAmount = await prisma.goalHistory.update({
    where: { id },
    data: {
      userId,
      goalId,
      amount,
    },
  });

  return NextResponse.json({
    message: "Goal Amount Added Successfully",
    status: true,
    statusCode: 200,
    data: goalAmount,
  });
});

export const DELETE = asyncHandler(async (req: Request) => {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (!id) {
    throw new AppError("Id is required", 400);
  }

  const goalHistory = await prisma.goalHistory.delete({ where: { id } });

  return NextResponse.json({
    message: "Goal History Deleted Successfully",
    status: true,
    statusCode: 200,
    data: goalHistory,
  });
});
