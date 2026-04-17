import { Decimal } from "@prisma/client/runtime/client"

export interface IGoalChartTypes {
    target: string,
    goal: string,
    amount: string
}

export interface IGoalType {
    id?: string,
    title: string,
    goalAmount: Decimal,
    currentAmount?: string
    userId: string,
}

export interface IAddAmountType {
    goalId: string,
    currentAmount: string
}