import { Type } from 'class-transformer';
import { IsEmail, IsIn, IsOptional, IsString } from 'class-validator';
import { Address } from '../schemas/address.schema';

export class UpdateUserDto {
  @IsOptional()
  @IsString({ message: 'Must be a string' })
  fullName: string;

  @IsOptional()
  @IsEmail({ message: 'Not valid email format' })
  email: string;

  @IsOptional()
  @Type(() => Address)
  deliveryAddress: Address;

  @IsOptional()
  @IsIn(['admin', 'customer'])
  role: string;
}
