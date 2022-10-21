import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { DeliveryAddress } from 'src/users/schemas/user.schema';

export type CartDocument = Cart & Document;

type CartItem = {
  productId: string;
  quantity: number;
};

export type CartStatus =
  | 'active'
  | 'registered'
  | 'inProgress'
  | 'inDelivery'
  | 'delivered';

@Schema({ timestamps: true })
export class Cart {
  @Prop([
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
      quantity: Number,
      id: false,
      _id: false,
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
