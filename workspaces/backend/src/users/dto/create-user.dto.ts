import { Type } from 'class-transformer';
import { IsEmail, IsIn, IsNotEmpty, IsString } from 'class-validator';
import { Address } from '../schemas/address.schema';

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

  @Type(() => Address)
  deliveryAdress: Address;

  @IsNotEmpty()
  @IsIn(['admin', 'customer'])
  role: string;
}
