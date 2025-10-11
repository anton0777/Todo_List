import { PrismaClient } from '@prisma/client';

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

  updateFile = (
    id: number,
    data: Partial<{ status: 'processing' | 'ready' | 'failed' }>
  ) => this.prismaClient.file.update({ where: { id }, data });

  deleteFileById(id: number) {
    return this.prismaClient.file.delete({ where: { id } });
  }
}
