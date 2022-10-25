import { Type } from 'class-transformer';
import { IsEnum } from 'class-validator';
import { Address } from 'src/users/schemas/address.schema';
import { CartStatus } from '../schemas/cart.schema';

export class UpdateCartDto {
  @IsEnum(CartStatus)
  status: string;

  @Type(() => Address)
  deliveryAddress: Address;
}
