import { IsNotEmpty, IsString } from 'class-validator';

export class DeliveryAddressDto {
  @IsNotEmpty({ message: '$property is required.' })
  @IsString({ message: '$property should be a string.' })
  streetAddress: string;

  @IsNotEmpty({ message: '$property is required.' })
  @IsString({ message: '$property should be a string.' })
  zipCode: string;

  @IsNotEmpty({ message: '$property is required.' })
  @IsString({ message: '$property should be a string.' })
  city: string;

  @IsNotEmpty({ message: '$property is required.' })
  @IsString({ message: '$property should be a string.' })
  country: string;
}
