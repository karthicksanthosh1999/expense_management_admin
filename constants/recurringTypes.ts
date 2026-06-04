import { Decimal } from "@prisma/client/runtime/client";
import { TTransactionType } from "./CommonTypes";
import { $Enums } from "@prisma/client";

export interface ICreateRecurringTransactionDTO {
  userId: string;
  amount: string;
  message: string;
  category: string;
  frequency: $Enums.Frequency;
  startDate: Date;
  nextRunDate: Date;
}

export interface IGetRecurringTransactionDTO {
    id: string;
    message: string;
    amount: Decimal;
    userId?: string;
    category: string;
    frequency: $Enums.Frequency;
    startDate: Date;
    nextRunDate: Date;
    createdAt: Date;
    updatedAt: Date;
    endDate: Date | null;
    isActive: boolean;
}