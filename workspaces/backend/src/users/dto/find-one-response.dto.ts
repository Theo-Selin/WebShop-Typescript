import { Exclude, Transform, Type } from 'class-transformer';
import { Cart } from 'src/carts/schemas/cart.schema';
import { Address } from '../schemas/address.schema';
import { AccountRole } from '../schemas/user.schema';

export class FindOneResponseDto {
  @Transform(({ obj }) => obj._id.toString())
  _id: string;

  fullName: string;

  @Exclude()
  password: string;

  email: string;

  phoneNumber: string;

  @Type(() => Address)
  deliveryAddress: Address;

  role: AccountRole;

  @Type(() => Cart)
  activeCart: Cart;
}
