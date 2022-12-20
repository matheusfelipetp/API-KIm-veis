import { Request, Response, NextFunction } from 'express';
import AppDataSource from '../../data-source';
import { User } from '../../entities/user.entity';
import { AppError } from '../../errors/AppError';
import { IUserRequest } from '../../interfaces/users';

export const ensureEmailMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { email }: IUserRequest = req.body;

  const userRepository = AppDataSource.getRepository(User);
  const users = await userRepository.find();

  const emailExists = users.find((user) => user.email === email);

  if (emailExists) {
    throw new AppError('Email already exists', 409);
  }

  return next();
};
