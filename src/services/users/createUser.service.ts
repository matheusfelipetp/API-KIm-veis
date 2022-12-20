import bcrypt from 'bcrypt';
import AppDataSource from '../../data-source';
import { User } from '../../entities/user.entity';
import { IUserRequest } from '../../interfaces/users';

export const createUserService = async ({
  name,
  email,
  password,
  isAdm,
}: IUserRequest) => {
  const userRepository = AppDataSource.getRepository(User);

  const user = userRepository.create({
    name: name,
    email: email,
    password: bcrypt.hashSync(password, 10),
    isAdm: isAdm,
    isActive: true,
  });

  await userRepository.save(user);

  return user;
};
