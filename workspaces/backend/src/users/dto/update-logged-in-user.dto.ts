import { Type } from 'class-transformer';
import {
  IsDefined,
  IsEmail,
  IsNotEmptyObject,
  IsObject,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { DeliveryAddressDto } from './delivery-address.dto';

export class UpdateLoggedInUserDto {
  @IsOptional()
  @IsString({ message: 'Must be a string' })
  fullName: string;

  @IsOptional()
  @IsEmail({ message: 'Not valid email format' })
  email: string;

  @IsOptional()
  @IsString({ message: 'Must be a string' })
  phoneNumber: string;

  @IsDefined()
  @IsNotEmptyObject()
  @IsObject()
  @ValidateNested()
  @IsOptional()
  @Type(() => DeliveryAddressDto)
  deliveryAddress: DeliveryAddressDto;
}
