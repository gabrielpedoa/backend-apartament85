import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { AuthGuard } from '../auth/auth.guard';
import { ProductDto } from './dto/create-product.dto';
import { IProduct } from 'src/infra/repository/product.repository';

@Controller('api/products')
@UseGuards(AuthGuard)
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post('create')
  async create(@Body() dto: ProductDto) {
    return await this.productsService.create(dto);
  }

  @Get('list')
  async loadAll() {
    return await this.productsService.loadAll();
  }

  @Get(':id')
  async loadById(@Param('id') id: number) {
    return await this.productsService.loadById(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() data: IProduct) {
    return await this.productsService.update({ id: Number(id), ...data });
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    return await this.productsService.delete(id);
  }
}
