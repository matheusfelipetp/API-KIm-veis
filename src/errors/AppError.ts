import { Request, Response, NextFunction } from 'express';

class AppError extends Error {
  statusCode: number;

  constructor(message: string, statusCode = 400) {
    super();
    this.message = message;
    this.statusCode = statusCode;
  }
}

const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({ message: err.message });
  }

  if (
    err.message.includes('invalid input syntax for type uuid') ||
    err.message.includes('invalid input syntax for type bigint')
  ) {
    return res.status(404).json({ message: 'Invalid data' });
  }

  console.error(err);
  return res.status(500).json({ message: 'Internal Server Error.' });
};

export { AppError, errorHandler };
