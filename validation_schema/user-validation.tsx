import z from "zod";

export const userLoginValidationSchema = z.object({
  email: z.email({ message: "Email is required" }),
  password: z.string({ message: "Password is required" }),
});

export type TUserLoginValidationSchemaType = z.infer<
  typeof userLoginValidationSchema
>;

export const userValidationSchema = z.object({
  id: z.string().optional(),
  name: z.string({ message: "Name is required" }),
  email: z.email({ message: "Email is required" }),
  mobile: z.string({ message: "Mobile is required" }),
  password: z.string().optional(),
});

export type TUserValidationSchema = z.infer<typeof userValidationSchema>;

export const userRegisterValidationSchema = z
  .object({
    password: z
      .string()
      .min(4, { message: "Password must be at least 6 characters" }),

    confirmPassword: z.string({
      message: "Confirm password is required",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"], // error will show on confirmPassword field
  });

export type TUserRegisterValidationSchemaType = z.infer<
  typeof userRegisterValidationSchema
>;
