import { Decimal } from "@prisma/client/runtime/client";
import { TTransactionType } from "./CommonTypes";

export interface ITransactionFilterType {
  page?: number;
  limit?: number;
  type?: TTransactionType;
  category?: string;
  startDate?: Date;
  endDate?: Date;
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
  amount: Decimal | String;
  message: string;
  category: string;
  transactionDate: Date;
  transactionType: TTransactionType;
}

export interface ITransactionsResponseType {
  id: string;
  amount: string;
  message: string;
  userId: string;
  category: string;
  transactionDate: Date;
  transactionType: string;
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
