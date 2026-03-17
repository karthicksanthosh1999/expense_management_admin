export interface IGoalChartTypes {
    target: string,
    goal: string,
    amount: string
}

export interface IGoalType {
    id?: string,
    target: string,
    goal: string,
    amount?: string
    userId: string,
}

export interface IAddAmountType {
    goalId: string,
    amount: string
}