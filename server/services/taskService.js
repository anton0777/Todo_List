import { CreateTask, UpdateTask } from '../validators/taskValidator.js';
import jwt from 'jsonwebtoken';

export class TaskService {
  constructor(taskRepository, fileService) {
    this.taskRepository = taskRepository;
    this.fileService = fileService;
  }

  getTasks = async (headers) => {
    const userId = this.getUserIdFromToken(headers.authorization.split(' ')[1]);
    return this.taskRepository.getTasks(userId);
  };

  getTask = async (headers, taskId) => {
    const userId = this.getUserIdFromToken(headers.authorization.split(' ')[1]);
    taskId = parseInt(taskId);
    return this.taskRepository.getTask(userId, taskId);
  };

  createTask = async (headers, taskData) => {
    const userId = this.getUserIdFromToken(headers.authorization.split(' ')[1]);
    const parsedData = await CreateTask.parseAsync(taskData);
    return this.taskRepository.createTask(userId, parsedData);
  };

  updateTask = async (headers, taskId, taskData) => {
    const userId = this.getUserIdFromToken(headers.authorization.split(' ')[1]);
    const parsedData = await UpdateTask.parseAsync(taskData);
    taskId = parseInt(taskId);
    return this.taskRepository.updateTask(userId, taskId, parsedData);
  };

  deleteTask = async (headers, taskId) => {
    const userId = this.getUserIdFromToken(headers.authorization.split(' ')[1]);
    taskId = parseInt(taskId);
    await this.deleteTaskWithSubtasks(userId, taskId);
  };

  deleteTaskWithSubtasks = async (userId, taskId) => {
    const task = await this.taskRepository.getTask(userId, taskId);

    if (!task) {
      throw new Error(`Task with id ${taskId} not found`);
    }

    await Promise.all(
      task.subtasks.map((subtask) =>
        this.deleteTaskWithSubtasks(userId, subtask.id)
      )
    );

    await this.fileService.deleteFilesByTask(taskId);
    await this.taskRepository.deleteTask(userId, taskId);
  };

  getUserIdFromToken = (token) => {
    if (!token) {
      throw new Error('Unauthorized');
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded || !decoded.id) {
      throw new Error('Invalid token');
    }

    return parseInt(decoded.id);
  };
}
