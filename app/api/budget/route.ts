import { asyncHandler } from "@/lib/async-handler";
import { AppError } from "@/lib/errors";
import { prisma } from "@/lib/prisma";
import { budgetValidationSchema } from "@/validation_schema/budget-validation";
import { NextRequest, NextResponse } from "next/server";

export const POST = asyncHandler(async (req: Request) => {
    const body = await req.json()
    const validatedData = budgetValidationSchema.parse(body)
    if (!validatedData) {
        throw new AppError("Fill the all budget inputs", 400)
    }
    const { amount, category, alert, notes, period, userId } = validatedData;
    const budget = await prisma.budgets.create({
        data: {
            userId,
            amount,
            category,
            alert: String(alert),
            notes,
            period,            
        }
    })
    return NextResponse.json({
        message: "Budget Created Successfully",
        status: true,
        statusCode: 201,
        data: budget,
    })
});

/**
 * @swagger
 * /api/budget:
 *   get:
 *     tags:
 *       - Transactions
 *     summary: Get All Budgets Data
 *     description: Retrieve the list of transactions.
 *     operationId: getTransactions
 *     responses:
 *       200:
 *         description: Budgets fetched successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Budgets fetched successfully
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 */
export const GET = asyncHandler(async () => {
    const budget = await prisma.transaction.findMany();
    return NextResponse.json({
        message: "Budget Get Successfully",
        status: true,
        statusCode: 200,
        data: budget,
    })
});

export const DELETE = async (req: NextRequest) => {
    const { id } = await req.json();
    if (!id) {
        return NextResponse.json({
            message: "Id is required",
            statusCode: 400
        })
    }
    const budget = await prisma.budgets.delete(
        {
            where: { id }
        }
    )
    return NextResponse.json({
        message: "Budget Deleted Successfully",
        status: true,
        statusCode: 200,
        data: budget,
    })
}

export const PUT = async (req: NextRequest) => {
    const { id, amount, category, alert, notes, period, userId } = await req.json();
    if (!id) {
        return NextResponse.json({
            message: "Id is required",
            statusCode: 400
        })
    }
    const transaction = await prisma.budgets.update(
        {
            where: { id },
            data: {
                amount,
                category,
                alert: String(alert),
                notes,
                period,
                userId
            }
        }
    )
    return NextResponse.json({
        message: "Transaction Updated Successfully",
        status: true,
        statusCode: 200,
        data: transaction,
    })
}