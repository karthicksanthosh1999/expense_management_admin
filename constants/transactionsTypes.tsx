import { Decimal } from "@prisma/client/runtime/client";
import { TTransactionType } from "./CommonTypes";

export interface ITransactionFilterType {
  page?: number;
  limit?: number;
  type?: TTransactionType;
  category?: string;
  startDate?: Date;
  endDate?: Date;
  total?: number;
  totalPages?: number;
}

export interface ITransactionPieChartType {
  category: string;
  total: number;
}

export interface ITransactionFilteredResponse {
  transactions: ITransaction[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export interface ITransaction {
  id: string;
  amount: string | Decimal;
  message: string;
  category: string;
  transactionDate: Date;
  transactionType: TTransactionType;
  userId?: string;
}

export interface ITransactionsResponseType {
  id: string;
  amount: string | Decimal;
  message: string;
  userId: string;
  category: string;
  transactionDate: Date;
  transactionType: TTransactionType;
  user: {
    id: string;
    name: string;
    email: string;
  };
}

export interface ITopTransactionType {
  amount: number;
  category: string;
}

export interface IOverallAmountType {
  expense: number;
  income: number;
  balance: number;
}

export interface IOverallAmountInputType {
  startDate: Date | undefined;
  endDate: Date | undefined;
}
