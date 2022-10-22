import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, inputPassword: string) {
    const user = await this.usersService.findOneWithPassword(email);
    if (user) {
      try {
        const verified = await bcrypt.compare(inputPassword, user.password);
        if (verified) {
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const { password, ...result } = user.toObject();
          return result;
        } else return null;
      } catch (error) {
        return null;
      }
    }
    return null;
  }

  async login(user: any) {
    const payload = { email: user.email, sub: user._id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
