import { BadRequestException } from '@nestjs/common';

export class EmailExistsException extends BadRequestException {
  constructor() {
    super(`Email already exists`);
  }
}
