import { z } from 'zod';

export const Register = z.object({
  email: z.email(),
  password: z.string().min(8).max(16),
  name: z.string().min(1).max(50).optional(),
});

export const Login = z.object({
  email: z.email(),
  password: z.string().min(8).max(16),
});
