import z from "zod";
export const goalValidationSchema = z.object({
  title: z.string({ message: "Title is required" }),
  goalAmount: z.string({ message: "Goal amount is required" }),
  currentAmount: z.string({ message: "Current amount is required" }),
  userId: z.uuid({ message: "userId is required" }),
});

export type TGoalValidationSchema = z.infer<typeof goalValidationSchema>;
