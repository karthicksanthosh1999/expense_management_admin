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
  password: z.string().optional()
})

export type TUserValidationSchema = z.infer<typeof userValidationSchema>