import { Request, Response } from 'express';
import { instanceToInstance } from 'class-transformer';
import { listAllUsersService } from '../../services/users/listAllUsers.service';

export const listAllUsersController = async (req: Request, res: Response) => {
  const users = await listAllUsersService();
  return res.status(200).json(instanceToInstance(users));
};
