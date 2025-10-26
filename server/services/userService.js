import bcrypt from 'bcrypt';
import { UpdateUser } from '../validators/userValidator.js';

export class UserService {
  constructor(userRepository, taskService) {
    this.userRepository = userRepository;
    this.taskService = taskService;
  }

  getUsers = async () => {
    return this.userRepository.getUsers();
  };

  getUser = async (userId) => {
    return this.userRepository.getUser(userId);
  };

  createUser = async (userData) => {
    return this.userRepository.createUser(userData);
  };

  updateUser = async (userId, userData) => {
    const parsedData = await UpdateUser.parseAsync(userData);
    if (parsedData.password) {
      parsedData.password = await bcrypt.hash(parsedData.password, 6);
    }
    return this.userRepository.updateUser(userId, parsedData);
  };

  deleteUser = async (userId) => {
    const tasks = await this.taskService.getTasks(userId);
    await Promise.all(
      tasks.map((task) =>
        this.taskService.deleteTaskWithSubtasks(userId, task.id)
      )
    );
    return this.userRepository.deleteUser(userId);
  };
}
