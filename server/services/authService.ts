import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { AuthRepository } from '../repositories/authRepository.js';
import { AuthResponse, RegisterData, LoginData } from '../types/auth.ts';

export class AuthService {
  constructor(private authRepository: AuthRepository) {}

  async registerUser(data: RegisterData): Promise<AuthResponse> {
    data.password = await bcrypt.hash(data.password, 6);

    const user: { email: string; name: string; token?: string } =
      await this.authRepository.registerUser(data);

    user.token = await this.generateToken(user);

    return user;
  }

  async loginUser(loginData: LoginData): Promise<AuthResponse> {
    const user: AuthResponse = await this.authRepository.loginUser(
      loginData.email
    );

    if (!user) {
      throw new Error('Invalid email or password');
    }

    const hashedPassword = await this.authRepository.hashedPassword(
      loginData.email
    );

    const isPasswordValid = await bcrypt.compare(
      loginData.password,
      hashedPassword.password
    );

    if (!isPasswordValid) {
      throw new Error('Invalid email or password');
    }

    user.token = await this.generateToken(user);

    return user;
  }

  async generateToken(user: AuthResponse): Promise<string> {
    const { id: userId } = await this.authRepository.userId(user.email);

    return jwt.sign({ id: userId }, process.env.JWT_SECRET!, {
      expiresIn: '1h',
    });
  }
}
