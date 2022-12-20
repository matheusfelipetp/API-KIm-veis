import { Router } from 'express';
import { createPropertyController } from '../controllers/properties/createProperty.controller';
import { listAllPropertiesController } from '../controllers/properties/listAllProperties.controller';
import { ensureIsAdmMiddleware } from '../middleware/users/ensureIsAdm.middleware';
import { ensureTokenMiddleware } from '../middleware/users/ensureToken.middleware';

export const propertyRoutes = Router();

propertyRoutes.post(
  '',
  ensureTokenMiddleware,
  ensureIsAdmMiddleware,
  createPropertyController,
);

propertyRoutes.get('', listAllPropertiesController);
