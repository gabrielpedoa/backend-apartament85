import { Injectable } from '@nestjs/common';
import { CategoryDto } from 'src/category/dto/create-category.dto';
import { DataSource, Repository } from 'typeorm';
import { CategoryEntity } from '../entities/category.entity';

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

  async create(categoryDto: CategoryDto) {
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
  }
  async delete(id: number) {
    const category = await this.categoryRepository.findOne({
      where: {
        id: id,
      },
    });
    await this.categoryRepository.delete({ id: id });
    return { deleted: true, category };
  }
}
