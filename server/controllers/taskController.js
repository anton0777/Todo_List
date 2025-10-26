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
      const newTask = await this.taskService.createTask(req.user, req.body);
      res.status(201).json(newTask);
    } catch (err) {
      next(err);
    }
  };

  updateTask = async (req, res, next) => {
    try {
      const updatedTask = await this.taskService.updateTask(
        req.user,
        req.params.id,
        req.body
      );
      res.status(200).json(updatedTask);
    } catch (err) {
      next(err);
    }
  };

  deleteTask = async (req, res, next) => {
    try {
      await this.taskService.deleteTask(req.user, req.params.id);
      res.status(204).end();
    } catch (err) {
      next(err);
    }
  };
}
