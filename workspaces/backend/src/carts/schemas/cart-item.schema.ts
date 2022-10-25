import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Transform } from 'class-transformer';
import { Document } from 'mongoose';

export type CartItemDocument = CartItem & Document;

@Schema()
export class CartItem {
  @Transform(({ obj }) => obj.productId.toString())
  productId: string;

  @Prop()
  quantity: number;
}

export const CartSchema = SchemaFactory.createForClass(CartItem);
