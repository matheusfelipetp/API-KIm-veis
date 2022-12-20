import AppDataSource from '../../data-source';
import { Category } from '../../entities/categories.entity';
import { AppError } from '../../errors/AppError';

export const listCategoryPropertiesService = async (id: string) => {
  const categoryRepository = AppDataSource.getRepository(Category);

  const category = await categoryRepository.findOne({
    where: {
      id: id,
    },
    relations: {
      properties: true,
    },
  });

  if (!category) {
    throw new AppError('Category not found', 404);
  }

  return category;
};
