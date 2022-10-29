import { Type } from 'class-transformer';
import { IsEmail, IsOptional, IsString } from 'class-validator';
import { Address } from '../schemas/address.schema';

export class UpdateLoggedInUserDto {
  @IsOptional()
  @IsString({ message: 'Must be a string' })
  fullName: string;

  @IsOptional()
  @IsEmail({ message: 'Not valid email format' })
  email: string;

  @IsOptional()
  @Type(() => Address)
  deliveryAddress: Address;
}
