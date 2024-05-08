import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { NotFoundException } from 'src/config/exceptions/errors/notFound';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  public async validateUser(email: string, password: string) {
    const user = await this.userService.loadByEmail(email);
    if (user && user.password === password) {
      const { password, ...rest } = user;
      return rest;
    }
    return null;
  }

  public async login(email: string, password: string) {
    const user = await this.validateUser(email, password);
    if (!user) throw new NotFoundException('Invalid Credentials');
    const payload = { email: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
