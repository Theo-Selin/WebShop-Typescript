import { IsEnum } from 'class-validator';
import { DeliveryAddress } from 'src/users/schemas/user.schema';
import { CartStatus } from '../schemas/cart.schema';

export class UpdateCartDto {
  @IsEnum(CartStatus)
  status: string;

  deliveryAddress: DeliveryAddress;
}
