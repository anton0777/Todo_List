import {z} from "zod";

export const Task = z.object({
    id: z.number(),
    title: z.string(),
    description: z.string(),
    done: z.boolean().optional(),
    userId: z.number(),
    parentId: z.number().optional(),
    createdAt: z.iso.datetime()
});

export const CreateTask = z.object({
    title: z.string(),
    description: z.string(),
    done: z.boolean().optional(),
    userId: z.number(),
    parentId: z.number().optional()
});

export const UpdateTask = z.object({
    title: z.string().optional(),
    description: z.string().optional(),
    done: z.boolean().optional()
});