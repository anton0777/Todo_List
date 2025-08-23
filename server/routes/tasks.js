import express from 'express';
import { TaskController } from '../controllers/taskController.js';
import { TaskService } from '../services/taskService.js';
import { TaskRepository } from '../repositories/taskRepository.js';
import { PrismaClient } from '../generated/prisma/index.js';
import { FileRepository } from '../repositories/fileRepository.js';
import { FileService } from '../services/fileService.js';

const prisma = new PrismaClient();
const router = express.Router();

const taskRepository = new TaskRepository(prisma);
const fileRepository = new FileRepository(prisma);
const fileService = new FileService(fileRepository);
const taskService = new TaskService(taskRepository, fileService);
const taskController = new TaskController(taskService);

router.get('/', taskController.getTasks);

router.get('/:id', taskController.getTask);

router.post('/', taskController.createTask);

router.put('/:id', taskController.updateTask);

router.delete('/:id', taskController.deleteTask);

export default router;
