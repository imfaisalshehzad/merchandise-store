import { z } from "zod";

export const signupFormSchema = z.object({
    email: z.string().email('Please enter a valid email'),
    password: z.string().min(8, 'Password must be at least 8 characters long'),
}).required();


export const loginFormSchema = z.object({
   email: z.string().email('Please enter a valid email'),
   password: z.string(),
}).required();