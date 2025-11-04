import express from 'express';
import { PrismaClient } from '../generated/prisma/index.js';
import { FileRepository } from '../repositories/fileRepository.js';
import { FileService } from '../services/fileService.js';
import { FileController } from '../controllers/fileController.js';
import { IWSService } from '../ws/IWSService.js';

const prismaClient = new PrismaClient();
const fileRepository = new FileRepository(prismaClient);
const fileService = new FileService(fileRepository, {} as IWSService);
const fileController = new FileController(fileService);

const router = express.Router();

router.post('/presign', fileController.presign);

router.post('/attach', fileController.attach);

router.get('/by-task/:taskId', fileController.getFilesByTask);

router.get('/:id/url', fileController.getDownloadUrl);

router.delete('/:id', fileController.delete);

router.post('/cleanup', fileController.cleanup);

export default router;
