import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryDto } from './dto/create-category.dto';
import { ICategory } from 'src/infra/repository/category.repository';

@Controller('api/category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post('create')
  async create(@Body() data: CategoryDto) {
    const user = await this.categoryService.create(data);
    return user;
  }

  @Get('list')
  async loadAll(@Query() data: ICategory) {
    const categories = await this.categoryService.loadAll(data);
    return categories;
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() data: ICategory) {
    console.log(id);
    const updateCategory = await this.categoryService.update({
      ...data,
      id: Number(id),
    });
    return updateCategory;
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    const deleteCategory = await this.categoryService.delete(id);
    return deleteCategory;
  }
}
