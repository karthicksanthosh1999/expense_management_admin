import { Currency } from "@prisma/client";
import z from "zod";

export const settingValidationSchema = z.object({
  id: z.uuid().optional(),
  userId: z.uuid({ message: "UserId is required" }),
  currency: z.nativeEnum(Currency).default(Currency.INR),
  enable_monthly_transaction_report: z.boolean({ message: "Enable Monthly Transaction Report is required" }),
  notes: z.string({ message: "Notes is required" }),
});

export type TSettingValidationSchema = z.infer<typeof settingValidationSchema>;
