import { Router } from 'express';
import { createCategoryController } from '../controllers/categories/createCategory.controller';
import { listAllCategoriesController } from '../controllers/categories/listAllCategories.controller';
import { listCategoryPropertiesController } from '../controllers/categories/listCategoryProperties.controller';
import { ensureCategoryExistsMiddleware } from '../middleware/categories/ensureCategoryExists.middleware';
import { ensureIsAdmMiddleware } from '../middleware/users/ensureIsAdm.middleware';
import { ensureTokenMiddleware } from '../middleware/users/ensureToken.middleware';

export const categoryRoutes = Router();

categoryRoutes.post(
  '',
  ensureTokenMiddleware,
  ensureIsAdmMiddleware,
  ensureCategoryExistsMiddleware,
  createCategoryController,
);

categoryRoutes.get('', listAllCategoriesController);

categoryRoutes.get('/:id/properties', listCategoryPropertiesController);
