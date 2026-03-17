import z from "zod";

export const transactionValidationSchema = z.object({
  amount: z.number({ message: "Amount is required" }),
  description: z.string({ message: "Description is required" }),
  expenseType: z.string({ message: "Expense type is required" }),
  userId: z.string({ message: "UserId is required" }),
  categoryId: z.string({ message: "CategoryId type is required" }),
});

export type TTransactionValidationSchemaType = z.infer<
  typeof transactionValidationSchema
>;
export const transactionFilterValidationSchema = z.object({
  search: z.string().optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  expenseType: z.string().optional(),
  page: z.string().optional(),
  limit: z.string().optional(),
});

export type TTransactionFilterValidationSchemaType = z.infer<
  typeof transactionFilterValidationSchema
>;
