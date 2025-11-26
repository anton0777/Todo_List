import { Request, Response, NextFunction } from 'express';
import { FileService } from '../services/fileService.js';
import { PresignReq, AttachReq } from '../validators/fileValidator.js';

export class FileController {
  constructor(private fileService: FileService) {}

  async presign(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const parsed = await PresignReq.parseAsync(req.body);
      const data = await this.fileService.presignedUpload(parsed);
      res.status(200).json(data);
    } catch (err) {
      next(err);
    }
  }

  async attach(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const parsed = await AttachReq.parseAsync(req.body);
      const data = await this.fileService.attachToTask(parsed);
      res.status(201).json(data);
    } catch (err) {
      next(err);
    }
  }

  async getFilesByTask(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const taskId = parseInt(req.params.taskId);
      const data = await this.fileService.getFilesByTask(taskId);
      res.status(200).json(data);
    } catch (err) {
      next(err);
    }
  }

  async getDownloadUrl(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      const data = await this.fileService.getDownloadUrl(id);
      res.status(200).json(data);
    } catch (err) {
      next(err);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const id = parseInt(req.params.id);
      await this.fileService.deleteFile(id);
      res.status(204).end();
    } catch (err) {
      next(err);
    }
  }

  async cleanup(
    _req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const data = await this.fileService.cleanupTmp();
      res.status(200).json(data);
    } catch (err) {
      next(err);
    }
  }
}
