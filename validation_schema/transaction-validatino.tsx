import z from "zod";

export const transactionValidationSchema = z.object({
  id: z.uuid().optional(),
  amount: z.string({ message: "Amount is required" }),
  message: z.string({ message: "Description is required" }),
  transactionType: z.enum(["INCOME", "EXPENSE"], {
    message: "Expense type is required",
  }),
  userId: z.uuid({ message: "UserId is required" }),
  category: z.string({ message: "Category type is required" }),
  transactionDate: z.string().transform((val) => new Date(val)),
});

export type TTransactionValidationSchemaType = z.infer<
  typeof transactionValidationSchema
>;
export const transactionFilterValidationSchema = z.object({
  search: z.string().optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  transactionType: z.enum(["INCOME", "EXPENSE"]).optional(),
  page: z.string().optional(),
  limit: z.string().optional(),
});

export type TTransactionFilterValidationSchemaType = z.infer<
  typeof transactionFilterValidationSchema
>;

export const recurringTransactionValidationSchema = z.object({
  id: z.uuid().optional(),
  userId: z.uuid({ message: "UserId is required" }),
  amount: z.string({ message: "Amount is required" }),
  message: z.string({ message: "Description is required" }),
  category: z.string({ message: "Category type is required" }),
  frequency: z.enum(["DAILY", "WEEKLY", "MONTHLY", "YEARLY"]),
  startDate: z.string({ message: "startDate is req" }),

  nextRunDate: z.string().transform((val) => new Date(val)),
});
export type TRecurringTransactionValidationSchemaType = z.infer<
  typeof recurringTransactionValidationSchema
>;
