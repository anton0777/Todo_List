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
    user.token = await this.jwtSign(user);
    return user;
  };

  loginUser = async (userData) => {
    const { email, password } = userData;
    const user = await this.authRepository.loginUser(email);
    if (!user) throw new Error('Invalid email or password');
    const { password: hashedPassword } =
      await this.authRepository.hashedPassword(email);
    const isPasswordValid = await bcrypt.compare(password, hashedPassword);
    if (!isPasswordValid) throw new Error('Invalid email or password');
    user.token = await this.jwtSign(user);
    return user;
  };

  jwtSign = async (user) => {
    const { id: userId } = await this.authRepository.userId(user.email);
    return (user.token = jwt.sign(
      {
        id: userId,
      },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    ));
  };
}
