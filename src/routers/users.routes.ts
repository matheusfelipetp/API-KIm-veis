import { Router } from 'express';
import { createUserController } from '../controllers/users/createUser.controller';
import { deleteUserController } from '../controllers/users/deleteUser.controller';
import { listAllUsersController } from '../controllers/users/listAllUsers.controller';
import { updateUserController } from '../controllers/users/updateUser.controller';
import { ensureEmailMiddleware } from '../middleware/users/ensureEmail.middleware';
import { ensureIsActiveMiddleware } from '../middleware/users/ensureIsActive.middleware';
import { ensureIsAdmMiddleware } from '../middleware/users/ensureIsAdm.middleware';
import { ensureTokenMiddleware } from '../middleware/users/ensureToken.middleware';

export const userRoutes = Router();

userRoutes.post('', ensureEmailMiddleware, createUserController);

userRoutes.get(
  '',
  ensureTokenMiddleware,
  ensureIsAdmMiddleware,
  listAllUsersController,
);

userRoutes.patch(
  '/:id',
  ensureTokenMiddleware,
  ensureIsActiveMiddleware,
  updateUserController,
);

userRoutes.delete(
  '/:id',
  ensureTokenMiddleware,
  ensureIsAdmMiddleware,
  ensureIsActiveMiddleware,
  deleteUserController,
);
