import { CreateTask, UpdateTask } from '../validators/taskValidator.js';

export class TaskController {
  constructor(taskService) {
    this.taskService = taskService;
  }

  getTasks = async (req, res, next) => {
    try {
      const tasks = await this.taskService.getTasks(req.user);
      res.status(200).json(tasks);
    } catch (err) {
      next(err);
    }
  };

  getTask = async (req, res, next) => {
    try {
      const task = await this.taskService.getTask(req.user, req.params.id);
      res.status(200).json(task);
    } catch (err) {
      next(err);
    }
  };

  createTask = async (req, res, next) => {
    try {
      const parsedData = await CreateTask.parseAsync(req.body);
      const newTask = await this.taskService.createTask(req.user, parsedData);
      res.status(201).json(newTask);
    } catch (err) {
      next(err);
    }
  };

  updateTask = async (req, res, next) => {
    try {
      const parsedData = await UpdateTask.parseAsync(req.body);
      const updatedTask = await this.taskService.updateTask(
        req.user,
        req.params.id,
        parsedData
      );
      res.status(200).json(updatedTask);
    } catch (err) {
      next(err);
    }
  };

  deleteTask = async (req, res, next) => {
    try {
      const taskId = parseInt(req.params.id);
      await this.taskService.deleteTask(req.user, taskId);
      res.status(204).end();
    } catch (err) {
      next(err);
    }
  };
}
