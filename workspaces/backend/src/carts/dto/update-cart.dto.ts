import { Type } from 'class-transformer';
import {
  IsDefined,
  IsEnum,
  IsNotEmptyObject,
  IsObject,
  IsOptional,
  ValidateNested,
} from 'class-validator';
import { DeliveryAddressDto } from 'src/users/dto/delivery-address.dto';
import { CartStatus } from '../schemas/cart.schema';

export class UpdateCartDto {
  @IsEnum(CartStatus, {
    message: `status must be one of [${Object.values(CartStatus).map(
      (v) => `'${v}'`,
    )}]`,
  })
  @IsOptional()
  status: string;

  @IsDefined()
  @IsNotEmptyObject()
  @IsObject()
  @ValidateNested()
  @IsOptional()
  @Type(() => DeliveryAddressDto)
  deliveryAddress: DeliveryAddressDto;
}
