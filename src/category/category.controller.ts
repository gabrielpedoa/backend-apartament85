import { Body, Controller, Post } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';

@Controller('api/category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}
  @Post('create')
  async create(@Body() data: CreateCategoryDto) {
    const user = await this.categoryService.create(data);
    return user;
  }
}
