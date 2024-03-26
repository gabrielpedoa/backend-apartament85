import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UserDto } from './dto/userDto';
import { IUser } from 'src/infra/repository/user.repository';

@Controller('/api/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async register(@Body() data: UserDto) {
    const user = await this.usersService.register(data);
    return user;
  }
  @Get()
  async loadAll() {
    const user = await this.usersService.loadAll();
    return user;
  }

  @Get(':id')
  async loadById(@Param('id') id: number) {
    const user = await this.usersService.loadById(id);
    return user;
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() data: IUser) {
    const user = await this.usersService.update({ ...data, id: Number(id) });
    return user;
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    const user = await this.usersService.remove(id);
    return user;
  }
}
