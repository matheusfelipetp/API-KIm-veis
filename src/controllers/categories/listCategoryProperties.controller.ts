import { Request, Response } from 'express';
import { AppError } from '../../errors/AppError';
import { listCategoryPropertiesService } from '../../services/categories/listCategoryProperties.service';

export const listCategoryPropertiesController = async (
  req: Request,
  res: Response,
) => {
  try {
    const { id } = req.params;
    const properties = await listCategoryPropertiesService(id);

    return res.status(200).json(properties);
  } catch (err: any) {
    throw new AppError(err.message, 404);
  }
};
