import { asyncHandler } from "@/lib/async-handler";
import { getDefaultDates } from "@/lib/getCurrentMonth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export const GET = asyncHandler(async()=>{


    const { startDate,endDate } =getDefaultDates()

    const transactions = await prisma.transaction.groupBy(
        {
            by: ['category'],
            _sum: {
                amount: true
            },
            where: {
                transactionType: "EXPENSE",
                transactionDate: {
                    gte: startDate,
                    lte: endDate
                }
            }
        }
    );

    const formattedTransactions = transactions.map(item => ({
        category : item.category,
        total : Number(item._sum.amount) || 0,
    }))

    return NextResponse.json(
        {
            message : "Transactions Get Successfully",
            success : true,
            statusCode : 200,
            data : formattedTransactions
        }
    )

})