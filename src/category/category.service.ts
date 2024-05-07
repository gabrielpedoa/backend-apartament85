import { Inject, Injectable } from '@nestjs/common';
import { CategoryRepository } from 'src/infra/repository/category.repository';
import { CreateCategoryDto } from './dto/create-category.dto';
import { ValidationException } from 'src/config/exceptions/errors/validation';

@Injectable()
export class CategoryService {
  constructor(
    @Inject('categoryRepository')
    protected categoryRepository: CategoryRepository,
  ) {}

  async create(categoryDto: CreateCategoryDto) {
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
}
