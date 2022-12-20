import { Request, Response } from 'express';
import { AppError } from '../../errors/AppError';
import { listAllPropertiesService } from '../../services/properties/listAllProperties.service';

export const listAllPropertiesController = async (
  req: Request,
  res: Response,
) => {
  try {
    const properties = await listAllPropertiesService();

    return res.status(200).json(properties);
  } catch (err: any) {
    throw new AppError(err.message, 400);
  }
};
