import { CreateUser, UpdateUser } from '../validators/userValidator.js';
import { UserService } from '../services/userService.js';
import { Request, Response, NextFunction } from 'express';

export class UserController {
  constructor(private userService: UserService) {}

  async getUsers(
    _req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const users = await this.userService.getUsers();
      res.status(200).json(users);
    } catch (err) {
      next(err);
    }
  }

  async getUser(
    req: Request & { user: number },
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const user = await this.userService.getUser(req.user);
      res.status(200).json(user);
    } catch (err) {
      next(err);
    }
  }

  async createUser(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const userData = await CreateUser.parseAsync(req.body);
      const user = await this.userService.createUser(userData);
      res.status(201).json(user);
    } catch (err) {
      next(err);
    }
  }

  async updateUser(
    req: Request & { user: number },
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const userData = await UpdateUser.parseAsync(req.body);
      const user = await this.userService.updateUser(req.user, userData);
      res.status(200).json(user);
    } catch (err) {
      next(err);
    }
  }

  async deleteUser(
    req: Request & { user: number },
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      await this.userService.deleteUser(req.user);
      res.status(204).end();
    } catch (err) {
      next(err);
    }
  }
}
