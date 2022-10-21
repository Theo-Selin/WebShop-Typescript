import { IsIn } from 'class-validator';
import { DeliveryAddress } from 'src/users/schemas/user.schema';

export class UpdateCartDto {
  @IsIn(['active', 'registered', 'inProgress', 'inDelivery', 'delivered'])
  status: string;

  deliveryAddress: DeliveryAddress;
}
