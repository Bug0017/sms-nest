import { UsersService } from './../users/users.service';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async validateUser(username: string, password: string) {
    const user = await this.usersService.findOne(username);
    if (user && user.password === password) {
      const { password, username, ...rest } = user;
      return rest;
    }

    return null;
  }

  async login(user:any){
    return {
      access_token: this.jwtService.sign(user)
    }
  }
}
