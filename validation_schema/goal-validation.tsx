import { EGoalStatus } from "@/constants/goalTypes";
import z from "zod";
export const goalValidationSchema = z.object({
  title: z.string({ message: "Title is required" }),
  goalAmount: z.coerce.number({ message: "Goal amount is required" }),
  goalStatus: z
    .enum(["ACTIVE", "INACTIVE", "COMPLETED"])
    .optional()
    .default("ACTIVE"),
  currentAmount: z.coerce.number({ message: "Current amount is required" }),
  userId: z.uuid({ message: "userId is required" }),
});

export type TGoalValidationSchema = z.infer<typeof goalValidationSchema>;
