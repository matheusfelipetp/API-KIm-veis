import { Request, Response } from 'express';
import { AppError } from '../../errors/AppError';
import { ICategoryRequest } from '../../interfaces/categories';
import { createCategoryService } from '../../services/categories/createCategory.service';

export const createCategoryController = async (req: Request, res: Response) => {
  try {
    const { name }: ICategoryRequest = req.body;
    const newCategory = await createCategoryService({ name });

    return res.status(201).json(newCategory);
  } catch (err: any) {
    throw new AppError(err.message, 400);
  }
};
