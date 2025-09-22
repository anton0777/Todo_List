import { z } from 'zod';

export const Task = z.object({
  id: z.number(),
  title: z
    .string()
    .min(1)
    .max(50)
    .refine((val) => val.trim().length > 0, {
      message: 'Title cannot be empty or just spaces',
    }),
  description: z.string(),
  done: z.boolean().optional(),
  userId: z.number(),
  parentId: z.number().optional(),
  createdAt: z.iso.datetime(),
});

export const CreateTask = z.object({
  title: z
    .string()
    .min(1)
    .max(50)
    .refine((val) => val.trim().length > 0, {
      message: 'Title cannot be empty or just spaces',
    }),
  description: z.string(),
  done: z.boolean().optional(),
  parentId: z.number().optional(),
});

export const UpdateTask = z.object({
  title: z
    .string()
    .min(1)
    .max(50)
    .refine((val) => val.trim().length > 0, {
      message: 'Title cannot be empty or just spaces',
    })
    .optional(),
  description: z.string().optional(),
  done: z.boolean().optional(),
});
