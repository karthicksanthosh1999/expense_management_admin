import { Period } from "@prisma/client";
import { Decimal } from "@prisma/client/runtime/client";

export type EBudgetStatus = "ALL" | "ON_TRACK" | "WARNING" | "EXCEEDED";

export interface IBudgetFilterType {
  page?: number;
  limit?: number;
  status?: EBudgetStatus;
  period?: Period
}

export interface IBudgetType {
  id?: string;
  userId: string;
  category: string;
  amount: Decimal | number;
  period: Period;
  status?: EBudgetStatus;
  alert: number;
  notes: string;
}

export interface IBudgetFilterResponseType extends IBudgetType {
  usedPercentage: number,
  remaining: string,
  spent: string,
}

export interface IBudgetFilteredResponse {
  data: {
    budgets: IBudgetFilterResponseType[];
    pagination: {
      total: number;
      page: number;
      limit: number;
      totalPages: number;
    };
  }
}
