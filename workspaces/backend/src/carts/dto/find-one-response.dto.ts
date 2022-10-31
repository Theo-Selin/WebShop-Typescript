import { Transform, Type } from 'class-transformer';
import { Address } from '../../users/schemas/address.schema';
import { User } from '../../users/schemas/user.schema';
import { CartStatus } from '../schemas/cart.schema';
import { PopulatedCartItem } from './populated-cart-item.dto';

export class FindOneResponseDto {
  @Transform(({ obj }) => obj._id.toString())
  _id: string;

  @Type(() => PopulatedCartItem)
  products: PopulatedCartItem[];

  status: CartStatus;

  @Type(() => User)
  user: User;

  @Type(() => Address)
  deliveryAddress: Address;
}
