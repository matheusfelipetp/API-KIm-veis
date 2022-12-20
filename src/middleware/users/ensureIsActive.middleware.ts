import { Request, Response, NextFunction } from 'express';
import AppDataSource from '../../data-source';
import { User } from '../../entities/user.entity';
import { AppError } from '../../errors/AppError';

export const ensureIsActiveMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const userRepository = AppDataSource.getRepository(User);
  const { id } = req.params;
  const user = await userRepository.findOneBy({ id: id });

  if (!user) {
    throw new AppError('User not found', 404);
  }

  return next();
};
