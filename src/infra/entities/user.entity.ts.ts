import { Column, Entity } from 'typeorm';
import { DefaultEntity } from './default.entity';

@Entity({name: "users"})
export class UserEntity extends DefaultEntity {
  @Column()
  email: string;
  @Column()
  password: string;
}
