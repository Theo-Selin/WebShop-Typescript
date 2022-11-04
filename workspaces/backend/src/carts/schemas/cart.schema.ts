import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Transform, Type } from 'class-transformer';
import mongoose, { Document } from 'mongoose';
import { Address } from '../../users/schemas/address.schema';
import { CartItem } from './cart-item.schema';

export type CartDocument = Cart & Document;

export enum CartStatus {
  Active = 'active',
  Registered = 'registered',
  InProgress = 'inProgress',
  InDelivery = 'inDelivery',
  Delivered = 'delivered',
}

export enum DeliveryPlan {
  Free = 0,
  Shipping = 59,
}

@Schema({ timestamps: true })
export class Cart {
  @Transform(({ obj }) => obj._id.toString())
  _id: string;

  @Prop([
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
      quantity: Number,
      id: false,
      _id: false,
    },
  ])
  @Type(() => CartItem)
  products: CartItem[];

  @Prop({ default: CartStatus.Active })
  status: CartStatus;

  @Prop({ default: 0 })
  totalPrice: number;

  @Prop({ default: 0 })
  totalWeight: number;

  @Prop({ default: DeliveryPlan.Free })
  deliveryCost: DeliveryPlan;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  @Transform(({ obj }) => obj.user.toString())
  user: string;

  @Prop()
  @Type(() => Address)
  deliveryAddress: Address;
}

export const CartSchema = SchemaFactory.createForClass(Cart);
