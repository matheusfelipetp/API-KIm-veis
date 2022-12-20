import { Request, Response, NextFunction } from 'express';
import { AppError } from '../../errors/AppError';

export const ensureDateMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { date, hour } = req.body;

  const hourValidate = new Date(`${date} ${hour}`).getHours();
  const dateValidate = new Date(`${date} ${hour}`).getDay();

  if (hourValidate < 8 || hourValidate >= 18) {
    throw new AppError('Business hours are from 8 am to 6 pm', 400);
  }

  if (dateValidate < 1 || dateValidate > 5) {
    throw new AppError('Appointment only from Monday to Friday', 400);
  }

  return next();
};
