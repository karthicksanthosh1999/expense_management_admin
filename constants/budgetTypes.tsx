import { Decimal } from "@prisma/client/runtime/client";

export type EBudgetStatus = "ALL" | "ON_TRACK" | "WARNING" | "EXCEEDED";

export interface IBudgetFilterType {
  page?: number;
  limit?: number;
  status?: EBudgetStatus;
}

export interface IBudgetType {
  id?: string;
  userId: string;
  category: string;
  amount: Decimal;
  period: string;
  status: EBudgetStatus;
  alert: string;
  notes: string;
}

export interface IBudgetFilteredResponse {
  goals: IBudgetType[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}
