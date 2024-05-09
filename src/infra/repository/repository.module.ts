import { Module } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { CategoryRepository } from './category.repository';
import { ProductRepository } from './product.repository';

@Module({
  providers: [
    { useClass: UserRepository, provide: 'userRepository' },
    { useClass: CategoryRepository, provide: 'categoryRepository' },
     { useClass: ProductRepository, provide: 'productRepository' }, 
  ],
  exports: [
    { useClass: UserRepository, provide: 'userRepository' },
    { useClass: CategoryRepository, provide: 'categoryRepository' },
    { useClass: ProductRepository, provide: 'productRepository' }, 
  ],
})
export class RepositoryModule {}
