import { categoryExpenseChain } from "@/lib/models/chains/categorizeExpenseChain";
import { aiCategoryScheme } from "@/lib/models/schema/expenseSchema-validation";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { startOfWeek, endOfWeek } from "date-fns";

export const GET = async(req: NextRequest, res: NextResponse) => {
    try {
        const startDate = startOfWeek(new Date(), {
            weekStartsOn: 1,
        });

        const endDate = endOfWeek(new Date(), {
            weekStartsOn: 1,
        });
        
        const currentWeekTopTransaction = await prisma.transaction.findMany(
            {
                where: {
                    transactionDate: {
                        gte: startDate,
                        lte: endDate,
                    }
                },
                orderBy: {
                    amount: "desc"
                },
                select: {
                    category: true,
                    message: true,
                    amount: true,
                    transactionDate: true,
                }
            }
        );

        if(!currentWeekTopTransaction.length){
            return NextResponse.json(
                {
                    message : "No transactions found for current week",
                    success : false,
                    statusCode : 200
                }
            )
        }

        const totalExpense =
        currentWeekTopTransaction.reduce(
            (acc, item) =>
            acc + Number(item.amount),
            0
        );

        const categoryTotals = currentWeekTopTransaction.reduce(
                (acc: any, transaction) => {
                const category =
                    transaction.category;

                acc[category] =
                    (acc[category] || 0) +
                    transaction.amount;

                return acc;
                },
                {}
            );

        const highestExpense = currentWeekTopTransaction.sort(
                (a, b) => Number(b.amount) - Number(a.amount)
            )[0];

            const aiResponse = await categoryExpenseChain.invoke(
            {
                analytics: JSON.stringify(highestExpense, null, 2)
            }
        )

        return NextResponse.json(
            {
                success : true,
                data : aiResponse.content,
            }
        )
    } catch (error) {
        console.error(error);

        return NextResponse.json(
            {
            success: false,
            message: "AI categorization failed",
            }
        );
    }
}