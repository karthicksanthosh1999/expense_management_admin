import z from "zod";
export const goalValidationSchema = z.object({
  id: z.uuid().optional(),
  title: z.string({ message: "Title is required" }),
  goalAmount: z.coerce.number({ message: "Goal amount is required" }),
  goalStatus: z
    .enum(["ACTIVE", "INACTIVE", "COMPLETED","ALL"])
    .optional()
    .default("ACTIVE"),
  currentAmount: z.coerce.number({ message: "Current amount is required" }),
  userId: z.uuid({ message: "userId is required" }),
});

export type TGoalValidationSchema = z.infer<typeof goalValidationSchema>;


export const goalAmountValidationSchema = z.object({
  id: z.uuid().optional(),
  amount: z.coerce
    .number({ message: "Amount is required" })
    .min(1, "Amount must be greater than 0"),
  userId: z.string().uuid("Invalid userId"),
  goalId: z.string().uuid("Invalid goalId"),
});

export type TGoalAmountValidationSchema = z.infer<
  typeof goalAmountValidationSchema
>;
