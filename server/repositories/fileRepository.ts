import { PrismaClient } from '@prisma/client';
import { CreateFilePayload, UpdateFilePayload } from '../types/file.ts';

export class FileRepository {
  constructor(private prismaClient: PrismaClient) {}

  createFile(data: CreateFilePayload) {
    return this.prismaClient.file.create({ data });
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

  updateFile = (id: number, data: UpdateFilePayload) =>
    this.prismaClient.file.update({ where: { id }, data });

  deleteFileById(id: number) {
    return this.prismaClient.file.delete({ where: { id } });
  }
}
