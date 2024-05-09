import { Inject, Injectable } from '@nestjs/common';
import {
  IProduct,
  ProductRepository,
} from 'src/infra/repository/product.repository';
import { ProductDto } from './dto/create-product.dto';
import { NotFoundException } from 'src/config/exceptions/errors/notFound';

@Injectable()
export class ProductsService {
  constructor(
    @Inject('productRepository')
    protected productRepository: ProductRepository,
  ) {}

  async create(productDto: ProductDto) {
    const product = await this.productRepository.create(productDto);
    return product;
  }

  async loadAll() {
    const product = await this.productRepository.loadAll();
    return {
      results: product,
    };
  }

  async loadById(id: number) {
    const product = await this.productRepository.loadById(id);
    return {
      result: product,
    };
  }

  async loadByName(name: string) {
    const product = await this.productRepository.loadByName(name);
    return {
      result: product,
    };
  }

  async update(data: IProduct) {
    const product = await this.productRepository.loadById(data.id);
    if (!product) throw new NotFoundException('Product does not exists');
    await this.productRepository.update({ ...data });
    const updatedProduct = await this.productRepository.loadById(data.id);
    const { createdAt, updatedAt, ...rest } = updatedProduct;
    return {
      updated: true,
      result: rest,
    };
  }

  async delete(id: number) {
    const product = await this.productRepository.loadById(id);
    if (!product) throw new NotFoundException('Product does not exists');
    await this.productRepository.delete(id);
    return true;
  }
}
