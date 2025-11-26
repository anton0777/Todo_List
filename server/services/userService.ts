import bcrypt from 'bcrypt';
import { UserRepository } from '../repositories/userRepository.js';
import { TaskService } from './taskService.js';
import { UserResponse, UpdateUser, CreateUser } from '../types/user.js';

export class UserService {
  constructor(
    private userRepository: UserRepository,
    private taskService: TaskService
  ) {}

  async getUsers(): Promise<Array<UserResponse>> {
    return this.userRepository.getUsers();
  }

  async getUser(userId: number): Promise<UserResponse> {
    return this.userRepository.getUser(userId);
  }

  async createUser(userData: CreateUser): Promise<UserResponse> {
    userData.password = await bcrypt.hash(userData.password, 6);
    return this.userRepository.createUser(userData);
  }

  async updateUser(
    userId: number,
    userData: UpdateUser
  ): Promise<UserResponse> {
    if (userData.password) {
      userData.password = await bcrypt.hash(userData.password, 6);
    }
    return this.userRepository.updateUser(userId, userData);
  }

  async deleteUser(userId: number): Promise<void> {
    const tasks = await this.taskService.getTasks(userId);
    await Promise.all(
      tasks.map((task) =>
        this.taskService.deleteTaskWithSubtasks(userId, task.id)
      )
    );
    return this.userRepository.deleteUser(userId);
  }
}
