import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { RepositoryModule } from 'src/infra/repository/repository.module';

@Module({
  imports: [RepositoryModule],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
