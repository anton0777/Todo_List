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

export const File = z.object({
  id: z.number(),
  filename: z.string(),
  mimetype: z.enum(['image_jpeg', 'image_png', 'application_pdf']),
  size: z.number().nonnegative(),
  path: z.string(),
  status: z.enum(['processing', 'ready', 'failed']),
  taskId: z.number(),
  uploadedAt: z.string(),
});

export type TFile = z.infer<typeof File>;
export type TPresignReq = z.infer<typeof PresignReq>;
export type TAttachReq = z.infer<typeof AttachReq>;
