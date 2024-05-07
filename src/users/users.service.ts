import { Inject, Injectable } from '@nestjs/common';
import { NotFoundException } from 'src/config/exceptions/errors/notFound';
import { ValidationException } from 'src/config/exceptions/errors/validation';
import { IUser } from 'src/infra/repository/user.repository';
import { UserDto } from './dto/userDto';
import { UserRepository } from './interface/users.interface';

@Injectable()
export class UsersService {
  constructor(
    @Inject('userRepository')
    protected userRepository: UserRepository,
    /**
     * encrypt ?!?
     */
  ) {}
  async create(userDto: UserDto) {
    const verifyEmailAlreadyUsed = await this.userRepository.loadByEmail(
      userDto.email,
    );
    if (verifyEmailAlreadyUsed)
      throw new ValidationException('Email already used!');
    const user = await this.userRepository.create({
      ...userDto,
    });
    const { password, ...rest } = user;
    return {
      status: 'CREATED',
      rest,
    };
  }

  async loadAll() {
    const users = await this.userRepository.loadAll();
    const returnWithoutPassword = users.map(({ password, ...rest }) => rest);
    return {
      results: returnWithoutPassword,
    };
  }

  async loadById(id: number) {
    const user = await this.userRepository.loadById(String(id));
    if (!user) throw new NotFoundException('Usuario não encontrado');
    return user;
  }

  async update(data: IUser) {
    const userId = await this.userRepository.loadById(String(data.id));
    if (!userId) throw new NotFoundException('User does not exists');
    if (userId.email != data.email) {
      const emailAlreadyUsed = await this.userRepository.loadByEmail(
        data.email,
      );
      if (emailAlreadyUsed) throw new ValidationException('Email already used');
    }
    const updateUser = await this.userRepository.update({ ...data });
    const { password, ...rest } = updateUser;
    return rest;
  }

  async remove(id: number) {
    const userId = await this.userRepository.loadById(String(id));
    if (!userId) throw new NotFoundException('User does not exists');
    const deleteUser = await this.userRepository.delete(String(id));
    return deleteUser;
  }
}
