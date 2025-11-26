import { CreateTask, UpdateTask } from '../validators/taskValidator.js';
import { TaskService } from '../services/taskService.js';
import { Request, Response, NextFunction } from 'express';

export class TaskController {
  constructor(private taskService: TaskService) {}

  async getTasks(
    req: Request & { user: number },
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const tasks = await this.taskService.getTasks(req.user);
      res.status(200).json(tasks);
    } catch (err) {
      next(err);
    }
  }

  async getTask(
    req: Request & { user: number },
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const taskId = parseInt(req.params.id);
      const task = await this.taskService.getTask(req.user, taskId);
      res.status(200).json(task);
    } catch (err) {
      next(err);
    }
  }

  async createTask(
    req: Request & { user: number },
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const taskData = await CreateTask.parseAsync(req.body);
      const newTask = await this.taskService.createTask(req.user, taskData);
      res.status(201).json(newTask);
    } catch (err) {
      next(err);
    }
  }

  async updateTask(
    req: Request & { user: number },
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const taskId = parseInt(req.params.id);
      const taskData = await UpdateTask.parseAsync(req.body);
      const updatedTask = await this.taskService.updateTask(
        req.user,
        taskId,
        taskData
      );
      res.status(200).json(updatedTask);
    } catch (err) {
      next(err);
    }
  }

  async deleteTask(
    req: Request & { user: number },
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const taskId = parseInt(req.params.id);
      await this.taskService.deleteTask(req.user, taskId);
      res.status(204).end();
    } catch (err) {
      next(err);
    }
  }
}
