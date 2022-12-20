import { Request, Response, NextFunction } from 'express';
import AppDataSource from '../../data-source';
import { User } from '../../entities/user.entity';
import { AppError } from '../../errors/AppError';
import { IUserLogin } from '../../interfaces/users';

export const ensureUserExistsMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { email }: IUserLogin = req.body;

  const userRepository = AppDataSource.getRepository(User);
  const user = await userRepository.findOneBy({ email: email });

  if (!user?.isActive) {
    throw new AppError('User not active', 400);
  }

  if (!user) {
    throw new AppError('Invalid user or password', 401);
  }

  return next();
};
