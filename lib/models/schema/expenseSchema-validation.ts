import {z} from 'zod';

export const aiCategoryScheme = z.object(
    {
        category : z.string({ error: "Category is required"}),
        reason : z.string({ error: "Reason is required"})
    }
)

export type IAiCategorySchema = z.infer<typeof aiCategoryScheme>