import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Exclude, Transform, Type } from 'class-transformer';
import mongoose, { Document, ObjectId } from 'mongoose';
import { Cart } from '../../carts/schemas/cart.schema';
import { Address } from './address.schema';

export type UserDocument = User & Document;

export class AccountRole {
  type: 'admin' | 'customer';
}

@Schema()
export class User {
  @Transform(({ obj }) => obj._id.toString())
  _id: ObjectId;

  @Prop()
  fullName: string;

  @Exclude()
  @Prop()
  password: string;

  @Prop()
  email: string;

  @Prop()
  phoneNumber: string;

  @Prop()
  @Type(() => Address)
  deliveryAddress: Address;

  @Prop({ default: 'customer' })
  role: AccountRole;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Cart.name })
  @Transform(({ obj }) => obj._id.toString())
  activeCart: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
