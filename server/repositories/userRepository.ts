import { PrismaClient } from '@prisma/client';
import { UserResponse, CreateUser, UpdateUser } from '../types/user.ts';

export class UserRepository {
  constructor(private prisma: PrismaClient) {}

  async getUsers(): Promise<Array<UserResponse>> {
    return this.prisma.user.findMany({
      select: {
        email: true,
        name: true,
      },
    });
  }

  async getUser(id: number): Promise<UserResponse> {
    return this.prisma.user.findUnique({
      where: { id },
      select: {
        email: true,
        name: true,
      },
    });
  }

  async createUser(userData: CreateUser): Promise<UserResponse> {
    return this.prisma.user.create({
      data: userData,
      select: {
        email: true,
        name: true,
      },
    });
  }

  async updateUser(id: number, userData: UpdateUser): Promise<UserResponse> {
    return this.prisma.user.update({
      where: { id },
      data: userData,
      select: {
        email: true,
        name: true,
      },
    });
  }

  async deleteUser(id: number): Promise<void> {
    return this.prisma.$transaction([
      this.prisma.task.deleteMany({
        where: { userId: id },
      }),
      this.prisma.user.delete({
        where: { id },
      }),
    ]);
  }
}
