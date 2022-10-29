import { Injectable, Logger } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  private readonly logger = new Logger(AuthService.name);

  async validateUser(email: string, inputPassword: string) {
    const user = await this.usersService.findOneByEmail(email);
    if (user) {
      try {
        const verified = await bcrypt.compare(inputPassword, user.password);
        if (verified) {
          return user;
        } else {
          // this.logger.warn(`User ${user._id} no matching password`);
          return null;
        }
      } catch (error) {
        this.logger.error(error);
        return null;
      }
    }
    this.logger.error(`User with email ${email} not found`);
    return null;
  }

  async login(user: any) {
    const payload = { email: user.email, sub: user._id, role: user.role };
    this.logger.log(`User ${user.id} logged in`);
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
