import { Column, Entity, OneToMany } from 'typeorm';
import { DefaultEntity } from './default.entity';
import { ProductEntity } from './product.entity';

@Entity({ name: 'category' })
export class CategoryEntity extends DefaultEntity {
  @Column()
  description: string;
  @OneToMany(() => ProductEntity, product => product.category)
  products: ProductEntity[];
}
