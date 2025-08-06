import { z } from 'zod';

export const User = z.object({
  id: z.number(),
  name: z
    .string()
    .min(1)
    .max(50)
    .refine((val) => val.trim().length > 0, {
      message: 'Title cannot be empty or just spaces',
    })
    .optional(),
  email: z.email(),
  password: z.string().min(8).max(16),
});

export const CreateUser = z.object({
  name: z
    .string()
    .min(1)
    .max(50)
    .refine((val) => val.trim().length > 0, {
      message: 'Title cannot be empty or just spaces',
    })
    .optional(),
  email: z.email(),
  password: z.string().min(8).max(16),
});

export const UpdateUser = z.object({
  name: z
    .string()
    .min(1)
    .max(50)
    .refine((val) => val.trim().length > 0, {
      message: 'Title cannot be empty or just spaces',
    })
    .optional(),
  password: z.string().min(8).max(16).optional(),
});
