import { Request, Response } from 'express';
import { IScheduleRequest } from '../../interfaces/schedules';
import { createScheduleService } from '../../services/schedules/createSchedule.service';

export const createScheduleController = async (req: Request, res: Response) => {
  const data: IScheduleRequest = req.body;
  const { id } = req.params;

  const schedule = await createScheduleService(data, id);

  return res.status(201).json({ message: schedule });
};
