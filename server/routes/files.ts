import express from 'express';
import { PrismaClient } from '../generated/prisma/index.js';
import { FileRepository } from '../repositories/fileRepository.js';
import { FileService } from '../services/fileService.js';
import { FileController } from '../controllers/fileController.js';

const prismaClient = new PrismaClient();
const fileRepository = new FileRepository(prismaClient);
const fileService = new FileService(fileRepository);
const fileController = new FileController(fileService);

const router = express.Router();

router.post('/presign', fileController.presign.bind(fileController));

router.post('/attach', fileController.attach.bind(fileController));

router.get(
  '/by-task/:taskId',
  fileController.getFilesByTask.bind(fileController)
);

router.get('/:id/url', fileController.getDownloadUrl.bind(fileController));

router.delete('/:id', fileController.delete.bind(fileController));

router.post('/cleanup', fileController.cleanup.bind(fileController));

export default router;
