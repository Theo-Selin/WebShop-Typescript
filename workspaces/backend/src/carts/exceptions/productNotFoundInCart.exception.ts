import { NotFoundException } from '@nestjs/common';

export class ProductNotFoundInCartException extends NotFoundException {
  constructor(productId: string, cartId: string) {
    super(`Product with id ${productId} not found in cart with id ${cartId}`);
  }
}
