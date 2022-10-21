import { IsInt, Min } from 'class-validator';

export class AddToCartDto {
  productId: string;
  @Min(1, { message: '$property must be greater than 0' })
  @IsInt({ message: '$property must be an integer' })
  quantity: number;
}
