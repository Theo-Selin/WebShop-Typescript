import { Type } from 'class-transformer';
import {
  IsDefined,
  IsEmail,
  IsIn,
  IsNotEmpty,
  IsNotEmptyObject,
  IsObject,
  IsString,
  ValidateNested,
} from 'class-validator';
import { DeliveryAddressDto } from './delivery-address.dto';

export class CreateUserDto {
  @IsNotEmpty({ message: 'Name required' })
  @IsString({ message: 'Must be a string' })
  fullName: string;

  @IsNotEmpty({ message: 'Password required' })
  @IsString({ message: 'Password must be a string' })
  password: string;

  @IsNotEmpty({ message: 'Email required' })
  @IsEmail({ message: 'Not valid email format' })
  email: string;

  @IsDefined()
  @IsNotEmptyObject()
  @IsObject()
  @ValidateNested()
  @Type(() => DeliveryAddressDto)
  deliveryAddress: DeliveryAddressDto;

  @IsNotEmpty()
  @IsIn(['admin', 'customer'])
  role: string;
}
