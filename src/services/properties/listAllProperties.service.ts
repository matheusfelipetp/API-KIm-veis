import AppDataSource from '../../data-source';
import { Property } from '../../entities/properties.entity';

export const listAllPropertiesService = async () => {
  const propertyRepository = AppDataSource.getRepository(Property);
  const properties = await propertyRepository.find();

  return properties;
};
