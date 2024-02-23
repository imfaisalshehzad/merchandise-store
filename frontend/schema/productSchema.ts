import { z } from "zod";

export const productCreateFormSchema = z.object({
    name: z.string().min(1, 'Please enter a title').max(100),
    price: z.number().min(1, 'Please enter a price'),
}).required();

export const productUpdateFormSchema = z.object({
    name: z.string().min(1, 'Please enter a title').max(100).optional(),
    price: z.number().min(1, 'Please enter a price').optional(),
}).required();

