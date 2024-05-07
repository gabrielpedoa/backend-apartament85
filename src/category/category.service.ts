import { Inject, Injectable } from '@nestjs/common';
import {
  CategoryRepository,
  ICategory,
} from 'src/infra/repository/category.repository';
import { CategoryDto } from './dto/create-category.dto';
import { ValidationException } from 'src/config/exceptions/errors/validation';
import { NotFoundException } from 'src/config/exceptions/errors/notFound';

@Injectable()
export class CategoryService {
  constructor(
    @Inject('categoryRepository')
    protected categoryRepository: CategoryRepository,
  ) {}

  async create(categoryDto: CategoryDto) {
    const verifyIfNameAlreadUsed = await this.categoryRepository.loadByName(
      categoryDto.name,
    );
    if (verifyIfNameAlreadUsed)
      throw new ValidationException("Category's name alread used");
    const category = await this.categoryRepository.create({
      ...categoryDto,
    });
    return {
      status: 'CREATED',
      category,
    };
  }

  async loadAll(data: ICategory) {
    if (data.name) {
      const categoryByName = await this.categoryRepository.loadByName(
        data.name,
      );
      return { result: categoryByName };
    }
    if (data.id) {
      const categoryById = await this.categoryRepository.loadById(data.id);
      return { result: categoryById };
    }
    const categories = await this.categoryRepository.loadAll();
    return { results: categories };
  }

  async update(data: ICategory) {
    const existingCategory = await this.categoryRepository.loadById(data.id);
    if (!existingCategory)
      throw new ValidationException('This category does not exist');
    await this.categoryRepository.update({ ...data });
    const updatedCategory = await this.categoryRepository.loadById(data.id);
    const { createdAt, updatedAt, ...rest } = updatedCategory;
    return {
      updated: true,
      category: rest,
    };
  }

  async delete(id: number) {
    const category = await this.categoryRepository.loadById(String(id));
    if (!category) throw new NotFoundException('User does not exists');
    const deletedCategory = await this.categoryRepository.delete(id);
    return deletedCategory;
  }
}
