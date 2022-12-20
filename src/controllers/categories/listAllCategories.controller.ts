import { Request, Response } from 'express';
import { AppError } from '../../errors/AppError';
import { listAllCategoriesService } from '../../services/categories/listAllCategories.service';

export const listAllCategoriesController = async (
  req: Request,
  res: Response,
) => {
  try {
    const categories = await listAllCategoriesService();

    return res.status(200).json(categories);
  } catch (err: any) {
    throw new AppError(err.message, 400);
  }
};
