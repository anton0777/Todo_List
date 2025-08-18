import { Request, Response, NextFunction } from 'express';
import { FileService } from '../services/fileService.js';
import { PresignReq, AttachReq } from '../validators/fileValidator.js';

export class FileController {
  constructor(private fileService: FileService) {}

  presign = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const parsed = await PresignReq.parseAsync(req.body);
      const data = await this.fileService.presignedUpload(parsed);
      res.status(200).json(data);
    } catch (err) {
      next(err);
    }
  };

  attach = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const parsed = await AttachReq.parseAsync(req.body);
      const data = await this.fileService.attachToTask(parsed);
      res.status(201).json(data);
    } catch (err) {
      next(err);
    }
  };

  getFilesByTask = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const taskId = parseInt(req.params.taskId);
      const data = await this.fileService.getFilesByTask(taskId);
      res.status(200).json(data);
    } catch (err) {
      next(err);
    }
  };

  getDownloadUrl = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = parseInt(req.params.id);
      const data = await this.fileService.getDownloadUrl(id);
      res.status(200).json(data);
    } catch (err) {
      next(err);
    }
  };

  delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = parseInt(req.params.id);
      await this.fileService.deleteFile(id);
      res.status(204).end();
    } catch (err) {
      next(err);
    }
  };

  cleanup = async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await this.fileService.cleanupTmp();
      res.status(200).json(data);
    } catch (err) {
      next(err);
    }
  };
}
