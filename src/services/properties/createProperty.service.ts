import AppDataSource from '../../data-source';
import { Address } from '../../entities/addresses.entity';
import { Category } from '../../entities/categories.entity';
import { Property } from '../../entities/properties.entity';
import { AppError } from '../../errors/AppError';
import { IPropertyRequest } from '../../interfaces/properties';

export const createPropertyService = async ({
  value,
  size,
  address,
  categoryId,
}: IPropertyRequest) => {
  const propertyRepository = AppDataSource.getRepository(Property);
  const categoryRepository = AppDataSource.getRepository(Category);
  const addressRepository = AppDataSource.getRepository(Address);

  const categoryExists = await categoryRepository.findOneBy({ id: categoryId });

  if (!categoryExists) {
    throw new AppError('Category not found', 404);
  }

  if (address.zipCode.length > 8 || address.state.length > 2) {
    throw new AppError('The field is not a valid', 400);
  }

  const addresses = await addressRepository.find();

  const addressAlreadyExists = addresses.find(
    (elem) => elem.zipCode === address.zipCode && elem.city === address.city,
  );

  if (addressAlreadyExists) {
    throw new AppError(
      'There is already a property with the same address',
      409,
    );
  }

  const newAddress = addressRepository.create({
    city: address.city,
    district: address.district,
    zipCode: address.zipCode,
    state: address.state,
    number: address.number,
  });

  await addressRepository.save(newAddress);

  const newProperty = propertyRepository.create({
    value,
    size,
    address: newAddress,
    category: categoryExists,
  });

  await propertyRepository.save(newProperty);

  return newProperty;
};
