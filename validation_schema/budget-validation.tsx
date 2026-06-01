import z from "zod";

export const budgetValidationSchema = z.object({
  id: z.uuid().optional(),
  userId: z.uuid({ message: "UserId is required" }),
  category: z.string({ message: "Category is required" }),
  amount: z.coerce.number({ message: "Amount is required" }),
  period: z.enum(["WEEKLY", "MONTHLY", "YEARLY"]).default("MONTHLY"),
  status: z.enum(["ON_TRACK", "WARNING", "EXCEEDED"]).default("ON_TRACK").optional(),
  alert: z.string({ message: "Alert is required" }),
  notes: z.string({ message: "Notes is required" }),
});

export type TBudgetValidationSchema = z.infer<typeof budgetValidationSchema>;
