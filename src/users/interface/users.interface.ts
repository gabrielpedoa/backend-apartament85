import { IUser } from 'src/infra/repository/user.repository';
import { UserDto } from '../dto/userDto';

export abstract class UserRepository {
  abstract create(dto: UserDto): Promise<IUser>;
  abstract loadByEmail(email: string): Promise<IUser | null>;
  abstract loadById(id: string | number): Promise<IUser | null>;
  abstract update(data: IUser): Promise<IUser>;
  abstract delete(id: string | number): Promise<null>;
  abstract loadAll(): Promise<IUser[]>;
}
