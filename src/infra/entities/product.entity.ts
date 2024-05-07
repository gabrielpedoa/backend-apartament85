import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { DefaultEntity } from './default.entity';
import { CategoryEntity } from './category.entity';

@Entity({ name: 'products' })
export class ProductEntity extends DefaultEntity {
  @Column({ name: 'categoryId' })
  categoryId: number;
  @Column()
  price: number;
  @Column()
  quantity: number;
  @Column()
  dueDate: string;
  @ManyToOne(() => CategoryEntity, (category) => category.products)
  @JoinColumn({ name: 'categoryId' })
  category: CategoryEntity;
}
