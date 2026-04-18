import { asyncHandler } from "@/lib/async-handler";
import { AppError } from "@/lib/errors";
import { prisma } from "@/lib/prisma";
import { transactionValidationSchema } from "@/validation_schema/transaction-validatino";
import { NextRequest, NextResponse } from "next/server";

export const POST = asyncHandler(async (req: Request) => {
    const body = await req.json()
    const validatedData = transactionValidationSchema.parse(body)
    if (!validatedData) {
        throw new AppError("Fill the all transactions inputs", 400)
    }
    const { amount, category, message, transactionDate, transactionType, userId } = validatedData;
    const transaction = await prisma.transaction.create({
        data: {
            userId,
            amount,
            category,
            message,
            transactionDate,
            transactionType,
        }
    })

    return NextResponse.json({
        message: "Transaction Created Successfully",
        status: true,
        statusCode: 201,
        data: transaction,
    })
});

export const GET = asyncHandler(async () => {
    const transactions = await prisma.transaction.findMany();
    return NextResponse.json({
        message: "Transaction Get Successfully",
        status: true,
        statusCode: 200,
        data: transactions,
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
    const transaction = await prisma.transaction.delete(
        {
            where: { id }
        }
    )
    return NextResponse.json({
        message: "Transaction Deleted Successfully",
        status: true,
        statusCode: 200,
        data: transaction,
    })
}

export const PUT = async (req: NextRequest) => {
    const { id, amount, message, transactionDate, transactionType, category } = await req.json();
    if (!id) {
        return NextResponse.json({
            message: "Id is required",
            statusCode: 400
        })
    }
    const transaction = await prisma.transaction.update(
        {
            where: { id },
            data: {
                amount,
                message,
                transactionDate,
                transactionType,
                category,
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