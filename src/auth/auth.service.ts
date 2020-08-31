import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UsersService } from '../users/users.service';
const bcrypt = require('bcrypt');

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService, private jwtService: JwtService) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(email);
    if (!user) {
      return { message: "User doesn't exist", payload: null };
    } 
    const passwordValidation = await bcrypt.compare(pass, user.password); 
    if (passwordValidation) {
      const { password, ...result } = user;
      return { payload: result};
    }
    return { message: "Wrong credentials", payload: null };
  }

  async login(user: any) {
    const payload = { email: user.email, sub: user._id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
