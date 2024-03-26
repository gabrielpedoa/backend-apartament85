import { Column, Entity } from 'typeorm';
import { DefaultEntity } from './default.entity';

@Entity({ name: 'category' })
export class CategoryEntity extends DefaultEntity {
  @Column()
  description: string;
}
