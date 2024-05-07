import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { CategoryEntity } from '../entities/category.entity';
import { CreateCategoryDto } from 'src/category/dto/create-category.dto';

export type ICategory = {
  id: number;
  name: string;
  description: string;
};

@Injectable()
export class CategoryRepository {
  private readonly categoryRepository: Repository<CategoryEntity>;
  constructor(dataSource: DataSource) {
    this.categoryRepository = dataSource.getRepository(CategoryEntity);
  }

  async create(categoryDto: CreateCategoryDto) {
    const category = await this.categoryRepository.save(categoryDto);
    return category;
  }
  async loadAll() {
    const loadCategories = await this.categoryRepository.find();
    return loadCategories;
  }
  async loadById(id: number | string) {
    const loadCategory = await this.categoryRepository.findOne({
      where: {
        id: Number(id),
      },
    });
    return loadCategory ?? null;
  }
  async loadByName(name: string) {
    const loadCategory = await this.categoryRepository.findOne({
      where: {
        name: name,
      },
    });
    return loadCategory ?? null;
  }
  async update(data: ICategory) {
    await this.categoryRepository.update({ id: data.id }, data);
    return { updated: true };
  }
  async delete(id: number | string) {
    id = Number(id);
    const category = await this.categoryRepository.findOne({
      where: {
        id: id,
      },
    });
    await this.categoryRepository.delete({ id: id });
    return { deleted: true, category };
  }
}
