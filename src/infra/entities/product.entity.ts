import { Column, Entity } from 'typeorm';
import { DefaultEntity } from './default.entity';

@Entity({name: "products"})
export class ProductEntity extends DefaultEntity {
  @Column()
  categoryId: number;
  @Column()
  price: number;
  @Column()
  quantity: number;
  @Column()
  dueDate: string;
}
