import { minioClient, MINIO_BUCKET } from './minioClient.js';

(async () => {
  try {
    const exists: boolean = await minioClient.bucketExists(MINIO_BUCKET);
    if (exists) {
      console.log(`Bucket "${MINIO_BUCKET}" already exists.`);
    } else {
      await minioClient.makeBucket(MINIO_BUCKET);
      console.log(`Bucket "${MINIO_BUCKET}" has been created.`);
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('MinIO error:', error.message);
    } else {
      console.error('Unknown error:', error);
    }
  }
})();
