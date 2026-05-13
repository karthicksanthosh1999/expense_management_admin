import { asyncHandler } from "@/lib/async-handler";
import { AppError } from "@/lib/errors";
import { prisma } from "@/lib/prisma";
import { goalValidationSchema } from "@/validation_schema/goal-validation";
import { NextResponse } from "next/server";

export const POST = asyncHandler(async (req: Request) => {
  const body = await req.json();
  const validatedData = goalValidationSchema.parse(body);

  if (!validatedData) {
    throw new AppError("Fill the all goal inputs", 400);
  }
  const { userId, title, goalAmount, currentAmount, goalStatus } =
    validatedData;
  const goal = await prisma.goal.create({
    data: {
      userId,
      title,
      goalAmount,
      goalStatus,
      currentAmount,
    },
  });

  return NextResponse.json({
    message: "Goal Created Successfully",
    status: true,
    statusCode: 201,
    data: goal,
  });
});

/**
 * @swagger
 * /api/hello:
 *   get:
 *    tag:
 *      - Goals
 *     description: Returns the hello world
 *     responses:
 *       200:
 *         description: Hello World!
 */
export const GET = asyncHandler(async () => {
  const transactions = await prisma.goal.findMany();
  return NextResponse.json({
    message: "Goal Get Successfully",
    status: true,
    statusCode: 200,
    data: transactions,
  });
});

export const DELETE = asyncHandler(async (req: Request) => {
  const { id } = await req.json();
  if (!id) {
    throw new AppError("Id is required", 400);
  }
  const goal = await prisma.goal.delete({ where: { id } });
  return NextResponse.json({
    message: "Goal Deleted Successfully",
    status: true,
    statusCode: 200,
    data: goal,
  });
});

export const PUT = asyncHandler(async (req: Request) => {
  const body = await req.json();
  const { userId, title, goalAmount, currentAmount, goalStatus, id } = body;
  const goal = await prisma.goal.update({
    where: { id },
    data: {
      userId,
      title,
      goalAmount,
      goalStatus,
      currentAmount,
    },
  });

  return NextResponse.json({
    message: "Goal Updated Successfully",
    status: true,
    statusCode: 201,
    data: goal,
  });
});
