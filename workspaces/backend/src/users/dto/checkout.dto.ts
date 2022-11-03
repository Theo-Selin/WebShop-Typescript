import { Type } from 'class-transformer';
import { IsOptional } from 'class-validator';
import { DeliveryAddressDto } from './delivery-address.dto';

export class CheckoutDto {
  @Type(() => DeliveryAddressDto)
  @IsOptional()
  deliveryAddress: DeliveryAddressDto;
}
