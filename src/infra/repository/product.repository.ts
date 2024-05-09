import { DataSource, Repository } from 'typeorm';
import { ProductEntity } from '../entities/product.entity';
import { ProductDto } from 'src/app/products/dto/create-product.dto';
import { NotFoundException } from 'src/config/exceptions/errors/notFound';
import { Injectable } from '@nestjs/common';

export type IProduct = {
  id: number;
  name: string;
  categoryId: number;
  quantity: number;
  dueDate: string;
};

@Injectable()
export class ProductRepository {
  private readonly productRepository: Repository<ProductEntity>;
  constructor(dataSource: DataSource) {
    this.productRepository = dataSource.getRepository(ProductEntity);
  }

  async create(dto: ProductDto) {
    const product = await this.productRepository.save(dto);
    return product;
  }

  async loadAll() {
    const products = await this.productRepository.find();
    return products;
  }

  async loadById(id: number) {
    const product = await this.productRepository.findOne({ where: { id: id } });
    return product;
  }

  async loadByName(name: string) {
    const product = await this.productRepository.findOne({
      where: { name: name },
    });
    return product;
  }

  async update(data: IProduct) {
    await this.productRepository.update(
      {
        id: data.id,
      },
      data,
    );
  }

  async delete(id: number) {
    await this.productRepository.delete(id);
    return true;
  }
}
