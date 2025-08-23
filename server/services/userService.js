import jwt from 'jsonwebtoken';
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

  getUser = async (headers) => {
    const userId = getUserIdFromToken(headers.authorization.split(' ')[1]);
    return this.userRepository.getUser(userId);
  };

  createUser = async (userData) => {
    return this.userRepository.createUser(userData);
  };

  updateUser = async (headers, userData) => {
    const userId = getUserIdFromToken(headers.authorization.split(' ')[1]);
    const parsedData = await UpdateUser.parseAsync(userData);
    if (parsedData.password) {
      parsedData.password = await bcrypt.hash(parsedData.password, 6);
    }
    return this.userRepository.updateUser(userId, parsedData);
  };

  deleteUser = async (headers) => {
    const userId = getUserIdFromToken(headers.authorization.split(' ')[1]);
    const tasks = await this.taskService.getTasks(headers);
    await Promise.all(
      tasks.map((task) =>
        this.taskService.deleteTaskWithSubtasks(userId, task.id)
      )
    );
    return this.userRepository.deleteUser(userId);
  };
}

function getUserIdFromToken(token) {
  if (!token) {
    throw new Error('Unauthorized');
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  if (!decoded || !decoded.id) {
    throw new Error('Invalid token');
  }

  return parseInt(decoded.id);
}
