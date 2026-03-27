import z from "zod";

export const transactionValidationSchema = z.object({
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
  transactionType: z.string().optional(),
  page: z.string().optional(),
  limit: z.string().optional(),
});

export type TTransactionFilterValidationSchemaType = z.infer<
  typeof transactionFilterValidationSchema
>;
