import { v4 as uuid } from 'uuid';
import path from 'node:path';
import { MINIO_BUCKET, minioClient } from '../minio/minioClient.js';
import { FileRepository } from '../repositories/fileRepository.js';
import { TAttachReq, TPresignReq } from '../validators/fileValidator.js';
import { BucketItem } from 'minio';

const MAX_BYTES = Number(process.env.FILE_MAX_BYTES ?? 5 * 1024 * 1024);

const mimeToEnum = (
  mimeType: 'image/jpeg' | 'image/png' | 'application/pdf'
): 'image_jpeg' | 'image_png' | 'application_pdf' => {
  switch (mimeType) {
    case 'image/jpeg':
      return 'image_jpeg';
    case 'image/png':
      return 'image_png';
    case 'application/pdf':
      return 'application_pdf';
  }
};

export class FileService {
  constructor(private fileRepository: FileRepository) {}

  async presignedUpload(data: TPresignReq) {
    const { filename, mimetype, size } = data;

    if (size > MAX_BYTES) {
      throw new Error('File too large');
    }

    if (!['image/jpeg', 'image/png', 'application/pdf'].includes(mimetype)) {
      throw new Error('Unsupported file type');
    }

    const ext = path.extname(filename) || '';
    const objectKey = `tmp/${uuid()}${ext}`;

    const uploadUrl = await minioClient.presignedPutObject(
      MINIO_BUCKET,
      objectKey,
      60 * 2
    );

    return { uploadUrl, objectKey };
  }

  async attachToTask(data: TAttachReq) {
    const { taskId, objectKey, filename, mimetype, size } = data;

    const stat = await minioClient
      .statObject(MINIO_BUCKET, objectKey)
      .catch(() => null);
    if (!stat) {
      throw new Error('Uploaded object not found');
    }

    if (stat.size > MAX_BYTES) {
      await minioClient.removeObject(MINIO_BUCKET, objectKey);
      throw new Error('File too large after upload');
    }

    const ext = path.extname(filename) || '';
    const finalKey = `tasks/${taskId}/${uuid()}${ext}`;

    await minioClient.copyObject(
      MINIO_BUCKET,
      finalKey,
      `/${MINIO_BUCKET}/${objectKey}`
    );
    await minioClient.removeObject(MINIO_BUCKET, objectKey);

    return this.fileRepository.createFile({
      filename,
      mimetype: mimeToEnum(mimetype),
      size,
      path: finalKey,
      taskId,
    });
  }

  async getDownloadUrl(fileId: number) {
    const file = await this.fileRepository.findFileById(fileId);
    if (!file) throw new Error('File not found');

    const url: string = await minioClient.presignedGetObject(
      MINIO_BUCKET,
      file.path,
      60 * 2
    );
    return { url };
  }

  getFilesByTask(taskId: number) {
    return this.fileRepository.getFilesByTask(taskId);
  }

  async deleteFile(fileId: number) {
    const file = await this.fileRepository.findFileById(fileId);
    if (!file) return;

    await this.fileRepository.deleteFileById(fileId);
    await minioClient.removeObject(MINIO_BUCKET, file.path);
  }

  async deleteFilesByTask(taskId: number) {
    const files = await this.fileRepository.getFilesByTask(taskId);
    if (files.length === 0) return;

    const deletePromises = files.map(async (file) => {
      try {
        await this.fileRepository.deleteFileById(file.id);
        return await minioClient.removeObject(MINIO_BUCKET, file.path);
      } catch (err) {
        return console.error(`Failed to delete file ${file.id}:`, err);
      }
    });

    await Promise.all(deletePromises);
  }

  async cleanupTmp() {
    const stream = minioClient.listObjectsV2(MINIO_BUCKET, 'tmp/', true);

    const toDelete: string[] = [];
    await new Promise<void>((resolve, reject) => {
      stream.on('data', (obj: Required<BucketItem>) => {
        toDelete.push(obj.name);
      });
      stream.on('end', resolve);
      stream.on('error', reject);
    });

    for (const key of toDelete) {
      try {
        await minioClient.removeObject(MINIO_BUCKET, key);
      } catch {
        console.error(`Failed to delete object ${key}`);
      }
    }

    return { deleted: toDelete.length };
  }
}
