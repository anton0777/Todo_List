import { CreateTask, UpdateTask } from '../validators/taskValidator.js';

export class TaskService {
  constructor(taskRepository, fileService) {
    this.taskRepository = taskRepository;
    this.fileService = fileService;
  }

  getTasks = async (userId) => {
    return this.taskRepository.getTasks(userId);
  };

  getTask = async (userId, taskId) => {
    taskId = parseInt(taskId);
    return this.taskRepository.getTask(userId, taskId);
  };

  createTask = async (userId, taskData) => {
    const parsedData = await CreateTask.parseAsync(taskData);
    return this.taskRepository.createTask(userId, parsedData);
  };

  updateTask = async (userId, taskId, taskData) => {
    const parsedData = await UpdateTask.parseAsync(taskData);
    taskId = parseInt(taskId);
    return this.taskRepository.updateTask(userId, taskId, parsedData);
  };

  deleteTask = async (userId, taskId) => {
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
}
