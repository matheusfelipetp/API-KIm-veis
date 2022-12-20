import { Request, Response } from 'express';
import { listAllSchedulesService } from '../../services/schedules/listAllSchedules.service';

export const listAllSchedulesController = async (
  req: Request,
  res: Response,
) => {
  const { id } = req.params;
  const schedules = await listAllSchedulesService(id);

  return res.status(200).json({ schedules });
};
