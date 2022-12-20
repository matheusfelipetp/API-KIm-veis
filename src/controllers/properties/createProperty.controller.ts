import { Request, Response } from 'express';
import { IPropertyRequest } from '../../interfaces/properties';
import { createPropertyService } from '../../services/properties/createProperty.service';

export const createPropertyController = async (req: Request, res: Response) => {
  const { value, size, address, categoryId }: IPropertyRequest = req.body;
  const newProperty = await createPropertyService({
    value,
    size,
    address,
    categoryId,
  });

  return res.status(201).json(newProperty);
};
