import AppDataSource from '../../data-source';
import { Category } from '../../entities/categories.entity';
import { ICategoryRequest } from '../../interfaces/categories';

export const createCategoryService = async ({ name }: ICategoryRequest) => {
  const categoryRepository = AppDataSource.getRepository(Category);

  const category = categoryRepository.create({
    name: name,
  });

  await categoryRepository.save(category);

  return category;
};
