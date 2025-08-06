import { CreateTask, UpdateTask } from '../validators/taskValidator.js';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '../generated/prisma/index.js';
const prisma = new PrismaClient();

export class TaskService {
  constructor(taskRepository) {
    this.taskRepository = taskRepository;
  }

  getTasks = async (headers) => {
    const userId = getUserIdFromToken(headers.authorization.split(' ')[1]);
    return await this.taskRepository.getTasks(userId);
  };

  getTask = async (headers, taskId) => {
    const userId = getUserIdFromToken(headers.authorization.split(' ')[1]);
    taskId = parseInt(taskId);
    return await this.taskRepository.getTask(userId, taskId);
  };

  createTask = async (headers, taskData) => {
    const userId = getUserIdFromToken(headers.authorization.split(' ')[1]);
    const parsedData = await CreateTask.parseAsync(taskData);
    return await this.taskRepository.createTask(userId, parsedData);
  };

  updateTask = async (headers, taskId, taskData) => {
    const userId = getUserIdFromToken(headers.authorization.split(' ')[1]);
    const parsedData = await UpdateTask.parseAsync(taskData);
    taskId = parseInt(taskId);
    return await this.taskRepository.updateTask(userId, taskId, parsedData);
  };

  deleteTask = async (headers, taskId) => {
    const userId = getUserIdFromToken(headers.authorization.split(' ')[1]);
    taskId = parseInt(taskId);
    await deleteTaskWithSubtasks(userId, taskId);
  };
}

async function deleteTaskWithSubtasks(userId, taskId) {
  const task = await prisma.task.findUnique({
    where: {
      id: taskId,
      userId: userId,
    },
    include: { subtasks: true },
  });

  if (!task) {
    throw new Error(`Task with id ${taskId} not found`);
  }

  await Promise.all(
    task.subtasks.map((subtask) => deleteTaskWithSubtasks(userId, subtask.id))
  );

  await prisma.task.delete({ where: { id: taskId } });
}

function getUserIdFromToken(token) {
  if (!token) {
    throw new Error('Unauthorized');
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  if (!decoded || !decoded.id) {
    throw new Error('Invalid token');
  }

  return parseInt(decoded.id);
}
