import { asyncHandler } from "@/lib/async-handler";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export const GET = asyncHandler(async()=>{

    const transactions = await prisma.transaction.groupBy(
        {
            by: ['category'],
            _sum: {
                amount: true
            },
            where: {
                transactionType: "EXPENSE"
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