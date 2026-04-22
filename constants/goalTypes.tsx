import { Decimal } from "@prisma/client/runtime/client";

export interface IGoalChartTypes {
  target: string;
  goal: string;
  amount: string;
}

export type EGoalStatus = "ALL" | "COMPLETED" | "INACTIVE" | "ACTIVE";

export interface IGoalDashboard {
  status: EGoalStatus;
}

export interface IGoalType {
  id?: string;
  title: string;
  goalAmount: Decimal;
  currentAmount?: string;
  goalStatus: EGoalStatus;
  userId: string;
}
export interface IGoalAmountType {
  id?: string;
  userId: string;
  goalId: string;
  amount: Decimal;
  createdAt?: Date;
}

export interface IAddAmountType {
  goalId: string;
  currentAmount: string;
}

export interface IGoalFilterType {
  page?: number;
  limit?: number;
  status?: EGoalStatus;
}

export interface IGoalFilteredResponse {
  goals: IGoalType[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}
