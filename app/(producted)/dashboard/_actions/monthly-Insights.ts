'use server'

import { prisma } from "@/lib/prisma";
import dayjs from "dayjs";
import { getUserFromToken } from "@/lib/getUser";

export async function getMonthlyInsights() {
    const user = await getUserFromToken();
    const startOfMonth = dayjs().startOf("month").toDate();
    const startOfLastMonth = dayjs().subtract(1, "month").startOf("month").toDate();
    const endOfLastMonth = dayjs().subtract(1, "month").endOf("month").toDate();
    let userId = user?.id
    const [current, last] = await Promise.all([
        prisma.transaction.findMany({
            where: { userId, transactionDate: { gte: startOfMonth } },
        }),
        prisma.transaction.findMany({
            where: { userId, transactionDate: { gte: startOfLastMonth, lte: endOfLastMonth } },
        }),
    ]);

    const groupByCategory = (expenses: typeof current) => {
        return expenses.reduce((acc: Record<string, number>, exp) => {
            acc[exp.category] = (acc[exp.category] || 0) + Number(exp.amount);
            return acc;
        }, {});
    };

    return {
        currentTotal: sum(current),
        lastTotal: sum(last),
        currentByCategory: groupByCategory(current),
        lastByCategory: groupByCategory(last),
    };
}

function sum(data: any[]) {
    return data.reduce((acc, item) => {
        return acc + Number(item.amount);
    }, 0);
}

