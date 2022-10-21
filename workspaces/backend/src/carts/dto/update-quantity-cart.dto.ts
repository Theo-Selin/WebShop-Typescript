import { IsInt, Min } from 'class-validator';

export class UpdateQuantityDto {
  productId: string;
  @Min(0, { message: '$property must be greater than 0' })
  @IsInt({ message: '$property must be an integer' })
  quantity: number;
}
