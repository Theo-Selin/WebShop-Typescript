import { NotFoundException } from '@nestjs/common';

export class CartNotFoundException extends NotFoundException {
  constructor(cartId: string) {
    super(`Cart with id ${cartId} not found`);
  }
}
