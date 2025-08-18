import { PrismaClient } from '../generated/prisma/index.js';

export class FileRepository {
  constructor(private prismaClient: PrismaClient) {}

  createFile(params: {
    filename: string;
    mimetype: 'image_jpeg' | 'image_png' | 'application_pdf';
    size: number;
    path: string;
    taskId: number;
  }) {
    return this.prismaClient.file.create({ data: params });
  }

  findFileById(id: number) {
    return this.prismaClient.file.findUnique({ where: { id } });
  }

  getFilesByTask(taskId: number) {
    return this.prismaClient.file.findMany({
      where: { taskId },
      orderBy: {
        uploadedAt: 'desc',
      },
    });
  }

  deleteFileById(id: number) {
    return this.prismaClient.file.delete({ where: { id } });
  }
}
