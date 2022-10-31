import { Type } from 'class-transformer';
import { Product } from 'src/products/schemas/products.schema';

export class PopulatedCartItem {
  @Type(() => Product)
  productId: Product;

  quantity: number;
}
