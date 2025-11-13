import express from 'express';
import { UserController } from '../controllers/userController.js';
import { UserService } from '../services/userService.js';
import { UserRepository } from '../repositories/userRepository.js';
import { PrismaClient } from '../generated/prisma/index.js';
import { TaskService } from '../services/taskService.js';
import { TaskRepository } from '../repositories/taskRepository.js';
import { FileRepository } from '../repositories/fileRepository.js';
import { FileService } from '../services/fileService.js';

const prisma = new PrismaClient();
const router = express.Router();

const userRepository = new UserRepository(prisma);
const taskRepository = new TaskRepository(prisma);
const fileRepository = new FileRepository(prisma);
const fileService = new FileService(fileRepository);
const taskService = new TaskService(taskRepository, fileService);
const userService = new UserService(userRepository, taskService);
const userController = new UserController(userService);

router.get('/', userController.getUser.bind(userController));

// router.get('/:id', userController.getUser)

router.post('/', userController.createUser.bind(userController));

router.put('/', userController.updateUser.bind(userController));

router.delete('/', userController.deleteUser.bind(userController));

export default router;
