import z from "zod";
export const categoryValidationSchema = z.object({
    title: z.string({ message: "Title is required" }),
    color: z.string({ message: "Color is required" }),
    userId: z.uuid({ message: "userId is required" }),
});

export type TCategoryValidationSchema = z.infer<
    typeof categoryValidationSchema
>;
