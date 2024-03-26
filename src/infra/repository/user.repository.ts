import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { UserEntity } from '../entities/user.entity.ts';
import { UserDto } from 'src/users/dto/userDto';

export type IUser = {
  id: number;
  name: string;
  email: string;
  password: string;
};

@Injectable()
export class UserRepository {
  private readonly userRepository: Repository<UserEntity>;
  constructor(dataSource: DataSource) {
    this.userRepository = dataSource.getRepository(UserEntity);
  }

  async create(dto: UserDto) {
    const user = await this.userRepository.save(dto);
    return user;
  }

  async loadAll() {
    const users = await this.userRepository.find();
    return users;
  }

  async loadByEmail(email: string) {
    const users = await this.userRepository.findOne({
      where: { email: email },
    });
    return users ?? null;
  }
  async loadById(id: string | number) {
    const users = await this.userRepository.findOne({
      where: { id: Number(id) },
    });
    return users ?? null;
  }

  async update(data: IUser) {
    await this.userRepository.update({ id: data.id }, data);
    return { updated: true };
  }

  async delete(id: number) {
    const user = await this.userRepository.findOne({ where: { id: id } });
    await this.userRepository.delete({ id: id });
    return { deleted: true, user };
  }
}
