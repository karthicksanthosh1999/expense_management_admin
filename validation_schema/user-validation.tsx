import z from "zod";

export const userLoginValidationSchema = z.object({
  email: z.email({ message: "Email is required" }),
  password: z.string({ message: "Password is required" }),
});

export type TUserLoginValidationSchemaType = z.infer<
  typeof userLoginValidationSchema
>;
