import { PrismaClient } from '@prisma/client';
import { RegisterData } from '../types/auth.js';

export class AuthRepository {
  constructor(private prisma: PrismaClient) {
    this.prisma = prisma;
  }

  async registerUser(
    parsedDate: RegisterData
  ): Promise<{ email: string; name: string }> {
    return this.prisma.user.create({
      data: parsedDate,
      select: {
        email: true,
        name: true,
      },
    });
  }

  async loginUser(email: string): Promise<{ email: string; name: string }> {
    return this.prisma.user.findUnique({
      where: { email },
      select: {
        email: true,
        name: true,
      },
    });
  }

  async hashedPassword(email: string): Promise<{ password: string }> {
    return this.prisma.user.findUnique({
      where: { email },
      select: {
        password: true,
      },
    });
  }

  async userId(email: string): Promise<{ id: number }> {
    return this.prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
      },
    });
  }
}
