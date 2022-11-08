import { Type } from 'class-transformer';
import {
  IsDefined,
  IsNotEmptyObject,
  IsObject,
  IsOptional,
  ValidateNested,
} from 'class-validator';
import { DeliveryAddressDto } from './delivery-address.dto';

export class CheckoutDto {
  @IsDefined()
  @IsNotEmptyObject()
  @IsObject()
  @ValidateNested()
  @IsOptional()
  @Type(() => DeliveryAddressDto)
  deliveryAddress: DeliveryAddressDto;
}
