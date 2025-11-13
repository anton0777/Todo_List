import { TaskRepository } from '../repositories/taskRepository.js';
import { FileService } from './fileService.js';
import { TaskResponse, CreateTask, UpdateTask } from '../types/task.ts';

export class TaskService {
  constructor(
    private taskRepository: TaskRepository,
    private fileService: FileService
  ) {}

  async getTasks(userId: number): Promise<Array<TaskResponse>> {
    return this.taskRepository.getTasks(userId);
  }

  async getTask(userId: number, taskId: number): Promise<TaskResponse> {
    return this.taskRepository.getTask(userId, taskId);
  }

  async createTask(
    userId: number,
    taskData: CreateTask
  ): Promise<TaskResponse> {
    return this.taskRepository.createTask(userId, taskData);
  }

  async updateTask(
    userId: number,
    taskId: number,
    taskData: UpdateTask
  ): Promise<TaskResponse> {
    return this.taskRepository.updateTask(userId, taskId, taskData);
  }

  async deleteTask(userId: number, taskId: number): Promise<void> {
    await this.deleteTaskWithSubtasks(userId, taskId);
  }

  async deleteTaskWithSubtasks(userId: number, taskId: number): Promise<void> {
    const task = await this.taskRepository.getTask(userId, taskId);

    if (!task) {
      throw new Error(`Task with id ${taskId} not found`);
    }

    if (task.subtasks && task.subtasks.length > 0) {
      await Promise.all(
        task.subtasks.map((subtask) =>
          this.deleteTaskWithSubtasks(userId, subtask.id)
        )
      );
    }

    await this.fileService.deleteFilesByTask(taskId);
    await this.taskRepository.deleteTask(userId, taskId);
  }
}
