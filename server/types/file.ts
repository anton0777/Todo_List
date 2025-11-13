export type MimeType = 'image_jpeg' | 'image_png' | 'application_pdf';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Status = {
  processing: 'processing',
  ready: 'ready',
  failed: 'failed',
} as const;

export type TypeStatus = (typeof Status)[keyof typeof Status];

export type CreateFilePayload = {
  filename: string;
  mimetype: MimeType;
  size: number;
  path: string;
  taskId: number;
  status?: TypeStatus;
};

export type UpdateFilePayload = Pick<CreateFilePayload, 'status'>;

export type File = {
  id: number;
  filename: string;
  mimetype: 'image_jpeg' | 'image_png' | 'application_pdf';
  size: number;
  path: string;
  status: 'processing' | 'ready' | 'failed';
  taskId: number;
  uploadedAt: string;
};
