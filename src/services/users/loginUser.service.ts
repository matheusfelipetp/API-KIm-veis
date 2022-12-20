import AppDataSource from '../../data-source';
import { User } from '../../entities/user.entity';
import { compare } from 'bcrypt';
import jwt from 'jsonwebtoken';
import 'dotenv/config';
import { IUserLogin } from '../../interfaces/users';
import { AppError } from '../../errors/AppError';

export const loginUserService = async ({ email, password }: IUserLogin) => {
  const userRepository = AppDataSource.getRepository(User);
  const user = await userRepository.findOneBy({ email: email });

  const passwordMatch = await compare(password, user!.password);

  if (!passwordMatch) {
    throw new AppError('Invalid user or password', 403);
  }

  const token = jwt.sign({ email }, 'SECRET_KEY', {
    expiresIn: '24h',
    subject: user!.id,
  });

  return { token };
};
