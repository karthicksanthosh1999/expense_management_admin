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
