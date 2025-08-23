import { Client } from 'minio';

export const minioClient = new Client({
  endPoint: process.env.MINIO_ENDPOINT || 'localhost',
  port: Number(process.env.MINIO_PORT ?? 9000),
  useSSL: (process.env.MINIO_USE_SSL ?? 'false') === 'true',
  accessKey: process.env.MINIO_ROOT_USER || 'user',
  secretKey: process.env.MINIO_ROOT_PASSWORD || 'password',
});

export const MINIO_BUCKET = process.env.MINIO_BUCKET || 'attachments-bucket';
