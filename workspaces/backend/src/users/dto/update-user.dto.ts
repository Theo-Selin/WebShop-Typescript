import { Type } from 'class-transformer';
import {
  IsDefined,
  IsEmail,
  IsIn,
  IsNotEmptyObject,
  IsObject,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { DeliveryAddressDto } from './delivery-address.dto';

export class UpdateUserDto {
  @IsOptional()
  @IsString({ message: 'Must be a string' })
  fullName: string;

  @IsOptional()
  @IsEmail({ message: 'Not valid email format' })
  email: string;

  @IsOptional()
  @IsString({ message: 'Must be a string' })
  phoneNumber: string;

  @IsOptional()
  @IsDefined()
  @IsNotEmptyObject()
  @IsObject()
  @ValidateNested()
  @Type(() => DeliveryAddressDto)
  deliveryAddress: DeliveryAddressDto;

  @IsOptional()
  @IsIn(['admin', 'customer'])
  role: string;
}
