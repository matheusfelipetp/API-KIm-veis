import AppDataSource from '../../data-source';
import { Property } from '../../entities/properties.entity';
import { Schedules } from '../../entities/schedulesUserProperties.entity';
import { User } from '../../entities/user.entity';
import { AppError } from '../../errors/AppError';
import { IScheduleRequest } from '../../interfaces/schedules';

export const createScheduleService = async (
  { date, hour, propertyId }: IScheduleRequest,
  userId: string,
) => {
  const schedulesRepository = AppDataSource.getRepository(Schedules);
  const propertiesRepository = AppDataSource.getRepository(Property);
  const usersRepository = AppDataSource.getRepository(User);

  const propertyExists = await propertiesRepository.findOneBy({
    id: propertyId,
  });

  if (!propertyExists) {
    throw new AppError('Property not found', 404);
  }

  const userExists = await usersRepository.findOneBy({
    id: userId,
  });

  if (!userExists) {
    throw new AppError('User not exists', 401);
  }

  const schedulesQueryBuilder =
    schedulesRepository.createQueryBuilder('schedules');

  const scheduleExists = await schedulesQueryBuilder
    .where('schedules.hour = :hour AND schedules.date = :date', {
      hour: hour,
      date: date,
    })
    .getOne();

  if (scheduleExists) {
    throw new AppError(
      "There's already a visit scheduled with the same date and hour",
      409,
    );
  }

  const scheduledVisit = schedulesRepository.create({
    date,
    hour,
    property: propertyExists,
    user: userExists,
  });

  await schedulesRepository.save(scheduledVisit);

  return scheduledVisit;
};
