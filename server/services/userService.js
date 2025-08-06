import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export class UserService {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  getUsers = async () => {
    try {
      return await this.userRepository.getUsers();
    } catch (error) {
      throw error;
    }
  };

  getUser = async (headers) => {
    try {
      const userId = getUserIdFromToken(headers.authorization.split(' ')[1]);
      return await this.userRepository.getUser(userId);
    } catch (error) {
      throw error;
    }
  };

  createUser = async (userData) => {
    try {
      return await this.userRepository.createUser(userData);
    } catch (error) {
      throw error;
    }
  };

  updateUser = async (headers, userData) => {
    try {
      const userId = getUserIdFromToken(headers.authorization.split(' ')[1]);
      if (userData.password) {
        userData.password = await bcrypt.hash(userData.password, 6);
      }
      return await this.userRepository.updateUser(userId, userData);
    } catch (error) {
      throw error;
    }
  };

  deleteUser = async (headers) => {
    try {
      const userId = getUserIdFromToken(headers.authorization.split(' ')[1]);
      return await this.userRepository.deleteUser(userId);
    } catch (error) {
      throw error;
    }
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
