import { Request, Response } from 'express';
import { instanceToInstance } from 'class-transformer';
import { createUserService } from '../../services/users/createUser.service';
import { IUserRequest } from '../../interfaces/users';

export const createUserController = async (req: Request, res: Response) => {
  const { name, email, password, isAdm }: IUserRequest = req.body;
  const newUser = await createUserService({ name, email, password, isAdm });

  return res.status(201).json(instanceToInstance(newUser));
};
