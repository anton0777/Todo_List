import { AuthService } from '../services/authService.ts';
import { Request, Response, NextFunction } from 'express';
import { Register, Login } from '../validators/authValidator.ts';

export class AuthController {
  constructor(private authService: AuthService) {}

  async registerUser(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const data = await Register.parseAsync(req.body);
      const user = await this.authService.registerUser(data);

      res.status(201).json({
        email: user.email,
        name: user.name,
        token: user.token,
      });
    } catch (err) {
      next(err);
    }
  }

  async loginUser(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const data = await Login.parseAsync(req.body);
      const user = await this.authService.loginUser(data);

      res.status(200).json({
        email: user.email,
        name: user.name,
        token: user.token,
      });
    } catch (err) {
      next(err);
    }
  }
}
