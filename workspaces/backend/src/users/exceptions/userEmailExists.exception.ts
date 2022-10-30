import { BadRequestException } from '@nestjs/common';

export class UserEmailExistsException extends BadRequestException {
  constructor() {
    super(`Email already exists`);
  }
}
