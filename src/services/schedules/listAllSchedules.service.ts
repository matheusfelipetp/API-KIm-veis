import AppDataSource from '../../data-source';
import { Property } from '../../entities/properties.entity';
import { Schedules } from '../../entities/schedulesUserProperties.entity';
import { AppError } from '../../errors/AppError';

export const listAllSchedulesService = async (id: string) => {
  const propertyRepository = AppDataSource.getRepository(Property);
  const scheduleRepository = AppDataSource.getRepository(Schedules);

  const propertyExists = await propertyRepository.findOneBy({ id: id });

  if (!propertyExists) {
    throw new AppError('Property not found', 404);
  }

  const schedules = await scheduleRepository.find({
    where: {
      property: {
        id: propertyExists.id,
      },
    },
    relations: {
      user: true,
    },
  });

  return schedules;
};
