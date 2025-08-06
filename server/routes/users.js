import express from 'express';
import { UserController } from '../controllers/userController.js';
import { UserService } from '../services/userService.js';
import { UserRepository } from '../repositories/userRepository.js';
import { PrismaClient } from '../generated/prisma/index.js';

const prisma = new PrismaClient();
const router = express.Router();

const userRepository = new UserRepository(prisma);
const userService = new UserService(userRepository);
const userController = new UserController(userService);

router.get('/', userController.getUser);

// router.get('/:id', userController.getUser)

router.post('/', userController.createUser);

router.put('/', userController.updateUser);

router.delete('/', userController.deleteUser);

export default router;
