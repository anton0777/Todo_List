import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export class AuthService {
  constructor(authRepository) {
    this.authRepository = authRepository;
  }

  registerUser = async (data) => {
    data.password = await bcrypt.hash(data.password, 6);

    const user = await this.authRepository.registerUser(data);

    user.token = await this.generateToken(user);

    return user;
  };

  loginUser = async (data) => {
    const user = await this.authRepository.loginUser(data.email);

    user.token = await this.generateToken(user);

    if (!user) {
      throw new Error('Invalid email or password');
    }

    const { password: hashedPassword } =
      await this.authRepository.hashedPassword(data.email);

    const isPasswordValid = await bcrypt.compare(data.password, hashedPassword);

    if (!isPasswordValid) {
      throw new Error('Invalid email or password');
    }

    return user;
  };

  async generateToken(user) {
    const { id: userId } = await this.authRepository.userId(user.email);

    return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });
  }
}
