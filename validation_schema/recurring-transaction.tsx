import z from "zod";

export const recurringTransactionValidationSchema = z.object({
  id: z.uuid().optional(),
  userId: z.uuid({ error: "UserId is required" }),
  amount: z.string({ error: "Amount is required" }),
  message: z.string({ error: "Description is required" }),
  category: z.string({ error: "Category type is required" }),
  frequency: z.enum(["DAILY", "WEEKLY", "MONTHLY", "YEARLY"]),
  startDate: z.string({ error: "startDate is req" }),
  nextRunDate: z.string().transform((val) => new Date(val)),
});
export type TRecurringTransactionValidationSchemaType = z.infer<
  typeof recurringTransactionValidationSchema
>;
