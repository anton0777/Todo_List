import { CreateUser } from '../validators/userValidator.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export class AuthService {
  constructor(authRepository) {
    this.authRepository = authRepository;
  }

  registerUser = async (userData) => {
    const parsedData = await CreateUser.parseAsync(userData);
    parsedData.password = await bcrypt.hash(parsedData.password, 6);
    const user = await this.authRepository.registerUser(parsedData);
    user.token = this.jwtSign(user);
    return user;
  };

  loginUser = async (userData) => {
    const { email, password } = userData;
    const user = await this.authRepository.loginUser(email);
    if (!user) throw new Error('Invalid email or password');
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) throw new Error('Invalid email or password');
    user.token = this.jwtSign(user);
    return user;
  };

  jwtSign = (user) => {
    return (user.token = jwt.sign(
      {
        id: user.id,
      },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    ));
  };
}
