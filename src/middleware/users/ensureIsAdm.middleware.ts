import { Request, Response, NextFunction } from 'express';
import { AppError } from '../../errors/AppError';

export const ensureIsAdmMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (!req.user.isAdm) {
    throw new AppError('Missing admin permissions', 403);
  }

  return next();
};
