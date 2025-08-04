import express from "express";
import { AuthController } from "../controllers/authController.js";
import { AuthService } from "../services/authService.js";
import { AuthRepository } from "../repositories/authRepository.js";
import { PrismaClient } from "../generated/prisma/index.js";

const prisma = new PrismaClient();
const router = express.Router();

const authRepository = new AuthRepository(prisma);
const authService = new AuthService(authRepository);
const authController = new AuthController(authService);

router.post('/login', authController.loginUser)

router.post('/register', authController.registerUser)

export default router;