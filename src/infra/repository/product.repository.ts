import { DataSource, Repository } from 'typeorm';
import { ProductEntity } from '../entities/product.entity';

export class ProductRepository {
  private readonly productRepository: Repository<ProductEntity>;
  constructor(dataSource: DataSource) {
    this.productRepository = dataSource.getRepository(ProductEntity);
  }

  async create() {}
}
