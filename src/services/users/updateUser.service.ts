import AppDataSource from '../../data-source';
import { User } from '../../entities/user.entity';
import { AppError } from '../../errors/AppError';

export const updateUserService = async (
  data: Partial<User>,
  id: string,
  userLogged: any,
) => {
  const userRepository = AppDataSource.getRepository(User);
  const user = await userRepository.findOneBy({ id: id });
  const userId = user!.id;

  if (!userLogged.isAdm && userLogged.id !== id) {
    throw new AppError('Missing admin permissions', 401);
  }

  if (
    data.hasOwnProperty('isAdm') ||
    data.hasOwnProperty('id') ||
    data.hasOwnProperty('isActive')
  ) {
    throw new AppError('Unable to change fields', 401);
  }

  await userRepository.update(userId, {
    ...data,
    updatedAt: new Date(),
  });

  const userUpdated = await userRepository.findOneBy({ id: id });

  return userUpdated;
};
