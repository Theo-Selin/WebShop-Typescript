import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Product } from 'src/products/schemas/products.schema';
import { DeliveryAddress } from 'src/users/schemas/user.schema';

export type CartDocument = Cart & Document;

type CartItem = {
  product: string;
  quntity: number;
};

type CartStatus =
  | 'active'
  | 'registered'
  | 'inProgress'
  | 'inDelivery'
  | 'delivered';

@Schema({ timestamps: true })
export class Cart {
  @Prop([
    {
      product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
      quantity: Number,
    },
  ])
  products: CartItem[];

  @Prop({ default: 'active' })
  status: CartStatus;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: string;

  @Prop()
  deliveryAdress: DeliveryAddress;
}

export const CartSchema = SchemaFactory.createForClass(Cart);
