import { Request, Response } from 'express';
import { AppError } from '../../errors/AppError';
import { deleteUserService } from '../../services/users/deleteUser.service';

export const deleteUserController = async (req: Request, res: Response) => {
  const { id } = req.params;
  const [status] = await deleteUserService(id);

  return res.sendStatus(status);
};
