import { Request, Response } from 'express';
import { instanceToInstance } from 'class-transformer';
import { updateUserService } from '../../services/users/updateUser.service';
import { IUserUpdate } from '../../interfaces/users';

export const updateUserController = async (req: Request, res: Response) => {
  const data: IUserUpdate = req.body;
  const userLogged = req.user;
  const { id } = req.params;

  const userUpdated = await updateUserService(data, id, userLogged);

  return res.status(200).json(instanceToInstance(userUpdated));
};
