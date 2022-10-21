import { Type } from 'class-transformer';
import { IsEmail, IsIn, IsNotEmpty, IsString } from 'class-validator';
import { DeliveryAddress } from '../schemas/user.schema';

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

  @Type(() => DeliveryAddress)
  deliveryAdress: DeliveryAddress;

  @IsNotEmpty()
  @IsIn(['admin', 'customer'])
  role: string;
}
