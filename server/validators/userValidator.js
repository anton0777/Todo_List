import {z} from "zod";

export const User = z.object({
    id: z.number(),
    name: z.string().optional(),
    email: z.email(),
    password: z.string()
});

export const CreateUser = z.object({
    name: z.string().optional(),
    email: z.email(),
    password: z.string()
});

export const UpdateUser = z.object({
    name: z.string().optional(),
})