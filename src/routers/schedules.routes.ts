import { Router } from 'express';
import { createScheduleController } from '../controllers/schedules/createSchedule.controller';
import { listAllSchedulesController } from '../controllers/schedules/listAllSchedules.controller';
import { ensureDateMiddleware } from '../middleware/schedules/ensureDate.middleware';
import { ensureIsAdmMiddleware } from '../middleware/users/ensureIsAdm.middleware';
import { ensureTokenMiddleware } from '../middleware/users/ensureToken.middleware';

export const schedulesRoutes = Router();

schedulesRoutes.post(
  '',
  ensureDateMiddleware,
  ensureTokenMiddleware,
  createScheduleController,
);

schedulesRoutes.get(
  '/properties/:id',
  ensureTokenMiddleware,
  ensureIsAdmMiddleware,
  listAllSchedulesController,
);
