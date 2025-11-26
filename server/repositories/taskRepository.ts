import { PrismaClient } from '@prisma/client';
import { TaskResponse, CreateTask, UpdateTask } from '../types/task.ts';

export class TaskRepository {
  constructor(private prisma: PrismaClient) {}

  async getTasks(userId: number): Promise<Array<TaskResponse>> {
    return this.prisma.task.findMany({
      where: {
        userId: userId,
        parentId: null,
      },
      select: {
        id: true,
        title: true,
        description: true,
        done: true,
        parentId: true,
        createdAt: true,
        subtasks: true,
      },
    });
  }

  async getTask(userId: number, taskId: number): Promise<TaskResponse> {
    return this.prisma.task.findUnique({
      where: {
        id: taskId,
        userId: userId,
      },
      select: {
        id: true,
        title: true,
        description: true,
        done: true,
        parentId: true,
        createdAt: true,
        subtasks: true,
      },
    });
  }

  async createTask(
    userId: number,
    taskData: CreateTask
  ): Promise<TaskResponse> {
    return this.prisma.task.create({
      data: {
        ...taskData,
        userId: userId,
      },
      select: {
        id: true,
        title: true,
        description: true,
        done: true,
        parentId: true,
        createdAt: true,
        subtasks: true,
      },
    });
  }

  async updateTask(
    userId: number,
    taskId: number,
    taskData: UpdateTask
  ): Promise<TaskResponse> {
    return this.prisma.task.update({
      where: {
        id: taskId,
        userId: userId,
      },
      data: taskData,
    });
  }

  async deleteTask(userId: number, taskId: number): Promise<void> {
    return this.prisma.$transaction([
      this.prisma.file.deleteMany({
        where: { taskId: taskId },
      }),
      this.prisma.task.delete({
        where: {
          id: taskId,
          userId: userId,
        },
      }),
    ]);
  }
}
