import { Request, Response, NextFunction } from 'express';
import AppDataSource from '../../data-source';
import { Category } from '../../entities/categories.entity';
import { AppError } from '../../errors/AppError';
import { ICategoryRequest } from '../../interfaces/categories';

export const ensureCategoryExistsMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { name }: ICategoryRequest = req.body;

  const categoryRepository = AppDataSource.getRepository(Category);
  const categories = await categoryRepository.find();

  const categoryExists = categories.find((category) => category.name === name);

  if (categoryExists) {
    throw new AppError('Category already exists', 409);
  }

  return next();
};
