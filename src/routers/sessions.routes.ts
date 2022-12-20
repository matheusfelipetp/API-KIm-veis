import { Router } from 'express';
import { loginUserController } from '../controllers/users/loginUser.controller';
import { ensureUserExistsMiddleware } from '../middleware/users/ensureUserExists.middleware';

export const sessionsRoutes = Router();

sessionsRoutes.post('', ensureUserExistsMiddleware, loginUserController);
