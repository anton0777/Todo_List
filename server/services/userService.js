import bcrypt from 'bcrypt';

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
    if (userData.password) {
      userData.password = await bcrypt.hash(userData.password, 6);
    }
    return this.userRepository.updateUser(userId, userData);
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
