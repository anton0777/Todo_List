import { z } from 'zod';

export const AllowedMime = z.enum([
  'image/jpeg',
  'image/png',
  'application/pdf',
]);

export const PresignReq = z.object({
  filename: z.string().min(1).max(255),
  mimetype: AllowedMime,
  size: z
    .number()
    .int()
    .positive()
    .max(Number(process.env.FILE_MAX_BYTES ?? 5 * 1024 * 1024)),
});

export const AttachReq = z.object({
  taskId: z.number().int().positive(),
  objectKey: z.string().min(1),
  filename: z.string().min(1).max(255),
  mimetype: AllowedMime,
  size: z
    .number()
    .int()
    .positive()
    .max(Number(process.env.FILE_MAX_BYTES ?? 5 * 1024 * 1024)),
});

export type TPresignReq = z.infer<typeof PresignReq>;
export type TAttachReq = z.infer<typeof AttachReq>;
