import { IsArray, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateProductDto {
  @IsString()
  readonly name: string;

  @IsString()
  readonly description: string;

  @IsNotEmpty()
  @IsNumber()
  readonly weight: number;

  @IsNumber()
  readonly price: number;

  @IsString()
  readonly manufacturer: string;

  @IsArray()
  readonly images: string[];
}
